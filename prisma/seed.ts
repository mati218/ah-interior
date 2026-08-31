import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function img(id: string, w = 1600) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
}

const LR = {
  1: img("1724582586529-62622e50c0b3"),
  2: img("1705321963943-de94bb3f0dd3"),
  3: img("1724582586458-a51791349977"),
  4: img("1691036561573-4b76998b60de"),
  5: img("1738168246881-40f35f8aba0a"),
  6: img("1600210491369-e753d80a41f3"),
  7: img("1616137422495-1e9e46e2aa77"),
  8: img("1649083048770-82e8ffd80431"),
  9: img("1687075197041-91fba1013e1d"),
  10: img("1724582586580-8b52c02e99dd"),
};

const K = {
  1: img("1502005097973-6a7082348e28"),
  2: img("1682888813913-e13f18692019"),
  3: img("1671197244266-73129c97c096"),
  4: img("1683629357963-adf2b1fa9ad9"),
  5: img("1643949915134-73a4c880f7c7"),
  6: img("1683629357935-f3f4777ddf41"),
  7: img("1644395175647-7fc09bdae7c1"),
};

const B = {
  1: img("1600210491305-7396500b5b31"),
  2: img("1663811397207-418a92396ad5"),
  3: img("1696762932825-2737db830bbe"),
  4: img("1633944095397-878622ebc01c"),
  5: img("1750420556288-d0e32a6f517b"),
  6: img("1653204095671-3ed81a4bc561"),
  7: img("1642541070065-3912f347e7c6"),
};

const BA = {
  1: img("1742134131017-44d377a611b1"),
  2: img("1756079664354-34944e001f6d"),
  3: img("1754574741164-a41418029cfb"),
  4: img("1641870538417-c83e621d1425"),
};

const P = {
  man1: img("1500648767791-00dcc994a43e", 400),
  man2: img("1507003211169-0a1dd7228f2d", 400),
  man3: img("1780733057950-0dc9055ddae9", 400),
  woman1: img("1494790108377-be9c29b29330", 400),
  woman2: img("1609436132311-e4b0c9370469", 400),
  woman3: img("1659481993364-4512775ed911", 400),
  woman4: img("1514960919797-5ff58c52e5ba", 400),
  woman5: img("1701728667207-54b43dbdab97", 400),
};

async function main() {
  console.log("Seeding database...");

  // --- Admin user ---
  const ownerEmail = "compilextechnology@gmail.com";
  const ownerPassword = "AHInteriors@2026!";
  const existingOwner = await prisma.user.findUnique({ where: { email: ownerEmail } });
  if (!existingOwner) {
    await prisma.user.create({
      data: {
        name: "Studio Admin",
        email: ownerEmail,
        passwordHash: await bcrypt.hash(ownerPassword, 10),
        role: "OWNER",
      },
    });
    console.log(`Created owner account: ${ownerEmail} / ${ownerPassword}`);
  }

  // --- Categories ---
  const categoryData = [
    { name: "Living Room", slug: "living-room" },
    { name: "Kitchen", slug: "kitchen" },
    { name: "Bedroom", slug: "bedroom" },
    { name: "Bathroom", slug: "bathroom" },
  ];
  const categories: Record<string, string> = {};
  for (const c of categoryData) {
    const cat = await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
    categories[c.slug] = cat.id;
  }

  // --- Services ---
  const services = [
    {
      title: "Interior Design Consultation",
      slug: "interior-design-consultation",
      summary: "A tailored first step — we listen, assess your space, and shape a vision together.",
      description:
        "Our consultation service is where every project begins. We visit your space, discuss how you live and what you love, and translate that into a clear design direction — covering layout, palette, material language and budget before any work begins.",
      icon: "Compass",
      image: LR[6],
      sortOrder: 1,
    },
    {
      title: "Full Home Renovation",
      slug: "full-home-renovation",
      summary: "End-to-end renovation management, from demolition to the final styled photograph.",
      description:
        "We manage every phase of a full renovation — architecture coordination, contractor oversight, material sourcing and on-site quality control — so you get a seamless result without carrying the project logistics yourself.",
      icon: "Hammer",
      image: K[2],
      sortOrder: 2,
    },
    {
      title: "Space Planning",
      slug: "space-planning",
      summary: "Smarter layouts that make every square foot feel considered and generous.",
      description:
        "Good design starts with flow. We rework layouts to improve circulation, daylight and function — whether that's opening a kitchen to a living space or reimagining a cramped floor plan into something that finally breathes.",
      icon: "LayoutGrid",
      image: LR[9],
      sortOrder: 3,
    },
    {
      title: "Furniture Curation",
      slug: "furniture-curation",
      summary: "Sourcing pieces — vintage, custom and contemporary — that earn their place.",
      description:
        "We source and specify furniture from a curated network of makers and vintage dealers, balancing investment pieces with considered basics, so every room feels collected rather than purchased all at once.",
      icon: "Armchair",
      image: LR[2],
      sortOrder: 4,
    },
    {
      title: "Lighting Design",
      slug: "lighting-design",
      summary: "Layered lighting plans that shape mood as much as they shape visibility.",
      description:
        "Lighting is the detail that makes or breaks a room after dark. We design layered schemes — ambient, task and accent — specified down to fixture, dimming and colour temperature.",
      icon: "Lightbulb",
      image: B[5],
      sortOrder: 5,
    },
    {
      title: "Styling & Staging",
      slug: "styling-and-staging",
      summary: "The final layer of soft furnishing, art and objects that make a house feel lived-in.",
      description:
        "Once the architecture and furniture are in place, styling brings a room to life — textiles, art curation, greenery and considered objects placed with intention, whether for daily living or a market-ready staging.",
      icon: "Ruler",
      image: BA[2],
      sortOrder: 6,
    },
  ];

  for (const s of services) {
    await prisma.service.upsert({ where: { slug: s.slug }, update: {}, create: s });
  }

  // --- Projects ---
  const projects = [
    {
      title: "The Willow Residence",
      slug: "the-willow-residence",
      summary: "A warm, light-filled family living room built around calm materiality.",
      description:
        "The Willow Residence reimagines a dated living room into an airy, textural retreat. We opened the space to natural light, layered in warm oak and linen, and built a palette that feels both elevated and completely livable for a young family.",
      coverImage: LR[1],
      location: "Austin, TX",
      area: "1,850 sq ft",
      year: 2025,
      featured: true,
      status: "PUBLISHED" as const,
      categoryId: categories["living-room"],
      images: [LR[1], LR[2], LR[6]],
    },
    {
      title: "Maple Grove Kitchen",
      slug: "maple-grove-kitchen",
      summary: "A marble-clad kitchen designed for both quiet mornings and full-house gatherings.",
      description:
        "Maple Grove is a full kitchen renovation centered on an oversized marble island. We reworked the layout for better flow between prep, cooking and gathering zones, finished in warm white oak cabinetry and brushed brass hardware.",
      coverImage: K[2],
      location: "Portland, OR",
      area: "480 sq ft",
      year: 2025,
      featured: true,
      status: "PUBLISHED" as const,
      categoryId: categories["kitchen"],
      images: [K[2], K[3], K[5]],
    },
    {
      title: "Serene Bedroom Retreat",
      slug: "serene-bedroom-retreat",
      summary: "A primary suite designed entirely around rest — texture over trend.",
      description:
        "This primary suite strips back visual noise in favor of texture, tone and quiet luxury — a plaster-finished headboard wall, considered lighting layers, and a palette drawn from raw linen and warm stone.",
      coverImage: B[2],
      location: "Charleston, SC",
      area: "420 sq ft",
      year: 2024,
      featured: true,
      status: "PUBLISHED" as const,
      categoryId: categories["bedroom"],
      images: [B[2], B[4], B[6]],
    },
    {
      title: "Marble & Light Bath",
      slug: "marble-and-light-bath",
      summary: "A spa-like primary bathroom built on natural stone and soft daylight.",
      description:
        "We transformed a dark, compartmentalized bathroom into an open, light-filled retreat — bookmatched marble, an oversized walk-in shower, and a freestanding tub positioned to catch the morning light.",
      coverImage: BA[2],
      location: "Scottsdale, AZ",
      area: "310 sq ft",
      year: 2024,
      featured: true,
      status: "PUBLISHED" as const,
      categoryId: categories["bathroom"],
      images: [BA[2], BA[3], BA[4]],
    },
    {
      title: "Downtown Loft",
      slug: "downtown-loft",
      summary: "An industrial shell warmed into a considered, art-filled living space.",
      description:
        "This converted downtown loft needed warmth without losing its industrial bones. We introduced soft furnishing, layered lighting and a curated furniture mix that lets the original architecture and the client's art collection both breathe.",
      coverImage: LR[4],
      location: "Chicago, IL",
      area: "1,200 sq ft",
      year: 2025,
      featured: false,
      status: "PUBLISHED" as const,
      categoryId: categories["living-room"],
      images: [LR[4], LR[7], LR[9]],
    },
    {
      title: "Coastal Kitchen Refresh",
      slug: "coastal-kitchen-refresh",
      summary: "A breezy, sun-washed kitchen renovation just steps from the shoreline.",
      description:
        "A full renovation for a coastal family home — pale oak cabinetry, honed limestone counters and generous storage designed for a household that lives half its life outdoors.",
      coverImage: K[4],
      location: "Newport, RI",
      area: "410 sq ft",
      year: 2024,
      featured: false,
      status: "PUBLISHED" as const,
      categoryId: categories["kitchen"],
      images: [K[4], K[6], K[7]],
    },
    {
      title: "Minimalist Master Suite",
      slug: "minimalist-master-suite",
      summary: "A restrained, gallery-like primary suite for a couple who collects contemporary art.",
      description:
        "Designed for clients who wanted their art collection to lead, this suite pares everything else back — a neutral material palette, hidden storage, and a lighting plan built to properly showcase the work on the walls.",
      coverImage: B[5],
      location: "Denver, CO",
      area: "500 sq ft",
      year: 2025,
      featured: false,
      status: "PUBLISHED" as const,
      categoryId: categories["bedroom"],
      images: [B[5], B[3], B[7]],
    },
    {
      title: "The Hampton Living Room",
      slug: "the-hampton-living-room",
      summary: "A classic, coastal-inflected living room built for entertaining year-round.",
      description:
        "A refresh of a traditional Hampton-style living room — updated proportions, a warmer neutral palette, and furniture chosen to hold up to a household that entertains constantly.",
      coverImage: LR[10],
      location: "East Hampton, NY",
      area: "620 sq ft",
      year: 2024,
      featured: false,
      status: "PUBLISHED" as const,
      categoryId: categories["living-room"],
      images: [LR[10], LR[5], LR[8]],
    },
  ];

  for (const p of projects) {
    const { images, ...data } = p;
    const project = await prisma.project.upsert({
      where: { slug: p.slug },
      update: {},
      create: data,
    });
    const existingImages = await prisma.projectImage.count({ where: { projectId: project.id } });
    if (existingImages === 0) {
      await prisma.projectImage.createMany({
        data: images.map((url, i) => ({ projectId: project.id, url, sortOrder: i })),
      });
    }
  }

  // --- Team ---
  const team = [
    {
      name: "Amara Holt",
      role: "Founder & Principal Designer",
      bio: "Amara founded A&H Interiors in 2013 with a belief that a home should feel considered, not decorated. She leads every project's creative direction.",
      photo: P.woman1,
      sortOrder: 1,
    },
    {
      name: "Julian Hale",
      role: "Co-Founder & Head of Renovations",
      bio: "Julian oversees every build, translating design intent into flawless on-site execution across the studio's renovation projects.",
      photo: P.man1,
      sortOrder: 2,
    },
    {
      name: "Priya Desai",
      role: "Senior Interior Designer",
      bio: "Priya leads residential design with a focus on material storytelling and layered, livable spaces.",
      photo: P.woman2,
      sortOrder: 3,
    },
    {
      name: "Marcus Lin",
      role: "Design Associate",
      bio: "Marcus supports space planning and furniture curation, with a sharp eye for proportion and detail.",
      photo: P.man3,
      sortOrder: 4,
    },
  ];

  for (const t of team) {
    const exists = await prisma.teamMember.findFirst({ where: { name: t.name } });
    if (!exists) await prisma.teamMember.create({ data: t });
  }

  // --- Testimonials ---
  const testimonials = [
    {
      clientName: "Sarah Whitfield",
      role: "Willow Residence",
      message:
        "A&H Interiors understood exactly how our family lives. The living room feels effortless now — warm, calm, and somehow still practical for two kids and a dog.",
      avatar: P.woman3,
      rating: 5,
      featured: true,
    },
    {
      clientName: "David Ochoa",
      role: "Maple Grove Kitchen",
      message:
        "The renovation process was seamless from start to finish. Julian's team kept us informed every step of the way, and the finished kitchen exceeded what we imagined.",
      avatar: P.man2,
      rating: 5,
      featured: true,
    },
    {
      clientName: "Elena Marchetti",
      role: "Serene Bedroom Retreat",
      message:
        "Amara has an incredible gift for restraint. Our bedroom feels like a hotel suite, but it still feels like us. I look forward to that room every single night.",
      avatar: P.woman4,
      rating: 5,
      featured: true,
    },
    {
      clientName: "Thomas Reyes",
      role: "Downtown Loft",
      message:
        "We interviewed four design studios before choosing A&H. In hindsight it wasn't close — their attention to detail and communication set them apart immediately.",
      avatar: P.man3,
      rating: 5,
      featured: false,
    },
    {
      clientName: "Grace Kim",
      role: "Coastal Kitchen Refresh",
      message:
        "Priya's material choices were spot on from the first presentation. The kitchen feels exactly like the coastal, sun-washed space we described in our very first call.",
      avatar: P.woman5,
      rating: 5,
      featured: false,
    },
  ];

  for (const t of testimonials) {
    const exists = await prisma.testimonial.findFirst({ where: { clientName: t.clientName } });
    if (!exists) await prisma.testimonial.create({ data: t });
  }

  // --- Blog ---
  const blogPosts = [
    {
      title: "Five Principles Behind Every A&H Interior",
      slug: "five-principles-behind-every-ah-interior",
      excerpt:
        "The quiet rules we return to on every project — from material honesty to designing for how a room is actually used.",
      content:
        "<p>Every project we take on is shaped by the same handful of principles. They rarely show up as a mood board slide, but they're present in every material decision we make.</p><h2>1. Material honesty</h2><p>We favor materials that age well and tell the truth about what they are — oak instead of oak-look laminate, plaster instead of textured wallpaper.</p><h2>2. Design for the Tuesday, not the party</h2><p>A room has to work on an ordinary Tuesday evening, not just when it's styled for photographs.</p><h2>3. Light first, furniture second</h2><p>We plan lighting layers before we ever choose a sofa. It changes everything about how a room feels after dark.</p>",
      coverImage: LR[3],
      status: "PUBLISHED" as const,
      publishedAt: new Date("2026-06-12"),
    },
    {
      title: "How to Layer Lighting Like a Designer",
      slug: "how-to-layer-lighting-like-a-designer",
      excerpt:
        "Ambient, task and accent lighting — the three-layer approach we use on every project, explained simply.",
      content:
        "<p>Good lighting design is invisible when it's done right. Here's the three-layer framework we use on every project.</p><h2>Ambient</h2><p>Your base layer — general illumination that fills the room evenly.</p><h2>Task</h2><p>Focused light where you actually need to see clearly: reading, cooking, working.</p><h2>Accent</h2><p>The layer that adds drama — picture lights, uplighting on plants, a statement pendant.</p>",
      coverImage: B[1],
      status: "PUBLISHED" as const,
      publishedAt: new Date("2026-05-02"),
    },
    {
      title: "Inside the Maple Grove Kitchen Renovation",
      slug: "inside-the-maple-grove-kitchen-renovation",
      excerpt: "A behind-the-scenes look at the decisions — and a few compromises — behind this full kitchen rebuild.",
      content:
        "<p>Every renovation involves trade-offs. Here's an honest look at the choices we made on Maple Grove, including the ones we debated the longest.</p><h2>The layout</h2><p>We removed a load-bearing wall to open the kitchen to the dining space, which meant an early structural conversation with our engineer.</p><h2>The island</h2><p>Book-matched marble was a splurge the clients almost cut — they now say it's their favorite decision in the whole house.</p>",
      coverImage: K[1],
      status: "PUBLISHED" as const,
      publishedAt: new Date("2026-03-20"),
    },
    {
      title: "Choosing a Palette That Ages Well",
      slug: "choosing-a-palette-that-ages-well",
      excerpt: "Why we build every project around a warm neutral base — and how to avoid a palette that feels dated in five years.",
      content:
        "<p>Trend-driven color choices are the fastest way to date a room. Here's how we approach palette instead.</p><h2>Start with what won't change</h2><p>Flooring, stone, and cabinetry are expensive to redo — anchor your palette there first.</p><h2>Let fabric and paint do the trend work</h2><p>Cushions, art, and paint are cheap to refresh — that's where seasonal color belongs.</p>",
      coverImage: LR[8],
      status: "DRAFT" as const,
      publishedAt: null,
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({ where: { slug: post.slug }, update: {}, create: post });
  }

  // --- Site settings ---
  await prisma.siteSetting.upsert({
    where: { key: "companyPhone" },
    update: {},
    create: { key: "companyPhone", value: "+1 (512) 555-0148" },
  });
  await prisma.siteSetting.upsert({
    where: { key: "companyEmail" },
    update: {},
    create: { key: "companyEmail", value: "hello@ahinteriors.com" },
  });
  await prisma.siteSetting.upsert({
    where: { key: "companyAddress" },
    update: {},
    create: { key: "companyAddress", value: "412 Congress Ave, Suite 300, Austin, TX 78701" },
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
