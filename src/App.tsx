import { SiteHeader } from "./components/SiteHeader";

const sectionLandmarks = [
  { id: "hero", label: "Accueil" },
  { id: "origine", label: "Origine" },
  { id: "realites", label: "Réalités" },
  { id: "solution", label: "Solution" },
  { id: "fonctionnalites", label: "Au quotidien" },
  { id: "modules", label: "Modules" },
  { id: "calculatrice", label: "Calculatrice" },
  { id: "pilote", label: "Programme pilote" },
];

export default function App() {
  return (
    <>
      <SiteHeader />
      <main>
        {sectionLandmarks.map((section) => (
          <section
            key={section.id}
            id={section.id}
            aria-label={section.label}
            className="container py-16"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-charcoal/50">{section.label}</p>
          </section>
        ))}
      </main>
    </>
  );
}
