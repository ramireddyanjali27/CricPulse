import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { matches } from '../data/matches';
import { commentary, statistics } from '../data/statistics';
import './MatchDetails.css';

const battingData = [
  { player: 'Rahul Sharma', r: 72, b: 45, f: 7, s: 3, sr: 160.00 },
  { player: 'Virat Kumar', r: 51, b: 36, f: 5, s: 2, sr: 141.67 },
  { player: 'Arjun Patel', r: 28, b: 22, f: 3, s: 1, sr: 127.27 },
  { player: 'Ravi Singh', r: 18, b: 14, f: 2, s: 0, sr: 128.57 },
  { player: 'Suresh Reddy', r: 8, b: 6, f: 1, s: 0, sr: 133.33 },
  { player: 'Karan Mehta', r: 5, b: 3, f: 0, s: 0, sr: 166.67 },
  { player: 'Not Out', r: 0, b: 0, f: 0, s: 0, sr: 0 },
];

const bowlingData = [
  { bowler: 'Mitchell Johnson', o: 4, m: 0, r: 38, w: 1, eco: 9.50 },
  { bowler: 'Pat Cummins', o: 4, m: 0, r: 28, w: 2, eco: 7.00 },
  { bowler: 'Glenn Maxwell', o: 3.2, m: 0, r: 32, w: 1, eco: 9.60 },
  { bowler: 'Steve Williams', o: 3, m: 0, r: 25, w: 0, eco: 8.33 },
  { bowler: 'Mitchell Starc', o: 4, m: 0, r: 62, w: 0, eco: 15.50 },
];

function OverviewTab({ match }) {
  return (
    <div className="overview">
      <div className="overview__info glass-card">
        <h3>Match Info</h3>
        <div className="overview__info-grid">
          <div><span>Tournament</span><strong>{match.tournament}</strong></div>
          <div><span>Date</span><strong>{match.date}</strong></div>
          <div><span>Time</span><strong>{match.time}</strong></div>
          <div><span>Venue</span><strong>{match.venue}</strong></div>
          <div><span>Match Type</span><strong>{match.type}</strong></div>
          {match.toss && <div><span>Toss</span><strong>{match.toss}</strong></div>}
        </div>
      </div>
      <div className="overview__partnership glass-card">
        <h3>Partnerships</h3>
        {statistics.partnerships.map((p, i) => (
          <div key={i} className="overview__partner">
            <span className="overview__partner-label">{p.partnership} Wicket</span>
            <div className="overview__partner-bar">
              <div className="overview__partner-fill" style={{ width: `${(p.runs / 50) * 100}%` }} />
            </div>
            <span className="overview__partner-runs">{p.runs} ({p.balls})</span>
            <span className="overview__partner-players">{p.batsman1} & {p.batsman2}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScorecardTab() {
  return (
    <div className="scorecard">
      <div className="scorecard__section glass-card">
        <h3>Batting</h3>
        <div className="scorecard__table-wrapper">
          <table className="scorecard__table">
            <thead>
              <tr>
                <th>Player</th>
                <th>R</th>
                <th>B</th>
                <th>4s</th>
                <th>6s</th>
                <th>SR</th>
              </tr>
            </thead>
            <tbody>
              {battingData.map((row, i) => (
                <tr key={i}>
                  <td><span className="scorecard__player">{row.player}</span></td>
                  <td><strong>{row.r}</strong></td>
                  <td>{row.b}</td>
                  <td>{row.f}</td>
                  <td>{row.s}</td>
                  <td>{row.sr ? row.sr.toFixed(2) : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="scorecard__extras">
          <span>Extras: <strong>8</strong></span>
          <span>Total: <strong>185/4</strong> (18.2 overs)</span>
        </div>
      </div>

      <div className="scorecard__section glass-card">
        <h3>Bowling</h3>
        <div className="scorecard__table-wrapper">
          <table className="scorecard__table">
            <thead>
              <tr>
                <th>Bowler</th>
                <th>O</th>
                <th>M</th>
                <th>R</th>
                <th>W</th>
                <th>ECO</th>
              </tr>
            </thead>
            <tbody>
              {bowlingData.map((row, i) => (
                <tr key={i}>
                  <td><span className="scorecard__player">{row.bowler}</span></td>
                  <td>{row.o}</td>
                  <td>{row.m}</td>
                  <td>{row.r}</td>
                  <td><strong>{row.w}</strong></td>
                  <td>{row.eco.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function CommentaryTab() {
  const eventColors = {
    'SIX': 'var(--gold-primary)',
    'FOUR': 'var(--green-primary)',
    'WICKET': 'var(--red-live)',
    'DOT BALL': 'var(--text-muted)',
    '1 RUN': 'var(--blue-light)',
    '2 RUNS': 'var(--blue-electric)',
    'SINGLE': 'var(--blue-light)',
    'WIDE': 'var(--text-secondary)',
    'NO BALL': 'var(--text-secondary)',
  };

  return (
    <div className="commentary">
      {commentary.map((item, i) => (
        <motion.div
          key={item.id}
          className="commentary__item glass-card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
        >
          <div className="commentary__over">{item.over}</div>
          <div
            className="commentary__event"
            style={{
              background: `${eventColors[item.event] || 'var(--text-secondary)'}22`,
              color: eventColors[item.event] || 'var(--text-secondary)',
              borderColor: `${eventColors[item.event] || 'var(--text-secondary)'}44`,
            }}
          >
            {item.event}
          </div>
          <div className="commentary__desc">{item.description}</div>
          <div className="commentary__meta">
            <span>{item.batsman}</span>
            <span>vs</span>
            <span>{item.bowler}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function AnalyticsTab() {
  return (
    <div className="analytics">
      <div className="analytics__cards">
        <div className="stat-card">
          <div className="stat-value">10.09</div>
          <div className="stat-label">Current Run Rate</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">9.60</div>
          <div className="stat-label">Required Run Rate</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">202</div>
          <div className="stat-label">Projected Score</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">68 (42)</div>
          <div className="stat-label">Partnership</div>
        </div>
      </div>

      <div className="analytics__charts">
        <div className="chart-card glass-card">
          <h3>Runs Per Over</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={statistics.runsPerOver}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="over" stroke="var(--text-muted)" />
              <YAxis stroke="var(--text-muted)" />
              <Tooltip
                contentStyle={{ background: 'rgba(17,24,39,0.95)', border: '1px solid var(--border-glass)', borderRadius: 8 }}
                labelStyle={{ color: 'var(--text-primary)' }}
              />
              <Bar dataKey="runs" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card glass-card">
          <h3>Cumulative Runs</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={statistics.cumulativeRuns}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="over" stroke="var(--text-muted)" />
              <YAxis stroke="var(--text-muted)" />
              <Tooltip
                contentStyle={{ background: 'rgba(17,24,39,0.95)', border: '1px solid var(--border-glass)', borderRadius: 8 }}
              />
              <Area type="monotone" dataKey="runs" stroke="#10b981" fill="rgba(16,185,129,0.2)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card glass-card">
          <h3>Wickets Timeline</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={statistics.wicketsTimeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="over" stroke="var(--text-muted)" />
              <YAxis stroke="var(--text-muted)" />
              <Tooltip
                contentStyle={{ background: 'rgba(17,24,39,0.95)', border: '1px solid var(--border-glass)', borderRadius: 8 }}
              />
              <Line type="monotone" dataKey="wickets" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default function MatchDetails() {
  const { id } = useParams();
  const match = matches.find(m => m.id === parseInt(id)) || matches[0];
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'Scorecard', 'Commentary', 'Analytics'];

  return (
    <div className="page-wrapper">
      <div className="container">
        <Link to="/matches" className="back-link">
          <ArrowLeft size={18} /> Back to Matches
        </Link>

        <motion.div
          className="match-detail-header glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {match.status === 'live' && (
            <div className="live-badge"><span className="live-dot" /> LIVE</div>
          )}
          <div className="match-detail-header__teams">
            <div className="match-detail-header__team">
              <span className="match-detail-header__flag">{match.team1.flag}</span>
              <strong>{match.team1.name}</strong>
              {match.team1.score !== null && (
                <span className="match-detail-header__score">{match.team1.score}/{match.team1.wickets} <small>({match.team1.overs} ov)</small></span>
              )}
            </div>
            <span className="match-detail-header__vs">VS</span>
            <div className="match-detail-header__team">
              <span className="match-detail-header__flag">{match.team2.flag}</span>
              <strong>{match.team2.name}</strong>
              {match.team2.score !== null ? (
                <span className="match-detail-header__score">{match.team2.score}/{match.team2.wickets} <small>({match.team2.overs} ov)</small></span>
              ) : (
                <span className="match-detail-header__yettobat">Yet to Bat</span>
              )}
            </div>
          </div>
          <div className="match-detail-header__info">
            {match.target && <span>Target: <strong>{match.target}</strong></span>}
            {match.crr && <span>CRR: <strong>{match.crr}</strong></span>}
            {match.rrr && <span>RRR: <strong>{match.rrr}</strong></span>}
            {match.result && <span className="match-detail-header__result">{match.result}</span>}
          </div>
        </motion.div>

        <div className="tabs">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{ paddingBottom: 60 }}
        >
          {activeTab === 'Overview' && <OverviewTab match={match} />}
          {activeTab === 'Scorecard' && <ScorecardTab />}
          {activeTab === 'Commentary' && <CommentaryTab />}
          {activeTab === 'Analytics' && <AnalyticsTab />}
        </motion.div>
      </div>
    </div>
  );
}
