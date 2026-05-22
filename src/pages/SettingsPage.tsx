import { SectionCard } from '../components/shared/SectionCard';
import { useResetStore } from '../store/resetStore';

export function SettingsPage() {
  const { history, clearAll } = useResetStore();
  const exportData = () => {
    const blob = new Blob([JSON.stringify({ history }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'sunday-reset-data.json'; a.click(); URL.revokeObjectURL(url);
  };
  return <SectionCard title="Local Data"><p className="mb-3 text-sm text-calm-muted">Your data stays on this device in localStorage.</p><div className="flex gap-2"><button onClick={exportData} className="rounded-xl border px-3 py-2">Export JSON</button><button onClick={clearAll} className="rounded-xl bg-red-700 px-3 py-2 text-white">Clear local data</button></div></SectionCard>;
}
