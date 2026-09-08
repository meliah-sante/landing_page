import { render, screen, within } from "@testing-library/react";
import App from "./App";

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
  ).toHaveAttribute("href", "#pilote");
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
