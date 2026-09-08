import * as Accordion from "@radix-ui/react-accordion";
import * as Tabs from "@radix-ui/react-tabs";
import { ChevronDown } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { Button } from "../../components/ui/Button";
import { cn } from "../../lib/cn";
import {
  calculateLoss,
  STAFF_COUNT_ERROR,
  validateLead,
  validateStaffCount,
  type LeadErrors,
} from "./calculations";

function formatEuros(amount: number): string {
  return `${amount.toLocaleString("fr-FR")} €`;
}

function formatHours(hours: number): string {
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  const formattedWholeHours = wholeHours.toLocaleString("fr-FR");
  if (minutes === 0) {
    return `${formattedWholeHours} h`;
  }
  return `${formattedWholeHours} h ${minutes.toString().padStart(2, "0")}`;
}

const resultCards = [
  { key: "daily", label: "Par jour" },
  { key: "monthly", label: "Par mois" },
  { key: "yearly", label: "Par an" },
] as const;

const inputClassName =
  "w-full rounded-xl border border-charcoal/50 bg-warm-white px-4 py-3 text-base text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-accessible focus-visible:ring-offset-2 focus-visible:ring-offset-white";

type ResultPeriod = (typeof resultCards)[number]["key"];

function getPeriodValue(
  mode: "euros" | "heures",
  loss: ReturnType<typeof calculateLoss>,
  period: ResultPeriod,
) {
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
}

function ResultCards({
  mode,
  loss,
}: {
  mode: "euros" | "heures";
  loss: ReturnType<typeof calculateLoss>;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {resultCards.map((card) => (
        <article
          key={card.key}
          className="rounded-2xl border border-charcoal/10 bg-warm-white p-5 text-center"
        >
          <p className="mb-2 text-sm font-medium text-charcoal/70">{card.label}</p>
          <p className="text-2xl font-semibold text-charcoal">
            {getPeriodValue(mode, loss, card.key)}
          </p>
        </article>
      ))}
    </div>
  );
}

function DetailedBreakdown({
  loss,
  staffCount,
}: {
  loss: ReturnType<typeof calculateLoss>;
  staffCount: number;
}) {
  return (
    <div
      role="status"
      className="mt-6 rounded-2xl border border-coral/20 bg-coral/5 p-5 text-sm text-charcoal"
    >
      <h3 className="font-semibold">Votre résultat détaillé</h3>
      <p className="mt-2 text-charcoal/80">
        Pour {staffCount} soignant{staffCount > 1 ? "s" : ""}, voici l&apos;ensemble
        de votre perte estimée.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {(["euros", "heures"] as const).map((mode) => (
          <section
            key={mode}
            aria-label={mode === "euros" ? "Perte en euros" : "Perte en heures"}
            className="rounded-xl border border-charcoal/10 bg-white/75 p-4"
          >
            <h4 className="font-semibold">{mode === "euros" ? "Euros" : "Heures"}</h4>
            <dl className="mt-3 space-y-2">
              {resultCards.map((period) => (
                <div key={period.key} className="flex items-baseline justify-between gap-4">
                  <dt className="text-charcoal/70">{period.label}</dt>
                  <dd className="font-semibold">
                    {getPeriodValue(mode, loss, period.key)}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>

      <p className="mt-5 border-t border-charcoal/10 pt-4 font-medium text-charcoal/80">
        Vos données sont traitées localement dans votre navigateur. Elles ne sont ni
        envoyées ni enregistrées.
      </p>
    </div>
  );
}

export function LossCalculator() {
  const staffInputId = useId();
  const staffErrorId = useId();
  const previewStatusId = useId();
  const nameInputId = useId();
  const nameErrorId = useId();
  const emailInputId = useId();
  const emailErrorId = useId();

  const [staffInput, setStaffInput] = useState("40");
  const [lastValidStaff, setLastValidStaff] = useState(40);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<LeadErrors>({});
  const [detailedResultVisible, setDetailedResultVisible] = useState(false);

  const staffError = validateStaffCount(staffInput);
  const loss = calculateLoss(lastValidStaff);

  const handleStaffChange = (rawValue: string) => {
    setStaffInput(rawValue);
    setDetailedResultVisible(false);

    if (!validateStaffCount(rawValue)) {
      setLastValidStaff(Number.parseInt(rawValue.trim(), 10));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateLead(name, email);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0 && !staffError) {
      setDetailedResultVisible(true);
    } else {
      setDetailedResultVisible(false);
    }
  };

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
          value={staffInput}
          onChange={(event) => handleStaffChange(event.target.value)}
          aria-invalid={staffError ? true : undefined}
          aria-describedby={staffError ? staffErrorId : undefined}
          className={cn(inputClassName, "max-w-xs")}
        />
        {staffError ? (
          <p id={staffErrorId} className="mt-2 text-sm text-coral-accessible" role="alert">
            {STAFF_COUNT_ERROR}
          </p>
        ) : null}
      </div>

      {staffError ? (
        <p
          id={previewStatusId}
          role="status"
          className="mb-4 rounded-xl border border-coral-accessible/25 bg-coral-soft px-4 py-3 text-sm font-medium text-charcoal"
        >
          Aperçu calculé pour le dernier effectif valide : {lastValidStaff} soignant
          {lastValidStaff > 1 ? "s" : ""}.
        </p>
      ) : null}

      <div
        aria-describedby={staffError ? previewStatusId : undefined}
        className={cn(
          "mb-8 transition-opacity motion-reduce:transition-none",
          staffError && "opacity-60",
        )}
      >
        <Tabs.Root defaultValue="euros">
          <Tabs.List
            aria-label="Mode d'affichage des résultats"
            className="mb-6 inline-flex rounded-full border border-charcoal/10 bg-warm-white p-1"
          >
            <Tabs.Trigger
              value="euros"
              className={cn(
                "min-h-11 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-accessible focus-visible:ring-offset-2",
                "text-charcoal/70 hover:text-charcoal",
                "data-[state=active]:bg-coral-accessible data-[state=active]:text-white",
              )}
            >
              Euros
            </Tabs.Trigger>
            <Tabs.Trigger
              value="heures"
              className={cn(
                "min-h-11 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-accessible focus-visible:ring-offset-2",
                "text-charcoal/70 hover:text-charcoal",
                "data-[state=active]:bg-coral-accessible data-[state=active]:text-white",
              )}
            >
              Heures
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="euros" className="outline-none">
            <ResultCards mode="euros" loss={loss} />
          </Tabs.Content>
          <Tabs.Content value="heures" className="outline-none">
            <ResultCards mode="heures" loss={loss} />
          </Tabs.Content>
        </Tabs.Root>
      </div>

      <Accordion.Root type="single" collapsible className="mb-8">
        <Accordion.Item value="methodology" className="rounded-2xl border border-charcoal/10">
          <Accordion.Header>
            <Accordion.Trigger className="group flex min-h-11 w-full items-center justify-between gap-3 px-5 py-4 text-left text-sm font-semibold text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-accessible focus-visible:ring-inset">
              Comment ces chiffres sont calculés
              <ChevronDown
                className="h-4 w-4 shrink-0 text-charcoal/65 transition-transform motion-reduce:transition-none group-data-[state=open]:rotate-180 motion-reduce:group-data-[state=open]:rotate-0"
                aria-hidden="true"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden px-5 pb-4 text-sm leading-relaxed text-charcoal/70 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down motion-reduce:animate-none motion-reduce:transition-none">
            Les estimations partent d&apos;une référence de 40 soignants : 13 h 20
            récupérées par jour et 76 766 € par an. Les valeurs évoluent
            proportionnellement au nombre de soignants, sur 230 jours ouvrés et 12 mois.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>

      <p className="mb-5 rounded-xl border border-charcoal/10 bg-warm-white px-4 py-3 text-sm font-medium leading-6 text-charcoal/80">
        Vos données sont traitées localement dans votre navigateur. Elles ne sont ni
        envoyées ni enregistrées.
      </p>

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
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? nameErrorId : undefined}
            className={inputClassName}
          />
          {errors.name ? (
            <p id={nameErrorId} className="mt-2 text-sm text-coral-accessible" role="alert">
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
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? emailErrorId : undefined}
            className={inputClassName}
          />
          {errors.email ? (
            <p id={emailErrorId} className="mt-2 text-sm text-coral-accessible" role="alert">
              {errors.email}
            </p>
          ) : null}
        </div>

        <Button type="submit" className="min-h-11 w-full sm:w-auto">
          Voir ma perte réelle
        </Button>
      </form>

      {detailedResultVisible ? (
        <DetailedBreakdown loss={loss} staffCount={lastValidStaff} />
      ) : null}
    </div>
  );
}
