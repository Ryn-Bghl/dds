export interface HomePageContent {
  impact: { title: string };
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
  interventions: {
    title: string;
    description: string;
  }[];
  interventionAreas: {
    title: string;
    description: string;
    features: string[];
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

export interface JoinPageContent {
  header: {
    title: string;
    description: string;
  };
  volunteering: {
    title: string;
    content: string;
    tasks: string[];
  };
  membership: {
    title: string;
    content: string;
    benefits: string[];
    cta: string;
  };
}

export interface SupportPageContent {
  header: {
    title: string;
    description: string;
  };
  donations: {
    title: string;
    content: string;
  };
  partnership: {
    title: string;
    content: string;
  };
}

export interface ContentBlock {
  id: string;
  type: "text" | "image" | "title" | "stats";
  title?: string;
  text?: string;
  url?: string;
  stats?: { label: string; value: string }[];
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
  content: ContentBlock[];
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
  content: ContentBlock[];
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

export interface GlobalSettings {
  siteIdentity: {
    title: string;
    subtitle: string;
    description: string;
    footerText: string;
    copyright: string;
  };
  contact: {
    email: string;
    address: string;
    facebook: string;
    instagram: string;
    youtube: string;
  };
  links: {
    helloAssoDonation: string;
    helloAssoMembership: string;
    helloAssoStore: string;
  };
  rental: {
    replyDelay: string;
    defaultDeposit: string;
  };
  advanced: {
    maintenanceMode: boolean;
  };
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  description: string;
  specs: string[];
  stock: number;
  status: "Disponible" | "Indisponible" | "Maintenance";
  content: ContentBlock[];
}

export interface RentalPack {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  items: { equipmentId: string; quantity: number }[];
  services: string[];
  status: "Disponible" | "Indisponible" | "Sur demande";
  content: ContentBlock[];
}

export interface SiteContent {
  home: HomePageContent;
  association: AssociationPageContent;
  contact: ContactPageContent;
  join: JoinPageContent;
  support: SupportPageContent;
  projects: Project[];
  events: Event[];
  rentalRequests: RentalRequest[];
  settings: GlobalSettings;
  inventory: InventoryItem[];
  rentalPacks: RentalPack[];
  teamMembers: {
    id: string;
    name: string;
    role: string;
    bio: string;
    imageUrl: string;
  }[];
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
    impact: { title: "Notre Impact" },
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
        "Fondée in 2022, Dons Du Son est née de la rencontre entre des professionnels du secteur audio et des passionnés de musique, tous animés par la volonté de démocratiser l'accès aux moyens de production musicale.\n\nFace au constat que de nombreux artistes émergents manquent de moyens techniques et financiers pour concrétiser leurs projets, nous avons décidé de créer une structure associative permettant de mutualiser les ressources et les compétences.\n\nAujourd'hui, nous sommes une équipe de 15 bénévoles actifs et comptons plus de 200 adhérents. Notre association est reconnue d'intérêt général et œuvre quotidiennement pour le développement de la scène musicale en Île-de-France.",
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
      address: "123 rue de la Musique 75018 Paris",
      zone: "Zone d'intervention : Île-de-France",
      socials: {
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        youtube: "https://youtube.com",
      },
    },
  },
  join: {
    header: {
      title: "Rejoindre l'aventure",
      description:
        "Devenez acteur du développement culturel de votre territoire",
    },
    volunteering: {
      title: "Bénévolat",
      content:
        "Nous recherchons régulièrement des bénévoles pour nous aider sur nos événements : accueil public, logistique, technique, communication. C'est une excellente occasion de découvrir les coulisses du spectacle vivant.",
      tasks: [
        "Accueil des artistes et du public",
        "Aide à l'installation technique",
        "Soutien à la communication locale",
        "Gestion de la billetterie et du bar",
      ],
    },
    membership: {
      title: "Adhésion",
      content:
        "Adhérer à Dons Du Son, c'est soutenir nos actions et bénéficier de tarifs préférentiels sur la location de matériel et les formations. L'adhésion annuelle est de 20€.",
      benefits: [
        "Réduction de 10% sur les billets de concert",
        "Accès prioritaire aux formations et ateliers",
        "Droit de vote à l'Assemblée Générale",
      ],
      cta: "Adhérer en ligne (15€/an)",
    },
  },
  support: {
    header: {
      title: "Nous soutenir",
      description:
        "Aidez-nous à rendre la culture accessible au plus grand nombre",
    },
    donations: {
      title: "Dons",
      content:
        "Vos dons nous permettent de renouveler notre parc de matériel et de proposer des ateliers gratuits pour les jeunes talents. En tant qu'association d'intérêt général, vos dons sont défiscalisables.",
    },
    partnership: {
      title: "Partenariats",
      content:
        "Vous êtes une entreprise ou une institution culturelle ? Devenons partenaires pour créer des événements uniques et soutenir la scène émergente ensemble.",
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
          id: "1",
          type: "text",
          title: "Objectifs du projet",
          text: "Offrir une plateforme de visibilité aux artistes émergents.",
        },
        {
          id: "2",
          type: "text",
          title: "Organisation",
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
      content: [
        {
          id: "1",
          type: "text",
          title: "Programme",
          text: "CAO, mixage et mastering.",
        },
      ],
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
      content: [],
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
      content: [],
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
  settings: {
    siteIdentity: {
      title: "Dons Du Son",
      subtitle: "Association culturelle",
      description:
        "Association culturelle pour l'accompagnement des artistes et la diffusion de la musique",
      footerText:
        "Association culturelle engagée pour la démocratisation de l'accès aux équipements techniques et l'accompagnement des artistes émergents.",
      copyright: "© 2026 Dons Du Son. Tous droits réservés.",
    },
    contact: {
      email: "contact@donsduson.fr",
      address: "123 rue de la Musique, 75018 Paris",
      facebook: "https://facebook.com/donsduson",
      instagram: "https://instagram.com/donsduson",
      youtube: "https://youtube.com/donsduson",
    },
    links: {
      helloAssoDonation:
        "https://www.helloasso.com/associations/dons-du-son/formulaires/3",
      helloAssoMembership:
        "https://www.helloasso.com/associations/dons-du-son/adhesions/adhesion-saison-25-26",
      helloAssoStore:
        "https://www.helloasso.com/associations/dons-du-son/boutique",
    },
    rental: {
      replyDelay: "Vous recevrez un devis sous 72 heures",
      defaultDeposit: "30%",
    },
    advanced: {
      maintenanceMode: false,
    },
  },
  inventory: [
    {
      id: "son-1",
      category: "Son",
      name: "Enceinte JBL PRX815",
      image:
        "https://images.unsplash.com/photo-1686709709573-a877d7012cf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGVha2VycyUyMHNvdW5kJTIwc3lzdGVtfGVufDF8fHx8MTc3NDYyMDE3Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      price: 80,
      description:
        "Enceinte active 1500W, idéale pour petites et moyennes configurations",
      specs: [
        "1500W RMS",
        "Bi-amplifiée",
        "DSP intégré",
        "Connectique XLR/Jack",
      ],
      stock: 4,
      status: "Disponible",
      content: [],
    },
    {
      id: "son-2",
      category: "Son",
      name: "Console Yamaha MG16XU",
      image:
        "https://images.unsplash.com/photo-1700166269606-b5ea327d0540?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3VuZCUyMG1peGluZyUyMGNvbnNvbGUlMjBzdHVkaW98ZW58MXx8fHwxNzc0NTMyNTE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      price: 60,
      description: "Table de mixage 16 canaux avec effets et interface USB",
      specs: ["16 canaux", "Effets SPX intégrés", "Interface USB", "4 Aux"],
      stock: 2,
      status: "Disponible",
      content: [],
    },
    {
      id: "lumiere-1",
      category: "Lumière",
      name: "Lyre LED Moving Head",
      image:
        "https://images.unsplash.com/photo-1758306120745-a2fb7b34b6b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFnZSUyMGxpZ2h0aW5nJTIwZXF1aXBtZW50fGVufDF8fHx8MTc3NDYxNTc1N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      price: 70,
      description: "Lyre à LED 150W avec gobos et prisme",
      specs: [
        "LED 150W",
        "16 canaux DMX",
        "Gobos rotatifs",
        "Prisme 3 facettes",
      ],
      stock: 6,
      status: "Disponible",
      content: [],
    },
  ],
  rentalPacks: [
    {
      id: "pack-full-son-1",
      name: "Pack Sonorisation Standard",
      description: "Solution complète pour événements jusqu'à 100 personnes",
      price: 150,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
      items: [
        { equipmentId: "son-1", quantity: 2 },
        { equipmentId: "son-2", quantity: 1 },
      ],
      services: ["Livraison", "Installation"],
      status: "Disponible",
      content: [],
    },
  ],
  teamMembers: [
    {
      id: "member-1",
      name: "Sophie Martin",
      role: "Présidente",
      bio: "Passionnée par l'accompagnement artistique depuis plus de 10 ans.",
      imageUrl: "",
    },
    {
      id: "member-2",
      name: "Thomas Dubois",
      role: "Trésorier",
      bio: "Expert en gestion associative et passionné de technique sonore.",
      imageUrl: "",
    },
    {
      id: "member-3",
      name: "Léa Bernard",
      role: "Secrétaire",
      bio: "Coordination et organisation au service de la culture.",
      imageUrl: "",
    },
    {
      id: "member-4",
      name: "Marc Petit",
      role: "Responsable Technique",
      bio: "Ingénieur du son expérimenté veillant sur notre parc matériel.",
      imageUrl: "",
    },
  ],
};

function isValidArray(value: any): boolean {
  return Array.isArray(value) && value.length > 0;
}

function validateAndRepairContent(content: SiteContent): SiteContent {
  // Ensure all critical array fields are actually arrays
  const repaired = { ...content };

  // Validate home page
  if (!repaired.home) {
    repaired.home = initialContent.home;
  } else {
    if (!Array.isArray(repaired.home.stats)) {
      console.warn("Repairing corrupted home.stats");
      repaired.home.stats = initialContent.home.stats;
    }
    if (!Array.isArray(repaired.home.services)) {
      console.warn("Repairing corrupted home.services");
      repaired.home.services = initialContent.home.services;
    }
    // Ensure impact field exists if home is being repaired or updated
    if (!repaired.home.impact) {
      repaired.home.impact = { title: "Notre Impact" };
    }
  }

  // Validate association page
  if (!repaired.association) {
    repaired.association = initialContent.association;
  } else {
    if (!Array.isArray(repaired.association.values)) {
      console.warn("Repairing corrupted association.values");
      repaired.association.values = initialContent.association.values;
    }
  }

  // Validate join page
  if (!repaired.join) {
    repaired.join = initialContent.join;
  } else {
    if (!repaired.join.membership) {
      repaired.join.membership = initialContent.join.membership;
    } else if (!Array.isArray(repaired.join.membership.benefits)) {
      console.warn("Repairing corrupted join.membership.benefits");
      repaired.join.membership.benefits =
        initialContent.join.membership.benefits;
    }

    if (!repaired.join.volunteering) {
      repaired.join.volunteering = initialContent.join.volunteering;
    } else if (!Array.isArray(repaired.join.volunteering.tasks)) {
      console.warn("Repairing corrupted join.volunteering.tasks");
      repaired.join.volunteering.tasks = initialContent.join.volunteering.tasks;
    }
  }

  // Validate top-level arrays
  if (!Array.isArray(repaired.projects)) {
    console.warn("Repairing corrupted projects array");
    repaired.projects = initialContent.projects;
  }

  if (!Array.isArray(repaired.events)) {
    console.warn("Repairing corrupted events array");
    repaired.events = initialContent.events;
  }

  if (!Array.isArray(repaired.rentalRequests)) {
    console.warn("Repairing corrupted rentalRequests array");
    repaired.rentalRequests = initialContent.rentalRequests;
  }

  if (!Array.isArray(repaired.inventory)) {
    console.warn("Repairing corrupted inventory array");
    repaired.inventory = initialContent.inventory;
  }

  if (!Array.isArray(repaired.rentalPacks)) {
    console.warn("Repairing corrupted rentalPacks array");
    repaired.rentalPacks = initialContent.rentalPacks || [];
  }

  if (!repaired.settings) {
    console.warn("Repairing corrupted settings object");
    repaired.settings = initialContent.settings;
  }

  return repaired;
}

import { saveToGitHub } from "./github-cms";

export async function loadContent(): Promise<SiteContent> {
  try {
    // On charge toujours le fichier statique (il est mis à jour par GitHub + Vercel redeploy)
    const response = await fetch("/data.json");
    if (!response.ok) {
      return initialContent;
    }
    const data = await response.json();
    return validateAndRepairContent(data);
  } catch (e) {
    console.error("Failed to load content, using initial content", e);
    return initialContent;
  }
}

export async function saveContent(content: SiteContent) {
  // 1. Si on est en local (dev) et que le serveur local tourne
  if (import.meta.env.DEV) {
    try {
      const response = await fetch("/api/save-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (response.ok) {
        console.log("✅ Sauvegardé localement");
        return;
      }
    } catch (e) {
      console.warn("Serveur local non disponible, tentative via GitHub...");
    }
  }

  // 2. Sinon (Production ou fallback), on utilise l'API GitHub
  try {
    await saveToGitHub(content);
    console.log("✅ Sauvegardé via GitHub");
  } catch (e) {
    console.error("Erreur sauvegarde GitHub:", e);
    throw e;
  }
}
