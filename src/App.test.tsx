import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the primary navigation and page landmarks", () => {
  render(<App />);
  expect(screen.getByRole("banner")).toBeInTheDocument();
  expect(screen.getByRole("main")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /réserver ma place pilote/i })).toHaveAttribute(
    "href",
    "#pilote",
  );
});
