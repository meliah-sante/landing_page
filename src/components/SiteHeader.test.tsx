import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SiteHeader } from "./SiteHeader";

const PILOT_REQUEST_URL =
  "mailto:contact@meliahsante.fr?subject=Candidature%20%C3%A9tablissement%20pilote%20AURA";

test("opens and closes mobile navigation", async () => {
  const user = userEvent.setup();
  render(<SiteHeader />);

  await user.click(screen.getByRole("button", { name: /ouvrir le menu/i }));
  expect(screen.getByRole("dialog", { name: /navigation/i })).toBeInTheDocument();

  await user.keyboard("{Escape}");
  expect(screen.queryByRole("dialog", { name: /navigation/i })).not.toBeInTheDocument();
});

test("closes mobile navigation after selecting a link", async () => {
  const user = userEvent.setup();
  render(<SiteHeader />);

  await user.click(screen.getByRole("button", { name: /ouvrir le menu/i }));
  const dialog = screen.getByRole("dialog", { name: /navigation/i });
  await user.click(within(dialog).getByRole("link", { name: /^calculer ma perte$/i }));
  expect(screen.queryByRole("dialog", { name: /navigation/i })).not.toBeInTheDocument();
});

test("keeps the pilot CTA visible outside the mobile menu with exact copy", () => {
  render(<SiteHeader />);
  const header = screen.getByRole("banner");
  const pilotLink = within(header).getByRole("link", {
    name: /^réserver ma place pilote$/i,
  });
  expect(pilotLink).toHaveAttribute("href", PILOT_REQUEST_URL);
  expect(pilotLink).not.toHaveAttribute("target");
  expect(pilotLink).not.toHaveAttribute("rel");
  expect(pilotLink.className).toMatch(/\bmin-h-11\b/);
});

test("exposes the selected language to assistive technology", () => {
  render(<SiteHeader />);
  expect(screen.getByLabelText(/langue sélectionnée\s*:\s*français/i)).toBeInTheDocument();
});

test("applies visible keyboard focus styling to the logo link", () => {
  render(<SiteHeader />);
  const logoLink = screen.getByRole("link", { name: /méliah santé/i });
  expect(logoLink.className).toMatch(/focus-visible:ring/);
  expect(logoLink.className).toMatch(/focus-visible:ring-offset/);
});

test("applies reduced-motion classes to the mobile dialog overlay and content", async () => {
  const user = userEvent.setup();
  render(<SiteHeader />);

  await user.click(screen.getByRole("button", { name: /ouvrir le menu/i }));

  const dialog = screen.getByRole("dialog", { name: /navigation/i });
  const overlay = dialog.previousElementSibling;

  expect(dialog.className).toMatch(/motion-reduce:animate-none/);
  expect(dialog.className).toMatch(/motion-reduce:transition-none/);
  expect(overlay?.className).toMatch(/motion-reduce:animate-none/);
  expect(overlay?.className).toMatch(/motion-reduce:transition-none/);
});

test("uses a compact high-contrast header state after scrolling", () => {
  render(<SiteHeader />);
  const header = screen.getByRole("banner");

  expect(header).toHaveAttribute("data-scrolled", "false");

  Object.defineProperty(window, "scrollY", {
    configurable: true,
    value: 80,
  });
  fireEvent.scroll(window);

  expect(header).toHaveAttribute("data-scrolled", "true");
  expect(header.className).toMatch(/backdrop-blur-xl/);
  expect(header.className).toMatch(/motion-reduce:transition-none/);

  Object.defineProperty(window, "scrollY", {
    configurable: true,
    value: 0,
  });
});

test("constrains and scrolls the mobile dialog within the dynamic viewport", async () => {
  const user = userEvent.setup();
  render(<SiteHeader />);

  await user.click(screen.getByRole("button", { name: /ouvrir le menu/i }));
  const dialog = screen.getByRole("dialog", { name: /navigation/i });

  expect(dialog.className).toContain("max-h-[calc(100dvh-6rem)]");
  expect(dialog.className).toContain("overflow-y-auto");

  const pilotLink = within(dialog).getByRole("link", {
    name: /^réserver ma place pilote$/i,
  });
  expect(pilotLink).toHaveAttribute("href", PILOT_REQUEST_URL);
  expect(pilotLink).not.toHaveAttribute("target");
  expect(pilotLink).not.toHaveAttribute("rel");
});

test("provides 44px mobile menu and navigation controls", async () => {
  const user = userEvent.setup();
  render(<SiteHeader />);

  const menuButton = screen.getByRole("button", { name: /ouvrir le menu/i });
  expect(menuButton.className).toMatch(/\bh-11\b/);
  expect(menuButton.className).toMatch(/\bw-11\b/);

  await user.click(menuButton);
  const dialog = screen.getByRole("dialog", { name: /navigation/i });
  const closeButton = within(dialog).getByRole("button", { name: /fermer le menu/i });
  expect(closeButton.className).toMatch(/\bh-11\b/);
  expect(closeButton.className).toMatch(/\bw-11\b/);

  within(dialog)
    .getAllByRole("link")
    .forEach((link) => expect(link.className).toMatch(/\bmin-h-11\b/));
});
