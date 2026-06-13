import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDateRequest } from '../api';

const THEMES = [
  { id: 'romantic',    label: 'Romantic',    emoji: '🌹', desc: 'Rose petals & soft blush' },
  { id: 'kawaii',      label: 'Kawaii',       emoji: '🍓', desc: 'Cute & bubbly pastel vibes' },
  { id: 'retro',       label: 'Retro Y2K',   emoji: '💾', desc: 'Neon, pixels & nostalgia' },
  { id: 'minimalist',  label: 'Minimalist',   emoji: '🤍', desc: 'Clean, timeless & elegant' },
];

export default function Home() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    askerName: '',
    askerEmail: '',
    receiverName: '',
    receiverEmail: '',
    theme: 'romantic',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setError('');
    const { askerName, askerEmail, receiverName, receiverEmail } = form;
    if (!askerName || !askerEmail || !receiverName || !receiverEmail) {
      setError('Please fill in all fields!');
      return;
    }
    setLoading(true);
    try {
      const res = await createDateRequest(form);
      navigate('/link-generated', { state: { link: res.data.link, receiverName } });
    } catch {
      setError('Something went wrong. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page theme-romantic" style={{ background: 'radial-gradient(ellipse at 60% 0%, #ffd6e0 0%, #fff0f3 60%)', minHeight: '100vh' }}>
      <div className="card animate-fade-in" style={{ maxWidth: 560 }}>
        <div className="deco">🌹 💌 🌹</div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#c0516b', marginBottom: 8 }}>
          Ask Someone Out
        </h1>
        <p style={{ marginBottom: 32, color: '#7a3040' }}>
          Create a cute card and share the link with your special someone 💕
        </p>

        <div style={{ textAlign: 'left', marginBottom: 8 }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#7a3040', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Pick a vibe
          </label>
        </div>
        <div className="theme-grid" style={{ marginBottom: 24 }}>
          {THEMES.map((t) => (
            <div
              key={t.id}
              className={`theme-option ${t.id} ${form.theme === t.id ? 'selected' : ''}`}
              onClick={() => setForm({ ...form, theme: t.id })}
            >
              <span style={{ fontSize: '1.5rem' }}>{t.emoji}</span>
              <span>{t.label}</span>
              <span style={{ fontSize: '0.7rem', opacity: 0.6, fontWeight: 400 }}>{t.desc}</span>
            </div>
          ))}
        </div>

        <div className="form-group">
          <label>Your Name</label>
          <input name="askerName" placeholder="e.g. Jamie" value={form.askerName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Your Email</label>
          <input name="askerEmail" type="email" placeholder="you@email.com" value={form.askerEmail} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Their Name</label>
          <input name="receiverName" placeholder="e.g. Alex" value={form.receiverName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Their Email</label>
          <input name="receiverEmail" type="email" placeholder="them@email.com" value={form.receiverEmail} onChange={handleChange} />
        </div>

        {error && <p style={{ color: '#c0516b', marginBottom: 16, fontSize: '0.9rem' }}>{error}</p>}

        <button className="btn" onClick={handleSubmit} disabled={loading} style={{ width: '100%', fontSize: '1rem', padding: '16px' }}>
          {loading ? 'Creating your card...' : 'Generate My Date Card 💌'}
        </button>
      </div>
    </div>
  );
}
