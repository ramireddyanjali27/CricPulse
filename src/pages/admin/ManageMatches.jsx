import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit3, Trash2, Play, Square } from 'lucide-react';
import { matches as initialMatches } from '../../data/matches';

export default function ManageMatches() {
  const [matchList, setMatchList] = useState(initialMatches);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ team1: '', team2: '', type: 'T20', date: '', time: '', venue: '', tournament: '' });

  const openAdd = () => { setEditing(null); setForm({ team1: '', team2: '', type: 'T20', date: '', time: '', venue: '', tournament: '' }); setShowModal(true); };
  const openEdit = (m) => { setEditing(m); setForm({ team1: m.team1.name, team2: m.team2.name, type: m.type, date: m.date, time: m.time, venue: m.venue, tournament: m.tournament }); setShowModal(true); };
  const deleteMatch = (id) => setMatchList(prev => prev.filter(m => m.id !== id));
  const toggleStatus = (id) => setMatchList(prev => prev.map(m => m.id === id ? { ...m, status: m.status === 'completed' ? 'upcoming' : m.status === 'live' ? 'completed' : 'live' } : m));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      setMatchList(prev => prev.map(m => m.id === editing.id ? { ...m, team1: { ...m.team1, name: form.team1 }, team2: { ...m.team2, name: form.team2 }, type: form.type, date: form.date, time: form.time, venue: form.venue, tournament: form.tournament } : m));
    } else {
      const newMatch = {
        id: Date.now(),
        status: 'upcoming',
        type: form.type,
        tournament: form.tournament,
        date: form.date,
        time: form.time,
        venue: form.venue,
        team1: { id: 1, name: form.team1, shortName: form.team1.slice(0, 3).toUpperCase(), score: null, wickets: null, overs: null, flag: '🏏' },
        team2: { id: 2, name: form.team2, shortName: form.team2.slice(0, 3).toUpperCase(), score: null, wickets: null, overs: null, flag: '🏏' },
        target: null, crr: null, rrr: null, result: null, toss: null,
      };
      setMatchList(prev => [...prev, newMatch]);
    }
    setShowModal(false);
  };

  return (
    <div className="admin-content">
      <h2 className="admin-title">Manage Matches</h2>

      <div className="admin-actions">
        <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Add Match</button>
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Teams</th>
                <th>Type</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {matchList.map(m => (
                <tr key={m.id}>
                  <td><strong>{m.team1.name} vs {m.team2.name}</strong></td>
                  <td><span className={`badge badge-${m.type.toLowerCase()}`}>{m.type}</span></td>
                  <td>{m.date}</td>
                  <td>
                    <span className={`badge ${m.status === 'live' ? 'badge-t20' : m.status === 'completed' ? 'badge-odi' : 'badge-test'}`}>
                      {m.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-sm btn-secondary" onClick={() => openEdit(m)}><Edit3 size={14} /></button>
                      <button className="btn btn-sm btn-secondary" onClick={() => toggleStatus(m.id)}>
                        {m.status === 'live' ? <Square size={14} /> : <Play size={14} />}
                      </button>
                      <button className="btn btn-sm btn-secondary" onClick={() => deleteMatch(m.id)} style={{ color: 'var(--red-live)' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <h3>{editing ? 'Edit Match' : 'Add Match'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Team 1</label>
                <input className="form-input" value={form.team1} onChange={e => setForm({ ...form, team1: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">Team 2</label>
                <input className="form-input" value={form.team2} onChange={e => setForm({ ...form, team2: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">Tournament</label>
                <input className="form-input" value={form.tournament} onChange={e => setForm({ ...form, tournament: e.target.value })} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input type="date" className="form-input" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Time</label>
                  <input type="time" className="form-input" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Venue</label>
                <input className="form-input" value={form.venue} onChange={e => setForm({ ...form, venue: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">Match Type</label>
                <select className="form-input" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                  <option value="T20">T20</option>
                  <option value="ODI">ODI</option>
                  <option value="Test">Test</option>
                </select>
              </div>
              <div className="admin-modal__actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Add'} Match</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
