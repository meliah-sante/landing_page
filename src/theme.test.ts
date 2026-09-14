import { readFileSync } from "node:fs";
import indexHtml from "../index.html?raw";
import mainSource from "./main.tsx?raw";

const cssSource = readFileSync(`${process.cwd()}/src/index.css`, "utf8");

test("defines the approved AURA semantic color tokens", () => {
  [
    ["background", "#FBFAF9"],
    ["card", "#FFFFFF"],
    ["muted", "#F2F0ED"],
    ["border", "#E9E6E2"],
    ["foreground", "#171C26"],
    ["muted-foreground", "#6A7181"],
    ["primary", "#EA2E5D"],
    ["secondary", "#FA942E"],
    ["primary-foreground", "#FFFFFF"],
    ["accent", "#FCE8ED"],
    ["accent-foreground", "#B8143D"],
    ["success", "#2EB877"],
    ["destructive", "#EF4343"],
  ].forEach(([token, value]) => {
    expect(cssSource).toContain(`--color-${token}: ${value};`);
  });
});

test("uses self-hosted Outfit and DM Sans variable fonts", () => {
  expect(mainSource).toContain('@fontsource-variable/outfit');
  expect(mainSource).toContain('@fontsource-variable/dm-sans');
  expect(cssSource).toContain('--font-heading: "Outfit Variable"');
  expect(cssSource).toContain('--font-sans: "DM Sans Variable"');
  expect(indexHtml).not.toContain("fonts.googleapis.com");
  expect(indexHtml).not.toContain("fonts.gstatic.com");
});

test("uses the approved ivory browser theme color", () => {
  expect(indexHtml).toContain('<meta name="theme-color" content="#FBFAF9" />');
});
