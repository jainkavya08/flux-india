import re

with open('src/lib/data/solutions.ts', 'r') as f:
    content = f.read()

# Replace Solution 1
content = content.replace('''    fluxApproach: [
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
      "PV Array Strings → 1500V String Combiner Panel → Central Inverter Incomer → 33kV Step-up Substation → Cloud SCADA Telemetry.",''', '''    fluxApproach: [
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
      "PV Array Strings → Smart Combiner Panel → Central Inverter Incomer → Step-up Substation → Cloud SCADA Telemetry.",''')


# Replace Solution 2
content = content.replace('''    fluxApproach: [
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
      "Grid Incomer → Active Harmonic Filter → Dynamic Power Matrix Module → DC Isolation Contactors → CCS2 Liquid Cooled Dispensers.",''', '''    fluxApproach: [
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
      "Grid Incomer → Active Harmonic Filter → Dynamic Power Matrix Module → Charging Control Panel → CCS2 Liquid Cooled Dispensers.",''')

# Replace Solution 3
content = content.replace('''    fluxApproach: [
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
      "Main Factory SCADA → Profinet Safety Ring → Distributed IO Nodes → AC Servo Actuators & Robot Interlocks.",''', '''    fluxApproach: [
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
      "Main Factory SCADA → Profinet Safety Ring → PLC Control Panel → AC Servo Actuators & Robot Interlocks.",''')

# Replace Solution 4
content = content.replace('''    fluxApproach: [
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
      "11kV Substation Transformer → 4000A Main PCC Panel → APFC Capacitor Bank → Motor Control Centers (MCC) → Field Starters.",''', '''    fluxApproach: [
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
      "11kV Substation Transformer → Main Control Panel → APFC Capacitor Bank → Motor Control Centers (MCC) → Field Starters.",''')

# Replace Solution 5
content = content.replace('''    fluxApproach: [
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
      "Intake Sump → Cascade VFD Pump Panel → Filtration & Dosing Skid → Storage Reservoir → City Telemetry SCADA.",''', '''    fluxApproach: [
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
      "Intake Sump → Cascade Pump Control Panel → Filtration & Dosing Skid → Storage Reservoir → City Telemetry SCADA.",''')

with open('src/lib/data/solutions.ts', 'w') as f:
    f.write(content)

print("Done patching solutions.ts")
