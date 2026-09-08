import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SiteHeader } from "./SiteHeader";

const PILOT_BOOKING_URL =
  "https://calendly.com/gestelpilotes/etablissement/15min";

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
  expect(pilotLink).toHaveAttribute("href", PILOT_BOOKING_URL);
  expect(pilotLink).toHaveAttribute("target", "_blank");
  expect(pilotLink).toHaveAttribute("rel", "noopener noreferrer");
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
  expect(pilotLink).toHaveAttribute("href", PILOT_BOOKING_URL);
  expect(pilotLink).toHaveAttribute("target", "_blank");
  expect(pilotLink).toHaveAttribute("rel", "noopener noreferrer");
});
