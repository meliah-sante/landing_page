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

export type Stat = {
  value: string;
  description: string;
};

export const PILOT_REQUEST_URL =
  "mailto:contact@meliahsante.fr?subject=Candidature%20%C3%A9tablissement%20pilote%20AURA";

export const navigation: readonly NavigationItem[] = [
  { href: "#origine", label: "À l'origine" },
  { href: "#realites", label: "Les réalités" },
  { href: "#solution", label: "Solution" },
  { href: "#modules", label: "Modules" },
  { href: "#calculatrice", label: "Calculer ma perte" },
];

export const hero = {
  eyebrow: "SOLUTION DE TRAÇABILITÉ VOCALE",
  heading: "Réinjectez 76766€ minimum* par an dans le soin réel.",
  body: "Chaque jour, 13h20 minimum* de présence soignante s'évaporent dans l'administratif. Ce temps vous appartient. Méliah Santé vous le rend.",
  note: "*Calcul basé sur un établissement de 40 soignants - Détail disponible sur demande",
} as const;

export const origin = {
  eyebrow: "À L'ORIGINE",
  heading: "Vos soignants, eux, sont au niveau.",
  paragraphs: [
    "Pendant 10 ans, j'ai vu des soignants excellents perdre la bataille contre le temps.",
    "Pas par manque de compétence. Par manque d'outils adaptés.",
    "Cette innovation ne vient pas d'une tendance, elle vient du terrain.",
  ],
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
  eyebrow: "LA SOLUTION",
  brand: "AURA",
  heading:
    "Vous investissez dans le soin. Une partie s'évapore avant d'y arriver. AURA remet chaque minute là où vos équipes ont de la valeur.",
  body: "Chaque soignant est payé pour soigner. Pas pour saisir ou pour chercher dans les dossiers. AURA transforme la parole en traçabilité riche, structurée et horodatée.",
  comparison: [
    { label: "AU CLAVIER", value: "40 mots/min" },
    { label: "À LA VOIX", value: "150 mots/min" },
  ],
  finePrint: "CONÇU PAR UNE SOIGNANTE, POUR ÊTRE CONFORME HDS & RGPD.",
  cta: "Prendre rendez-vous",
} as const;

export const stats: readonly Stat[] = [
  { value: "13h20", description: "minimum récupérées chaque jour sans embaucher." },
  { value: "76 766€", description: "réinjectés dans le soin réel." },
  { value: "1.1 ETP", description: "récupéré par jour sans un seul recrutement." },
  { value: "4x", description: "plus rapide que l'écrit traçabilité vocale vs clavier." },
];

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
  eyebrow: "CALCULATRICE",
  heading: "Combien perdez-vous exactement ? Calculez-le en 10 secondes.",
  subheading: "Entrez votre effectif. Votre perte apparaît immédiatement.",
} as const;

export const testimonial = {
  quote: "La traçabilité est un acte de soin, le clavier ne doit plus être un obstacle.",
  attribution: "— Mélissa, fondatrice. 10 ans de terrain.",
} as const;

export const pilot = {
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
