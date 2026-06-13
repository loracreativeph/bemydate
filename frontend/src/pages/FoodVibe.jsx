import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getDateRequest, respondToDateRequest } from '../api';

const VIBES = [
  { id: 'Fancy Dinner 🥂', emoji: '🥂', label: 'Fancy Dinner', desc: 'Dress up & dine fine' },
  { id: 'Street Food 🌮', emoji: '🌮', label: 'Street Food', desc: 'Casual & delicious' },
  { id: 'Cozy Café ☕', emoji: '☕', label: 'Cozy Café', desc: 'Coffee, pastries & vibes' },
  { id: 'Surprise Me! 🎁', emoji: '🎁', label: 'Surprise Me!', desc: 'Let them pick everything' },
];

export default function FoodVibe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [data, setData] = useState(null);
  const [foodVibe, setFoodVibe] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getDateRequest(id).then((res) => setData(res.data));
  }, [id]);

  const handleSubmit = async () => {
    if (!foodVibe) { setError('Pick a vibe first! 🍽️'); return; }
    setLoading(true);
    try {
      await respondToDateRequest(id, { chosenDate: state?.chosenDate, foodVibe });
      navigate(`/yay/${id}`, { state: { chosenDate: state?.chosenDate, foodVibe } });
    } catch {
      setError('Something went wrong, try again!');
    } finally {
      setLoading(false);
    }
  };

  const theme = data?.theme || 'romantic';
  const isRetro = theme === 'retro';
  const isKawaii = theme === 'kawaii';

  const titles = {
    romantic: { title: 'What\'s the food vibe?', sub: 'Set the mood for our date 🍷' },
    kawaii: { title: 'What should we eat!! 🍓', sub: 'Pick your fave food aesthetic uwu~' },
    retro: { title: 'SELECT FOOD.EXE', sub: '>>> CHOOSE DINING PROTOCOL <<<' },
    minimalist: { title: 'Food preference', sub: 'What kind of dining experience?' },
  };
  const t = titles[theme] || titles.romantic;

  return (
    <div
      className={`page theme-${theme}`}
      style={{
        minHeight: '100vh',
        background: isRetro
          ? 'radial-gradient(ellipse at 50% 0%, #2a0050 0%, #0d0d2b 70%)'
          : isKawaii
          ? 'linear-gradient(135deg, #fff0fa 0%, #ffe8f7 100%)'
          : theme === 'minimalist'
          ? '#fafafa'
          : 'radial-gradient(ellipse at 60% 0%, #ffd6e0 0%, #fff0f3 60%)',
      }}
    >
      <div className="card animate-fade-in">
        <h1 style={{ marginBottom: 12 }}>{t.title}</h1>
        <p style={{ marginBottom: 28 }}>{t.sub}</p>

        <div className="vibe-grid">
          {VIBES.map((v) => (
            <div
              key={v.id}
              className={`vibe-card ${foodVibe === v.id ? 'selected' : ''}`}
              onClick={() => { setFoodVibe(v.id); setError(''); }}
            >
              <span className="emoji">{v.emoji}</span>
              <span className="label">{v.label}</span>
              <span className="desc">{v.desc}</span>
            </div>
          ))}
        </div>

        {error && <p style={{ color: '#c0516b', marginBottom: 16, fontSize: '0.9rem' }}>{error}</p>}

        <button className="btn" onClick={handleSubmit} disabled={loading} style={{ width: '100%', padding: '16px' }}>
          {loading ? 'Sending the news...' : isRetro ? 'CONFIRM.EXE ▶' : isKawaii ? 'Let\'s gooo!! 🎀' : "It's a date! →"}
        </button>
      </div>
    </div>
  );
}
