import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ScoreUpdate() {
  const [score, setScore] = useState({ runs: 185, wickets: 4, overs: 18, balls: 2, extras: 8 });
  const [history, setHistory] = useState([]);

  const updateScore = (runs, event) => {
    let newBalls = score.balls + 1;
    let newOvers = score.overs;
    let newWickets = score.wickets;
    let newRuns = score.runs + runs;

    if (event === 'WICKET') {
      newWickets += 1;
    } else if (event === 'WIDE' || event === 'NO BALL') {
      newRuns += 1;
      // Don't increment ball for extras
    } else if (newBalls === 6) {
      newBalls = 0;
      newOvers += 1;
    }

    setScore({ runs: newRuns, wickets: newWickets, overs: newOvers, balls: newBalls, extras: score.extras });
    setHistory(prev => [{ event, runs: event === 'WICKET' ? 0 : runs, over: `${newOvers}.${newBalls || 6}` }, ...prev].slice(0, 20));
  };

  return (
    <div className="admin-content">
      <h2 className="admin-title">Score Update</h2>

      <div className="score-update">
        <motion.div
          className="score-display glass-card"
          key={`${score.runs}-${score.wickets}`}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="score-display__score">{score.runs}/{score.wickets}</div>
          <div className="score-display__overs">{score.overs}.{score.balls} Overs</div>
        </motion.div>

        <div className="score-buttons">
          {[1, 2, 3, 4, 6].map(r => (
            <button key={r} className="score-btn" onClick={() => updateScore(r, `${r} RUN${r > 1 ? 'S' : ''}`)}>
              +{r}
            </button>
          ))}
          <button className="score-btn score-btn--wicket" onClick={() => updateScore(0, 'WICKET')}>
            WICKET
          </button>
          <button className="score-btn" onClick={() => updateScore(0, 'DOT BALL')}>
            DOT
          </button>
          <button className="score-btn score-btn--extra" onClick={() => updateScore(1, 'WIDE')}>
            WIDE
          </button>
          <button className="score-btn score-btn--extra" onClick={() => updateScore(1, 'NO BALL')}>
            NO BALL
          </button>
        </div>

        {history.length > 0 && (
          <div className="glass-card" style={{ padding: 20 }}>
            <h3 style={{ fontFamily: 'Orbitron', fontSize: '0.9rem', marginBottom: 16 }}>Ball-by-Ball History</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 300, overflowY: 'auto' }}>
              {history.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '8px 12px',
                    borderRadius: 8,
                    background: h.event === 'WICKET' ? 'rgba(239,68,68,0.1)' : h.event === 'SIX' || h.event === 'FOUR' ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.02)',
                    fontSize: '0.85rem',
                  }}
                >
                  <span style={{ fontFamily: 'Orbitron', fontWeight: 700, minWidth: 40 }}>{h.over}</span>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: 8,
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    background: h.event === 'WICKET' ? 'rgba(239,68,68,0.2)' : h.event === 'SIX' || h.event === 'FOUR' ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.05)',
                    color: h.event === 'WICKET' ? 'var(--red-live)' : h.event === 'SIX' || h.event === 'FOUR' ? 'var(--gold-light)' : 'var(--text-secondary)',
                  }}>{h.event}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{h.runs} run{h.runs !== 1 ? 's' : ''}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
