import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtUtils } from "./utils/jwt";
import type { JwtPayload } from "jsonwebtoken";
import { getNewAccessToken } from "./app/(authGroup)/_actions/authActions";

const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = ["/"];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const cookieStore = await cookies();

  let accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  let decodeAccessToken = accessToken
    ? jwtUtils.verifyToken(
        accessToken,
        (process.env.JWT_ACCESS_SECRET as string) ||
          "super_secret_kanban_jwt_key_2026",
      )
    : null;

  const decodeRefreshToken = refreshToken
    ? jwtUtils.verifyToken(
        refreshToken,
        (process.env.JWT_REFRESH_SECRET as string) ||
          "super_secret_kanban_jwt_key_2026",
      )
    : null;

  if (!decodeAccessToken?.success && decodeRefreshToken?.success) {
    const result = await getNewAccessToken(refreshToken);

    if (result.success && result.data?.accessToken) {
      const newAccessToken = result.data.accessToken;

      cookieStore.set("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24, // 1 day
        sameSite: "lax",
      });

      accessToken = newAccessToken;
      decodeAccessToken = jwtUtils.verifyToken(
        accessToken!,
        (process.env.JWT_ACCESS_SECRET as string) ||
          "super_secret_kanban_jwt_key_2026",
      );
    }
  }

  if (!decodeAccessToken?.success) {
    cookieStore.delete("accessToken");
  }

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );
  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  if (!accessToken && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  let userRole = null;

  if (decodeAccessToken?.success && decodeAccessToken.data) {
    userRole = (decodeAccessToken.data as JwtPayload).role;
  }

  // Redirect Authenticated users from Auth Routes (/login, /register)
  if (accessToken && AUTH_ROUTES.includes(pathname)) {
    if (userRole === "USER") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
  }

  if (pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)"],
};
