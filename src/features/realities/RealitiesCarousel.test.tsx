import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RealitiesCarousel } from "./RealitiesCarousel";
import { REALITIES } from "./realities";

test("renders the inspected source copy for the active reality", () => {
  render(<RealitiesCarousel />);

  expect(
    screen.getByRole("heading", { level: 3, name: REALITIES[0].title }),
  ).toBeInTheDocument();
  expect(screen.getByText(REALITIES[0].description)).toBeInTheDocument();
});

test("moves through realities and announces progress", async () => {
  const user = userEvent.setup();
  render(<RealitiesCarousel />);
  expect(screen.getByText("01 / 07")).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: /réalité suivante/i }));
  expect(screen.getByText("02 / 07")).toBeInTheDocument();
  await user.keyboard("{ArrowLeft}");
  expect(screen.getByText("01 / 07")).toBeInTheDocument();
});

test("announces slide progress with aria-live", async () => {
  const user = userEvent.setup();
  render(<RealitiesCarousel />);

  const progress = screen.getByText("01 / 07");
  expect(progress).toHaveAttribute("aria-live", "polite");

  await user.click(screen.getByRole("button", { name: /réalité suivante/i }));
  expect(progress).toHaveTextContent("02 / 07");
});

test("navigates with dot buttons and disables boundary controls", async () => {
  const user = userEvent.setup();
  render(<RealitiesCarousel />);

  const prevButton = screen.getByRole("button", { name: /réalité précédente/i });
  const nextButton = screen.getByRole("button", { name: /réalité suivante/i });

  expect(prevButton).toBeDisabled();
  expect(nextButton).toBeEnabled();

  await user.click(screen.getByRole("button", { name: /réalité 4 sur 7/i }));
  expect(screen.getByText("04 / 07")).toBeInTheDocument();

  for (let index = 0; index < REALITIES.length - 1; index += 1) {
    await user.click(nextButton);
  }

  expect(screen.getByText("07 / 07")).toBeInTheDocument();
  expect(nextButton).toBeDisabled();
  expect(prevButton).toBeEnabled();
});

test("responds to touch swipes above the 40px threshold", async () => {
  render(<RealitiesCarousel />);
  const region = screen.getByRole("region", { name: /carrousel des réalités/i });

  fireEvent.touchStart(region, { touches: [{ clientX: 180 }] });
  fireEvent.touchEnd(region, { changedTouches: [{ clientX: 120 }] });
  expect(screen.getByText("02 / 07")).toBeInTheDocument();

  fireEvent.touchStart(region, { touches: [{ clientX: 120 }] });
  fireEvent.touchEnd(region, { changedTouches: [{ clientX: 180 }] });
  expect(screen.getByText("01 / 07")).toBeInTheDocument();
});

test("ignores touch swipes below the 40px threshold", () => {
  render(<RealitiesCarousel />);
  const region = screen.getByRole("region", { name: /carrousel des réalités/i });

  fireEvent.touchStart(region, { touches: [{ clientX: 100 }] });
  fireEvent.touchEnd(region, { changedTouches: [{ clientX: 130 }] });
  expect(screen.getByText("01 / 07")).toBeInTheDocument();
});

test("shows adjacent slide previews on wider viewports", () => {
  render(<RealitiesCarousel />);
  const region = screen.getByRole("region", { name: /carrousel des réalités/i });
  const slides = within(region).getAllByRole("article", { hidden: true });

  expect(slides.length).toBeGreaterThan(1);
  expect(slides.some((slide) => slide.getAttribute("data-slide-position") === "current")).toBe(true);
  expect(slides.some((slide) => slide.getAttribute("data-slide-position") === "next")).toBe(true);
});

test("respects reduced motion preferences for slide transitions", () => {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: (query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    }),
  });

  render(<RealitiesCarousel />);
  const region = screen.getByRole("region", { name: /carrousel des réalités/i });
  expect(region.dataset.reducedMotion).toBe("true");
});
