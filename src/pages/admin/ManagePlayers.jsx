import { useState } from 'react';
import { Plus, Edit3, Trash2 } from 'lucide-react';
import { players as initialPlayers } from '../../data/players';

export default function ManagePlayers() {
  const [playerList, setPlayerList] = useState(initialPlayers);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', team: '', role: 'Batsman', country: '' });

  const openAdd = () => { setEditing(null); setForm({ name: '', team: '', role: 'Batsman', country: '' }); setShowModal(true); };
  const openEdit = (p) => { setEditing(p); setForm({ name: p.name, team: p.team, role: p.role, country: p.country }); setShowModal(true); };
  const deletePlayer = (id) => setPlayerList(prev => prev.filter(p => p.id !== id));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      setPlayerList(prev => prev.map(p => p.id === editing.id ? { ...p, ...form } : p));
    } else {
      setPlayerList(prev => [...prev, { id: Date.now(), ...form, matches: 0, runs: 0, average: 0, strikeRate: 0, hundreds: 0, fifties: 0, bestScore: 0, wickets: 0, bowlingAverage: 0, economy: 0, bowlingStrikeRate: 0, fiveWickets: 0, catches: 0, stumpings: 0, recentForm: [], monthlyRuns: [], monthlyStrikeRate: [] }]);
    }
    setShowModal(false);
  };

  return (
    <div className="admin-content">
      <h2 className="admin-title">Manage Players</h2>
      <div className="admin-actions">
        <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Add Player</button>
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr><th>Name</th><th>Team</th><th>Role</th><th>Country</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {playerList.map(p => (
                <tr key={p.id}>
                  <td><strong>{p.name}</strong></td>
                  <td>{p.team}</td>
                  <td><span className={`badge badge-${p.role === 'Batsman' ? 't20' : p.role === 'Bowler' ? 'odi' : 'test'}`}>{p.role}</span></td>
                  <td>{p.country}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-sm btn-secondary" onClick={() => openEdit(p)}><Edit3 size={14} /></button>
                      <button className="btn btn-sm btn-secondary" onClick={() => deletePlayer(p.id)} style={{ color: 'var(--red-live)' }}><Trash2 size={14} /></button>
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
            <h3>{editing ? 'Edit Player' : 'Add Player'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group"><label className="form-label">Name</label><input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required /></div>
              <div className="form-group"><label className="form-label">Team</label><input className="form-input" value={form.team} onChange={e => setForm({ ...form, team: e.target.value })} required /></div>
              <div className="form-group"><label className="form-label">Country</label><input className="form-input" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} required /></div>
              <div className="form-group"><label className="form-label">Role</label>
                <select className="form-input" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                  <option value="Batsman">Batsman</option>
                  <option value="Bowler">Bowler</option>
                  <option value="All-rounder">All-rounder</option>
                  <option value="Wicketkeeper">Wicketkeeper</option>
                </select>
              </div>
              <div className="admin-modal__actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Add'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
