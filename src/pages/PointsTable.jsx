import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { tournaments, pointsTable } from '../data/tournaments';
import './PointsTable.css';

export default function PointsTable() {
  const [selectedTournament, setSelectedTournament] = useState(1);
  const table = pointsTable[selectedTournament] || [];

  return (
    <div className="page-wrapper">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="section-title" style={{ paddingTop: 40 }}>Points Table</h1>
          <p className="section-subtitle">Tournament standings and rankings.</p>
        </motion.div>

        <div className="tournament-selector">
          {tournaments.map(t => (
            <button
              key={t.id}
              className={`tournament-btn ${selectedTournament === t.id ? 'tournament-btn--active' : ''}`}
              onClick={() => setSelectedTournament(t.id)}
            >
              <Trophy size={14} />
              {t.name}
            </button>
          ))}
        </div>

        <motion.div
          key={selectedTournament}
          className="points-table-wrapper glass-card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="points-table-scroll">
            <table className="points-table">
              <thead>
                <tr>
                  <th>POS</th>
                  <th>TEAM</th>
                  <th>M</th>
                  <th>W</th>
                  <th>L</th>
                  <th>NR</th>
                  <th>PTS</th>
                  <th>NRR</th>
                </tr>
              </thead>
              <tbody>
                {table.map((row, i) => (
                  <motion.tr
                    key={i}
                    className={`points-table__row ${i < 4 ? 'points-table__row--qualify' : ''}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <td className="points-table__pos">{row.pos}</td>
                    <td className="points-table__team">
                      <span className="points-table__flag">{row.flag}</span>
                      <strong>{row.team}</strong>
                    </td>
                    <td>{row.m}</td>
                    <td className="points-table__wins">{row.w}</td>
                    <td className="points-table__losses">{row.l}</td>
                    <td>{row.nr}</td>
                    <td className="points-table__pts">{row.pts}</td>
                    <td className={`points-table__nrr ${row.nrr >= 0 ? 'points-table__nrr--pos' : 'points-table__nrr--neg'}`}>
                      {row.nrr > 0 ? '+' : ''}{row.nrr.toFixed(2)}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
