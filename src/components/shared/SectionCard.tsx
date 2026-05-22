export function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="mb-4 rounded-2xl border border-calm-border bg-calm-surface p-4 shadow-sm"><h2 className="mb-3 text-lg font-medium">{title}</h2>{children}</section>;
}
