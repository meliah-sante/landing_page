export type Reality = {
  number: string;
  title: string;
  description: string;
};

export const REALITIES: Reality[] = [
  {
    number: "01",
    title: "On ne soigne pas avec un clavier",
    description:
      "Les soignants passent des heures à taper des observations au lieu d'être au chevet. La saisie manuelle détourne l'attention du geste médical.",
  },
  {
    number: "02",
    title: "L'administratif monopolise le quotidien",
    description:
      "Entre transmissions, bilans et comptes-rendus, la paperasse s'accumule plus vite que le temps disponible. Le soin devient une activité secondaire.",
  },
  {
    number: "03",
    title: "La paperasse éloigne du patient",
    description:
      "Chaque minute passée devant un écran est une minute moins passée auprès des résidents. Le vrai gâchis, c'est de voir les équipes s'éloigner du lit.",
  },
  {
    number: "04",
    title: "La traçabilité souffre du retard",
    description:
      "Quand la saisie est reportée en fin de service, les informations se perdent ou se déforment. La continuité des soins en paie le prix.",
  },
  {
    number: "05",
    title: "Le temps médical part en fumée",
    description:
      "13 h 20 par jour pour 40 soignants : c'est du soin réel qui disparaît au profit de tâches répétitives. Une hémorragie silencieuse de temps médical.",
  },
  {
    number: "06",
    title: "Les équipes s'épuisent dans les couloirs",
    description:
      "La charge administrative alimente le stress et l'épuisement professionnel. Les soignants compensent en heures supplémentaires, loin des patients.",
  },
  {
    number: "07",
    title: "L'établissement finance la saisie",
    description:
      "76 766 € par an pour 40 soignants : c'est la valeur du temps médical absorbée par l'administratif. Un coût mesurable, évitable et récupérable.",
  },
];
