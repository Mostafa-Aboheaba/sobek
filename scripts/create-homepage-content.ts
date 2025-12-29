import { prisma } from "../lib/prisma";
import { Prisma, ContentType } from "@prisma/client";

/**
 * Script to create homepage content in CMS
 * 
 * This creates/updates a "home" page with all editable sections
 * pre-populated with the current website content.
 * 
 * Run with: npm run cms:create-homepage
 */

async function createHomepageContent(locale: string = "en") {
  console.log(`🏠 Creating/updating homepage content in CMS for locale: ${locale}...`);

  try {
    // Get admin user (for userId)
    const admin = await prisma.user.findFirst({
      where: { role: "ADMIN" },
    });

    if (!admin) {
      throw new Error("No admin user found. Please run db:seed first.");
    }

    // Create or update homepage page
    const homepage = await prisma.page.upsert({
      where: { slug: "home" },
      update: {
        title: "Homepage",
        description: "Main homepage content sections",
        status: "PUBLISHED",
        publishedAt: new Date(),
        userId: admin.id,
      },
      create: {
        slug: "home",
        title: "Homepage",
        description: "Main homepage content sections",
        status: "PUBLISHED",
        publishedAt: new Date(),
        userId: admin.id,
      },
    });

    console.log(`✅ Homepage page ready (ID: ${homepage.id})`);

    // Define all sections with their content
    const sections = [
      // Hero Section
      {
        key: "hero-heading",
        title: "Hero Heading",
        content: "Right Line Sails,<br />Sobek Delivers",
        contentType: ContentType.HTML,
        order: 10,
      },
      {
        key: "hero-tagline",
        title: "Hero Tagline",
        content: "Fast reliable sea freight solution",
        contentType: ContentType.TEXT,
        order: 20,
      },
      {
        key: "hero-paragraph",
        title: "Hero Paragraph",
        content: "We provide reliable, efficient, and cost-effective global maritime and logistics solutions, services that ensure smooth vessel operations and seamless cargo movement across international waters, of deep sea to Russian Ports.",
        contentType: ContentType.TEXT,
        order: 30,
      },
      {
        key: "hero-image",
        title: "Hero Background Image",
        content: "/images/hero-ship-sea.png",
        contentType: ContentType.TEXT,
        order: 40,
      },
      // About Sobek Section
      {
        key: "about-sobek-label",
        title: "About Sobek Label",
        content: "About Sobek",
        contentType: ContentType.TEXT,
        order: 50,
      },
      {
        key: "about-sobek-title",
        title: "About Sobek Title",
        content: "Sobek Shipping Agency, <span class=\"text-highlight\">The Exclusive Agent of Right Line</span> – Russian Shipping Line, Your Trusted Partner in Global Maritime Logistics.",
        contentType: ContentType.HTML,
        order: 60,
      },
      {
        key: "about-sobek-text",
        title: "About Sobek Text",
        content: "At Sobek, we offer more than just shipping services, we build bridges of trust and efficiency across global markets. We are your dependable logistics partner, connecting you to the world through precise, secure, and fast shipping lines, with a special focus on major Russian ports.",
        contentType: ContentType.TEXT,
        order: 70,
      },
      {
        key: "about-sobek-button",
        title: "About Sobek Button Text",
        content: "Read More",
        contentType: ContentType.TEXT,
        order: 80,
      },
      {
        key: "about-sobek-image",
        title: "About Sobek Image",
        content: "/images/right-line-containers.png",
        contentType: ContentType.TEXT,
        order: 90,
      },
      // Why Choose Sobek Section
      {
        key: "why-choose-label",
        title: "Why Choose Sobek Label",
        content: "Why Choose Sobek Shipping Agency?",
        contentType: ContentType.TEXT,
        order: 100,
      },
      {
        key: "why-choose-heading",
        title: "Why Choose Sobek Heading",
        content: "We are the only authorized agent for <span class=\"text-highlight\">Right Line</span>, ensuring clients receive <span class=\"text-highlight\">genuine,</span><br /><span class=\"text-highlight\">direct shipping</span> services with no intermediaries.",
        contentType: ContentType.HTML,
        order: 110,
      },
      {
        key: "why-choose-features",
        title: "Why Choose Sobek Features (JSON)",
        content: JSON.stringify([
          {
            title: "Global Network",
            description: "Extensive reach connecting major ports worldwide.",
          },
          {
            title: "Efficiency & Speed",
            description: "Streamlined operations for timely deliveries.",
          },
          {
            title: "Reliability",
            description: "Consistent and dependable service you can trust.",
          },
          {
            title: "Quality & Safety",
            description: "A Brand new 2025 fleet ready to sail.",
          },
          {
            title: "24/7 customer support",
            description: "Round the clock assistance for all inquiries.",
          },
        ]),
        contentType: ContentType.TEXT,
        order: 120,
      },
      // About Right Line Section
      {
        key: "about-right-line-label",
        title: "About Right Line Label",
        content: "About Right Line",
        contentType: ContentType.TEXT,
        order: 130,
      },
      {
        key: "about-right-line-title",
        title: "About Right Line Title",
        content: "Right Line is a trusted name in <span class=\"text-highlight\">global maritime transport</span>, known for its <span class=\"text-highlight\">reliability, strong fleet capacity, and consistent service performance</span>.",
        contentType: ContentType.HTML,
        order: 140,
      },
      {
        key: "about-right-line-text",
        title: "About Right Line Text",
        content: "As its exclusive agent, Sobek Shipping Agency manages all regional operations. Through this partnership, clients gain access to optimized routes connecting Russia with key international trade hubs, enabling smooth, secure, and cost-effective cargo movement.",
        contentType: ContentType.TEXT,
        order: 150,
      },
      {
        key: "about-right-line-button",
        title: "About Right Line Button Text",
        content: "Read More",
        contentType: ContentType.TEXT,
        order: 160,
      },
      {
        key: "about-right-line-image",
        title: "About Right Line Image",
        content: "/images/about-sobek-ship.png",
        contentType: ContentType.TEXT,
        order: 170,
      },
      {
        key: "about-right-line-features",
        title: "About Right Line Features (JSON)",
        content: JSON.stringify([
          "Vessel coordination and port operations",
          "Container booking and space management",
          "Shipping documentation and compliance",
          "Cargo handling, tracking, and customer support",
          "Freight quotations and schedule updates",
        ]),
        contentType: ContentType.TEXT,
        order: 180,
      },
      // Services Section
      {
        key: "services-label",
        title: "Services Label",
        content: "Our Services",
        contentType: ContentType.TEXT,
        order: 190,
      },
      {
        key: "services-heading",
        title: "Services Heading",
        content: "As the <span class=\"text-highlight\">sole representative of Right Line in the region</span>, we manage all <span class=\"text-highlight\">shipping line operations</span> with precision and professionalism.",
        contentType: ContentType.HTML,
        order: 200,
      },
      {
        key: "services-list",
        title: "Services List (JSON)",
        content: JSON.stringify([
          {
            number: "1",
            title: "Cargo Booking & Space Management",
            description: "Fast, accurate booking processes and guaranteed space allocation on Right Line vessels.",
          },
          {
            number: "2",
            title: "Port & Vessel Operations",
            description: "Comprehensive port agency support, including berthing arrangements, stevedoring coordination, and documentation handling.",
          },
          {
            number: "3",
            title: "Container Services",
            description: "Full support for dry, reefer, and special containers, including tracking, storage, and maintenance coordination.",
          },
          {
            number: "4",
            title: "Customs Documentation & Support",
            description: "Expert assistance in customs, regulatory compliance, and required shipping documentation.",
          },
          {
            number: "5",
            title: "Freight Forwarding Support",
            description: "Integrated logistics solutions, combining sea transport with inland delivery options.",
          },
          {
            number: "6",
            title: "Captain Receipt",
            description: "We rely on our dedicated Captain Receipt Delivery Service to ensure all documents and letters reach their destinations securely and without delay.",
          },
        ]),
        contentType: ContentType.TEXT,
        order: 210,
      },
      // Industries Section
      {
        key: "industries-label",
        title: "Industries Label",
        content: "Industries We Serve",
        contentType: ContentType.TEXT,
        order: 220,
      },
      {
        key: "industries-heading",
        title: "Industries Heading",
        content: "Powering Industries of All Kinds",
        contentType: ContentType.TEXT,
        order: 230,
      },
      {
        key: "industries-image",
        title: "Industries Image",
        content: "/images/industries-container.png",
        contentType: ContentType.TEXT,
        order: 240,
      },
      {
        key: "industries-list",
        title: "Industries List (JSON)",
        content: JSON.stringify([
          "Agriculture & Food Products",
          "Construction Materials",
          "Machinery & Equipment",
          "Automotive",
          "Consumer Goods",
          "Chemicals (non-hazardous)/hazardous",
          "Retail & FMCG",
        ]),
        contentType: ContentType.TEXT,
        order: 250,
      },
      // Testimonials Section
      {
        key: "testimonials-label",
        title: "Testimonials Label",
        content: "Testimonials",
        contentType: ContentType.TEXT,
        order: 260,
      },
      {
        key: "testimonials-heading",
        title: "Testimonials Heading",
        content: "What Our Clients Say About Our Services",
        contentType: ContentType.TEXT,
        order: 270,
      },
      {
        key: "testimonials-list",
        title: "Testimonials List (JSON)",
        content: JSON.stringify([
          {
            rating: 4.7,
            quote: "The tracking service was quick and accurate. I received an update within minutes and found exactly where my shipment was.",
            name: "Ahmed Salem",
            title: "Operations Manager, Mantrac Group",
          },
          {
            rating: 4.6,
            quote: "Great experience! Our cargo arrived earlier than expected and in perfect condition.",
            name: "Mustafa Aref",
            title: "Logistics Manager, Alex West",
          },
          {
            rating: 4.8,
            quote: "We ship products internationally every month, and this is one of the most dependable cargo services we've used.",
            name: "Shaimaa Serag",
            title: "Procurement Officer, Enjaz",
          },
          {
            rating: 4.9,
            quote: "Outstanding customer service and reliable shipping. The team always keeps us informed throughout the entire process.",
            name: "Mohamed Hassan",
            title: "Supply Chain Director, El-Araby Group",
          },
          {
            rating: 4.5,
            quote: "Professional handling of our shipments to Russian ports. Very satisfied with their expertise and attention to detail.",
            name: "Nour El-Din",
            title: "Export Manager, Oriental Weavers",
          },
          {
            rating: 4.7,
            quote: "Fast, efficient, and cost-effective. Sobek has become our preferred shipping partner for all our maritime logistics needs.",
            name: "Yasmine Farid",
            title: "International Trade Coordinator, CIB",
          },
          {
            rating: 4.8,
            quote: "Excellent communication and seamless operations. Our goods always arrive on schedule with proper documentation.",
            name: "Karim Abdel Rahman",
            title: "Procurement Manager, Orascom Construction",
          },
          {
            rating: 4.6,
            quote: "The direct route to Russian ports saves us time and money. Highly recommend their services for anyone shipping to Russia.",
            name: "Layla Mahmoud",
            title: "Logistics Specialist, Ezz Steel",
          },
          {
            rating: 4.9,
            quote: "Reliable, professional, and always responsive. Sobek Shipping Agency has exceeded our expectations in every shipment.",
            name: "Omar Khaled",
            title: "Operations Executive, Americana Group",
          },
        ]),
        contentType: ContentType.TEXT,
        order: 280,
      },
      // Tracking/Find Your Cargo Section
      {
        key: "tracking-label",
        title: "Tracking Label",
        content: "Find Your Cargo",
        contentType: ContentType.TEXT,
        order: 290,
      },
      {
        key: "tracking-heading",
        title: "Tracking Heading",
        content: "Drop your <span class=\"text-highlight\">Booking number</span> and <span class=\"text-highlight\">contact method</span>. We'll track it and send you the latest update.",
        contentType: ContentType.HTML,
        order: 300,
      },
      {
        key: "tracking-booking-label",
        title: "Tracking Booking Label",
        content: "Enter your Booking number or Bill of lading number",
        contentType: ContentType.TEXT,
        order: 310,
      },
      {
        key: "tracking-booking-placeholder",
        title: "Tracking Booking Placeholder",
        content: "ex: RDEDK/ALYNVS1125001234",
        contentType: ContentType.TEXT,
        order: 320,
      },
      {
        key: "tracking-contact-label",
        title: "Tracking Contact Label",
        content: "Enter your Phone number or Email",
        contentType: ContentType.TEXT,
        order: 330,
      },
      {
        key: "tracking-contact-placeholder",
        title: "Tracking Contact Placeholder",
        content: "+201233445566 / user@mail.com",
        contentType: ContentType.TEXT,
        order: 340,
      },
      {
        key: "tracking-button",
        title: "Tracking Button Text",
        content: "Track",
        contentType: ContentType.TEXT,
        order: 350,
      },
      {
        key: "tracking-image",
        title: "Tracking Image",
        content: "/images/tracking-container-truck.png",
        contentType: ContentType.TEXT,
        order: 360,
      },
    ];

    // Upsert each section with locale
    let created = 0;
    let updated = 0;

    for (const sectionData of sections) {
      // Use the correct unique constraint: pageId_key_locale
      const existing = await prisma.pageSection.findUnique({
        where: {
          pageId_key_locale: {
            pageId: homepage.id,
            key: sectionData.key,
            locale: locale,
          },
        },
      });

      if (existing) {
        await prisma.pageSection.update({
          where: { id: existing.id },
          data: {
            title: sectionData.title,
            content: sectionData.content,
            contentType: sectionData.contentType,
            order: sectionData.order,
            userId: admin.id,
          },
        });
        updated++;
      } else {
        await prisma.pageSection.create({
          data: {
            pageId: homepage.id,
            userId: admin.id,
            locale: locale,
            ...sectionData,
          },
        });
        created++;
      }
    }

    console.log(`✅ Homepage sections processed for ${locale}: ${created} created, ${updated} updated`);
    console.log(`   Total sections: ${sections.length}`);
    console.log("\n📝 Next steps:");
    console.log("   1. Visit: /dashboard/homepage-sections");
    console.log("   2. Or edit directly at: /dashboard/pages/home/edit");
    console.log("   3. Changes will appear on the homepage immediately!");
    console.log("\n💡 Tip: JSON fields (services-list, testimonials-list, etc.) can be edited as JSON arrays/objects.");
  } catch (error: any) {
    console.error("❌ Error creating homepage content:", error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Get locale from command line argument or default to 'en'
const locale = process.argv[2] || "en";

createHomepageContent(locale).catch((error) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
