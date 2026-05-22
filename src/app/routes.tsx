import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { HomePage } from '../pages/HomePage';
import { ResetPage } from '../pages/ResetPage';
import { HistoryPage } from '../pages/HistoryPage';
import { SettingsPage } from '../pages/SettingsPage';

export const router = createBrowserRouter([
  { path: '/', element: <AppLayout><HomePage /></AppLayout> },
  { path: '/reset', element: <AppLayout><ResetPage /></AppLayout> },
  { path: '/history', element: <AppLayout><HistoryPage /></AppLayout> },
  { path: '/settings', element: <AppLayout><SettingsPage /></AppLayout> }
]);
