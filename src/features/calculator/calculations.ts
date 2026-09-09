const YEARLY_EUROS_FOR_40 = 76766;
const DAILY_HOURS_FOR_40 = 13 + 20 / 60;
const WORK_DAYS_PER_YEAR = 230;
const MONTHS_PER_YEAR = 12;
const BASELINE_STAFF = 40;
const MIN_STAFF = 1;
const MAX_STAFF = 1000;

export type LossResults = {
  dailyEuros: number;
  monthlyEuros: number;
  yearlyEuros: number;
  dailyHours: number;
  monthlyHours: number;
  yearlyHours: number;
};

export type LeadErrors = {
  name?: string;
  email?: string;
};

export const STAFF_COUNT_ERROR =
  "Indiquez un nombre de soignants entre 1 et 1000.";

function clampStaffCount(staffCount: number): number {
  if (!Number.isFinite(staffCount)) {
    return staffCount > 0 ? MAX_STAFF : MIN_STAFF;
  }

  return Math.min(MAX_STAFF, Math.max(MIN_STAFF, Math.round(staffCount)));
}

function roundHours(value: number): number {
  return Math.round(value * 100) / 100;
}

function roundEuros(value: number): number {
  return Math.round(value);
}

export function validateStaffCount(raw: string): string | undefined {
  const trimmed = raw.trim();

  if (!trimmed) {
    return STAFF_COUNT_ERROR;
  }

  const parsed = Number.parseInt(trimmed, 10);

  if (
    !Number.isInteger(parsed) ||
    String(parsed) !== trimmed ||
    parsed < MIN_STAFF ||
    parsed > MAX_STAFF
  ) {
    return STAFF_COUNT_ERROR;
  }

  return undefined;
}

export function calculateLoss(staffCount: number): LossResults {
  const count = clampStaffCount(staffCount);
  const scale = count / BASELINE_STAFF;

  const unroundedYearlyEuros = YEARLY_EUROS_FOR_40 * scale;
  const unroundedDailyHours = DAILY_HOURS_FOR_40 * scale;

  const yearlyEuros = roundEuros(unroundedYearlyEuros);
  const dailyEuros = roundEuros(unroundedYearlyEuros / WORK_DAYS_PER_YEAR);
  const monthlyEuros = roundEuros(unroundedYearlyEuros / MONTHS_PER_YEAR);

  const dailyHours = roundHours(unroundedDailyHours);
  const yearlyHours = roundHours(unroundedDailyHours * WORK_DAYS_PER_YEAR);
  const monthlyHours = roundHours(
    (unroundedDailyHours * WORK_DAYS_PER_YEAR) / MONTHS_PER_YEAR,
  );

  return {
    dailyEuros,
    monthlyEuros,
    yearlyEuros,
    dailyHours,
    monthlyHours,
    yearlyHours,
  };
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLead(name: string, email: string): LeadErrors {
  const errors: LeadErrors = {};

  if (!name.trim()) {
    errors.name = "Indiquez votre nom.";
  }

  if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = "Indiquez un email professionnel valide.";
  }

  return errors;
}
