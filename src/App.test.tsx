import { render, screen, within } from "@testing-library/react";
import indexHtml from "../index.html?raw";
import App from "./App";

const PILOT_REQUEST_URL =
  "mailto:contact@meliahsante.fr?subject=Candidature%20%C3%A9tablissement%20pilote%20AURA";

const expectedSectionIds = [
  "hero",
  "origine",
  "realites",
  "solution",
  "fonctionnalites",
  "modules",
  "calculatrice",
  "pilote",
];

test("renders the primary navigation and page landmarks", () => {
  render(<App />);
  const header = screen.getByRole("banner");
  expect(header).toBeInTheDocument();
  expect(screen.getByRole("main")).toBeInTheDocument();
  expect(
    within(header).getByRole("link", { name: /réserver ma place pilote/i }),
  ).toHaveAttribute("href", PILOT_REQUEST_URL);
});

test("offers a focus-visible skip link targeting the main content", () => {
  render(<App />);

  const skipLink = screen.getByRole("link", { name: "Aller au contenu principal" });
  expect(skipLink).toHaveAttribute("href", "#contenu-principal");
  expect(skipLink.className.split(" ")).toContain("fixed");
  expect(skipLink.className).toContain("-translate-y-[200%]");
  expect(skipLink.className).toContain("focus:translate-y-0");
  expect(skipLink.className).not.toContain("focus:not-sr-only");
  expect(skipLink.className.split(" ")).not.toContain("sr-only");

  const main = screen.getByRole("main");
  expect(main).toHaveAttribute("id", "contenu-principal");
  expect(main).toHaveAttribute("tabindex", "-1");
});

test("renders section landmarks in the approved order", () => {
  render(<App />);
  const main = screen.getByRole("main");
  const sections = within(main).getAllByRole("region");

  expect(sections).toHaveLength(expectedSectionIds.length);
  sections.forEach((section, index) => {
    expect(section).toHaveAttribute("id", expectedSectionIds[index]);
  });
});

test("does not load unused Google font or preconnect resources", () => {
  expect(indexHtml).not.toContain("fonts.googleapis.com");
  expect(indexHtml).not.toContain("fonts.gstatic.com");
  expect(indexHtml).not.toMatch(/rel=["']preconnect["']/);
});

test("provides useful local metadata without inventing a canonical URL", () => {
  expect(indexHtml).toContain(
    '<meta name="description" content="AURA aide les établissements de santé à réduire le temps administratif grâce à une traçabilité vocale structurée et sécurisée." />',
  );
  expect(indexHtml).toContain('<meta property="og:title" content="AURA — Méliah Santé" />');
  expect(indexHtml).toContain(
    '<meta property="og:description" content="Réduisez le temps administratif de vos soignants avec la traçabilité vocale AURA." />',
  );
  expect(indexHtml).toContain('<meta property="og:type" content="website" />');
  expect(indexHtml).toContain('<meta name="theme-color" content="#f7f4ef" />');
  expect(indexHtml).toContain(
    '<link rel="icon" type="image/png" href="/assets/meliah-logo.png" />',
  );
  expect(indexHtml).not.toMatch(/rel=["']canonical["']/);
  expect(indexHtml).not.toMatch(/https?:\/\/(example|localhost)/);
});
