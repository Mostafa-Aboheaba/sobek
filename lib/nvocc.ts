export const nvoccPath = "/services/nvocc/";

export const nvoccValueProps = [
  {
    title: "Space without the hassle",
    description:
      "Competitive rates and reliable vessel space, arranged with leading carriers so you do not have to chase allocations yourself.",
  },
  {
    title: "FCL and LCL, one desk",
    description:
      "Full containers and part-loads are booked, consolidated, and followed through from origin to delivery by the same team.",
  },
  {
    title: "Our own bill of lading",
    description:
      "One Sobek bill of lading, one contract, and one contact, with clear tracking from Alexandria to the destination port.",
  },
] as const;

export const cargoTypes = ["FCL", "LCL", "Reefer", "Breakbulk"] as const;

export type CargoType = (typeof cargoTypes)[number];

export type NvoccDestination = {
  id: string;
  city: string;
  country: string;
  summary: string;
  modes: CargoType[];
};

export const nvoccDestinations: NvoccDestination[] = [
  {
    id: "beirut",
    city: "Beirut",
    country: "Lebanon",
    summary: "FCL and LCL consolidation for import and export.",
    modes: ["FCL", "LCL"],
  },
  {
    id: "piraeus",
    city: "Piraeus",
    country: "Greece",
    summary: "Transshipment and direct calls into the East Mediterranean.",
    modes: ["FCL", "LCL"],
  },
  {
    id: "salerno",
    city: "Salerno",
    country: "Italy",
    summary: "General cargo, reefer, and breakbulk into southern Italy.",
    modes: ["FCL", "Reefer", "Breakbulk"],
  },
  {
    id: "casablanca",
    city: "Casablanca",
    country: "Morocco",
    summary: "Westbound Mediterranean gateway for North Africa.",
    modes: ["FCL", "LCL"],
  },
  {
    id: "koper",
    city: "Koper",
    country: "Slovenia",
    summary: "Adriatic gateway onward into Central Europe.",
    modes: ["FCL", "LCL"],
  },
  {
    id: "aqaba",
    city: "Aqaba",
    country: "Jordan",
    summary: "Red Sea gateway serving Jordan and the Levant.",
    modes: ["FCL", "LCL"],
  },
  {
    id: "karachi",
    city: "Karachi",
    country: "Pakistan",
    summary: "Main hub for trade with Pakistan and South Asia.",
    modes: ["FCL", "LCL"],
  },
  {
    id: "mersin-istanbul",
    city: "Mersin / Istanbul",
    country: "Turkey",
    summary: "Direct link to Mediterranean and Marmara ports.",
    modes: ["FCL", "LCL"],
  },
  {
    id: "poti",
    city: "Poti",
    country: "Georgia",
    summary: "Black Sea gateway into Georgia and the Caucasus.",
    modes: ["FCL", "Breakbulk"],
  },
  {
    id: "china",
    city: "China",
    country: "Far East",
    summary: "FCL and LCL from major Chinese ports.",
    modes: ["FCL", "LCL", "Reefer"],
  },
];

export const nvoccDestinationLabel = (destination: NvoccDestination) =>
  `${destination.city} (${destination.country})`;
