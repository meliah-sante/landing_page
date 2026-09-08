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
