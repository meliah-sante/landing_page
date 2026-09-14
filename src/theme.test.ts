import { readFileSync } from "node:fs";
import indexHtml from "../index.html?raw";
import mainSource from "./main.tsx?raw";

const cssSource = readFileSync(`${process.cwd()}/src/index.css`, "utf8");

test("defines the approved AURA semantic color tokens", () => {
  [
    ["background", "#FFFFFF"],
    ["card", "#FFFFFF"],
    ["muted", "#F2F0ED"],
    ["border", "#E9E6E2"],
    ["foreground", "#171C26"],
    ["muted-foreground", "#6A7181"],
    ["primary", "#ee4a4e"],
    ["brand-mid", "#f75b46"],
    ["secondary", "#f6753a"],
    ["primary-foreground", "#FFFFFF"],
    ["accent", "#FDECEC"],
    ["accent-foreground", "#ca3e42"],
    ["success", "#2EB877"],
    ["destructive", "#EF4343"],
  ].forEach(([token, value]) => {
    expect(cssSource).toContain(`--color-${token}: ${value};`);
  });
  expect(cssSource).toContain("#ee4a4e");
  expect(cssSource).toContain("#f75b46");
  expect(cssSource).toContain("#f6753a");
  expect(cssSource).not.toContain("#EA2E5D");
  expect(cssSource).not.toContain("#FA942E");
  expect(cssSource).not.toContain("#B8143D");
});

test("uses self-hosted Outfit and DM Sans variable fonts", () => {
  expect(mainSource).toContain('@fontsource-variable/outfit');
  expect(mainSource).toContain('@fontsource-variable/dm-sans');
  expect(cssSource).toContain('--font-heading: "Outfit Variable"');
  expect(cssSource).toContain('--font-sans: "DM Sans Variable"');
  expect(indexHtml).not.toContain("fonts.googleapis.com");
  expect(indexHtml).not.toContain("fonts.gstatic.com");
  expect(cssSource).toMatch(/\.display-title\s*\{[^}]*@apply font-heading/s);
  expect(cssSource).toMatch(/\.section-title\s*\{[^}]*@apply font-heading/s);
});

test("uses a white browser theme color", () => {
  expect(indexHtml).toContain('<meta name="theme-color" content="#FFFFFF" />');
});

test("keeps the mobile document height content-driven", () => {
  const bodyRule = cssSource.match(/body\s*\{([^}]*)\}/)?.[1] ?? "";

  expect(bodyRule).not.toContain("min-h-screen");
});

test("keeps section height content-driven and uses the brand gradient on primary CTAs", () => {
  expect(cssSource).not.toContain("min-h-[calc(88svh-73px)]");
  expect(cssSource).toMatch(/\.section-pad\s*\{[^}]*py-12 sm:py-14 lg:py-16/);
  expect(cssSource).toMatch(/\.cta-primary[\s\S]*--gradient-brand/);
  expect(cssSource).toContain(
    "--gradient-brand: linear-gradient(135deg, #ee4a4e 0%, #f75b46 50%, #f6753a 100%)",
  );
});

test("defines accessible ink tokens for dark accent cards", () => {
  expect(cssSource).toContain("--color-ink: #141414;");
  expect(cssSource).toContain("--color-ink-foreground: #FFFFFF;");
  expect(cssSource).toContain("--color-ink-muted: #C8C4BE;");
  expect(cssSource).toMatch(/\.ink-card\s*\{/);
});
