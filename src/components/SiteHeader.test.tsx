import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SiteHeader } from "./SiteHeader";

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
  expect(
    within(header).getByRole("link", { name: /^réserver ma place pilote$/i }),
  ).toHaveAttribute("href", "#pilote");
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
