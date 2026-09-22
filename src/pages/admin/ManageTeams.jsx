import { useState } from 'react';
import { Plus, Edit3, Trash2 } from 'lucide-react';
import { teams as initialTeams } from '../../data/teams';

export default function ManageTeams() {
  const [teamList, setTeamList] = useState(initialTeams);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', country: '', flag: '' });

  const openAdd = () => { setEditing(null); setForm({ name: '', country: '', flag: '🏏' }); setShowModal(true); };
  const openEdit = (t) => { setEditing(t); setForm({ name: t.name, country: t.country, flag: t.flag }); setShowModal(true); };
  const deleteTeam = (id) => setTeamList(prev => prev.filter(t => t.id !== id));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      setTeamList(prev => prev.map(t => t.id === editing.id ? { ...t, ...form } : t));
    } else {
      setTeamList(prev => [...prev, { id: Date.now(), ...form, color: '#10b981', secondaryColor: '#3b82f6', matches: 0, wins: 0, losses: 0, draws: 0, points: 0, winPercentage: 0, winRate: '', players: [], recentMatches: [] }]);
    }
    setShowModal(false);
  };

  return (
    <div className="admin-content">
      <h2 className="admin-title">Manage Teams</h2>
      <div className="admin-actions">
        <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Add Team</button>
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr><th>Flag</th><th>Name</th><th>Country</th><th>Matches</th><th>Wins</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {teamList.map(t => (
                <tr key={t.id}>
                  <td style={{ fontSize: '1.5rem' }}>{t.flag}</td>
                  <td><strong>{t.name}</strong></td>
                  <td>{t.country}</td>
                  <td>{t.matches}</td>
                  <td>{t.wins}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-sm btn-secondary" onClick={() => openEdit(t)}><Edit3 size={14} /></button>
                      <button className="btn btn-sm btn-secondary" onClick={() => deleteTeam(t.id)} style={{ color: 'var(--red-live)' }}><Trash2 size={14} /></button>
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
            <h3>{editing ? 'Edit Team' : 'Add Team'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group"><label className="form-label">Name</label><input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required /></div>
              <div className="form-group"><label className="form-label">Country</label><input className="form-input" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} required /></div>
              <div className="form-group"><label className="form-label">Flag (emoji)</label><input className="form-input" value={form.flag} onChange={e => setForm({ ...form, flag: e.target.value })} /></div>
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
