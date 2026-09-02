export interface ProductItem {
  id: string;
  name: string;
  category: "panel-building" | "automation";
  subCategory: string;
  tagline: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  applications: string[];
  oemPartners: string[];
  inStock: boolean;
  popular?: boolean;
}

export const PANEL_BUILDING_CATEGORIES = [
  "All Categories",
  "Switchgear & Protection",
  "Contactors & Starters",
  "Enclosures & Cabinets",
  "Terminal Blocks & Busbars",
  "Power Supplies & Transformers",
  "Cable Management & Accessories",
];

export const AUTOMATION_CATEGORIES = [
  "All Categories",
  "PLCs & Controller Systems",
  "Variable Frequency Drives (VFDs)",
  "HMIs & SCADA Displays",
  "Industrial Sensors & Encoders",
  "Servo & Motion Control",
  "IIoT & Industrial Gateways",
];

export const PANEL_BUILDING_PRODUCTS: ProductItem[] = [
  {
    id: "pb-mccb-air",
    name: "Molded Case & Air Circuit Breakers (MCCB / ACB)",
    category: "panel-building",
    subCategory: "Switchgear & Protection",
    tagline: "Industrial power distribution & fault isolation up to 6300A",
    description:
      "Engineered for heavy-duty main power panels, PCCs, and industrial sub-distribution. Features micro-processor trip units, adjustable overload/short-circuit thresholds, and high breaking capacities up to 100kA.",
    features: [
      "Thermal-magnetic & microprocessor electronic trip releases",
      "Short-circuit breaking capacity from 25kA to 100kA Icu",
      "Available in 3-Pole and 4-Pole configurations",
      "Front-facing rotary operating mechanisms and motorized options",
      "Compliant with IEC 60947-2 and IS/IEC standards",
    ],
    specs: {
      "Rated Current (In)": "16A to 6300A",
      "Rated Voltage (Ue)": "415V / 690V AC, 50/60Hz",
      "Breaking Capacity (Icu)": "Up to 100 kA @ 415V",
      "Poles": "3P / 4P",
      "Standards": "IEC 60947-2, CE, RoHS",
    },
    applications: ["PCC & MCC Panels", "Factory Main Switchboards", "Solar Inverter Combiners", "Heavy Machinery"],
    oemPartners: ["Schneider Electric", "Siemens", "L&T", "ABB"],
    inStock: true,
    popular: true,
  },
  {
    id: "pb-mcb-rcbo",
    name: "Miniature Circuit Breakers & RCBOs (MCB / RCCB)",
    category: "panel-building",
    subCategory: "Switchgear & Protection",
    tagline: "Precision feeder protection and personnel residual-current safety",
    description:
      "Compact DIN-rail circuit protection engineered with B, C, and D trip curves for motor circuits, inductive loads, and general control distribution.",
    features: [
      "10kA high breaking capacity standard",
      "Bi-connect terminals for busbar and cable connection",
      "True contact position indicator window",
      "Sensitivity options: 30mA (life safety), 100mA, 300mA",
    ],
    specs: {
      "Rated Current": "0.5A to 63A",
      "Tripping Curves": "B, C, D Characteristics",
      "Breaking Capacity": "10 kA (IEC 60898-1)",
      "Mounting": "Standard 35mm DIN Rail",
    },
    applications: ["Control Panels", "Distribution Boards", "Lighting Control", "UPS Outputs"],
    oemPartners: ["Schneider Electric", "Siemens", "Hager", "Legrand"],
    inStock: true,
  },
  {
    id: "pb-contactors-relays",
    name: "Magnetic Contactors & Thermal Overload Relays",
    category: "panel-building",
    subCategory: "Contactors & Starters",
    tagline: "Heavy-duty motor switching with AC-3 / AC-4 endurance",
    description:
      "Robust magnetic contactors paired with differential overload protection designed for continuous industrial motor starting, DOL, Star-Delta, and reversing applications.",
    features: [
      "AC and DC coil voltages with wide operating tolerance (24V to 415V)",
      "Built-in 1NO+1NC auxiliary contacts, expandable with clip-on blocks",
      "Class 10 and Class 20 thermal overload tripping protection",
      "Mechanically interlocked assemblies for reversing drives",
    ],
    specs: {
      "Power Rating (AC-3)": "9A (4kW) to 800A (450kW)",
      "Coil Voltages": "24V DC, 110V AC, 230V AC, 415V AC",
      "Mechanical Life": "10+ Million Operations",
      "Auxiliary Contacts": "Standard 1NO+1NC up to 4NO+4NC",
    },
    applications: ["Motor Control Centers (MCC)", "Pump Starters", "Compressor Panels", "HVAC Chiller Controls"],
    oemPartners: ["Siemens", "Schneider Electric", "L&T", "Eaton"],
    inStock: true,
    popular: true,
  },
  {
    id: "pb-soft-starters",
    name: "Solid State Soft Starters & Bypass Units",
    category: "panel-building",
    subCategory: "Contactors & Starters",
    tagline: "Smooth torque acceleration & mechanical stress reduction",
    description:
      "Advanced 3-phase thyristor soft starters with integrated bypass contactors, reducing motor starting current spikes and water hammer effects in pumps.",
    features: [
      "Smooth ramp-up and ramp-down torque control",
      "Integrated internal bypass contactor for minimal heat dissipation",
      "Comprehensive electronic motor protection against phase loss and overload",
      "Modbus RTU communication interface for telemetry",
    ],
    specs: {
      "Motor Ratings": "5.5 kW to 315 kW @ 415V",
      "Control Voltage": "100-240V AC or 24V DC",
      "Bypass": "Integrated internal bypass",
      "Protection": "Phase imbalance, Underload, Stall",
    },
    applications: ["Centrifugal Pumps", "Industrial Blowers", "Conveyors", "Crushers & Mills"],
    oemPartners: ["ABB", "Danfoss", "Siemens", "Schneider Electric"],
    inStock: true,
  },
  {
    id: "pb-enclosures-modular",
    name: "Modular Floor-Standing & Wall-Mount Enclosures",
    category: "panel-building",
    subCategory: "Enclosures & Cabinets",
    tagline: "IP55 / IP66 rated sheet steel & stainless steel enclosures",
    description:
      "Precision-welded and modular bolt-together structural enclosures designed for harsh industrial environments, offering superior EMC shielding and thermal management.",
    features: [
      "Rigid multi-folded steel profile frames with high load capacity",
      "Seamless polyurethane foam-in-place sealing gaskets",
      "Corrosion-resistant epoxy polyester powder coating (RAL 7035)",
      "Reversible doors with 130° / 180° hinges and 4-point rod latches",
    ],
    specs: {
      "IP Rating": "IP55, IP65, IP66 (IK10 Impact Resistance)",
      "Sheet Thickness": "1.5mm - 2.0mm CRCA / SS 304 / SS 316",
      "Finish": "Textured Powder Coat RAL 7035",
      "Dimensions": "Custom & Standard sizes from 300x200 to 2200x1200mm",
    },
    applications: ["Industrial Control Panels", "Outdoor Solar Inverter Panels", "Pharma SS Enclosures", "MCC / PCC"],
    oemPartners: ["Rittal", "Eldon / nVent", "BCH", "Fibox"],
    inStock: true,
    popular: true,
  },
  {
    id: "pb-terminals-busbar",
    name: "Push-In Terminal Blocks & Insulated Busbars",
    category: "panel-building",
    subCategory: "Terminal Blocks & Busbars",
    tagline: "Vibration-proof wiring and high-current power distribution",
    description:
      "Tool-free push-in spring connection terminal blocks, multi-level sensor blocks, and tinned electrolytic copper busbar distribution assemblies.",
    features: [
      "50% reduced wiring time with Push-in Connection (PT) technology",
      "Vibration-proof spring steel clamp with copper current bar",
      "UL94 V-0 flame retardant Polyamide housing",
      "Standard test tap access on every connection level",
    ],
    specs: {
      "Wire Gauge Capacity": "0.14 mm² to 95 mm²",
      "Rated Voltage / Current": "1000V / up to 232A",
      "Busbar Ampacity": "Up to 4000A Electrolytic Tinned Copper",
      "Mounting": "DIN Rail NS 35/7.5 & NS 35/15",
    },
    applications: ["Panel Internal Wiring", "Field Cable Marshaling", "Power Distribution Busways", "PLC I/O Racks"],
    oemPartners: ["Phoenix Contact", "WAGO", "Weidmüller", "Connectwell"],
    inStock: true,
  },
  {
    id: "pb-din-power-supplies",
    name: "Industrial DIN Rail Power Supplies & Redundancy Modules",
    category: "panel-building",
    subCategory: "Power Supplies & Transformers",
    tagline: "Ultra-compact 24V DC power with >95% efficiency",
    description:
      "High-reliability regulated switched-mode power supplies (SMPS) with power boost reserves, active PFC, and N+1 active redundancy diode modules.",
    features: [
      "Wide AC input range: 85V to 264V AC with active Power Factor Correction",
      "150% Power Boost for 5 seconds for inductive motor inrush",
      "Ultra-slim metal casing with convective cooling (no fan required)",
      "DC-OK dry relay contact output for PLC monitoring",
    ],
    specs: {
      "Output Voltages": "12V DC, 24V DC, 48V DC",
      "Current Output": "2.5A, 5A, 10A, 20A, 40A",
      "Efficiency": "Up to 95.6%",
      "Operating Temp": "-25°C to +70°C without derating",
    },
    applications: ["PLC & HMI Power", "Instrumentation Loops", "Sensors & Solenoids", "Critical Telemetry"],
    oemPartners: ["Mean Well", "Phoenix Contact", "Omron", "Siemens SITOP"],
    inStock: true,
  },
  {
    id: "pb-cable-management",
    name: "Slotted Cable Ducts, Glands & DIN Rail Accessories",
    category: "panel-building",
    subCategory: "Cable Management & Accessories",
    tagline: "Neat routing, strain relief, and IP68 cable entry solutions",
    description:
      "Halogen-free PVC and polycarbonate slotted wiring ducts, brass nickel-plated/polyamide cable glands, DIN rails, and thermal control thermostats.",
    features: [
      "Finger break-off lines for smooth toolless wire branching",
      "Flame-retardant self-extinguishing PVC (UL94 V-0)",
      "Double-sided adhesive tape and DIN rail fasteners",
      "IP68 cable glands with integrated strain relief and neoprene seal",
    ],
    specs: {
      "Duct Sizes": "25x25mm to 100x100mm (Grey RAL 7030 / Blue)",
      "Glands": "Metric M12 to M63, PG7 to PG48 (Polyamide / Brass)",
      "Material": "Rigid PVC Lead-Free / Halogen-Free",
      "Accessories": "Panel Fan Filters, Thermostats, Strip Heaters",
    },
    applications: ["Panel Trunking", "Cable Entry Plates", "Thermal Conditioning", "Machine Tool Harnessing"],
    oemPartners: ["Lapp Group", "HellermannTyton", "Polycab", "Trinity Touch"],
    inStock: true,
  },
];

export const AUTOMATION_PRODUCTS: ProductItem[] = [
  {
    id: "auto-plc-controllers",
    name: "Modular & Compact Industrial PLCs (Micro to Enterprise)",
    category: "automation",
    subCategory: "PLCs & Controller Systems",
    tagline: "High-speed cycle times, deterministic control & multi-protocol I/O",
    description:
      "High-performance Programmable Logic Controllers (PLCs) capable of micro-second cycle execution, integrated motion axes, dual Ethernet ports, and cloud MQTT / OPC UA connectivity.",
    features: [
      "Multi-core processors with execution speeds under 10 ns per instruction",
      "Native support for Profinet, Ethernet/IP, Modbus TCP, EtherCAT & CANopen",
      "Integrated web server, recipe management, and data logging to SD cards",
      "Hot-swappable I/O slices with diagnostic LEDs on every channel",
    ],
    specs: {
      "I/O Capacity": "Up to 8192 Digital / Analog channels",
      "Memory": "1 MB to 20 MB Program & Data Retentive",
      "Protocols": "OPC UA, MQTT, Modbus TCP, Profinet, EtherNet/IP",
      "Programming": "IEC 61131-3 (Ladder, FBD, ST, SFC, IL)",
    },
    applications: ["Packaging Machinery", "Automotive Assembly Lines", "Robotic Cells", "Water Treatment SCADA"],
    oemPartners: ["Siemens (S7-1200 / S7-1500)", "Schneider (Modicon)", "Omron (NX/NJ)", "Mitsubishi (iQ-R)"],
    inStock: true,
    popular: true,
  },
  {
    id: "auto-vfd-inverters",
    name: "Variable Frequency Drives (VFDs) & Servo Inverters",
    category: "automation",
    subCategory: "Variable Frequency Drives (VFDs)",
    tagline: "Sensorless vector speed and torque control for 0.37kW to 500kW",
    description:
      "Precision AC motor drives featuring advanced vector torque control, built-in EMC filters, STO (Safe Torque Off SIL3), and dynamic braking choppers.",
    features: [
      "Direct Torque Control (DTC) and Field-Oriented Sensorless Vector Control",
      "Integrated Safe Torque Off (STO) to EN ISO 13849-1 PLe/SIL 3",
      "Built-in DC choke & C2 EMC filter for reduced grid harmonics",
      "Bluetooth & Graphic Keypad options for wireless parameter tuning",
    ],
    specs: {
      "Power Range": "0.37 kW to 500 kW (Single Phase 230V / 3-Phase 415V)",
      "Overload Capacity": "150% for 60 sec (Heavy Duty), 200% for 3 sec",
      "Output Frequency": "0 to 599 Hz",
      "Fieldbus": "Profinet, Modbus RTU/TCP, EtherCAT, CANopen",
    },
    applications: ["Extruders & Mixers", "Crane & Hoist Control", "HVAC Air Handlers", "CNC Spindles & Pumps"],
    oemPartners: ["Danfoss", "Siemens SINAMICS", "Schneider Altivar", "ABB", "Yaskawa"],
    inStock: true,
    popular: true,
  },
  {
    id: "auto-hmi-touchscreens",
    name: "Industrial HMIs & Edge Touch Panels (4.3\" to 21.5\")",
    category: "automation",
    subCategory: "HMIs & SCADA Displays",
    tagline: "High-contrast capacitive & resistive multi-touch interfaces",
    description:
      "IP66 front-panel industrial operator displays with sunlight-readable screens, aluminum die-cast housings, multi-touch gestures, and remote VNC / mobile viewing.",
    features: [
      "Widescreen 16:9 TFT displays with up to 16.7M colors and LED backlighting",
      "Dual isolated Ethernet ports + RS232/RS485 serial communication",
      "Alarm logging, trend historical graphs, PDF viewing, and recipe databases",
      "Remote monitoring via smartphone app and built-in VNC server",
    ],
    specs: {
      "Display Sizes": "4.3\", 7.0\", 10.1\", 12.1\", 15.6\", 21.5\"",
      "Resolution": "800x480 to 1920x1080 Full HD",
      "Front Protection": "IP66 / NEMA 4X Oil & Dust proof",
      "Operating Temp": "-10°C to +60°C",
    },
    applications: ["Machine Control Terminals", "Pharma Cleanrooms", "Building Automation", "Process Monitoring"],
    oemPartners: ["Weintek", "Siemens SIMATIC HMI", "Schneider Magelis", "Omron"],
    inStock: true,
    popular: true,
  },
  {
    id: "auto-sensors-encoders",
    name: "Industrial Proximity, Optical Sensors & Rotary Encoders",
    category: "automation",
    subCategory: "Industrial Sensors & Encoders",
    tagline: "Sub-millimeter sensing precision in harsh vibration & oil mist",
    description:
      "Complete lineup of inductive proximity switches, laser distance measuring sensors, fiber-optic amplifiers, and absolute optical/magnetic rotary encoders.",
    features: [
      "Inductive sensors with stainless steel housings up to IP69K washdown",
      "Laser background suppression photo-electric sensors for tricky targets",
      "Incremental & Absolute multi-turn rotary encoders (SSI, Profinet, IO-Link)",
      "IO-Link smart sensors providing condition monitoring & temperature telemetry",
    ],
    specs: {
      "Sensing Range": "1mm to 50m (Laser / Optical / Inductive)",
      "Switching Frequency": "Up to 10 kHz",
      "Encoder Resolution": "Up to 65536 pulses/rev (16-bit)",
      "Protection": "IP67 / IP69K (Chemical & Washdown resistant)",
    },
    applications: ["Position Verification", "Speed & Length Measurement", "Part Detection", "Packaging QC"],
    oemPartners: ["Sick", "Omron", "Pepperl+Fuchs", "IFM Electronic", "Baumer"],
    inStock: true,
  },
  {
    id: "auto-servo-motion",
    name: "High-Dynamic AC Servo Motors & Multi-Axis Drives",
    category: "automation",
    subCategory: "Servo & Motion Control",
    tagline: "Ultra-fast settling times, 23-bit encoders & synchronous motion",
    description:
      "Brushless AC servo systems with low-inertia rotors, high peak torque (350%), optical 23-bit multi-turn absolute encoders, and EtherCAT / Profinet IRT synchronization.",
    features: [
      "Frequency response bandwidth up to 3.2 kHz for instant motion response",
      "Built-in vibration suppression filters and notch tuning algorithms",
      "Integrated Safe Torque Off (STO) and Safe Operating Stop (SOS)",
      "Single-cable hybrid power/encoder connections up to 50 meters",
    ],
    specs: {
      "Rated Power": "100W to 15 kW",
      "Rated Speeds": "1500 / 3000 / 6000 RPM",
      "Encoder": "23-bit Absolute (8,388,608 pulses/rev)",
      "Bus Sync": "EtherCAT DC (Distributed Clock < 1 µs jitter)",
    },
    applications: ["Pick and Place Delta Robots", "CNC Tool Changers", "High-Speed Labelers", "Rotary Cutters"],
    oemPartners: ["Panasonic", "Yaskawa", "Siemens SIMOTICS", "Delta Electronics"],
    inStock: true,
  },
  {
    id: "auto-iiot-gateways",
    name: "Industrial IoT Edge Gateways & 4G/5G Remote Routers",
    category: "automation",
    subCategory: "IIoT & Industrial Gateways",
    tagline: "Bridge legacy OT fieldbuses to AWS, Azure & private SCADA clouds",
    description:
      "Ruggedized edge computing gateways with dual SIM 4G/5G cellular failover, VPN tunneling (OpenVPN / IPsec), Modbus-to-MQTT protocol translation, and Node-RED support.",
    features: [
      "Hardware cryptographic security chip (TPM 2.0)",
      "Dual SIM slot with auto-failover and GPS geofencing",
      "Support for 300+ industrial PLC protocols to MQTT, Sparkplug B, and REST",
      "Wide power input (9V to 48V DC) with reverse polarity protection",
    ],
    specs: {
      "Connectivity": "4G LTE / 5G / Wi-Fi 6 / Dual Gigabit Ethernet",
      "Serial Interfaces": "2x RS485 / 1x RS232",
      "Protocols": "MQTT, OPC UA, Modbus TCP/RTU, RESTful API",
      "Mounting": "DIN Rail / Wall mount (-40°C to +75°C)",
    },
    applications: ["Remote Solar Farm Monitoring", "Fleet Telematics", "Preventive Maintenance", "Smart Metering"],
    oemPartners: ["Moxa", "Teltonika", "Advantech", "Brainboxes"],
    inStock: true,
    popular: true,
  },
];

export const ALL_PRODUCTS = [...PANEL_BUILDING_PRODUCTS, ...AUTOMATION_PRODUCTS];
