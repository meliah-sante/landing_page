import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LossCalculator } from "./LossCalculator";

test("switches between euro and hour results", async () => {
  const user = userEvent.setup();
  render(<LossCalculator />);
  expect(screen.getByText("76 766 €")).toBeInTheDocument();
  await user.click(screen.getByRole("tab", { name: /heures/i }));
  expect(
    within(screen.getByRole("tabpanel", { name: "Heures" })).getByText(/13 h 20/i),
  ).toBeInTheDocument();
});

test("announces valid staff updates once with a concise active-mode summary", () => {
  render(<LossCalculator />);

  const calculator = screen.getByRole("spinbutton", {
    name: "Nombre de soignants",
  }).closest<HTMLElement>(".rounded-3xl")!;
  const liveSummary = within(calculator).getByRole("status");

  expect(liveSummary).toHaveAttribute("aria-live", "polite");
  expect(liveSummary).toHaveAttribute("aria-atomic", "true");
  expect(liveSummary).toHaveClass("sr-only");
  expect(liveSummary).toHaveTextContent(
    "Pour 40 soignants : 334 € par jour, 6 397 € par mois, 76 766 € par an.",
  );
  expect(calculator.querySelectorAll('[aria-live="polite"]')).toHaveLength(1);

  fireEvent.change(screen.getByLabelText("Nombre de soignants"), {
    target: { value: "20" },
  });

  expect(liveSummary).toHaveTextContent(
    "Pour 20 soignants : 167 € par jour, 3 199 € par mois, 38 383 € par an.",
  );
});

test("announces the controlled active result mode without duplicate live regions", async () => {
  const user = userEvent.setup();
  render(<LossCalculator />);

  const liveSummary = screen.getByRole("status");
  await user.click(screen.getByRole("tab", { name: "Heures" }));

  expect(screen.getByRole("tab", { name: "Heures" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  expect(liveSummary).toHaveTextContent(
    "Pour 40 soignants : 13 h 20 par jour, 255 h 34 par mois, 3 066 h 40 par an.",
  );
  expect(document.querySelectorAll('[aria-live="polite"]')).toHaveLength(1);
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
  const detail = screen.getByRole("heading", {
    name: "Votre résultat détaillé",
  }).parentElement!;
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

test("identifies required lead fields before validation without changing labels", () => {
  render(<LossCalculator />);

  const guidance = screen.getByText("Tous les champs ci-dessous sont obligatoires.");
  expect(guidance).toBeVisible();

  [
    ["Votre nom", "name"],
    ["Email professionnel", "email"],
  ].forEach(([label, autocomplete]) => {
    const input = screen.getByRole("textbox", { name: label });
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("aria-required", "true");
    expect(input).toHaveAttribute("autocomplete", autocomplete);
    expect(input.getAttribute("aria-describedby")?.split(" ")).toContain(guidance.id);
  });
});

test("clears each prior lead error as soon as that field becomes valid", async () => {
  const user = userEvent.setup();
  render(<LossCalculator />);

  await user.click(screen.getByRole("button", { name: /voir ma perte réelle/i }));
  const nameInput = screen.getByRole("textbox", { name: "Votre nom" });
  const emailInput = screen.getByRole("textbox", { name: "Email professionnel" });

  await user.type(nameInput, " ");
  expect(nameInput).toHaveAttribute("aria-invalid", "true");
  expect(screen.getByText("Indiquez votre nom.")).toBeInTheDocument();

  await user.type(nameInput, "Camille");
  expect(nameInput).not.toHaveAttribute("aria-invalid");
  expect(screen.queryByText("Indiquez votre nom.")).not.toBeInTheDocument();

  await user.type(emailInput, "adresse-invalide");
  expect(emailInput).toHaveAttribute("aria-invalid", "true");
  expect(
    screen.getByText("Indiquez un email professionnel valide."),
  ).toBeInTheDocument();

  await user.clear(emailInput);
  await user.type(emailInput, "camille@clinique.fr");
  expect(emailInput).not.toHaveAttribute("aria-invalid");
  expect(
    screen.queryByText("Indiquez un email professionnel valide."),
  ).not.toBeInTheDocument();
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

  const nameDescriptionIds = nameInput.getAttribute("aria-describedby")!.split(" ");
  const emailDescriptionIds = emailInput.getAttribute("aria-describedby")!.split(" ");
  expect(document.getElementById(nameDescriptionIds.at(-1)!)).toHaveTextContent(
    "Indiquez votre nom.",
  );
  expect(document.getElementById(emailDescriptionIds.at(-1)!)).toHaveTextContent(
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
