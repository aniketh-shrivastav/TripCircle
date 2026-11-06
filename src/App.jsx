import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppLayout } from './components/layout/AppLayout';

import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { PlannerPage } from './pages/PlannerPage';
import { TripDetailsPage } from './pages/TripDetailsPage';
import { PollsPage } from './pages/PollsPage';
import { ItineraryPage } from './pages/ItineraryPage';
import { ExpensesPage } from './pages/ExpensesPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProfilePage } from './pages/ProfilePage';
import { CreditsPage } from './pages/CreditsPage';

function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="planner" element={<PlannerPage />} />
            <Route path="credits" element={<CreditsPage />} />
            <Route path="pricing" element={<CreditsPage />} />
            <Route path="trips" element={<TripDetailsPage />} />
            <Route path="polls" element={<PollsPage />} />
            <Route path="itinerary" element={<ItineraryPage />} />
            <Route path="expenses" element={<ExpensesPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}

export default App;
