import { motion } from 'framer-motion';
import TeamCard from '../components/TeamCard';
import { teams } from '../data/teams';
import './Teams.css';

export default function Teams() {
  return (
    <div className="page-wrapper">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="section-title" style={{ paddingTop: 40 }}>Teams</h1>
          <p className="section-subtitle">Explore international cricket teams.</p>
        </motion.div>

        <div className="teams-grid">
          {teams.map((team, i) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <TeamCard team={team} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
