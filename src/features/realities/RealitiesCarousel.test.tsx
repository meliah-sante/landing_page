import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RealitiesCarousel } from "./RealitiesCarousel";

const SOURCE_COPY = [
  {
    title: "Quand l'effectif est réduit, chaque acte compte double.",
    description:
      "Moins de bras, même charge. Les transmissions s'allègent par manque de temps — pas par négligence. Par nécessité.",
  },
  {
    title: "Un lit fermé, c'est un patient refusé. Et une perte que vous payez cash.",
    description:
      "Le manque de soignants force la fermeture. Chaque lit vide a un coût direct. Immédiat. Que personne ne calcule vraiment.",
  },
  {
    title: "L'épuisement ne prévient pas.",
    description:
      "La charge administrative vide vos soignants de ce qui les a fait choisir ce métier. Et transforme vos meilleurs éléments en candidats au départ.",
  },
  {
    title: "Vos experts ne sont pas des secrétaires.",
    description: "Le temps a une valeur. Et elle disparaît dans l'administratif.",
  },
  {
    title: "L'intérimaire coûte cher. Et il ne règle rien.",
    description:
      "Vos soignants s'épuisent, vous faites appel à l'intérim. L'intérim arrive, vos permanents s'épuisent davantage — car on ne construit pas une équipe avec des personnes qui ne connaissent ni le service, ni ses patients, ni ses protocoles.",
  },
  {
    title: "La traçabilité existe. Au clavier, elle peut être écrite dans l'urgence.",
    description:
      "On trace ce qu'on peut, quand on peut. Parfois après. Parfois de mémoire. En cas de litige, c'est cette trace-là qu'on lit. Et elle dit moins que ce qui s'est vraiment passé.",
  },
  {
    title: "Vos outils ont été conçus pour une autre époque.",
    description:
      "Le soin a évolué. Les contraintes ont explosé. Les outils, eux, n'ont pas suivi. Et c'est votre équipe qui compense.",
  },
] as const;

test("locks exact source copy for every reality", async () => {
  const user = userEvent.setup();
  render(<RealitiesCarousel />);

  for (const [index, copy] of SOURCE_COPY.entries()) {
    if (index > 0) {
      await user.click(screen.getByRole("button", { name: /réalité suivante/i }));
    }

    expect(screen.getByRole("heading", { level: 3, name: copy.title })).toBeInTheDocument();
    expect(screen.getByText(copy.description)).toBeInTheDocument();
  }
});

test("moves through realities and announces progress", async () => {
  const user = userEvent.setup();
  render(<RealitiesCarousel />);
  const region = screen.getByRole("region", { name: /carrousel des réalités/i });

  expect(screen.getByText("01 / 07")).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: /réalité suivante/i }));
  expect(screen.getByText("02 / 07")).toBeInTheDocument();

  region.focus();
  await user.keyboard("{ArrowLeft}");
  expect(screen.getByText("01 / 07")).toBeInTheDocument();
});

test("applies the carousel role description to its explicit named region", () => {
  render(<RealitiesCarousel />);

  const region = screen.getByRole("region", { name: "Carrousel des réalités" });
  expect(region.getAttribute("role")).toBe("region");
  expect(region.getAttribute("aria-roledescription")).toBe("carrousel");
  expect(document.querySelectorAll("[aria-roledescription]")).toHaveLength(1);
});

test("ignores arrow keys when the carousel is not focused", async () => {
  const user = userEvent.setup();
  render(
    <>
      <button type="button">Hors carrousel</button>
      <RealitiesCarousel />
    </>,
  );

  await user.click(screen.getByRole("button", { name: /réalité suivante/i }));
  expect(screen.getByText("02 / 07")).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: /^hors carrousel$/i }));
  await user.keyboard("{ArrowLeft}");
  expect(screen.getByText("02 / 07")).toBeInTheDocument();
});

test("uses a single polite live region for slide announcements", async () => {
  const user = userEvent.setup();
  render(<RealitiesCarousel />);

  const liveRegions = document.querySelectorAll('[aria-live="polite"]');
  expect(liveRegions).toHaveLength(1);

  const announcement = liveRegions[0];
  expect(announcement).toHaveAttribute("aria-atomic", "true");
  expect(announcement).toHaveTextContent("01 / 07");
  expect(announcement).toHaveTextContent(SOURCE_COPY[0].title);
  expect(announcement).toHaveTextContent(SOURCE_COPY[0].description);

  await user.click(screen.getByRole("button", { name: /réalité suivante/i }));
  expect(announcement).toHaveTextContent("02 / 07");
  expect(announcement).toHaveTextContent(SOURCE_COPY[1].title);
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

  for (let index = 0; index < SOURCE_COPY.length - 1; index += 1) {
    await user.click(nextButton);
  }

  expect(screen.getByText("07 / 07")).toBeInTheDocument();
  expect(nextButton).toBeDisabled();
  expect(prevButton).toBeEnabled();
});

test("provides at least 44px touch targets for dot controls", () => {
  render(<RealitiesCarousel />);

  screen.getAllByRole("button", { name: /réalité \d+ sur 7/i }).forEach((dot) => {
    expect(dot.className).toMatch(/\bh-11\b/);
    expect(dot.className).toMatch(/\bw-11\b/);
    expect(within(dot).getByRole("presentation", { hidden: true })).toBeInTheDocument();
  });
});

test("shows description text in adjacent slide previews", () => {
  render(<RealitiesCarousel />);
  const region = screen.getByRole("region", { name: /carrousel des réalités/i });
  const nextSlide = within(region)
    .getAllByRole("article", { hidden: true })
    .find((slide) => slide.getAttribute("data-slide-position") === "next");

  expect(nextSlide).toBeDefined();
  expect(within(nextSlide!).getByText(SOURCE_COPY[1].description)).toBeInTheDocument();
  expect(within(nextSlide!).queryByText(SOURCE_COPY[1].title)).not.toBeInTheDocument();
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

test("keeps stable reality nodes while visibly changing slide position", async () => {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    }),
  });

  const user = userEvent.setup();
  render(<RealitiesCarousel />);

  const secondReality = document.querySelector<HTMLElement>(
    '[data-reality-key="02"]',
  );
  expect(secondReality).not.toBeNull();
  expect(secondReality).toHaveAttribute("data-slide-position", "next");
  expect(secondReality?.className).toMatch(/translate-x-4/);
  expect(secondReality?.className).toMatch(/opacity-60/);

  await user.click(screen.getByRole("button", { name: /réalité suivante/i }));

  const movedReality = document.querySelector<HTMLElement>(
    '[data-reality-key="02"]',
  );
  expect(movedReality).toBe(secondReality);
  expect(movedReality).toHaveAttribute("data-slide-position", "current");
  expect(movedReality?.className).toMatch(/translate-x-0/);
  expect(movedReality?.className).toMatch(/opacity-100/);
  expect(movedReality?.className).toMatch(/transition-\[transform,opacity\]/);
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
  document.querySelectorAll("[data-reality-key]").forEach((slide) => {
    expect(slide.className).not.toMatch(/transition-\[transform,opacity\]/);
  });
});
