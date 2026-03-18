import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/**
 * Seed Script
 * 
 * Creates initial admin user for CMS access.
 * Run with: npx prisma db seed
 * 
 * Default credentials (CHANGE AFTER FIRST LOGIN):
 * - Email: admin@sobek.com
 * - Password: admin123
 */
async function main() {
  console.log("🌱 Starting seed...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@sobek.com" },
    update: {},
    create: {
      email: "admin@sobek.com",
      password: hashedPassword,
      name: "Admin User",
      role: UserRole.ADMIN,
    },
  });

  console.log("✅ Created admin user:", admin.email);
  console.log("⚠️  Default password: admin123");
  console.log("⚠️  PLEASE CHANGE THE PASSWORD AFTER FIRST LOGIN!");

  // Optional: Create sample page
  const samplePage = await prisma.page.upsert({
    where: { slug: "sample-page" },
    update: {},
    create: {
      slug: "sample-page",
      title: "Sample Page",
      description: "This is a sample page created by the seed script",
      status: "DRAFT",
      userId: admin.id,
      sections: {
        create: [
          {
            key: "hero-title",
            title: "Welcome",
            content: "# Welcome to Our Website\n\nThis is sample content.",
            contentType: "MARKDOWN",
            order: 0,
            userId: admin.id,
          },
        ],
      },
    },
  });

  console.log("✅ Created sample page:", samplePage.slug);

  console.log("🎉 Seed completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

