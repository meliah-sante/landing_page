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

function clampStaffCount(staffCount: number): number {
  return Math.min(MAX_STAFF, Math.max(MIN_STAFF, Math.round(staffCount)));
}

function roundHours(value: number): number {
  return Math.round(value * 100) / 100;
}

function roundEuros(value: number): number {
  return Math.round(value);
}

export function calculateLoss(staffCount: number): LossResults {
  const count = clampStaffCount(staffCount);
  const scale = count / BASELINE_STAFF;

  const yearlyEuros = roundEuros(YEARLY_EUROS_FOR_40 * scale);
  const dailyEuros = roundEuros(yearlyEuros / WORK_DAYS_PER_YEAR);
  const monthlyEuros = roundEuros(yearlyEuros / MONTHS_PER_YEAR);

  const dailyHours = roundHours(DAILY_HOURS_FOR_40 * scale);
  const yearlyHours = roundHours(dailyHours * WORK_DAYS_PER_YEAR);
  const monthlyHours = roundHours(yearlyHours / MONTHS_PER_YEAR);

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
