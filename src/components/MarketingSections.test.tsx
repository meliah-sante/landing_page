import { render, screen } from "@testing-library/react";
import App from "../App";

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
  screen.getAllByRole("link", { name: /calculer mes pertes/i }).forEach((link) => {
    expect(link).toHaveAttribute("href", "#calculatrice");
  });
  screen.getAllByRole("link", { name: /réserver ma place pilote/i }).forEach((link) => {
    expect(link).toHaveAttribute("href", "#pilote");
  });
});
