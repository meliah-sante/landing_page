export type Reality = {
  number: string;
  title: string;
  description: string;
};

export const REALITIES: Reality[] = [
  {
    number: "01",
    title: "Quand l'effectif est réduit, chaque acte compte double.",
    description:
      "Moins de bras, même charge. Les transmissions s'allègent par manque de temps — pas par négligence. Par nécessité.",
  },
  {
    number: "02",
    title: "Un lit fermé, c'est un patient refusé. Et une perte que vous payez cash.",
    description:
      "Le manque de soignants force la fermeture. Chaque lit vide a un coût direct. Immédiat. Que personne ne calcule vraiment.",
  },
  {
    number: "03",
    title: "L'épuisement ne prévient pas.",
    description:
      "La charge administrative vide vos soignants de ce qui les a fait choisir ce métier. Et transforme vos meilleurs éléments en candidats au départ.",
  },
  {
    number: "04",
    title: "Vos experts ne sont pas des secrétaires.",
    description: "Le temps a une valeur. Et elle disparaît dans l'administratif.",
  },
  {
    number: "05",
    title: "L'intérimaire coûte cher. Et il ne règle rien.",
    description:
      "Vos soignants s'épuisent, vous faites appel à l'intérim. L'intérim arrive, vos permanents s'épuisent davantage — car on ne construit pas une équipe avec des personnes qui ne connaissent ni le service, ni ses patients, ni ses protocoles.",
  },
  {
    number: "06",
    title: "La traçabilité existe. Au clavier, elle peut être écrite dans l'urgence.",
    description:
      "On trace ce qu'on peut, quand on peut. Parfois après. Parfois de mémoire. En cas de litige, c'est cette trace-là qu'on lit. Et elle dit moins que ce qui s'est vraiment passé.",
  },
  {
    number: "07",
    title: "Vos outils ont été conçus pour une autre époque.",
    description:
      "Le soin a évolué. Les contraintes ont explosé. Les outils, eux, n'ont pas suivi. Et c'est votre équipe qui compense.",
  },
];
