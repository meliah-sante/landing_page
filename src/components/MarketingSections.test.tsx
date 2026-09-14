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
  ).toHaveClass("whitespace-nowrap", "brand-amount");
  expect(document.querySelector(".hero-proof-panel")).toHaveClass("bg-card", "border-border");
  expect(screen.getByText("chaque jour, pour 40 soignants", { exact: true })).toHaveClass(
    "text-foreground/80",
  );
  expect(
    screen.getByRole("heading", { name: /10 ans de terrain avant le produit/i }),
  ).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /et chez vous \?/i })).toBeInTheDocument();
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

test("advances one claim per section without repeating proof", () => {
  render(<App />);

  [
    "01 — Le coût",
    "02 — L'origine",
    "03 — Le geste",
    "04 — Votre chiffre",
    "05 — La place pilote",
  ].forEach((eyebrow) => {
    expect(screen.getByText(eyebrow, { exact: true })).toBeInTheDocument();
  });

  expect(screen.getAllByText("76 766€", { exact: true })).toHaveLength(1);
  expect(screen.getAllByText("13h20", { exact: true })).toHaveLength(1);
  expect(screen.getAllByText("150 mots/min", { exact: true })).toHaveLength(1);
  expect(screen.getAllByText("40 mots/min", { exact: true })).toHaveLength(1);

  const hero = within(document.getElementById("hero")!);
  const origin = within(document.getElementById("origine")!);
  const solution = within(document.getElementById("solution")!);
  const calculator = within(document.getElementById("calculatrice")!);

  expect(hero.getByText("76 766€", { exact: true })).toBeInTheDocument();
  expect(hero.getByText("13h20", { exact: true })).toBeInTheDocument();
  expect(hero.queryByText("150 mots/min", { exact: true })).not.toBeInTheDocument();
  expect(origin.queryByText("76 766€", { exact: true })).not.toBeInTheDocument();
  expect(solution.queryByText("76 766€", { exact: true })).not.toBeInTheDocument();
  expect(solution.queryByText("13h20", { exact: true })).not.toBeInTheDocument();
  expect(solution.getByText("150 mots/min", { exact: true })).toBeInTheDocument();
  expect(calculator.queryByText("Combien perdez-vous exactement ? Calculez-le en 10 secondes.", { exact: true })).not.toBeInTheDocument();
});

test("renders the inspected source copy and connects every conversion link", () => {
  render(<App />);

  [
    "Chaque jour, 13h20 minimum* de présence soignante s'évaporent dans l'administratif. Ce temps vous appartient. Méliah Santé vous le rend.",
    "Cette innovation ne vient pas d'une tendance. Elle vient du soin réel.",
    "AURA transforme la parole en traçabilité riche, structurée et horodatée. Le clavier n'est plus l'intermédiaire.",
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
  expect(hero).not.toHaveClass("min-h-[calc(88svh-73px)]");
  expect(hero!.querySelector(".container")).not.toHaveClass("min-h-[calc(88svh-73px)]");
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

test("renders the voice comparison once as the solution mechanism", () => {
  render(<App />);
  const solution = within(document.getElementById("solution")!);

  [
    ["AU CLAVIER", "40 mots/min"],
    ["À LA VOIX", "150 mots/min"],
  ].forEach(([label, value]) => {
    expect(solution.getByText(label, { exact: true })).toBeInTheDocument();
    expect(solution.getByText(value, { exact: true })).toBeInTheDocument();
  });
  expect(solution.getByText("1,1 ETP retrouvé, sans recruter.", { exact: true })).toBeInTheDocument();
});

test("presents three sequential solution steps", () => {
  render(<App />);
  const solutionElement = document.getElementById("solution")!;
  const solution = within(solutionElement);

  expect(solutionElement.querySelectorAll(".solution-benefit-card")).toHaveLength(3);
  expect(
    solutionElement.querySelector(".solution-benefit-card")?.parentElement?.parentElement,
  ).toHaveClass("md:grid-cols-3");
  expect(solution.getByRole("heading", { name: "Parler au moment du soin" })).toBeInTheDocument();
  expect(solution.getByRole("heading", { name: "Structurer et sécuriser" })).toBeInTheDocument();
  expect(solution.getByRole("heading", { name: "Préparer la relève" })).toBeInTheDocument();
  expect(
    solution.queryByRole("heading", { name: "Temps et capacité retrouvés" }),
  ).not.toBeInTheDocument();
  expect(
    within(solutionElement).queryByRole("link", { name: "Prendre rendez-vous" }),
  ).not.toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /une suite complète/i })).not.toBeInTheDocument();
});

test("keeps the solution section light and puts ink only on selected cards", () => {
  render(<App />);
  const solution = document.getElementById("solution")!;
  const keyboardCard = within(solution).getByText("AU CLAVIER", { exact: true }).closest("article");
  const voiceCard = within(solution).getByText("À LA VOIX", { exact: true }).closest("article");

  expect(solution).toHaveClass("bg-background", "text-foreground");
  expect(solution).not.toHaveClass("bg-charcoal", "text-white");
  expect(keyboardCard).not.toHaveClass("ink-card");
  expect(voiceCard).toHaveClass("ink-card");
  solution.querySelectorAll(".solution-benefit-card").forEach((card) => {
    expect(card).toHaveClass("ink-card");
  });
  expect(within(solution).getByText("AU CLAVIER", { exact: true })).toHaveClass(
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
