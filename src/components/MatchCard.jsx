import { Link } from 'react-router-dom';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';
import './MatchCard.css';

export default function MatchCard({ match }) {
  const isLive = match.status === 'live';
  const isCompleted = match.status === 'completed';
  const typeClass = match.type === 'T20' ? 'badge-t20' : match.type === 'ODI' ? 'badge-odi' : 'badge-test';

  return (
    <div className={`match-card ${isLive ? 'match-card--live' : ''}`}>
      <div className="match-card__header">
        <div className="match-card__meta">
          <span className={`badge ${typeClass}`}>{match.type}</span>
          <span className="match-card__tournament">{match.tournament}</span>
        </div>
        {isLive && (
          <div className="live-badge">
            <span className="live-dot" />
            LIVE
          </div>
        )}
        {isCompleted && <span className="match-card__result-badge">Completed</span>}
      </div>

      <div className="match-card__teams">
        <div className="match-card__team">
          <div className="match-card__flag">{match.team1.flag}</div>
          <div className="match-card__team-info">
            <span className="match-card__team-name">{match.team1.name}</span>
            {match.team1.score !== null ? (
              <span className="match-card__score">{match.team1.score}/{match.team1.wickets} <small>({match.team1.overs} ov)</small></span>
            ) : (
              <span className="match-card__yettobat">Yet to play</span>
            )}
          </div>
        </div>
        <div className="match-card__vs">
          <span>VS</span>
        </div>
        <div className="match-card__team">
          <div className="match-card__flag">{match.team2.flag}</div>
          <div className="match-card__team-info">
            <span className="match-card__team-name">{match.team2.name}</span>
            {match.team2.score !== null ? (
              <span className="match-card__score">{match.team2.score}/{match.team2.wickets} <small>({match.team2.overs} ov)</small></span>
            ) : (
              <span className="match-card__yettobat">Yet to bat</span>
            )}
          </div>
        </div>
      </div>

      {match.result && <div className="match-card__result">{match.result}</div>}

      {isLive && (
        <div className="match-card__live-info">
          <div className="match-card__live-stat">
            <span>CRR</span>
            <strong>{match.crr}</strong>
          </div>
          {match.rrr && (
            <div className="match-card__live-stat">
              <span>RRR</span>
              <strong>{match.rrr}</strong>
            </div>
          )}
          {match.target && (
            <div className="match-card__live-stat">
              <span>Target</span>
              <strong>{match.target}</strong>
            </div>
          )}
        </div>
      )}

      <div className="match-card__footer">
        <div className="match-card__info">
          <Calendar size={14} />
          <span>{match.date} • {match.time}</span>
        </div>
        <Link to={`/match/${match.id}`} className="btn btn-sm btn-primary">
          {isLive ? 'Watch' : isCompleted ? 'Scorecard' : 'Details'}
          <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  );
}
