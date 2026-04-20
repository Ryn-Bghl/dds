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

export interface SiteContent {
  home: HomePageContent;
  association: AssociationPageContent;
  contact: ContactPageContent;
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
};

export function loadContent(): SiteContent {
  const stored = localStorage.getItem("dds_content");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse stored content", e);
    }
  }
  return initialContent;
}

export function saveContent(content: SiteContent) {
  localStorage.setItem("dds_content", JSON.stringify(content));
}
