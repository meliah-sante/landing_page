import { calculateLoss, validateLead, validateStaffCount } from "./calculations";

test("uses the published 40-caregiver baseline", () => {
  expect(calculateLoss(40).yearlyEuros).toBe(76766);
  expect(calculateLoss(40).dailyHours).toBeCloseTo(13.333, 2);
});

test("scales results linearly", () => {
  expect(calculateLoss(20).yearlyEuros).toBe(38383);
});

test("derives each period from unrounded baselines before rounding", () => {
  expect(calculateLoss(40).monthlyHours).toBe(255.56);
  expect(calculateLoss(40).yearlyHours).toBe(3066.67);
  expect(calculateLoss(50).monthlyEuros).toBe(7996);
  expect(calculateLoss(77).dailyEuros).toBe(642);
});

test("rejects invalid lead fields", () => {
  expect(validateLead("", "hello@example")).toEqual({
    name: "Indiquez votre nom.",
    email: "Indiquez un email professionnel valide.",
  });
});

test("rejects empty or out-of-range staff counts", () => {
  expect(validateStaffCount("")).toBe(
    "Indiquez un nombre de soignants entre 1 et 1000.",
  );
  expect(validateStaffCount("1001")).toBe(
    "Indiquez un nombre de soignants entre 1 et 1000.",
  );
  expect(validateStaffCount("40")).toBeUndefined();
});
