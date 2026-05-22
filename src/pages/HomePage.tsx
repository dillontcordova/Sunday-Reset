import { Link } from 'react-router-dom';
import { SectionCard } from '../components/shared/SectionCard';

export function HomePage() {
  return <div><SectionCard title="Reset your week"><p className="mb-4 text-calm-muted">Clear what you are carrying, reflect on what mattered, and choose what matters next.</p><Link to="/reset" className="rounded-xl bg-calm-accent px-4 py-2 text-sm font-medium text-white">Begin Sunday Reset</Link></SectionCard></div>;
}
