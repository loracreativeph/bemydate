import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDateRequest } from '../api';

const THEMES = [
  { id: 'romantic', label: 'Romantic', emoji: '🌹', desc: 'Rose petals & soft blush' },
  { id: 'kawaii', label: 'Kawaii', emoji: '🍓', desc: 'Cute & bubbly pastel vibes' },
  { id: 'retro', label: 'Retro Y2K', emoji: '💾', desc: 'Neon, pixels & nostalgia' },
  { id: 'minimalist', label: 'Minimalist', emoji: '🤍', desc: 'Clean, timeless & elegant' },
];

export default function Home() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    askerName: '',
    askerEmail: '',
    receiverName: '',
    // receiverEmail: '',
    theme: 'romantic',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setError('');

    const { askerName, askerEmail, receiverName } = form;

    if (!askerName || !askerEmail || !receiverName) {
      setError('Please fill in all fields!');
      return;
    }

    setLoading(true);

    try {
      const res = await createDateRequest(form);

      navigate('/link-generated', {
        state: {
          requestId: res.data._id,
          receiverName: res.data.receiverName,
        }
      });
    } catch (err) {
      setError('Something went wrong. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page theme-romantic">
      <div className="card">
        
        <h1>Ask Someone Out 💌</h1>
        <p>Generate a cute date proposal card to share with your crush!</p>
        <p>Choose your card theme:</p>
        
        {/* THEME SELECT */}
        <div className="theme-grid">
          {THEMES.map((t) => (
            <div
              key={t.id}
              className={`theme-option ${form.theme === t.id ? 'selected' : ''}`}
              onClick={() => setForm({ ...form, theme: t.id })}
            >
              <span>{t.emoji}</span>
              <span>{t.label}</span>
              <small>{t.desc}</small>
            </div>
          ))}
        </div>

        <div className="input-group">
          {/* FORM */}
          <input
            name="askerName"
            placeholder="Your Name"
            value={form.askerName}
            onChange={handleChange}
          />

          {/* <input
            name="askerEmail"
            placeholder="Your Email"
            value={form.askerEmail}
            onChange={handleChange}
          /> */}

          <input
            name="receiverName"
            placeholder="Their Name"
            value={form.receiverName}
            onChange={handleChange}
          />

          {/* <input
            name="receiverEmail"
            placeholder="Their Email"
            value={form.receiverEmail}
            onChange={handleChange}
          /> */}

          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
        <button className="btn"onClick={handleSubmit} disabled={loading}>
          {loading ? 'Creating...' : 'Generate Card 💌'}
        </button>

      </div>
    </div>
  );
}