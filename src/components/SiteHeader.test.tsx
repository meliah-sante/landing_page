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
  await user.click(within(dialog).getByRole("link", { name: /^calculatrice$/i }));
  expect(screen.queryByRole("dialog", { name: /navigation/i })).not.toBeInTheDocument();
});

test("keeps the pilot CTA visible outside the mobile menu", () => {
  render(<SiteHeader />);
  const header = screen.getByRole("banner");
  expect(
    within(header).getByRole("link", { name: /réserver pilote/i }),
  ).toHaveAttribute("href", "#pilote");
});
