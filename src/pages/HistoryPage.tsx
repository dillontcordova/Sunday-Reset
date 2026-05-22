import { SectionCard } from '../components/shared/SectionCard';
import { useResetStore } from '../store/resetStore';

export function HistoryPage() {
  const history = useResetStore((s) => s.history);
  return <SectionCard title="Completed Resets">{history.length===0?<p className="text-calm-muted">No completed resets yet.</p>:<ul className="space-y-2">{history.map((item)=><li key={item.id} className="rounded-xl border bg-white p-3 text-sm"><p>{new Date(item.completedAt ?? item.createdAt).toLocaleDateString()}</p><p className="text-calm-muted">Top focus: {item.focuses.topThree.filter(Boolean)[0] || '—'}</p></li>)}</ul>}</SectionCard>;
}
