import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './store';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Achievements from './pages/Achievements';
import Challenges from './pages/Challenges';
import Activities from './pages/Activities';
import Social from './pages/Social';
import Profile from './pages/Profile';
import './index.css';
import Rewards from './pages/Rewards';
import Journeys from './pages/Journeys';
import InsuranceEngagement from './pages/InsuranceEngagement';
import Personalization from './pages/Personalization';
import Metrics from './pages/Metrics';
import Innovation from './pages/Innovation';
import Notifications from './pages/Notifications';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/challenges" element={<Challenges />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/social" element={<Social />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="/journeys" element={<Journeys />} />
              <Route path="/insurance" element={<InsuranceEngagement />} />
              <Route path="/personalization" element={<Personalization />} />
              <Route path="/metrics" element={<Metrics />} />
              <Route path="/innovation" element={<Innovation />} />
              <Route path="/notifications" element={<Notifications />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
