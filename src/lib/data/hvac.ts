export interface HVACProduct {
  id: string;
  name: string;
  description?: string;
  image?: string;
  href?: string;
  specs?: Record<string, string>;
}

export interface HVACGroup {
  id: string;
  letter: string;
  title: string;
  image?: string;
  products: HVACProduct[];
}

export const HVAC_GROUPS: HVACGroup[] = [
  {
    id: "thermal-management-accessories",
    letter: "A",
    title: "Thermal Management Accessories",
    image: "/media/air_vents.png",
    products: [
      {
        id: "hvac-1",
        name: "FAN",
        image: "/media/Fans.png",
        description:
          "Axial enclosure cooling fans, exhaust filter fan units, and louvers for continuous cabinet heat extraction and air circulation.",
      },
      {
        id: "hvac-2",
        name: "Temperature controller",
        image: "/media/temp_controller.png",
        description:
          "High-precision digital PID and ON/OFF panel temperature controllers with dual display and multi-point alarm outputs.",
      },
      {
        id: "hvac-3",
        name: "Process Indicator",
        image: "/media/processindicators.png",
        description:
          "Universal digital panel process indicators for real-time monitoring of thermal levels, current, voltage, and sensor telemetry.",
      },
      {
        id: "hvac-4",
        name: "Humidity Controller",
        image: "/media/humiditycontroller.png",
        description:
          "Electronic hygrostats and humidity controllers engineered for anti-condensation protection in switchboards and outdoor enclosures.",
      },
      {
        id: "hvac-5",
        name: "Thermostat",
        image: "/media/thermostats.png",
        description:
          "Compact bimetallic mechanical thermostats (normally open / normally closed) for automatic cooling fan triggering and enclosure heater regulation.",
      },
    ],
  },
];
