import { readFileSync } from "node:fs";

const workflow = readFileSync(`${process.cwd()}/.github/workflows/deploy-pages.yml`, "utf8");

test("builds GitHub Pages at the custom domain root", () => {
  expect(workflow).toMatch(/VITE_BASE_PATH:\s*\/\s*$/m);
  expect(workflow).not.toContain("/landing_page/");
});
