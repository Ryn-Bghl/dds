export interface HomePageContent {
  hero: {
    title: string;
    description: string;
    backgroundImage: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  manifesto: {
    title: string;
    content: string;
  };
  stats: {
    value: number;
    label: string;
    suffix: string;
  }[];
  services: {
    title: string;
    description: string;
    iconName: string;
  }[];
}

export interface AssociationPageContent {
  header: {
    title: string;
    description: string;
  };
  history: {
    title: string;
    content: string;
  };
  values: {
    title: string;
    description: string;
    iconName: string;
  }[];
}

export interface ContactPageContent {
  header: {
    title: string;
    description: string;
  };
  info: {
    email: string;
    address: string;
    zone: string;
    socials: {
      facebook: string;
      instagram: string;
      youtube: string;
    };
  };
}

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  date: string;
  location: string;
  stats: { label: string; value: string }[];
  content: { subtitle: string; text: string }[];
  testimonial?: { text: string; author: string };
}

export interface Event {
  id: number;
  title: string;
  date: string;
  time?: string;
  location: string;
  category: string;
  description: string;
  price?: string;
  ticketUrl?: string;
  image: string;
  attendees?: number;
  isPast: boolean;
}

export interface RentalRequest {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  eventDate: string;
  status: "En attente" | "Validé" | "Refusé";
  totalPrice: number;
  items: { name: string; quantity: number; price: number }[];
  createdAt: string;
}

export interface SiteContent {
  home: HomePageContent;
  association: AssociationPageContent;
  contact: ContactPageContent;
  projects: Project[];
  events: Event[];
  rentalRequests: RentalRequest[];
}

export const initialContent: SiteContent = {
  home: {
    hero: {
      title: "Donnons du son à vos projets artistiques",
      description:
        "Association culturelle engagée pour l'accompagnement des artistes et la diffusion de la musique",
      backgroundImage:
        "https://images.unsplash.com/photo-1700166269606-b5ea327d0540?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3VuZCUyMG1peGluZyUyMGNvbnNvbGUlMjBzdHVkaW98ZW58MXx8fHwxNzc0NTMyNTE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      ctaPrimary: "Découvrir l'association",
      ctaSecondary: "Location de matériel",
    },
    manifesto: {
      title: "Notre Manifeste",
      content:
        "Dons Du Son est née d'une conviction : la culture doit être accessible à tous. Depuis 2022, nous œuvrons pour démocratiser l'accès aux équipements techniques professionnels et accompagner les artistes émergents dans leurs projets musicaux.\n\nNotre mission : former, équiper et connecter les talents de demain, tout en créant des ponts entre les acteurs culturels du territoire.",
    },
    stats: [
      { value: 150, label: "Artistes accompagnés", suffix: "+" },
      { value: 45, label: "Projets réalisés", suffix: "+" },
      { value: 4, label: "Années d'expérience", suffix: "" },
      { value: 200, label: "Événements organisés", suffix: "+" },
    ],
    services: [
      {
        iconName: "Music",
        title: "Sonorisation",
        description: "Enceintes, consoles, micros pour tous types d'événements",
      },
      {
        iconName: "Lightbulb",
        title: "Éclairage",
        description: "Projecteurs, lyres, jeux de lumière pour vos spectacles",
      },
      {
        iconName: "Radio",
        title: "DJ & Mix",
        description: "Platines, contrôleurs, cacques pour vos sets",
      },
      {
        iconName: "Wrench",
        title: "Backline",
        description: "Instruments et retours scène pour groupes live",
      },
    ],
  },
  association: {
    header: {
      title: "L'Association",
      description:
        "Une équipe passionnée au service de la création musicale et de l'accompagnement artistique",
    },
    history: {
      title: "Notre Histoire",
      content:
        "Fondée en 2022, Dons Du Son est née de la rencontre entre des professionnels du secteur audio et des passionnés de musique, tous animés par la volonté de démocratiser l'accès aux moyens de production musicale.\n\nFace au constat que de nombreux artistes émergents manquent de moyens techniques et financiers pour concrétiser leurs projets, nous avons décidé de créer une structure associative permettant de mutualiser les ressources et les compétences.\n\nAujourd'hui, nous sommes une équipe de 15 bénévoles actifs et comptons plus de 200 adhérents. Notre association est reconnue d'intérêt général et œuvre quotidiennement pour le développement de la scène musicale en Île-de-France.",
    },
    values: [
      {
        iconName: "Target",
        title: "Accessibilité",
        description: "Rendre la culture accessible à tous, sans distinction",
      },
      {
        iconName: "Users",
        title: "Solidarité",
        description: "Créer du lien entre artistes et acteurs culturels",
      },
      {
        iconName: "Heart",
        title: "Engagement",
        description: "S'investir pour le développement culturel local",
      },
    ],
  },
  contact: {
    header: {
      title: "Contact",
      description: "Une question ? Un projet ? N'hésitez pas à nous contacter",
    },
    info: {
      email: "contact@donsduson.fr",
      address: "123 rue de la Musique\n75018 Paris",
      zone: "Zone d'intervention : Île-de-France",
      socials: {
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        youtube: "https://youtube.com",
      },
    },
  },
  projects: [
    {
      id: "festival-2024",
      title: "Festival Émergence 2024",
      category: "Diffusion",
      image:
        "https://images.unsplash.com/photo-1669459881627-06c2a4948e33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwc3RhZ2UlMjBsaWdodHMlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NzQ1MDc2OTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      description:
        "Le Festival Émergence est notre événement phare annuel, dédié à la découverte de nouveaux talents musicaux.",
      date: "15-17 Juin 2024",
      location: "Parc de la Villette, Paris",
      stats: [
        { label: "Artistes", value: "15" },
        { label: "Spectateurs", value: "3 500" },
        { label: "Jours", value: "3" },
      ],
      content: [
        {
          subtitle: "Objectifs du projet",
          text: "Offrir une plateforme de visibilité aux artistes émergents.",
        },
        {
          subtitle: "Organisation",
          text: "L'événement s'est déroulé sur 3 jours avec 2 scènes principales.",
        },
      ],
      testimonial: { text: "Une expérience inoubliable.", author: "Léa" },
    },
    {
      id: "atelier-prod",
      title: "Atelier Production Musicale",
      category: "Formation",
      image:
        "https://images.unsplash.com/photo-1696522732406-065ef560da8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHdvcmtzaG9wJTIwdGVhY2hpbmd8ZW58MXx8fHwxNzc0NjIwMTcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      description:
        "Formation intensive de 5 jours dédiée à la production musicale en home studio.",
      date: "4-8 Mars 2024",
      location: "Studio Dons Du Son, Paris 18e",
      stats: [{ label: "Participants", value: "12" }],
      content: [{ subtitle: "Programme", text: "CAO, mixage et mastering." }],
    },
  ],
  events: [
    {
      id: 1,
      title: "Showcase Tremplin Hip-Hop",
      date: "2026-04-15",
      time: "20h00",
      location: "La Bellevilloise, Paris 20e",
      category: "Concert",
      description: "Finale du tremplin avec 5 rappeurs sélectionnés",
      price: "Gratuit sur réservation",
      image:
        "https://images.unsplash.com/photo-1561264819-1ccc1c6e0ae9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwbXVzaWMlMjBiYW5kJTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzc0NjIwMTcwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      isPast: false,
    },
    {
      id: 2,
      title: "Festival Émergence 2024",
      date: "2024-06-15",
      location: "Parc de la Villette",
      category: "Festival",
      description: "Édition passée du festival",
      image:
        "https://images.unsplash.com/photo-1669459881627-06c2a4948e33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwc3RhZ2UlMjBsaWdodHMlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NzQ1MDc2OTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      isPast: true,
      attendees: 3500,
    },
  ],
  rentalRequests: [
    {
      id: "req-1",
      customerName: "Jean Dupont",
      email: "jean@example.com",
      phone: "06 12 34 56 78",
      eventDate: "2026-05-20",
      status: "En attente",
      totalPrice: 155,
      items: [{ name: "Enceinte JBL PRX815", quantity: 2, price: 80 }],
      createdAt: "2026-04-01",
    },
  ],
};

export function loadContent(): SiteContent {
  const stored = localStorage.getItem("dds_content");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return { ...initialContent, ...parsed };
    } catch (e) {
      console.error("Failed to parse stored content", e);
    }
  }
  return initialContent;
}

export function saveContent(content: SiteContent) {
  localStorage.setItem("dds_content", JSON.stringify(content));
}
