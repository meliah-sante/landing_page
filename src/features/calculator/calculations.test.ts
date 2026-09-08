import { calculateLoss, validateLead } from "./calculations";

test("uses the published 40-caregiver baseline", () => {
  expect(calculateLoss(40).yearlyEuros).toBe(76766);
  expect(calculateLoss(40).dailyHours).toBeCloseTo(13.333, 2);
});

test("scales results linearly", () => {
  expect(calculateLoss(20).yearlyEuros).toBe(38383);
});

test("rejects invalid lead fields", () => {
  expect(validateLead("", "hello@example")).toEqual({
    name: "Indiquez votre nom.",
    email: "Indiquez un email professionnel valide.",
  });
});
