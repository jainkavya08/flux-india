export interface WaterPurificationProduct {
  id: string;
  name: string;
  description?: string;
  image?: string;
  href?: string;
  specs?: Record<string, string>;
}

export interface WaterPurificationGroup {
  id: string;
  letter: string;
  title: string;
  products: WaterPurificationProduct[];
}

export const WATER_PURIFICATION_GROUPS: WaterPurificationGroup[] = [
  {
    id: "chemicals",
    letter: "A",
    title: "Chemicals",
    products: [
      {
        id: "water-1",
        name: "RO Chemical",
        description:
          "High-performance reverse osmosis antiscalants, membrane cleaners, biocides, and pH conditioning chemicals for industrial water purification systems.",
      },
    ],
  },
];
