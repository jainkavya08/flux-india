export interface SolutionItem {
  id: string;
  slug: string;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  impactMetrics: { label: string; value: string }[];
  keyChallenges: string[];
  fluxApproach: string[];
  componentsIncluded: string[];
  architectureSummary: string;
  caseHighlight: {
    clientType: string;
    outcome: string;
    location: string;
  };
}

export const SOLUTIONS_DATA: SolutionItem[] = [
  {
    id: "sol-solar-renewables",
    slug: "solar-renewables",
    title: "Solar & Renewable Power Grid Integration",
    badge: "Clean Energy",
    tagline: "String combiner telemetry, high-voltage isolation & SCADA power management",
    description:
      "Turnkey power component architectures designed to withstand extreme thermal conditions in utility-scale solar parks, rooftop PV arrays, and battery energy storage systems (BESS).",
    impactMetrics: [
      { label: "Uptime Reliability", value: "99.98%" },
      { label: "String Fault Detection", value: "< 100ms" },
      { label: "Worldwide Megawatts Powered", value: "350+ MW" },
    ],
    keyChallenges: [
      "Harsh ambient desert and coastal temperatures exceeding 55°C",
      "DC arc fault risks and high short-circuit currents on 1500V DC strings",
      "Seamless communication across remote kilometer-wide solar fields",
    ],
    fluxApproach: [
      "Solar Tracking PLCs & PACs for optimized energy capture",
      "Robust Distribution Boxes with built-in Hall effect current sensors",
      "Ruggedized outdoor IP66 fiberglass / SS316 enclosures with sunshields",
      "Cable Glands and Flexible Conduits for secure outdoor routing",
    ],
    componentsIncluded: [
      "Solar Tracking PLCs & PACs",
      "Cable Glands & Flexible Conduits",
      "Distribution Boxes",
      "Lugs & Terminals",
      "24V DIN Power Supplies",
    ],
    architectureSummary:
      "PV Array Strings → Smart Combiner Panel → Central Inverter Incomer → Step-up Substation → Cloud SCADA Telemetry.",
    caseHighlight: {
      clientType: "Utility-Scale EPC Developer (Rajasthan Solar Park)",
      outcome: "Delivered 120 custom string monitoring combiner panels with 0% field failure rate during peak summer.",
      location: "Bhadla, Rajasthan",
    },
  },
  {
    id: "sol-ev-infrastructure",
    slug: "ev-charging-infrastructure",
    title: "Smart EV Charging & High-Power DC Sub-Stations",
    badge: "E-Mobility",
    tagline: "60kW to 360kW DC Fast Chargers, OCPP 2.0.1 smart load balancers & metering",
    description:
      "Reliable power distribution, dynamic load management, and safety isolation for commercial fleet depots, highway fast-charging corridors, and residential EV clusters.",
    impactMetrics: [
      { label: "Efficiency Rating", value: "96.5%" },
      { label: "Dynamic Load Balancing", value: "Real-time" },
      { label: "Protection Standard", value: "IEC 61851" },
    ],
    keyChallenges: [
      "Sudden grid inrush currents and transformer overloads during peak fleet charging",
      "DC earth leakage and high-voltage insulation monitoring under humid conditions",
      "Multi-standard connector protocols (CCS2, CHAdeMO, Type-2 AC) integration",
    ],
    fluxApproach: [
      "Dynamic load allocation PLCs adjusting power draw based on real-time grid capacity",
      "Digital Energy Meters and Touchscreen HMIs for precise billing compliance",
      "Robust Distribution Boxes for 500A continuous DC charging cycles",
      "PID Temp Controllers to manage thermal loads in charging systems",
    ],
    componentsIncluded: [
      "Digital Energy Meters",
      "Touchscreen HMIs",
      "Cable Ties (SS & Nylon)",
      "PID Temp Controllers",
      "Distribution Boxes",
    ],
    architectureSummary:
      "Grid Incomer → Active Harmonic Filter → Dynamic Power Matrix Module → Charging Control Panel → CCS2 Liquid Cooled Dispensers.",
    caseHighlight: {
      clientType: "Commercial Fleet Operator (Electric Bus Depot)",
      outcome: "Equipped 24 dual-gun 120kW DC fast chargers with centralized load scheduling, avoiding Rs. 40L transformer upgrade.",
      location: "Pune & Bengaluru Depots",
    },
  },
  {
    id: "sol-automotive-assembly",
    slug: "automotive-robotics",
    title: "Automotive Assembly & Precision Robotic Cells",
    badge: "Smart Factory",
    tagline: "Synchronous multi-axis motion, EtherCAT deterministic control & functional safety",
    description:
      "End-to-end component sourcing and panel engineering for high-speed body-in-white welding lines, powertrain assembly conveyors, and automated optical inspection (AOI) stations.",
    impactMetrics: [
      { label: "Cycle Time Accuracy", value: "±0.02 mm" },
      { label: "Safety Classification", value: "SIL 3 / PLe" },
      { label: "Line Downtime Reduction", value: "32%" },
    ],
    keyChallenges: [
      "Strict zero-downtime tolerance in continuous OEM automotive shifts",
      "High electromagnetic interference (EMI) from spot-welding transformers",
      "Complex multi-vendor safety interlocking across light curtains and interlocks",
    ],
    fluxApproach: [
      "Advanced PLCs & PACs running synchronized automation profiles",
      "Integrated Safety Relays and Motor Protection Relays for safe stops",
      "Shielded EMC cable glands, Flexible Conduits, and Spiral Bands to eliminate noise",
      "Plug-and-play Lugs & Terminals reducing line retooling time",
    ],
    componentsIncluded: [
      "PLCs & PACs",
      "Touchscreen HMIs",
      "Motor Protection Relays",
      "Flexible Conduits",
      "Spiral Bands & Sleeves",
    ],
    architectureSummary:
      "Main Factory SCADA → Profinet Safety Ring → PLC Control Panel → AC Servo Actuators & Robot Interlocks.",
    caseHighlight: {
      clientType: "Tier-1 Automotive Component Manufacturer",
      outcome: "Modernized 6 chassis spot-welding stations with synchronized servo indexing, increasing output by 18%.",
      location: "Chakan Industrial Zone, Pune",
    },
  },
  {
    id: "sol-power-distribution",
    slug: "power-distribution-substations",
    title: "High-Voltage Power Distribution & PCC/MCC Engineering",
    badge: "Power Infrastructure",
    tagline: "Heavy-duty 415V/690V power control centers, APFC harmonic filtration & busducts",
    description:
      "Complete electrical infrastructure solutions for heavy engineering, steel rolling mills, chemical complexes, and data center facilities demanding uninterrupted 24/7 reliability.",
    impactMetrics: [
      { label: "Fault Level Rating", value: "65kA / 1 sec" },
      { label: "Power Factor Correction", value: "0.99 pf" },
      { label: "Thermal Runaway Margin", value: "> 40°C" },
    ],
    keyChallenges: [
      "Massive harmonic distortion caused by variable frequency drives and non-linear loads",
      "Thermal expansion and electro-dynamic stresses on copper busbars during dead-shorts",
      "Seamless auto-synchronization between multiple DG sets and grid incomers",
    ],
    fluxApproach: [
      "Advanced Distribution Boxes and Control Transformers",
      "Digital Energy Meters and Analyzers for near-unity power factor",
      "Microprocessor-based PLCs for rapid < 100ms switchover",
      "Busbar Insulators and robust Lugs & Terminals for heavy duty connections",
    ],
    componentsIncluded: [
      "Busbar Insulators & Supports",
      "Digital Energy Meters",
      "Control Transformers",
      "Lugs & Terminals",
      "Distribution Boxes",
    ],
    architectureSummary:
      "11kV Substation Transformer → Main Control Panel → APFC Capacitor Bank → Motor Control Centers (MCC) → Field Starters.",
    caseHighlight: {
      clientType: "Heavy Forging & Steel Rolling Mill",
      outcome: "Constructed 3200A PCC switchboard with active harmonic filtering, reducing energy demand penalties by Rs. 2.4L / month.",
      location: "Aurangabad MIDC",
    },
  },
  {
    id: "sol-water-process",
    slug: "water-treatment-process",
    title: "Water Treatment, RO Plants & Process SCADA",
    badge: "Process Automation",
    tagline: "Variable flow pressure control, dosing telemetry & remote pumping station SCADA",
    description:
      "Automated control architectures for industrial effluent treatment plants (ETP), municipal water distribution networks, and pharmaceutical purified water systems.",
    impactMetrics: [
      { label: "Energy Savings in Pumps", value: "28%" },
      { label: "Telemetry Range", value: "Cellular 4G" },
      { label: "Water Loss Reduction", value: "45%" },
    ],
    keyChallenges: [
      "Cavitation and destructive water hammer surges during rapid pump stop/start",
      "Corrosive chemical fumes (chlorine, caustic, acids) attacking electrical contacts",
      "Geographically dispersed pumping booster stations with unreliable power grids",
    ],
    fluxApproach: [
      "PLCs & PACs programmed with multi-pump cascade staging and anti-clog torque routines",
      "Conformal-coated 24V DIN Power Supplies and IP66 Distribution Boxes",
      "Motor Protection Relays with remote telemetry and cellular 4G failover",
      "PID Temp Controllers and robust Cable Glands for chemical environments",
    ],
    componentsIncluded: [
      "PLCs & PACs",
      "PID Temp Controllers",
      "Motor Protection Relays",
      "Cable Glands",
      "24V DIN Power Supplies",
    ],
    architectureSummary:
      "Intake Sump → Cascade Pump Control Panel → Filtration & Dosing Skid → Storage Reservoir → City Telemetry SCADA.",
    caseHighlight: {
      clientType: "Municipal Water Supply Undertaking",
      outcome: "Automated 14 booster pumping stations with centralized remote SCADA, cutting maintenance dispatch costs by 60%.",
      location: "Nashik, Maharashtra",
    },
  },
];
