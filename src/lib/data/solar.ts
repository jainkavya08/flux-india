export interface SolarProduct {
  id: string;
  name: string;
  description?: string;
  image?: string;
  href?: string;
  specs?: Record<string, string>;
}

export interface SolarGroup {
  id: string;
  letter: string;
  title: string;
  products: SolarProduct[];
}

export const SOLAR_GROUPS: SolarGroup[] = [
  {
    id: "rooftop-solar-solution",
    letter: "A",
    title: "Rooftop Solar Solution",
    products: [
      {
        id: "solar-1",
        name: "Socket Board",
        description:
          "Industrial weather-proof AC socket boards and auxiliary power supply units for rooftop solar installations.",
      },
      {
        id: "solar-2",
        name: "ABS/PC Distribution Board",
        description:
          "High-impact UV-resistant polycarbonate and ABS enclosure distribution boards for outdoor solar arrays.",
      },
      {
        id: "solar-3",
        name: "Junction Boxes",
        description:
          "IP65/IP66 ingress-protected string array junction boxes with terminal blocks and cable sealings.",
      },
      {
        id: "solar-4",
        name: "ACDB DCDB Box",
        description:
          "Complete AC Distribution Board (ACDB) and DC Distribution Board (DCDB) with surge protection devices (SPD) and MCBs.",
      },
      {
        id: "solar-5",
        name: "Inverter",
        description:
          "On-grid, off-grid, and hybrid string inverters with high MPPT efficiency and remote SCADA monitoring.",
      },
      {
        id: "solar-6",
        name: "Flexible Conduit",
        description:
          "UV-stabilized and flame-retardant flexible conduits for mechanical protection of DC solar cabling.",
      },
      {
        id: "solar-7",
        name: "Cable Glands",
        description:
          "Weatherproof nylon and brass cable glands ensuring strain relief and IP68 seal for solar panels and combiner boxes.",
      },
    ],
  },
];
