import { render, screen, waitFor, within } from "@testing-library/react";
import App from "../App";

const PILOT_BOOKING_URL =
  "https://calendly.com/gestelpilotes/etablissement/15min";

test("renders the complete AURA conversion journey", () => {
  render(<App />);

  expect(screen.getByRole("heading", { name: /réinjectez 76.?766/i })).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /vos soignants, eux, sont au niveau/i }),
  ).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /une suite complète/i })).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /combien perdez-vous exactement/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /1 seul établissement pilote/i }),
  ).toBeInTheDocument();
});

test("does not render copy outside the inspected source", () => {
  render(<App />);

  [
    "AURA ÉCOUTE",
    "Transmission structurée et sécurisée",
    "PROGRAMME PILOTE",
  ].forEach((unapprovedCopy) => {
    expect(screen.queryByText(unapprovedCopy, { exact: true }) === null).toBe(true);
  });
});

test("renders the inspected source copy and connects every conversion link", () => {
  render(<App />);

  [
    "Chaque jour, 13h20 minimum* de présence soignante s'évaporent dans l'administratif. Ce temps vous appartient. Méliah Santé vous le rend.",
    "Cette innovation ne vient pas d'une tendance, elle vient du terrain.",
    "Chacune a un nom. Chacune a un coût.",
    "Chaque soignant est payé pour soigner. Pas pour saisir ou pour chercher dans les dossiers. AURA transforme la parole en traçabilité riche, structurée et horodatée.",
    "Charge de travail maîtrisée",
    "Transmission automatisée",
    "Une suite complète qui grandit avec votre établissement.",
    "La traçabilité est un acte de soin, le clavier ne doit plus être un obstacle.",
    "3 mois offerts. Accompagnement direct avec la fondatrice. Suivi personnalisé inclus. Tarif ancré les 12 premiers mois.",
    "Réclamer au soin le temps qui lui appartient.",
    "© 2026 Méliah Santé — Tous droits réservés",
  ].forEach((copy) => {
    expect(screen.getByText(copy, { exact: true })).toBeInTheDocument();
  });

  [
    "hero",
    "origine",
    "realites",
    "solution",
    "fonctionnalites",
    "modules",
    "calculatrice",
    "pilote",
  ].forEach((id) => {
    expect(document.getElementById(id)).toBeInTheDocument();
  });

  expect(screen.getByRole("img", { name: /interface aura/i })).toHaveAttribute(
    "src",
    "/assets/phone-aura.png",
  );
  const hero = document.getElementById("hero");
  expect(hero).not.toBeNull();
  expect(within(hero!).getByRole("img", { name: /interface aura/i })).toHaveAttribute(
    "src",
    "/assets/phone-aura.png",
  );
  screen.getAllByRole("link", { name: /calculer mes pertes/i }).forEach((link) => {
    expect(link).toHaveAttribute("href", "#calculatrice");
  });
  screen.getAllByRole("link", { name: /réserver ma place pilote/i }).forEach((link) => {
    expect(link).toHaveAttribute("href", PILOT_BOOKING_URL);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});

test("renders every comparison and statistic literally", () => {
  render(<App />);

  [
    ["AU CLAVIER", "40 mots/min"],
    ["À LA VOIX", "150 mots/min"],
  ].forEach(([label, value]) => {
    expect(screen.getByText(label, { exact: true })).toBeInTheDocument();
    expect(screen.getByText(value, { exact: true })).toBeInTheDocument();
  });

  [
    ["13h20", "minimum récupérées chaque jour sans embaucher."],
    ["76 766€", "réinjectés dans le soin réel."],
    ["1.1 ETP", "récupéré par jour sans un seul recrutement."],
    ["4x", "plus rapide que l'écrit traçabilité vocale vs clavier."],
  ].forEach(([value, description]) => {
    expect(screen.getByText(value, { exact: true })).toBeInTheDocument();
    expect(screen.getByText(description, { exact: true })).toBeInTheDocument();
  });
});

test("renders all daily features literally", () => {
  render(<App />);

  [
    [
      "Charge de travail maîtrisée",
      "La journée s'organise. Les priorités sont claires dès la prise de poste.",
    ],
    [
      "Alertes visibles et segmentées",
      "Chaque signal au bon endroit. Rien ne se note dans les dossiers.",
    ],
    [
      "Réduction des risques d'incident",
      "Tout est à portée de main. Chaque décision s'appuie sur des données fiables.",
    ],
    [
      "Filet de sécurité",
      "Chaque information tracée, horodatée. Rien ne se perd. Jamais.",
    ],
    ["Interrogation vocale", "Une question ? AURA répond immédiatement."],
    [
      "Transmission automatisée",
      "AURA génère la synthèse au poste. La relève est complète, priorisée, adaptée et prête rapidement.",
    ],
  ].forEach(([title, description]) => {
    expect(screen.getByRole("heading", { level: 3, name: title })).toBeInTheDocument();
    expect(screen.getByText(description, { exact: true })).toBeInTheDocument();
  });
});

test("renders all modules literally", () => {
  render(<App />);

  [
    [
      "AURA",
      "Traçabilité vocale",
      "AURA est invisible. Le soignant parle. AURA structure, horodate et sécurise chaque transmission en quelques secondes.",
    ],
    [
      "FOCUS",
      "Fin de poste",
      "La relève structurée, complète, adaptée à chaque service. Zéro oubli. Zéro papier. La continuité du soin garantie à chaque passage de main.",
    ],
    [
      "DÔME",
      "Protection des appels",
      "Plus de coupures en plein soin. Vos soignants restent concentrés là où ça compte. Moins d'interruptions, moins de risques d'erreurs.",
    ],
    [
      "PRIORIS",
      "Alertes & Priorisation",
      "L'urgence au bon endroit, au bon moment. Sans aller-retour.",
    ],
  ].forEach(([name, subtitle, description]) => {
    expect(screen.getByRole("heading", { level: 3, name })).toBeInTheDocument();
    expect(screen.getByText(subtitle, { exact: true })).toBeInTheDocument();
    expect(screen.getByText(description, { exact: true })).toBeInTheDocument();
  });
});

test("uses meaningful literal destinations for conversion and legal links", () => {
  render(<App />);

  [
    ["Calculer ma perte", "#calculatrice"],
    ["Calculer mes pertes", "#calculatrice"],
    ["Prendre rendez-vous", "#pilote"],
    ["Découvrir tous les modules", "#pilote"],
  ].forEach(([name, href]) => {
    screen.getAllByRole("link", { name }).forEach((link) => {
      expect(link.getAttribute("href")).toBe(href);
    });
  });

  const legalHref = screen
    .getByRole("link", { name: "Mentions légales" })
    .getAttribute("href");
  expect(legalHref).toBe(
    "mailto:contact@meliahsante.fr?subject=Demande%20de%20mentions%20l%C3%A9gales",
  );
  expect(decodeURIComponent(legalHref!)).toContain("Demande de mentions légales");

  const privacyHref = screen
    .getByRole("link", { name: "Politique de confidentialité" })
    .getAttribute("href");
  expect(privacyHref).toBe(
    "mailto:contact@meliahsante.fr?subject=Demande%20de%20politique%20de%20confidentialit%C3%A9",
  );
  expect(decodeURIComponent(privacyHref!)).toContain(
    "Demande de politique de confidentialité",
  );
  expect(
    screen.getByRole("link", { name: "contact@meliahsante.fr" }).getAttribute("href"),
  ).toBe("mailto:contact@meliahsante.fr");
});

test("exposes named landmarks and reduced-motion state", async () => {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: (query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    }),
  });

  render(<App />);

  screen.getAllByRole("region").forEach((region) => {
    expect(region).toHaveAccessibleName();
  });
  expect(screen.getByRole("navigation", { name: "Liens légaux" })).toBeInTheDocument();

  await waitFor(() => {
    expect(
      screen.getByRole("region", { name: "Carrousel des réalités" }),
    ).toHaveAttribute("data-reduced-motion", "true");
  });
  expect(document.querySelectorAll("[data-reduced-motion]").length).toBeGreaterThan(1);
});
