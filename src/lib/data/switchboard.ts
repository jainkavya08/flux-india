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
  image?: string;
  products: SwitchboardProduct[];
}

export const SWITCHBOARD_GROUPS: SwitchboardGroup[] = [
  {
    id: "mechanical-accessories",
    letter: "A",
    title: "Mechanical Accessories",
    image: "/media/air_vents.png",
    products: [
      { id: "mech-1", name: "MS/ SS Panel", image: "/media/metal_enclosure_group.png" },
      { id: "mech-2", name: "Hinges", image: "/media/hinges.png" },
      { id: "mech-3", name: "I Bolt", image: "/media/ibolt.png" },
      { id: "mech-4", name: "Latches", image: "/media/lock&latches.png" },
      { id: "mech-6", name: "AIR Vents", image: "/media/air_vents.png" },
    ],
  },
  {
    id: "wire-and-bus-bar-accessories",
    letter: "B",
    title: "Wire and Bus Bar Accessories",
    image: "/media/cable_ties.png",
    products: [
      { id: "wire-1", name: "Cable Ties", image: "/media/cable_ties.png" },
      { id: "wire-2", name: "Bus Bar Sleeves", image: "/media/busbarsleeves.png" },
      { id: "wire-3", name: "Spiral Wrapping/ Braided Sleeve", image: "/media/flexible_conduits.png" },
      { id: "wire-4", name: "Lugs/ Terminals", image: "/media/lugs_terminals.png" },
      { id: "wire-6", name: "Support Insulator", image: "/media/support_insulators.png" },
    ],
  },
  {
    id: "metering-and-control",
    letter: "C",
    title: "Metering and Control",
    image: "/media/analogmeters.png",
    products: [
      { id: "meter-1", name: "Analog Meters", image: "/media/analogmeters.png" },
      { id: "meter-2", name: "Digital Meters", image: "/media/Panel_meters.png" },
      { id: "meter-3", name: "Current Transformer", image: "/media/ciurrenttransformer.png" },
      { id: "meter-5", name: "Shunts", image: "/media/shunts.png" },
    ],
  },
  {
    id: "power-and-control-components",
    letter: "D",
    title: "Power and Control Components",
    image: "/media/Power_Supply.png",
    products: [
      { id: "power-1", name: "Power Supplies", image: "/media/Power_Supply.png" },
      { id: "power-2", name: "Auto transformer", image: "/media/transformers.png" },
      { id: "power-3", name: "Potential Transformer", image: "/media/potentialtransformer.png" },
      { id: "power-4", name: "Voltage Monitoring relay", image: "/media/voltagemonitoringrelay.png" },
      { id: "power-6", name: "Earth Leakage relay", image: "/media/earthleakagerelay.png" },
      { id: "power-7", name: "Automatic Transfer Switch", image: "/media/automatictransferswitch.png" },
    ],
  },
  {
    id: "signal-and-indication",
    letter: "E",
    title: "Signal and Indication",
    image: "/media/pilot_lamp.png",
    products: [
      { id: "signal-1", name: "Pilot Lamp", image: "/media/pilot_lamp.png" },
      { id: "signal-2", name: "Tower Light", image: "/media/Tower_light.png" },
      { id: "signal-3", name: "Hooter and Audio Devices", image: "/media/siren.png" },
      { id: "signal-4", name: "Panel Push Buttons", image: "/media/pushbutton.png" },
      { id: "signal-5", name: "Selector Switch", image: "/media/selectorswitch.png" },
      { id: "signal-6", name: "Alarm Annunciator", image: "/media/Alarm annuciator.png" },
    ],
  },
  {
    id: "automation-components",
    letter: "F",
    title: "Automation Components",
    image: "/media/PLC.png",
    products: [
      { id: "auto-1", name: "PLC", image: "/media/PLC.png" },
      { id: "auto-2", name: "HMI", image: "/media/automation components/HMI.png" },
      { id: "auto-3", name: "Time Switch", image: "/media/time switch.png" },
      { id: "auto-4", name: "Timers", image: "/media/timer.png" },
      { id: "auto-5", name: "Transducer", image: "/media/transducers.png" },
      { id: "auto-6", name: "Isolator", image: "/media/isolators.png" },
    ],
  },
];
