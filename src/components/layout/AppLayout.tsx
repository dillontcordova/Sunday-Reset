import { Link, NavLink } from 'react-router-dom';
import { cn } from '../../lib/cn';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto flex min-h-screen max-w-md flex-col bg-calm-bg px-4 pb-8 pt-6 text-calm-text">
    <header className="mb-6"><Link to="/" className="text-2xl font-semibold">Sunday Reset</Link><p className="text-sm text-calm-muted">A calm weekly ritual.</p></header>
    <main className="flex-1">{children}</main>
    <nav className="mt-6 grid grid-cols-4 rounded-xl border border-calm-border bg-calm-surface p-2 text-xs">
      {[['Home','/'],['Reset','/reset'],['History','/history'],['Settings','/settings']].map(([l,to])=> <NavLink key={to} to={to} className={({isActive})=>cn('rounded-lg px-2 py-2 text-center',isActive && 'bg-white shadow-sm')}>{l}</NavLink>)}
    </nav>
  </div>;
}
