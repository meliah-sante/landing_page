import { assetUrl } from "./assetUrl";

test("prefixes public assets with the configured GitHub Pages base", () => {
  expect(assetUrl("assets/phone-aura.png", "/landing_page/")).toBe(
    "/landing_page/assets/phone-aura.png",
  );
});

test("normalizes slashes without breaking local asset URLs", () => {
  expect(assetUrl("/assets/meliah-logo.png", "/")).toBe("/assets/meliah-logo.png");
  expect(assetUrl("assets/meliah-logo.png", "/landing_page")).toBe(
    "/landing_page/assets/meliah-logo.png",
  );
});
