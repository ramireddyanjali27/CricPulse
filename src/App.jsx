import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import LiveMatches from './pages/LiveMatches';
import Matches from './pages/Matches';
import MatchDetails from './pages/MatchDetails';
import Players from './pages/Players';
import PlayerDetails from './pages/PlayerDetails';
import Teams from './pages/Teams';
import TeamDetails from './pages/TeamDetails';
import PointsTable from './pages/PointsTable';
import Statistics from './pages/Statistics';
import SearchPage from './pages/Search';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageMatches from './pages/admin/ManageMatches';
import ManagePlayers from './pages/admin/ManagePlayers';
import ManageTeams from './pages/admin/ManageTeams';
import ScoreUpdate from './pages/admin/ScoreUpdate';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminDashboard />} />
          <Route path="teams" element={<ManageTeams />} />
          <Route path="players" element={<ManagePlayers />} />
          <Route path="matches" element={<ManageMatches />} />
          <Route path="scores" element={<ScoreUpdate />} />
        </Route>

        <Route path="*" element={
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/live" element={<LiveMatches />} />
              <Route path="/matches" element={<Matches />} />
              <Route path="/match/:id" element={<MatchDetails />} />
              <Route path="/players" element={<Players />} />
              <Route path="/player/:id" element={<PlayerDetails />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/team/:id" element={<TeamDetails />} />
              <Route path="/points-table" element={<PointsTable />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  );
}
