import { render, screen, within } from "@testing-library/react";
import App from "../App";

const PILOT_REQUEST_URL =
  "mailto:contact@meliahsante.fr?subject=Candidature%20%C3%A9tablissement%20pilote%20AURA";

test("renders the complete AURA conversion journey", () => {
  render(<App />);

  expect(screen.getByRole("heading", { name: /réinjectez 76.?766/i })).toBeInTheDocument();
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
    "solution",
    "calculatrice",
    "pilote",
  ].forEach((id) => {
    expect(document.getElementById(id)).toBeInTheDocument();
  });

  const hero = document.getElementById("hero");
  expect(hero).not.toBeNull();
  const heroArtwork = within(hero!).getByRole("img", { name: /interface aura/i });
  expect(heroArtwork).toHaveAttribute("src", "/assets/phone-aura.png");
  expect(heroArtwork).toHaveAttribute("loading", "eager");
  expect(heroArtwork).toHaveAttribute("fetchpriority", "high");
  screen.getAllByRole("link", { name: /calculer mes pertes/i }).forEach((link) => {
    expect(link).toHaveAttribute("href", "#calculatrice");
  });
  screen.getAllByRole("link", { name: /réserver ma place pilote/i }).forEach((link) => {
    expect(link).toHaveAttribute("href", PILOT_REQUEST_URL);
    expect(link).not.toHaveAttribute("target");
    expect(link).not.toHaveAttribute("rel");
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

test("uses meaningful literal destinations for conversion and legal links", () => {
  render(<App />);

  [
    ["Calculer ma perte", "#calculatrice"],
    ["Calculer mes pertes", "#calculatrice"],
    ["Prendre rendez-vous", "#pilote"],
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
