export const galleryHeroSrc = "/gallery/port-crane-lift.jpeg";

export const galleryCategories = ["All", "Fleet", "Cargo", "Operations"] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
  category: Exclude<GalleryCategory, "All">;
};

export const galleryImages: GalleryImage[] = [
  {
    id: "port-crane-lift",
    src: "/gallery/port-crane-lift.jpeg",
    alt: "Port crane lifting a Sobek container above the terminal",
    title: "Port lift",
    caption: "A crane carries a branded container across the working terminal.",
    category: "Operations",
  },
  {
    id: "container-over-blue-truck",
    src: "/gallery/container-over-blue-truck.png",
    alt: "Sobek container hanging above a blue truck",
    title: "Over the truck",
    caption: "A branded container is lowered onto the chassis below.",
    category: "Operations",
  },
  {
    id: "stevedore-guiding-container",
    src: "/gallery/stevedore-guiding-container.png",
    alt: "Stevedore guiding a Sobek container onto a truck",
    title: "Guided onto the chassis",
    caption: "A stevedore lines the container up as it settles on the trailer.",
    category: "Operations",
  },
  {
    id: "mobile-crane-quayside",
    src: "/gallery/mobile-crane-quayside.png",
    alt: "Mobile crane parked beside Sobek containers and a ship",
    title: "Mobile crane",
    caption: "The crane stands ready between the containers and the ship's hull.",
    category: "Operations",
  },
  {
    id: "reefer-doors-in-air",
    src: "/gallery/reefer-doors-in-air.jpg",
    alt: "Reefer container doors facing the camera during a lift",
    title: "Doors to the sky",
    caption: "The reefer turns in the air as the crane finishes the move.",
    category: "Operations",
  },
  {
    id: "crane-and-bridge",
    src: "/gallery/crane-and-bridge.jpg",
    alt: "Mobile crane lifting a container beside a ship bridge",
    title: "Bridge and crane",
    caption: "The crane works beside the vessel's bridge during the port call.",
    category: "Fleet",
  },
  {
    id: "reefer-close-up",
    src: "/gallery/reefer-close-up.jpg",
    alt: "Close view of a white Sobek reefer container",
    title: "Sobek reefer",
    caption: "A close look at a refrigerated container in Sobek livery.",
    category: "Cargo",
  },
  {
    id: "reefer-unit-lift",
    src: "/gallery/reefer-unit-lift.jpg",
    alt: "Reefer unit end of a Sobek container in mid-air",
    title: "Reefer unit aloft",
    caption: "The cooling unit faces the quay as the container is lifted clear.",
    category: "Cargo",
  },
  {
    id: "reefer-above-blue-container",
    src: "/gallery/reefer-above-blue-container.png",
    alt: "White Sobek reefer lifted above a blue container",
    title: "Stacked for sailing",
    caption: "A reefer is set in place above the containers already on the quay.",
    category: "Cargo",
  },
  {
    id: "reefer-over-lumber",
    src: "/gallery/reefer-over-lumber.png",
    alt: "Reefer container lifted above stacked timber",
    title: "Timber and reefers",
    caption: "Refrigerated containers move through a yard stacked with timber cargo.",
    category: "Cargo",
  },
  {
    id: "crane-rear-quay",
    src: "/gallery/crane-rear-quay.png",
    alt: "Rear view of a mobile crane on the quay",
    title: "Crane on the quay",
    caption: "Crane and chassis share the apron beside Sobek containers.",
    category: "Operations",
  },
  {
    id: "reefer-on-red-trailer",
    src: "/gallery/reefer-on-red-trailer.png",
    alt: "Sobek reefer sitting on a red terminal trailer",
    title: "On the red trailer",
    caption: "The reefer is secured on a terminal trailer before the next move.",
    category: "Cargo",
  },
  {
    id: "crane-lift-from-deck",
    src: "/gallery/crane-lift-from-deck.jpeg",
    alt: "Sobek container suspended from a crane above the ship deck",
    title: "Lift from the deck",
    caption: "A Sobek container leaves the deck under the ship's crane.",
    category: "Operations",
  },
  {
    id: "container-alongside-ship",
    src: "/gallery/container-alongside-ship.jpeg",
    alt: "Sobek container hanging beside a cargo ship",
    title: "Alongside the vessel",
    caption: "The container is held between the ship and the quay.",
    category: "Operations",
  },
  {
    id: "reefer-over-trailer",
    src: "/gallery/reefer-over-trailer.jpeg",
    alt: "Reefer container suspended over a trailer beside a ship",
    title: "Reefer to the trailer",
    caption: "A refrigerated Sobek container is lowered toward the waiting chassis.",
    category: "Operations",
  },
  {
    id: "container-on-trailer",
    src: "/gallery/container-on-trailer.jpeg",
    alt: "Sobek container secured on a port trailer",
    title: "Ready for the gate",
    caption: "A loaded container waits on its trailer inside the terminal.",
    category: "Operations",
  },
  {
    id: "crane-over-truck",
    src: "/gallery/crane-over-truck.jpeg",
    alt: "Crane positioning a Sobek container over a truck",
    title: "Crane to chassis",
    caption: "The lift lands the container on the truck waiting at the ship's side.",
    category: "Operations",
  },
  {
    id: "container-over-lumber-yard",
    src: "/gallery/container-over-lumber-yard.jpeg",
    alt: "Sobek container suspended above a lumber yard",
    title: "Lumber in the yard",
    caption: "Timber cargo fills the quay while a container crosses overhead.",
    category: "Cargo",
  },
  {
    id: "sobek-container-side",
    src: "/gallery/sobek-container-side.jpeg",
    alt: "Side and doors of a Sobek shipping container",
    title: "Branded container",
    caption: "Sobek markings run along the side of the container.",
    category: "Cargo",
  },
  {
    id: "thermo-king-on-truck",
    src: "/gallery/thermo-king-on-truck.jpeg",
    alt: "Sobek reefer with a Thermo King unit loaded on a truck",
    title: "Thermo King reefer",
    caption: "A refrigerated unit sits on the truck, ready to leave the port.",
    category: "Cargo",
  },
  {
    id: "blue-container-night",
    src: "/gallery/blue-container-night.jpeg",
    alt: "Blue Sobek container at the port at night",
    title: "Night on the quay",
    caption: "A blue Sobek container waits under the port lights.",
    category: "Cargo",
  },
];
