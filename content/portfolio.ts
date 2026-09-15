import type { PortfolioEntry, WorkGroup, WorkGroupSpec } from "./types";
import { INLINE_LINK_SEPARATOR } from "./types";

export const projects = [
  {
    id: "pocket-analyst",
    title: "Pocket Analytics",
    seoName: "Pocket Analytics",
    primaryUrl: "https://sexypa.raashishah.com",
    seoDescription:
      "Analytics for traditional business owners, inside GPT — financial intelligence from Tally data via ChatGPT MCP.",
    seoLongDetail:
      "Building Pocket Analytics for traditional business owners who run on Tally and spreadsheets. Lives inside GPT via MCP at sexypa.raashishah.com; warehouse trial-balance data in Supabase.",
    paragraphs: [
      {
        text: "Analytics for traditional business owners, inside GPT",
        pullquote: true,
      },
    ],
  },
  {
    id: "astrothunder",
    title: "Vedic Astrology Agent",
    seoName: "Astrothunder",
    primaryUrl: "https://astrothunder.life",
    seoDescription:
      "Vedic astrology engine that starts from a full birth chart and an exact question, then shows supporting and conflicting evidence across classical schools.",
    seoLongDetail:
      "Building Astrothunder as show-your-work Vedic astrology. Starts from a full birth chart and the exact question, then compares Parashara, Jaimini, and KP before showing what supports the answer, what conflicts, and how sure it is. Chart engines and a question compiler sit on structured classical texts ingested from scanned sources. Live at astrothunder.life.",
    paragraphs: [
      [
        {
          text: "Astrothunder",
          href: "https://astrothunder.life",
        },
      ],
    ],
  },
  {
    id: "admissions-agent",
    title: "Academic Agent Harness",
    seoName: "Admission Evaluation Agent",
    primaryUrl: "https://admissions.raashishah.com",
    seoDescription:
      "Enterprise admissions QA agent grading applicants against custom rubrics; 4,000+ student profiles processed with RAG, telemetry, and Google ADK (Enterprise) at roughly fifteen cents per student.",
    seoLongDetail:
      "Academic institutions process thousands of applications across months and multiple reviewers. Built an admissions QA agent used by a school to grade applicants against custom rubrics, processing 4,000+ student profiles. Standardizes enterprise-grade agents that fit into existing pipelines with RAG for data lookups, agent performance and cost telemetry (approximately fifteen cents per student), and Google ADK (Enterprise) integration.",
    paragraphs: [
      [
        {
          text: "Admissions cycle",
          href: "https://admissions.raashishah.com",
        },
      ],
      {
        text: "Made with Google ADK",
        pullquote: true,
      },
    ],
  },
  {
    id: "pink-depot",
    title: "Inventory for small businesses",
    seoName: "Pink Depot",
    primaryUrl: "https://pinkdepot.raashishah.com",
    seoDescription:
      "iPad-first inventory and order-costing app for small businesses that buy materials, make products, and track stock, cost, and profit.",
    seoLongDetail:
      "Built an iPad-first inventory and order-costing app for maker businesses (gift, fashion, cloud kitchen). Tracks materials, products with ingredient lists, client orders with auto stock deduction, vendors, and monthly profit without spreadsheets. Next.js on Vercel with Supabase auth and Postgres RLS; live at pinkdepot.raashishah.com.",
    paragraphs: [
      [
        {
          text: "Pink Depot",
          href: "https://pinkdepot.raashishah.com",
        },
      ],
    ],
  },
  {
    id: "agentic-workflows",
    title: "Skills",
    seoName: "Skills",
    seoDescription:
      "Public Cursor and Codex skills — Apple HIG for React chrome and User Call for interview transcription and product insight synthesis.",
    seoLongDetail:
      "Open-sourced agent skills installable from GitHub: Apple HIG (/hig) designs and implements React web app structure and chrome from Human Interface Guidelines with hard FAIL grammar; User Call transcribes Hinglish interview recordings locally and pressure-tests product insights with the office-hours diagnostic. GitHub repo per skill — npx skills add or clone to ~/.cursor/skills/.",
    paragraphs: [
      [
        {
          text: "Apple HIG",
          href: "https://github.com/raashishah/apple-hig",
        },
        INLINE_LINK_SEPARATOR,
        {
          text: "User Call",
          href: "https://github.com/raashishah/user-call",
        },
      ],
    ],
  },
  {
    id: "expression",
    title: "Pro Animation Tool",
    seoName: "Expression",
    primaryUrl: "https://raashishah.com/expression",
    seoDescription:
      "Animation agent that auto-colours 1,500-frame hand-drawn sequences from PNG line art with 1:1 parsing fidelity and full artist control.",
    seoLongDetail:
      "Building an animation agent for colouring sequences with 1,500 frames drawn manually by artists. Solved a PNG-to-Python parsing problem that preserves 1:1 fidelity with artist line art — compatible with any drawing software. Expression automates repetitive frame-by-frame coloring while artists retain full creative control.",
    paragraphs: [
      [
        {
          text: "Colouring for hand-drawn animation",
          href: "/expression",
        },
      ],
      {
        text: "Unsolved problem worldwide",
        pullquote: true,
      },
    ],
  },
  {
    id: "offline-expo-nav",
    title: "Expo map and website",
    seoName: "Expo map and website",
    primaryUrl: "https://povindex.designpovindia.com/home",
    seoDescription:
      "Offline-capable exhibition navigation web app built for high footfall environments.",
    seoLongDetail:
      "Web application for exhibition wayfinding that remains usable offline regardless of venue footfall or connectivity.",
    paragraphs: [
      {
        text: [
          {
            text: "Offline access for high footfall venues",
            href: "https://povindex.designpovindia.com/home",
          },
        ],
        pullquote: true,
      },
    ],
  },
] as const satisfies ReadonlyArray<PortfolioEntry>;

export const workExperience = [
  {
    id: "pluto",
    title: "Working with Artists",
    seoName: "Pluto",
    seoPeriod: "2021–2024",
    seoDescription:
      "Head of Product and Tech; launched Magic Batch, Pluto, and Create Layer; 27% sales growth YoY via cross-platform payments and 82% retention lift.",
    seoLongDetail:
      "Collaborated with artists and transformed a creative studio into a product- and technology-led organization. Launched Magic Batch (MVP), Pluto (cross-platform payments driving 27% sales growth YoY; 82% retention lift via A/B-tested incentives), and Create Layer (500+ users, 5,000+ assets in ten days). Owned end-to-end product delivery across 20+ cross-functional contributors.",
    paragraphs: [
      [
        {
          text: "Pluto",
          href: "https://medium.com/pluto-misfits/introducing-interoperable-nft-minting-67f3af6d0f94",
        },
        INLINE_LINK_SEPARATOR,
        { text: "Magic Batch", href: "https://opensea.io/collection/magicbatch" },
        INLINE_LINK_SEPARATOR,
        {
          text: "Create",
          href: "https://x.com/createlayer/status/1805623167538340046/video/1",
        },
      ],
      {
        text: "Transformed a creative studio into a product-led team",
        pullquote: true,
      },
    ],
  },
  {
    id: "ondevice",
    title: "On-device AI Agent",
    seoName: "OnDevice",
    seoPeriod: "2025",
    seoDescription:
      "Co-founder and product lead for a privacy-first type II diabetes health app with on-device inference; 42% faster task completion and 200+ personalized actions.",
    seoLongDetail:
      "Co-founded and led product for a privacy-first type II diabetes health app using on-device inference. Led 30 interviews and 10 surveys to define privacy-by-default UX, reducing cognitive load and accelerating task completion by 42%. Defined agentic on-device flows enabling 200+ personalized user actions. Early GTM via applied AI content on Twitter and YouTube with 4,000+ pre-launch views.",
    paragraphs: [
      [{ text: "Health App", href: "/ondevice" }],
      {
        text: "Type II diabetes mgmt",
        pullquote: true,
      },
    ],
  },
  {
    id: "kawa-space",
    title: "Geospatial Machine Learning",
    seoName: "Kawa Space",
    seoPeriod: "2020",
    seoDescription:
      "Six geospatial ML use cases and an NLP chatbot unlocking non-technical access to datasets (pre-GPT-3).",
    seoLongDetail:
      "Delivered 6 ML use cases by recruiting a cross-functional team of 5 engineers and data scientists. Geospatial ML for agriculture, rainfall, and population density. Built an NLP-powered chatbot so non-technical users could query datasets in natural language before GPT-3 era tooling.",
    paragraphs: [
      [{ text: "Kawa Space", href: "https://www.kawaspace.com" }],
      {
        text: "Chatbot for model inferences",
        pullquote: true,
      },
      {
        text: "Built pre-GPT 3",
        pullquote: true,
      },
    ],
  },
  {
    id: "aula-education",
    title: "Doubled Engineering Speed",
    seoName: "Aula Education",
    seoPeriod: "2018–2019, UK",
    seoDescription:
      "Customer success and analytics in UK higher ed; improved retention from 9.2% to 32%.",
    seoLongDetail:
      "Doubled engineering delivery speed via agile workflow changes with VP of Product. Led customer success analytics across UK and US universities. Improved retention from 9.2% to 32% with a combined qualitative and quantitative analytics toolkit.",
    paragraphs: [
      [{ text: "Aula Education, UK, US", href: "https://www.aula.education" }],
      {
        text: "Optimised workflows with feedback",
        pullquote: true,
      },
    ],
  },
] as const satisfies ReadonlyArray<PortfolioEntry>;

export const workGroupSpecs = [
  {
    id: "agents",
    label: "Agents",
    itemIds: [
      "pocket-analyst",
      "astrothunder",
      "admissions-agent",
      "agentic-workflows",
      "ondevice",
    ],
  },
  {
    id: "machine-learning",
    label: "Machine Learning",
    itemIds: ["expression", "kawa-space"],
  },
  {
    id: "web-apps",
    label: "Web apps",
    itemIds: ["offline-expo-nav", "pink-depot"],
  },
  {
    id: "product-management",
    label: "Product Management",
    itemIds: ["pluto", "aula-education"],
  },
] as const satisfies ReadonlyArray<WorkGroupSpec>;

export function resolveWorkGroups(
  projectItems: readonly PortfolioEntry[] = projects,
  jobItems: readonly PortfolioEntry[] = workExperience,
): readonly WorkGroup[] {
  const catalog = [...projectItems, ...jobItems];

  return workGroupSpecs.map((group) => ({
    id: group.id,
    label: group.label,
    items: group.itemIds.map((itemId) => {
      const item = catalog.find((entry) => entry.id === itemId);
      if (!item) {
        throw new Error(`Unknown portfolio entry in work group ${group.id}: ${itemId}`);
      }
      return item;
    }),
  }));
}

