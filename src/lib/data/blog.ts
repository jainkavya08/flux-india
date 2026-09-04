export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  summary: string;
  heroImage: string;
  tags: string[];
  content: {
    heading: string;
    paragraphs: string[];
    callout?: string;
  }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "sld-cross-referencing-guide",
    title: "How Electrical Engineers Cross-Reference Multi-Vendor Single Line Diagrams (SLDs)",
    category: "Engineering Best Practices",
    date: "August 18, 2026",
    readTime: "6 min read",
    author: {
      name: "Rajesh Kulkarni",
      role: "Chief Application Engineer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    },
    summary: "A practical guide to replacing long-lead OEM panel components and controllers with pin-compatible, type-tested alternatives without altering panel layout certifications.",
    heroImage: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1200&auto=format&fit=crop",
    tags: ["SLD", "Distribution Boxes", "Cross-Referencing", "Panel Building", "OEM Sourcing"],
    content: [
      {
        heading: "The Challenge of Fragmented OEM Lead Times",
        paragraphs: [
          "Panel builders in India regularly encounter situations where a specified MCCB or contactor has a 16-to-24 week delivery lead time. Halting panel fabrication risks substantial project liquidated damages.",
          "Cross-referencing requires more than matching ampacity and voltage. Application engineers must verify Icu breaking capacity, terminal connection geometries, auxiliary contact configurations, and thermal dissipation derating factors.",
        ],
        callout: "Always verify the Ics (Service Breaking Capacity) rating as a percentage of Icu (Ultimate Breaking Capacity) when cross-referencing MCCBs across Tier-1 manufacturers.",
      },
      {
        heading: "Step-by-Step Electrical Cross-Validation",
        paragraphs: [
          "1. **Busbar Alignment**: Verify whether the terminal spacing allows direct connection without bending existing copper busbar links.",
          "2. **Release Curve Matching**: Ensure the thermal-magnetic or electronic trip unit (LSI vs LSIG) curves match the upstream protection coordination study.",
          "3. **Control Voltage Compatibility**: Check coil pickup/dropout voltages on contactors, particularly on DC control circuits where voltage dips occur.",
        ],
      },
    ],
  },
  {
    slug: "iec-61439-panel-standards-india",
    title: "Demystifying IEC 61439 Type-Testing Standards for Indian Panel Builders",
    category: "Standards & Compliance",
    date: "July 29, 2026",
    readTime: "8 min read",
    author: {
      name: "Anita Deshmukh",
      role: "Compliance & QA Director",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    },
    summary: "Everything you need to know about IEC 61439-1/2 compliance, temperature rise verification, short-circuit withstand testing, and Form 1 to Form 4b separation.",
    heroImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop",
    tags: ["IEC 61439", "Switchboards", "Form 4b", "Testing", "Safety"],
    content: [
      {
        heading: "Transition from IEC 60439 (TTA/PTTA) to IEC 61439",
        paragraphs: [
          "The obsolete IEC 60439 standard allowed Partially Type Tested Assemblies (PTTA) with subjective assessments. The current IEC 61439 standard replaces this with mandatory Design Verification through testing, comparison with reference designs, or structured calculations.",
        ],
        callout: "Under IEC 61439, both the Original Manufacturer (system designer) and the Assembly Manufacturer (panel builder) share rigorous quality documentation responsibilities.",
      },
      {
        heading: "Understanding Internal Separation: Form 1 to Form 4b",
        paragraphs: [
          "Form of internal separation defines physical barriers between busbars, functional units (breakers/starters), and external outgoing terminals. Form 4b provides the highest level of operator protection during maintenance on live adjacent feeder compartments.",
        ],
      },
    ],
  },
  {
    slug: "vfd-energy-savings-industrial-motors",
    title: "Optimizing Motor Protection Relays & Automation for 30%+ Motor Energy Reduction",
    category: "Industrial Automation",
    date: "June 14, 2026",
    readTime: "5 min read",
    author: {
      name: "Siddharth Rao",
      role: "Motion & Drives Specialist",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    },
    summary: "How quadratic affinity laws in centrifugal pumps and fans generate exponential power savings with correctly tuned automation and control algorithms.",
    heroImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop",
    tags: ["Relays", "Energy Efficiency", "Motors", "Automation", "Sustainability"],
    content: [
      {
        heading: "The Physics of Affinity Laws in Fluid Machinery",
        paragraphs: [
          "Centrifugal pumps, blowers, and cooling tower fans obey affinity laws: power consumption is proportional to the cube of rotational speed (P ∝ N³). Reducing motor speed by just 20% drops electrical power demand by nearly 50%.",
        ],
        callout: "A 20% reduction in motor RPM yields up to 48.8% reduction in required motor kW power consumption.",
      },
    ],
  },
  {
    slug: "plc-migration-legacy-modern",
    title: "Step-by-Step PLC & HMI Modernization Without Assembly Line Downtime",
    category: "Automation Systems",
    date: "May 22, 2026",
    readTime: "7 min read",
    author: {
      name: "Rajesh Kulkarni",
      role: "Chief Application Engineer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    },
    summary: "Proven strategies for migrating end-of-life PLCs to modern industrial Ethernet controllers using swing-arm I/O wiring adapters and parallel shadow testing.",
    heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    tags: ["PLC", "HMI", "Modernization", "IIoT", "Smart Manufacturing"],
    content: [
      {
        heading: "Zero-Downtime Migration Architecture",
        paragraphs: [
          "Rewiring thousands of field I/O terminations during a weekend changeover is high-risk. Modern migration kits utilize direct pre-wired cable harnesses connecting legacy terminal arms to modern high-density I/O modules in minutes.",
        ],
      },
    ],
  },
];
