import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LossCalculator } from "./LossCalculator";

test("switches between euro and hour results", async () => {
  render(<LossCalculator />);
  expect(screen.getByText("76 766 €")).toBeInTheDocument();
  await userEvent.click(screen.getByRole("tab", { name: /heures/i }));
  expect(screen.getByText(/13 h 20/i)).toBeInTheDocument();
});

test("reveals the detailed result only after valid local submission", async () => {
  render(<LossCalculator />);
  await userEvent.click(screen.getByRole("button", { name: /voir ma perte réelle/i }));
  expect(screen.getByText("Indiquez votre nom.")).toBeInTheDocument();
  await userEvent.type(screen.getByLabelText("Votre nom"), "Camille");
  await userEvent.type(screen.getByLabelText("Email professionnel"), "camille@clinique.fr");
  await userEvent.click(screen.getByRole("button", { name: /voir ma perte réelle/i }));
  expect(screen.getByRole("status")).toHaveTextContent(/résultat détaillé/i);
});

test("uses Radix tabs with keyboard navigation and panel relationships", async () => {
  const user = userEvent.setup();
  render(<LossCalculator />);

  const euroTab = screen.getByRole("tab", { name: /^euros$/i });
  const hourTab = screen.getByRole("tab", { name: /^heures$/i });

  expect(euroTab).toHaveAttribute("aria-selected", "true");
  expect(euroTab).toHaveAttribute("aria-controls");
  expect(hourTab).toHaveAttribute("aria-controls");

  const euroPanelId = euroTab.getAttribute("aria-controls");
  const hourPanelId = hourTab.getAttribute("aria-controls");
  expect(document.getElementById(euroPanelId!)).toBeInTheDocument();
  expect(document.getElementById(hourPanelId!)).toBeInTheDocument();

  euroTab.focus();
  await user.keyboard("{ArrowRight}");
  expect(hourTab).toHaveFocus();
  expect(hourTab).toHaveAttribute("aria-selected", "true");

  await user.keyboard("{Home}");
  expect(euroTab).toHaveFocus();
  expect(euroTab).toHaveAttribute("aria-selected", "true");

  await user.keyboard("{End}");
  expect(hourTab).toHaveFocus();
  expect(hourTab).toHaveAttribute("aria-selected", "true");
});

test("associates lead validation errors with inputs", async () => {
  const user = userEvent.setup();
  render(<LossCalculator />);

  await user.click(screen.getByRole("button", { name: /voir ma perte réelle/i }));

  const nameInput = screen.getByLabelText("Votre nom");
  const emailInput = screen.getByLabelText("Email professionnel");

  expect(nameInput).toHaveAttribute("aria-invalid", "true");
  expect(emailInput).toHaveAttribute("aria-invalid", "true");

  const nameErrorId = nameInput.getAttribute("aria-describedby");
  const emailErrorId = emailInput.getAttribute("aria-describedby");
  expect(document.getElementById(nameErrorId!)).toHaveTextContent("Indiquez votre nom.");
  expect(document.getElementById(emailErrorId!)).toHaveTextContent(
    "Indiquez un email professionnel valide.",
  );
});

test("shows staff input errors without clamping the displayed value", async () => {
  const user = userEvent.setup();
  render(<LossCalculator />);

  const staffInput = screen.getByLabelText(/nombre de soignants/i);
  await user.clear(staffInput);

  expect(staffInput).toHaveValue(null);
  expect(
    screen.getByText("Indiquez un nombre de soignants entre 1 et 1000."),
  ).toBeInTheDocument();
  expect(staffInput).toHaveAttribute("aria-invalid", "true");

  await user.type(staffInput, "1001");
  expect(staffInput).toHaveValue(1001);
  expect(
    screen.getByText("Indiquez un nombre de soignants entre 1 et 1000."),
  ).toBeInTheDocument();
});
