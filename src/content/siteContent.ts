import { REALITIES } from "../features/realities/realities";

export type NavigationItem = {
  href: `#${string}`;
  label: string;
};

export type DailyFeature = {
  title: string;
  description: string;
  icon: "calendar" | "bell" | "shield" | "lock" | "mic" | "refresh";
};

export type Module = {
  name: string;
  subtitle: string;
  description: string;
  icon: "wave" | "focus" | "dome" | "priority";
};

export type SolutionStep = {
  step: string;
  title: string;
  description: string;
  icon: "mic" | "shield" | "handover";
};

export const PILOT_REQUEST_URL =
  "mailto:contact@meliahsante.fr?subject=Candidature%20%C3%A9tablissement%20pilote%20AURA";

export const navigation: readonly NavigationItem[] = [
  { href: "#origine", label: "À l'origine" },
  { href: "#solution", label: "Solution" },
  { href: "#calculatrice", label: "Calculer ma perte" },
  { href: "#pilote", label: "Pilote" },
];

export const hero = {
  eyebrow: "01 — Le coût",
  headingLead: "Réinjectez",
  amount: "76 766€",
  headingTail: "minimum* par an dans le soin réel.",
  body: "Chaque jour, 13h20 minimum* de présence soignante s'évaporent dans l'administratif. Ce temps vous appartient. Méliah Santé vous le rend.",
  note: "*Calcul basé sur un établissement de 40 soignants - Détail disponible sur demande",
  proofLabel: "Présence perdue",
  proofValue: "13h20",
  proofHint: "chaque jour, pour 40 soignants",
} as const;

export const origin = {
  eyebrow: "02 — L'origine",
  heading: "10 ans de terrain avant le produit.",
  body: "Cette innovation ne vient pas d'une tendance. Elle vient du soin réel.",
  quote:
    "J'ai créé AURA parce qu'en 10 ans de terrain, je sais exactement ce que coûte l'administratif : en temps, en risque, et en humanité.",
  attribution: "— Mélissa, fondatrice",
} as const;

export const realities = REALITIES;

export const realitiesIntro = {
  eyebrow: "VOS RÉALITÉS",
  heading: "7 réalités que votre établissement paie chaque jour.",
  subheading: "Chacune a un nom. Chacune a un coût.",
  cta: "Calculer mes pertes",
  supportingText: "Si vous en reconnaissez 2, vous savez déjà que vous perdez.",
} as const;

export const solution = {
  eyebrow: "03 — Le geste",
  brand: "AURA",
  heading: "Le soignant parle. Le dossier se structure.",
  body: "AURA transforme la parole en traçabilité riche, structurée et horodatée. Le clavier n'est plus l'intermédiaire.",
  comparison: [
    { label: "AU CLAVIER", value: "40 mots/min" },
    { label: "À LA VOIX", value: "150 mots/min" },
  ],
  capacity: "1,1 ETP retrouvé, sans recruter.",
  finePrint: "CONÇU PAR UNE SOIGNANTE, POUR ÊTRE CONFORME HDS & RGPD.",
} as const;

export const solutionSteps: readonly SolutionStep[] = [
  {
    step: "1",
    title: "Parler au moment du soin",
    description: "Le soignant dicte sans revenir au poste ni recopier.",
    icon: "mic",
  },
  {
    step: "2",
    title: "Structurer et sécuriser",
    description: "Chaque information est horodatée, exploitable, conçue pour HDS et RGPD.",
    icon: "shield",
  },
  {
    step: "3",
    title: "Préparer la relève",
    description: "FOCUS, DÔME et PRIORIS prolongent AURA : transmissions, concentration, alertes.",
    icon: "handover",
  },
] as const;

export const daily = {
  eyebrow: "AURA AU QUOTIDIEN",
  brand: "AURA",
  tagline: "Chaque jour. Chaque soin. Chaque décision.",
  body: "Vos soignants portent chaque jour le poids de décisions que personne ne voit. AURA est là. Leur assistant. Leur filet de sécurité.",
} as const;

export const dailyFeatures: readonly DailyFeature[] = [
  {
    title: "Charge de travail maîtrisée",
    description: "La journée s'organise. Les priorités sont claires dès la prise de poste.",
    icon: "calendar",
  },
  {
    title: "Alertes visibles et segmentées",
    description: "Chaque signal au bon endroit. Rien ne se note dans les dossiers.",
    icon: "bell",
  },
  {
    title: "Réduction des risques d'incident",
    description:
      "Tout est à portée de main. Chaque décision s'appuie sur des données fiables.",
    icon: "shield",
  },
  {
    title: "Filet de sécurité",
    description: "Chaque information tracée, horodatée. Rien ne se perd. Jamais.",
    icon: "lock",
  },
  {
    title: "Interrogation vocale",
    description: "Une question ? AURA répond immédiatement.",
    icon: "mic",
  },
  {
    title: "Transmission automatisée",
    description:
      "AURA génère la synthèse au poste. La relève est complète, priorisée, adaptée et prête rapidement.",
    icon: "refresh",
  },
];

export const modulesIntro = {
  eyebrow: "LES MODULES",
  heading: "Une suite complète. Qui grandit avec votre établissement.",
  subheading:
    "Commencez par ce dont vous avez le plus besoin. Ajoutez le reste quand vous êtes prêt.",
  footer: "Une suite complète qui grandit avec votre établissement.",
  cta: "Découvrir tous les modules",
} as const;

export const modules: readonly Module[] = [
  {
    name: "AURA",
    subtitle: "Traçabilité vocale",
    description:
      "AURA est invisible. Le soignant parle. AURA structure, horodate et sécurise chaque transmission en quelques secondes.",
    icon: "wave",
  },
  {
    name: "FOCUS",
    subtitle: "Fin de poste",
    description:
      "La relève structurée, complète, adaptée à chaque service. Zéro oubli. Zéro papier. La continuité du soin garantie à chaque passage de main.",
    icon: "focus",
  },
  {
    name: "DÔME",
    subtitle: "Protection des appels",
    description:
      "Plus de coupures en plein soin. Vos soignants restent concentrés là où ça compte. Moins d'interruptions, moins de risques d'erreurs.",
    icon: "dome",
  },
  {
    name: "PRIORIS",
    subtitle: "Alertes & Priorisation",
    description: "L'urgence au bon endroit, au bon moment. Sans aller-retour.",
    icon: "priority",
  },
];

export const calculator = {
  eyebrow: "04 — Votre chiffre",
  heading: "Et chez vous ?",
  subheading: "Entrez votre effectif. Le chiffre de votre établissement apparaît.",
} as const;

export const testimonial = {
  quote: "La traçabilité est un acte de soin, le clavier ne doit plus être un obstacle.",
  attribution: "— Mélissa, fondatrice. 10 ans de terrain.",
} as const;

export const pilot = {
  eyebrow: "05 — La place pilote",
  heading: "1 seul établissement pilote. Peut-être le vôtre.",
  body: "3 mois offerts. Accompagnement direct avec la fondatrice. Suivi personnalisé inclus. Tarif ancré les 12 premiers mois.",
  cta: "Réserver ma place pilote",
  smallText: "Réponse sous 48h",
} as const;

export const footer = {
  tagline: "Réclamer au soin le temps qui lui appartient.",
  links: [
    {
      href: "mailto:contact@meliahsante.fr?subject=Demande%20de%20mentions%20l%C3%A9gales",
      label: "Mentions légales",
    },
    {
      href: "mailto:contact@meliahsante.fr?subject=Demande%20de%20politique%20de%20confidentialit%C3%A9",
      label: "Politique de confidentialité",
    },
    { href: "mailto:contact@meliahsante.fr", label: "contact@meliahsante.fr" },
  ],
  copyright: "© 2026 Méliah Santé — Tous droits réservés",
} as const;
