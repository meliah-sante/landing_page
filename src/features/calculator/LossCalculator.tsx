import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { Button } from "../../components/ui/Button";
import { cn } from "../../lib/cn";
import { calculateLoss, validateLead, type LeadErrors } from "./calculations";

type DisplayMode = "euros" | "heures";

function formatEuros(amount: number): string {
  return `${amount.toLocaleString("fr-FR")} €`;
}

function formatHours(hours: number): string {
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  if (minutes === 0) {
    return `${wholeHours} h`;
  }
  return `${wholeHours} h ${minutes.toString().padStart(2, "0")}`;
}

function clampStaffInput(value: number): number {
  if (Number.isNaN(value)) {
    return 1;
  }
  return Math.min(1000, Math.max(1, Math.round(value)));
}

const resultCards = [
  { key: "daily", label: "Par jour" },
  { key: "monthly", label: "Par mois" },
  { key: "yearly", label: "Par an" },
] as const;

export function LossCalculator() {
  const staffInputId = useId();
  const nameInputId = useId();
  const emailInputId = useId();
  const euroTabId = useId();
  const hourTabId = useId();
  const euroPanelId = useId();
  const hourPanelId = useId();

  const [mode, setMode] = useState<DisplayMode>("euros");
  const [staffCount, setStaffCount] = useState(40);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<LeadErrors>({});
  const [detailedResultVisible, setDetailedResultVisible] = useState(false);

  const loss = calculateLoss(staffCount);

  const getCardValue = (period: (typeof resultCards)[number]["key"]) => {
    if (mode === "euros") {
      const values = {
        daily: loss.dailyEuros,
        monthly: loss.monthlyEuros,
        yearly: loss.yearlyEuros,
      };
      return formatEuros(values[period]);
    }

    const values = {
      daily: loss.dailyHours,
      monthly: loss.monthlyHours,
      yearly: loss.yearlyHours,
    };
    return formatHours(values[period]);
  };

  const handleStaffChange = (rawValue: string) => {
    const parsed = Number.parseInt(rawValue, 10);
    setStaffCount(clampStaffInput(parsed));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateLead(name, email);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setDetailedResultVisible(true);
    } else {
      setDetailedResultVisible(false);
    }
  };

  const activePanelId = mode === "euros" ? euroPanelId : hourPanelId;

  return (
    <div className="rounded-3xl border border-charcoal/10 bg-white p-6 shadow-soft sm:p-8">
      <div className="mb-6">
        <label htmlFor={staffInputId} className="mb-2 block text-sm font-medium text-charcoal">
          Nombre de soignants
        </label>
        <input
          id={staffInputId}
          type="number"
          min={1}
          max={1000}
          value={staffCount}
          onChange={(event) => handleStaffChange(event.target.value)}
          className="w-full max-w-xs rounded-xl border border-charcoal/15 bg-warm-white px-4 py-3 text-base text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        />
      </div>

      <div
        role="tablist"
        aria-label="Mode d'affichage des résultats"
        className="mb-6 inline-flex rounded-full border border-charcoal/10 bg-warm-white p-1"
      >
        <button
          type="button"
          role="tab"
          id={euroTabId}
          aria-selected={mode === "euros"}
          aria-controls={euroPanelId}
          tabIndex={mode === "euros" ? 0 : -1}
          onClick={() => setMode("euros")}
          className={cn(
            "min-h-11 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50 focus-visible:ring-offset-2",
            mode === "euros"
              ? "bg-coral text-white"
              : "text-charcoal/70 hover:text-charcoal",
          )}
        >
          Euros
        </button>
        <button
          type="button"
          role="tab"
          id={hourTabId}
          aria-selected={mode === "heures"}
          aria-controls={hourPanelId}
          tabIndex={mode === "heures" ? 0 : -1}
          onClick={() => setMode("heures")}
          className={cn(
            "min-h-11 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50 focus-visible:ring-offset-2",
            mode === "heures"
              ? "bg-coral text-white"
              : "text-charcoal/70 hover:text-charcoal",
          )}
        >
          Heures
        </button>
      </div>

      <div
        role="tabpanel"
        id={activePanelId}
        aria-labelledby={mode === "euros" ? euroTabId : hourTabId}
        className="mb-8 grid gap-4 sm:grid-cols-3"
      >
        {resultCards.map((card) => (
          <article
            key={card.key}
            className="rounded-2xl border border-charcoal/10 bg-warm-white p-5 text-center"
          >
            <p className="mb-2 text-sm font-medium text-charcoal/60">{card.label}</p>
            <p className="text-2xl font-semibold text-charcoal">{getCardValue(card.key)}</p>
          </article>
        ))}
      </div>

      <Accordion.Root type="single" collapsible className="mb-8">
        <Accordion.Item value="methodology" className="rounded-2xl border border-charcoal/10">
          <Accordion.Header>
            <Accordion.Trigger className="group flex min-h-11 w-full items-center justify-between gap-3 px-5 py-4 text-left text-sm font-semibold text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50 focus-visible:ring-inset">
              Comment ces chiffres sont calculés
              <ChevronDown
                className="h-4 w-4 shrink-0 text-charcoal/50 transition-transform group-data-[state=open]:rotate-180"
                aria-hidden="true"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden px-5 pb-4 text-sm leading-relaxed text-charcoal/70 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            Les estimations partent d&apos;une référence de 40 soignants : 13 h 20
            récupérées par jour et 76 766 € par an. Les valeurs évoluent
            proportionnellement au nombre de soignants, sur 230 jours ouvrés et 12 mois.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor={nameInputId} className="mb-2 block text-sm font-medium text-charcoal">
            Votre nom
          </label>
          <input
            id={nameInputId}
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-xl border border-charcoal/15 bg-warm-white px-4 py-3 text-base text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          />
          {errors.name ? (
            <p className="mt-2 text-sm text-coral" role="alert">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={emailInputId} className="mb-2 block text-sm font-medium text-charcoal">
            Email professionnel
          </label>
          <input
            id={emailInputId}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-xl border border-charcoal/15 bg-warm-white px-4 py-3 text-base text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          />
          {errors.email ? (
            <p className="mt-2 text-sm text-coral" role="alert">
              {errors.email}
            </p>
          ) : null}
        </div>

        <Button type="submit" className="min-h-11 w-full sm:w-auto">
          Voir ma perte réelle
        </Button>
      </form>

      {detailedResultVisible ? (
        <div
          role="status"
          className="mt-6 rounded-2xl border border-coral/20 bg-coral/5 p-5 text-sm text-charcoal"
        >
          <p className="font-semibold">Votre résultat détaillé</p>
          <p className="mt-2 text-charcoal/80">
            Pour {staffCount} soignant{staffCount > 1 ? "s" : ""}, la perte estimée
            s&apos;élève à {formatEuros(loss.yearlyEuros)} par an, soit{" "}
            {formatHours(loss.dailyHours)} par jour ouvré.
          </p>
        </div>
      ) : null}
    </div>
  );
}
