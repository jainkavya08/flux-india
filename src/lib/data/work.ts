import { SOLUTIONS_DATA, SolutionItem } from "./solutions";

export interface WorkProject {
  slug: string;
  title: string;
  category: string;
  clientType: string;
  location: string;
  summary: string;
  heroImage: string;
  metrics: { label: string; value: string }[];
  challenge: string;
  solution: string;
  componentsBOM: { category: string; brand: string; rating: string }[];
  architectureDiagram: string;
  galleryImages: string[];
}

export const WORK_PROJECTS: WorkProject[] = [
  {
    slug: "solar-renewables",
    title: "Solar & Renewable Power Grid Integration",
    category: "Clean Energy Infrastructure",
    clientType: "Utility-Scale Solar EPC",
    location: "Rajasthan & Gujarat Solar Parks",
    summary: "1500V DC disconnects, smart string combiner telemetry & utility-scale SCADA power management for 350+ MW solar installations.",
    heroImage: "https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=1200&auto=format&fit=crop",
    metrics: [
      { label: "Megawatts Integrated", value: "350+ MW" },
      { label: "Uptime Reliability", value: "99.98%" },
      { label: "Fault Response", value: "< 100ms" },
    ],
    challenge: "Extreme desert temperatures exceeding 55°C causing thermal derating and dangerous DC arc flash hazards across 1500V DC collector arrays.",
    solution: "FLUX engineered customized Type 1+2 surge protection, gPV-rated solar string fuses, and IP66 polycarbonate combiner enclosures with Modbus-RTU telemetry.",
    componentsBOM: [
      { category: "DC Disconnects", brand: "Schneider Electric / ABB", rating: "1500V DC / 250A" },
      { category: "Solar Fuses", brand: "Bussmann / Mersen", rating: "1500V DC gPV 30A" },
      { category: "Surge Protection", brand: "Phoenix Contact", rating: "Type 1+2 DC SPD" },
      { category: "String Monitoring", brand: "FLUX Smart Telemetry", rating: "16-Channel Modbus" },
    ],
    architectureDiagram: "1500V DC PV Strings → Smart Combiner Boxes → 3.125MVA Inverter Stations → 33kV Step-Up Switchgear → SCADA Telemetry Gateway",
    galleryImages: [
      "https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    slug: "ev-infrastructure",
    title: "EV Fast Charging Hubs & Fleet Depots",
    category: "E-Mobility & Charging",
    clientType: "Commercial Fleet Operator & CPO",
    location: "Mumbai-Pune Expressway & Delhi NCR",
    summary: "High-power 240kW dual-gun DC fast chargers with Type-B RCD isolation, dynamic load balancing, and automated billing telemetry.",
    heroImage: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1200&auto=format&fit=crop",
    metrics: [
      { label: "Stations Deployed", value: "48 Hubs" },
      { label: "Peak Power Rating", value: "240 kW DC" },
      { label: "Safety Compliance", value: "IEC 61851" },
    ],
    challenge: "Managing massive instantaneous grid power spikes from commercial bus fleets while ensuring sub-cycle earth leakage protection under heavy moisture.",
    solution: "Consolidated high-power DC contactors, ultra-fast semiconductor fuses, Type-B RCD leakage detection, and dynamic OCPP 2.0.1 smart load balancing controllers.",
    componentsBOM: [
      { category: "DC Contactors", brand: "Gigavac / Albright", rating: "1000V DC / 400A" },
      { category: "Earth Leakage RCD", brand: "Doepke / ABB", rating: "Type-B 30mA DC" },
      { category: "Power Metering", brand: "Socomec / Schneider", rating: "MID Approved DC Meter" },
      { category: "OCPP Gateway", brand: "Advantech", rating: "Industrial Linux Edge 4G" },
    ],
    architectureDiagram: "415V AC Grid Incomer → 250A ACB Isolation → Active PFC Rectifier Stack → 1000V DC Bus → Dual CCS2 Guns (240kW Dynamic)",
    galleryImages: [
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558441719-8b489c638a10?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    slug: "automotive-assembly",
    title: "Automotive Robotics & High-Speed Assembly Line",
    category: "Industrial Robotics",
    clientType: "Tier-1 Auto Component OEM",
    location: "Chakan Industrial Corridor, Pune",
    summary: "Deterministic PROFINET IRT motion control, multi-axis servo drives, and synchronized welding robotic cells.",
    heroImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop",
    metrics: [
      { label: "Line Cycle Time", value: "14.2s" },
      { label: "Scrap Reduction", value: "98.5%" },
      { label: "Synchronized Axes", value: "32 Servos" },
    ],
    challenge: "High mechanical vibration and electrical noise inducing intermittent communication drops on legacy fieldbus lines.",
    solution: "Migrated to deterministic PROFINET fiber rings, optical time-of-flight safety laser scanners, and synchronized 400V multi-axis servo packs with safe torque off (STO).",
    componentsBOM: [
      { category: "Safety PLC", brand: "Siemens", rating: "S7-1500F Fail-Safe" },
      { category: "Servo Drives", brand: "Omron / Delta", rating: "1S Series EtherCAT" },
      { category: "Safety Laser Scanners", brand: "Sick / Keyence", rating: "microScan3 Core" },
      { category: "IP67 IO Blocks", brand: "Turck / Murrelektronik", rating: "M12 PROFINET" },
    ],
    architectureDiagram: "Redundant PLC CPU 1515F → PROFINET MRP Fiber Ring → 6-Axis Welding Robots → Distributed IP67 Safe I/O → Multi-Touch HMI",
    galleryImages: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    slug: "power-distribution",
    title: "Industrial PCC & Distribution Substations",
    category: "High-Voltage Distribution",
    clientType: "Heavy Engineering & Steel Mill",
    location: "Chakan & Talegaon Industrial Area",
    summary: "Form 4b compartmentalized Power Control Centers (PCC) with 6300A Air Circuit Breakers and detuned APFC harmonic capacitor banks.",
    heroImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1200&auto=format&fit=crop",
    metrics: [
      { label: "Switchgear Rating", value: "6300A / 65kA" },
      { label: "Power Factor", value: "0.99 Lag" },
      { label: "Harmonic THDi", value: "< 4.5%" },
    ],
    challenge: "High harmonic distortion (THD > 22%) from DC rectifiers causing transformer overheating and capacitor explosion risks.",
    solution: "Engineered 14% detuned reactor APFC banks, motorized drawout ACBs with micro-processor trip units, and digital multifunction power quality analyzers.",
    componentsBOM: [
      { category: "Air Circuit Breakers", brand: "L&T / Schneider", rating: "6300A 4P 65kA" },
      { category: "APFC Capacitors", brand: "Epcos / Schneider", rating: "50 kVAr Heavy Duty" },
      { category: "Detuned Reactors", brand: "Frako / Epcos", rating: "14% 400V 50Hz" },
      { category: "Power Quality Meter", brand: "Socomec", rating: "Diris A40 Class 0.2s" },
    ],
    architectureDiagram: "11kV Incomer → 2.5MVA Transformer → 4000A Busduct → Form 4b PCC Switchboard → 14% Detuned APFC Panel → Motor Control Centers",
    galleryImages: [
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    slug: "water-process",
    title: "Water Treatment & Pumping SCADA Infrastructure",
    category: "Process Automation",
    clientType: "Municipal Corporation & Industrial Effluent",
    location: "Pimpri-Chinchwad & Pune Municipal Zone",
    summary: "Variable frequency drive pump sequencing, redundant remote telemetry units (RTUs), and 4G cloud SCADA telemetry.",
    heroImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop",
    metrics: [
      { label: "Daily Throughput", value: "120 MLD" },
      { label: "Pumping Energy Saved", value: "28.5%" },
      { label: "Telemetry Uptime", value: "99.95%" },
    ],
    challenge: "Water hammer pressure transients and severe pump cavitations under fluctuating hydraulic supply heads.",
    solution: "Engineered multi-pump cascaded VFD panels with smart pipe fill algorithms, submersible hydrostatic level transmitters, and cellular RTU telemetry.",
    componentsBOM: [
      { category: "VFD Inverters", brand: "Danfoss / ABB", rating: "VLT Aqua / ACS580 110kW" },
      { category: "RTU Controller", brand: "Schneider", rating: "ScadaPack 350E" },
      { category: "Pressure Transmitters", brand: "Danfoss / Wika", rating: "MBS 1900 0-16 bar" },
      { category: "Electromagnetic Flow", brand: "Krohne / Endress+Hauser", rating: "Waterflux 3070 DN300" },
    ],
    architectureDiagram: "Intake Well Pumps (4x110kW VFD) → 120 MLD Rapid Sand Filters → SCADA PLC Network → Chemical Dosing → Chlorination & Distribution",
    galleryImages: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop",
    ],
  },
];
