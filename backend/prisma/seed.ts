import bcrypt from "bcrypt";
import { prisma } from "../src/lib/prisma";

const seed = async () => {
  try {
    console.log("🌱 Seeding database...");

    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || 10);
    const hashedPassword = await bcrypt.hash("123456", saltRounds);

    // 1. Seed Admin User
    const adminEmail = "admin@email.com";
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (!existingAdmin) {
      const admin = await prisma.user.create({
        data: {
          name: "Super Admin",
          email: adminEmail,
          password: hashedPassword,
          role: "ADMIN",
        },
      });
      console.log(`✅ Created Admin User: ${admin.email} (Role: ADMIN)`);
    } else {
      console.log(`ℹ️ Admin User already exists: ${adminEmail}`);
    }

    // 2. Seed Standard User
    const userEmail = "user@email.com";
    const existingUser = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!existingUser) {
      const user = await prisma.user.create({
        data: {
          name: "John Doe",
          email: userEmail,
          password: hashedPassword,
          role: "USER",
        },
      });
      console.log(`✅ Created Normal User: ${user.email} (Role: USER)`);
    } else {
      console.log(`ℹ️ Normal User already exists: ${userEmail}`);
    }

    console.log("🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
