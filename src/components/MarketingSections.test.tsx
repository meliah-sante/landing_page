import { render, screen, within } from "@testing-library/react";
import App from "../App";

const PILOT_REQUEST_URL =
  "mailto:contact@meliahsante.fr?subject=Candidature%20%C3%A9tablissement%20pilote%20AURA";

test("renders the complete AURA conversion journey", () => {
  render(<App />);

  expect(
    screen.getByRole("heading", {
      name: /réinjectez 76 766€ minimum\* par an dans le soin réel\./i,
    }),
  ).toBeInTheDocument();
  expect(
    within(document.getElementById("hero")!).getByText("76 766€", { exact: true }),
  ).toHaveClass("whitespace-nowrap", "text-accent-foreground");
  expect(document.querySelector(".hero-proof-panel")).toHaveClass("bg-card", "border-border");
  expect(screen.getByText("récupérées chaque jour", { exact: true })).toHaveClass(
    "text-foreground/80",
  );
  expect(
    screen.getByRole("heading", { name: /vos soignants, eux, sont au niveau/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /combien perdez-vous exactement/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /1 seul établissement pilote/i }),
  ).toBeInTheDocument();
});

test("uses the approved five-section journey", () => {
  render(<App />);

  expect(document.getElementById("realites")).not.toBeInTheDocument();
  expect(document.getElementById("fonctionnalites")).not.toBeInTheDocument();
  expect(document.getElementById("modules")).not.toBeInTheDocument();
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
    "Chaque soignant est payé pour soigner. Pas pour saisir ou pour chercher dans les dossiers. AURA transforme la parole en traçabilité riche, structurée et horodatée.",
    "3 mois offerts. Accompagnement direct avec la fondatrice. Suivi personnalisé inclus. Tarif ancré les 12 premiers mois.",
    "Réclamer au soin le temps qui lui appartient.",
    "© 2026 Méliah Santé — Tous droits réservés",
  ].forEach((copy) => {
    expect(screen.getByText(copy, { exact: true })).toBeInTheDocument();
  });

  [
    "hero",
    "origine",
    "solution",
    "calculatrice",
    "pilote",
  ].forEach((id) => {
    expect(document.getElementById(id)).toBeInTheDocument();
  });

  const hero = document.getElementById("hero");
  expect(hero).not.toBeNull();
  expect(within(hero!).queryByRole("img", { name: /interface aura/i })).not.toBeInTheDocument();
  expect(document.querySelector('img[src*="phone-aura.png"]')).not.toBeInTheDocument();
  expect(
    within(hero!).getByRole("link", { name: /réserver ma place pilote/i }),
  ).toHaveAttribute("href", PILOT_REQUEST_URL);
  expect(within(hero!).getByRole("link", { name: /calculer mes pertes/i })).toHaveAttribute(
    "href",
    "#calculatrice",
  );
  expect(within(hero!).getByText("150 mots/min", { exact: true })).toBeInTheDocument();
  expect(within(hero!).getByText("4x plus rapide", { exact: true })).toBeInTheDocument();
  screen.getAllByRole("link", { name: /calculer mes pertes/i }).forEach((link) => {
    expect(link).toHaveAttribute("href", "#calculatrice");
  });
  screen.getAllByRole("link", { name: /réserver ma place pilote/i }).forEach((link) => {
    expect(link).toHaveAttribute("href", PILOT_REQUEST_URL);
    expect(link).not.toHaveAttribute("target");
    expect(link).not.toHaveAttribute("rel");
  });
});

test("keeps founder proof in the origin section without a repeated testimonial", () => {
  render(<App />);
  const origin = document.getElementById("origine");
  const pilot = document.getElementById("pilote");

  expect(origin).not.toBeNull();
  expect(pilot).not.toBeNull();
  expect(
    within(origin!).getByText(
      "J'ai créé AURA parce qu'en 10 ans de terrain, je sais exactement ce que coûte l'administratif : en temps, en risque, et en humanité.",
      { exact: true },
    ),
  ).toBeInTheDocument();
  expect(
    screen.queryByText(
      "La traçabilité est un acte de soin, le clavier ne doit plus être un obstacle.",
      { exact: true },
    ),
  ).not.toBeInTheDocument();
  expect(
    within(pilot!).getByRole("link", { name: /réserver ma place pilote/i }),
  ).toHaveAttribute("href", PILOT_REQUEST_URL);
});

test("uses light surfaces for founder proof, pilot, and footer", () => {
  render(<App />);
  const originQuote = document.querySelector("#origine figure");
  const pilotCard = document.querySelector("#pilote .pilot-card");
  const footer = screen.getByRole("contentinfo");

  expect(originQuote).toHaveClass("bg-accent", "text-foreground");
  expect(originQuote).not.toHaveClass("bg-charcoal", "text-white");
  expect(pilotCard).toHaveClass("bg-card", "text-foreground");
  expect(pilotCard).not.toHaveClass("bg-charcoal", "text-white");
  expect(
    within(document.getElementById("pilote")!).getByText(
      "3 mois offerts. Accompagnement direct avec la fondatrice. Suivi personnalisé inclus. Tarif ancré les 12 premiers mois.",
      { exact: true },
    ),
  ).toHaveClass("text-foreground/80");
  expect(footer).toHaveClass("bg-background", "text-foreground");
  expect(footer).not.toHaveClass("bg-charcoal", "text-white");
});

test("renders every comparison and statistic literally", () => {
  render(<App />);

  [
    ["AU CLAVIER", "40 mots/min"],
    ["À LA VOIX", "150 mots/min"],
  ].forEach(([label, value]) => {
    expect(screen.getByText(label, { exact: true })).toBeInTheDocument();
    expect(screen.getAllByText(value, { exact: true }).length).toBeGreaterThan(0);
  });

  [
    ["13h20", "minimum récupérées chaque jour sans embaucher."],
    ["76 766€", "réinjectés dans le soin réel."],
    ["1.1 ETP", "de capacité récupérée sans un seul recrutement."],
    ["4x", "plus rapide que l'écrit traçabilité vocale vs clavier."],
  ].forEach(([value, description]) => {
    expect(screen.getAllByText(value, { exact: true }).length).toBeGreaterThan(0);
    expect(screen.getByText(description, { exact: true })).toBeInTheDocument();
  });
});

test("merges the strongest proof into one scannable solution section", () => {
  render(<App />);
  const solution = document.getElementById("solution");

  expect(solution).not.toBeNull();
  [
    "150 mots/min",
    "13h20",
    "76 766€",
    "1.1 ETP",
    "4x",
    "Traçabilité structurée",
    "Priorités et transmissions",
  ].forEach((text) => {
    expect(within(solution!).getByText(text, { exact: true })).toBeInTheDocument();
  });
  expect(
    within(solution!).queryByRole("link", { name: "Prendre rendez-vous" }),
  ).not.toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /une suite complète/i })).not.toBeInTheDocument();
});

test("presents four coherent benefit and proof narratives", () => {
  render(<App />);
  const solutionElement = document.getElementById("solution")!;
  const solution = within(solutionElement);
  const capacityCard = solution
    .getByRole("heading", { name: "Temps et capacité retrouvés" })
    .closest("article");
  const traceabilityCard = solution
    .getByRole("heading", { name: "Traçabilité structurée" })
    .closest("article");
  const handoverCard = solution
    .getByRole("heading", { name: "Priorités et transmissions" })
    .closest("article");

  expect(solutionElement.querySelectorAll(".solution-benefit-card")).toHaveLength(4);
  expect(
    solutionElement.querySelector(".solution-benefit-card")?.parentElement?.parentElement,
  ).toHaveClass("md:grid-cols-2");
  expect(capacityCard).not.toBeNull();
  expect(traceabilityCard).not.toBeNull();
  expect(handoverCard).not.toBeNull();
  ["13h20", "76 766€", "1.1 ETP"].forEach((metric) => {
    expect(within(capacityCard!).getByText(metric, { exact: true })).toBeInTheDocument();
  });
  expect(traceabilityCard).toHaveTextContent(
    "Chaque information est structurée, horodatée et sécurisée.",
  );
  expect(handoverCard).toHaveTextContent(
    "Les alertes et la relève restent claires, complètes et actionnables.",
  );
});

test("uses only light semantic surfaces in the solution section", () => {
  render(<App />);
  const solution = document.getElementById("solution")!;

  expect(solution).toHaveClass("bg-background", "text-foreground");
  expect(solution).not.toHaveClass("bg-charcoal", "text-white");
  solution.querySelectorAll(".solution-benefit-card").forEach((card) => {
    expect(card).toHaveClass("border-border", "bg-card", "text-foreground");
  });
  expect(within(solution).getByText("AU CLAVIER", { exact: true })).toHaveClass(
    "text-foreground/80",
  );
  expect(within(solution).getByText("réinjectés dans le soin réel.", { exact: true })).toHaveClass(
    "text-foreground/80",
  );
});

test("uses meaningful literal destinations for conversion and legal links", () => {
  render(<App />);

  [
    ["Calculer ma perte", "#calculatrice"],
    ["Calculer mes pertes", "#calculatrice"],
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

test("exposes named landmarks", () => {
  render(<App />);

  screen.getAllByRole("region").forEach((region) => {
    expect(region).toHaveAccessibleName();
  });
  expect(screen.getByRole("navigation", { name: "Liens légaux" })).toBeInTheDocument();
});
