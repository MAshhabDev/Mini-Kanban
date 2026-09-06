import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";

export const autoSeed = async () => {
  try {
    const adminEmail = "admin@example.com";
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    const hashedPassword = await bcrypt.hash("123456", 10);

    if (!existingAdmin) {
      await prisma.user.create({
        data: {
          name: "Super Admin",
          email: adminEmail,
          password: hashedPassword,
          role: "ADMIN",
        },
      });
      console.log("✅ Auto-seeded Admin User: admin@example.com");
    }

    const userEmail = "user@example.com";
    const existingUser = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          name: "John Doe",
          email: userEmail,
          password: hashedPassword,
          role: "USER",
        },
      });
      console.log("✅ Auto-seeded Normal User: user@example.com");
    }
  } catch (error) {
    console.error("Auto seed error:", error);
  }
};
