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
  image?: string;
  products: SolarProduct[];
}

export const SOLAR_GROUPS: SolarGroup[] = [
  {
    id: "rooftop-solar-solution",
    letter: "A",
    title: "Rooftop Solar Solution",
    image: "/media/distribution_boxes.png",
    products: [
      {
        id: "solar-1",
        name: "Socket Board",
        image: "/media/socket_boxes.png",
        description:
          "Industrial weather-proof AC socket boards and auxiliary power supply units for rooftop solar installations.",
      },
      {
        id: "solar-2",
        name: "ABS/PC Distribution Board",
        image: "/media/distribution_boxes.png",
        description:
          "High-impact UV-resistant polycarbonate and ABS enclosure distribution boards for outdoor solar arrays.",
      },
      {
        id: "solar-3",
        name: "Junction Boxes",
        image: "/media/junction_boxes.png",
        description:
          "IP65/IP66 ingress-protected string array junction boxes with terminal blocks and cable sealings.",
      },
      {
        id: "solar-5",
        name: "Inverter",
        image: "/media/inverter.png",
        description:
          "On-grid, off-grid, and hybrid string inverters with high MPPT efficiency and remote SCADA monitoring.",
      },
      {
        id: "solar-6",
        name: "Flexible Conduit",
        image: "/media/flexible_conduits.png",
        description:
          "UV-stabilized and flame-retardant flexible conduits for mechanical protection of DC solar cabling.",
      },
      {
        id: "solar-7",
        name: "Cable Glands",
        image: "/media/cableglands.png",
        description:
          "Weatherproof nylon and brass cable glands ensuring strain relief and IP68 seal for solar panels and combiner boxes.",
      },
    ],
  },
];
