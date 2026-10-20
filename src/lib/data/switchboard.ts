export interface SwitchboardProduct {
  id: string;
  name: string;
  description?: string;
  image?: string;
  href?: string;
  specs?: Record<string, string>;
}

export interface SwitchboardGroup {
  id: string;
  letter: "A" | "B" | "C" | "D" | "E" | "F" | "G";
  title: string;
  products: SwitchboardProduct[];
}

export const SWITCHBOARD_GROUPS: SwitchboardGroup[] = [
  {
    id: "mechanical-accessories",
    letter: "A",
    title: "Mechanical Accessories",
    products: [
      { id: "mech-1", name: "MS/ SS Panel" },
      { id: "mech-2", name: "Hinges" },
      { id: "mech-3", name: "I Bolt" },
      { id: "mech-4", name: "Lotch and Lock" },
      { id: "mech-5", name: "Handles" },
      { id: "mech-6", name: "AIR Vents" },
    ],
  },
  {
    id: "wire-and-bus-bar-accessories",
    letter: "B",
    title: "Wire and Bus Bar Accessories",
    products: [
      { id: "wire-1", name: "Cable Ties" },
      { id: "wire-2", name: "Bus Bar Sleeves" },
      { id: "wire-3", name: "Spiral Wrapping/ Braided Sleeve" },
      { id: "wire-4", name: "Lugs/ Terminals" },
      { id: "wire-5", name: "Terminal Block" },
      { id: "wire-6", name: "Support Insulator" },
      { id: "wire-7", name: "Cables and wires" },
    ],
  },
  {
    id: "metering-and-control",
    letter: "C",
    title: "Metering and Control",
    products: [
      { id: "meter-1", name: "Analog Meters" },
      { id: "meter-2", name: "Digital Meters" },
      { id: "meter-3", name: "Current Transformer" },
      { id: "meter-4", name: "Power Quality Monitoring" },
      { id: "meter-5", name: "Shunts" },
      { id: "meter-6", name: "PQM" },
      { id: "meter-7", name: "PQA" },
    ],
  },
  {
    id: "power-and-control-components",
    letter: "D",
    title: "Power and Control Components",
    products: [
      { id: "power-1", name: "Power Supplies" },
      { id: "power-2", name: "Control Transformer" },
      { id: "power-3", name: "Potential Transformer" },
      { id: "power-4", name: "Voltage Monitoring relay" },
      { id: "power-5", name: "Current Monitoring relay" },
      { id: "power-6", name: "Earth Leakage relay" },
    ],
  },
  {
    id: "signal-and-indication",
    letter: "E",
    title: "Signal and Indication",
    products: [
      { id: "signal-1", name: "Pilot Lamp" },
      { id: "signal-2", name: "Tower Light" },
      { id: "signal-3", name: "Hooter and Audio Devices" },
      { id: "signal-4", name: "Panel Push Buttons" },
      { id: "signal-5", name: "Selector Switch" },
      { id: "signal-6", name: "Alarm Annunciator" },
    ],
  },
  {
    id: "power-factor-controller",
    letter: "F",
    title: "Power Factor Controller",
    products: [
      { id: "pfc-1", name: "PFC" },
      { id: "pfc-2", name: "CAPACITOR" },
    ],
  },
  {
    id: "automation-components",
    letter: "G",
    title: "Automation Components",
    products: [
      { id: "auto-1", name: "PLC" },
      { id: "auto-2", name: "HMI" },
      { id: "auto-3", name: "Time Switch" },
      { id: "auto-4", name: "Timers" },
      { id: "auto-5", name: "Transducer" },
      { id: "auto-6", name: "Isolator" },
    ],
  },
];
