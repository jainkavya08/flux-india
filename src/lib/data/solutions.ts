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
      "1500V DC rated disconnect switches, fuses, and surge arresters (Type 1+2)",
      "Smart string combiner boxes with built-in Hall effect current sensors",
      "Ruggedized outdoor IP66 fiberglass / SS316 enclosures with sunshields",
      "Modbus RTU over RS485 to fiber-optic converters for noise-free SCADA telemetry",
    ],
    componentsIncluded: [
      "1500V DC MCCBs & Isolators",
      "Type 1+2 DC Surge Protection (SPD)",
      "IP66 Polycarbonate Enclosures",
      "Industrial Optical Fiber Media Converters",
      "Solar Tracking PLC Controllers",
    ],
    architectureSummary:
      "PV Array Strings → 1500V String Combiner Panel → Central Inverter Incomer → 33kV Step-up Substation → Cloud SCADA Telemetry.",
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
      "Type B RCDs capable of detecting smooth DC fault currents down to 6mA",
      "High-power contactors rated for 500A continuous DC charging cycles",
      "Industrial HMI touchscreens with MID-certified energy meters for billing compliance",
    ],
    componentsIncluded: [
      "Type B 30mA RCDs",
      "High-Amp DC Contactors",
      "OCPP 2.0.1 Edge Controller",
      "MID Certified Energy Meters",
      "Thermal Monitoring Thermostats",
    ],
    architectureSummary:
      "Grid Incomer → Active Harmonic Filter → Dynamic Power Matrix Module → DC Isolation Contactors → CCS2 Liquid Cooled Dispensers.",
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
      "Deterministic EtherCAT servo drives running synchronized motion profiles",
      "Integrated Safety PLCs with certified safe torque off and safe stop functions",
      "Shielded EMC cable glands, braided trunking, and line filters to eliminate noise",
      "Plug-and-play Push-In terminal blocks reducing line retooling time",
    ],
    componentsIncluded: [
      "EtherCAT Multi-Axis Servo Drives",
      "Safety PLCs & Safety Relays",
      "IP67 Distributed IO Blocks",
      "High-Speed Laser Sensors",
      "EMC Line Reactors & Filters",
    ],
    architectureSummary:
      "Main Factory SCADA → Profinet Safety Ring → Distributed IO Nodes → AC Servo Actuators & Robot Interlocks.",
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
      "Type-tested Form 4b modular compartmentalized switchboards",
      "De-tuned and active harmonic filter capacitor banks for near-unity power factor",
      "Microprocessor-based automatic transfer switches (ATS) with rapid < 100ms switchover",
      "Infrared inspection windows allowing live thermal scanning without door opening",
    ],
    componentsIncluded: [
      "Air Circuit Breakers (ACB) up to 6300A",
      "Heavy Duty Detuned APFC Capacitors",
      "Form 4b Steel Modular Enclosures",
      "Automatic Synchronizing Relays",
      "Digital Multifunction Power Quality Analyzers",
    ],
    architectureSummary:
      "11kV Substation Transformer → 4000A Main PCC Panel → APFC Capacitor Bank → Motor Control Centers (MCC) → Field Starters.",
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
      "VFDs programmed with multi-pump cascade staging and anti-clog torque routines",
      "Conformal-coated circuit boards and SS316 stainless steel IP66 enclosures",
      "Solar-powered remote telemetry units (RTUs) with cellular 4G failover to central cloud",
      "Electromagnetic flowmeters and hydrostatic level transmitters with 4-20mA HART loops",
    ],
    componentsIncluded: [
      "Multi-Pump Cascade VFDs",
      "Hydrostatic Level & Pressure Transmitters",
      "Cellular RTU Gateways",
      "SS316 Anti-Corrosion Enclosures",
      "Industrial pH / Conductivity Analysers",
    ],
    architectureSummary:
      "Intake Sump → Cascade VFD Pump Panel → Filtration & Dosing Skid → Storage Reservoir → City Telemetry SCADA.",
    caseHighlight: {
      clientType: "Municipal Water Supply Undertaking",
      outcome: "Automated 14 booster pumping stations with centralized remote SCADA, cutting maintenance dispatch costs by 60%.",
      location: "Nashik, Maharashtra",
    },
  },
];
