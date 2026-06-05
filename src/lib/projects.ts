export interface ProjectImage {
  src: string;
  alt: string;
  caption: string;
}

export interface ProjectVideo {
  id: string;
  title: string;
  label: string;
  description: string;
}

export interface Project {
  slug: string;
  kicker: string;
  client: string;
  name: string;
  year: string;
  location: string;
  scope: string;
  summary: string;
  highlights: string[];
  hero: {
    src: string;
    alt: string;
  };
  video: ProjectVideo;
  gallery: ProjectImage[];
}

export const theKilnsProject: Project = {
  slug: "the-kilns",
  kicker: "Featured Project",
  client: "Stronghold Homes",
  name: "The Kilns",
  year: "2026",
  location: "Leicestershire",
  scope: "Full electrical installation across luxury new build homes",
  summary:
    "A signature collaboration with Stronghold Homes delivering complete first and second fix electrical works across this private development of luxury family homes. Every room was planned around statement lighting, layered scene control, and integrated detail.",
  highlights: [
    "Statement chandeliers across double-height voids and stairwells",
    "Concealed LED cove lighting and backlit feature walls in every reception room",
    "Kitchen pendant clusters, ceiling speakers, and full appliance circuits",
    "Wardrobe and dressing room LED profiles with bespoke shelf lighting",
    "External wall up/downlights, bollard runs, and night-time scene control",
  ],
  hero: {
    src: "/projects/the-kilns/exterior-sunset.png",
    alt: "The Kilns development by Stronghold Homes photographed at golden hour, showing a row of luxury family homes.",
  },
  video: {
    id: "P9JQ9nkGQ4U",
    title: "The Kilns development walkthrough by Stronghold Homes",
    label: "Development walkthrough",
    description:
      "Tour the finished development with Stronghold Homes and see the spaces where our lighting and electrical installation comes together.",
  },
  gallery: [
    {
      src: "/projects/the-kilns/kitchen.png",
      alt: "Open plan kitchen with pendant cluster, recessed downlights, ceiling speakers, and integrated appliances.",
      caption: "Kitchen lighting design",
    },
    {
      src: "/projects/the-kilns/lounge-shelves.png",
      alt: "Formal lounge with backlit display shelving, statement pendant, and bioethanol fireplace wall.",
      caption: "Backlit display joinery",
    },
    {
      src: "/projects/the-kilns/snug-panelled.png",
      alt: "Navy panelled snug with brass and glass chandelier and integrated LED-lit alcove shelving.",
      caption: "Panelled snug with feature lighting",
    },
    {
      src: "/projects/the-kilns/living-room-cove.png",
      alt: "Living room with cove perimeter lighting, ribbed alcove shelving, and a six-arm ceiling pendant.",
      caption: "Cove and alcove scenes",
    },
    {
      src: "/projects/the-kilns/snug-cove-lighting.png",
      alt: "Snug with chandelier, paired wall sconces, LED cove perimeter and flush ceiling speaker.",
      caption: "Layered media room scene",
    },
    {
      src: "/projects/the-kilns/bathroom-feature-tile.png",
      alt: "Bathroom with freestanding tub and dramatic backlit gold chevron tile feature wall.",
      caption: "Backlit bathroom feature wall",
    },
    {
      src: "/projects/the-kilns/arched-alcove.png",
      alt: "Marble step landing with arched, backlit wallpaper feature and overhead spot.",
      caption: "Arched feature niche",
    },
    {
      src: "/projects/the-kilns/exterior-front.png",
      alt: "Front elevation of The Kilns at dusk showing the family of homes across the development.",
      caption: "Front elevation",
    },
    {
      src: "/projects/the-kilns/driveway-dusk.png",
      alt: "Driveway at dusk with bollard pathway lighting and twin entrance wall sconces.",
      caption: "Driveway and exterior lighting",
    },
  ],
};
