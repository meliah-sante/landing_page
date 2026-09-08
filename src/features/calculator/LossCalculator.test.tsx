import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LossCalculator } from "./LossCalculator";

test("switches between euro and hour results", async () => {
  const user = userEvent.setup();
  render(<LossCalculator />);
  expect(screen.getByText("76 766 €")).toBeInTheDocument();
  await user.click(screen.getByRole("tab", { name: /heures/i }));
  expect(screen.getByText(/13 h 20/i)).toBeInTheDocument();
});

test("uses an accessible unfocused boundary on every form input", () => {
  render(<LossCalculator />);

  [
    screen.getByRole("spinbutton", { name: "Nombre de soignants" }),
    screen.getByRole("textbox", { name: "Votre nom" }),
    screen.getByRole("textbox", { name: "Email professionnel" }),
  ].forEach((input) => {
    expect(input.className.split(" ")).toContain("border-charcoal/50");
  });
});

test("reveals the detailed result only after valid local submission", async () => {
  const user = userEvent.setup();
  render(<LossCalculator />);
  await user.click(screen.getByRole("button", { name: /voir ma perte réelle/i }));
  expect(screen.getByText("Indiquez votre nom.")).toBeInTheDocument();
  await user.type(screen.getByLabelText("Votre nom"), "Camille");
  await user.type(screen.getByLabelText("Email professionnel"), "camille@clinique.fr");
  await user.click(screen.getByRole("button", { name: /voir ma perte réelle/i }));
  const detail = screen.getByRole("status");
  expect(detail).toHaveTextContent(/résultat détaillé/i);
  expect(detail).toHaveTextContent("334 €");
  expect(detail).toHaveTextContent("6 397 €");
  expect(detail).toHaveTextContent("76 766 €");
  expect(detail).toHaveTextContent("13 h 20");
  expect(detail).toHaveTextContent("255 h 34");
  expect(detail).toHaveTextContent("3 066 h 40");
  expect(detail).toHaveTextContent(
    "Vos données sont traitées localement dans votre navigateur. Elles ne sont ni envoyées ni enregistrées.",
  );
});

test("shows the local-processing disclosure before collecting lead details", () => {
  render(<LossCalculator />);

  const disclosure = screen.getByText(
    "Vos données sont traitées localement dans votre navigateur. Elles ne sont ni envoyées ni enregistrées.",
  );
  const nameInput = screen.getByRole("textbox", { name: "Votre nom" });

  expect(disclosure.compareDocumentPosition(nameInput)).toBe(
    Node.DOCUMENT_POSITION_FOLLOWING,
  );
});

test("hides detailed results and labels stale previews when staff input becomes invalid", async () => {
  const user = userEvent.setup();
  render(<LossCalculator />);

  await user.type(screen.getByLabelText("Votre nom"), "Camille");
  await user.type(screen.getByLabelText("Email professionnel"), "camille@clinique.fr");
  await user.click(screen.getByRole("button", { name: /voir ma perte réelle/i }));
  expect(screen.getByText(/votre résultat détaillé/i)).toBeInTheDocument();

  await user.clear(screen.getByLabelText(/nombre de soignants/i));

  expect(screen.queryByText(/votre résultat détaillé/i)).not.toBeInTheDocument();
  expect(
    screen.getByText(
      "Aperçu calculé pour le dernier effectif valide : 40 soignants.",
    ),
  ).toBeInTheDocument();
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

  await user.click(euroTab);
  await user.keyboard("{ArrowRight}");
  await waitFor(() => {
    expect(hourTab).toHaveFocus();
    expect(hourTab).toHaveAttribute("aria-selected", "true");
  });

  await user.keyboard("{Home}");
  await waitFor(() => {
    expect(euroTab).toHaveFocus();
    expect(euroTab).toHaveAttribute("aria-selected", "true");
  });

  await user.keyboard("{End}");
  await waitFor(() => {
    expect(hourTab).toHaveFocus();
    expect(hourTab).toHaveAttribute("aria-selected", "true");
  });
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
