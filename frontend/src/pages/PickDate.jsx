import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDateRequest } from '../api';

export default function PickDate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [chosenDate, setChosenDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getDateRequest(id).then((res) => setData(res.data));
  }, [id]);

  const today = new Date().toISOString().split('T')[0];

  const handleNext = () => {
    if (!chosenDate) { setError('Please pick a date first! 📅'); return; }
    navigate(`/food-vibe/${id}`, { state: { chosenDate } });
  };

  const theme = data?.theme || 'romantic';
  const isRetro = theme === 'retro';
  const isKawaii = theme === 'kawaii';

  const titles = {
    romantic: { emoji: '📅', title: 'When shall we meet?', sub: 'Pick a date and I'll be counting down the days 💕' },
    kawaii: { emoji: '🎀', title: 'Pick our date!! 🥺', sub: 'Which day works for you, bestie? ✨' },
    retro: { emoji: '📆', title: 'SELECT DATE.EXE', sub: '>>> INPUT DATE COORDINATES <<<' },
    minimalist: { emoji: '', title: 'Choose a date', sub: 'When would you like to meet?' },
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
        {t.emoji && <div style={{ fontSize: '3rem', marginBottom: 16 }} className="animate-float">{t.emoji}</div>}
        <h1 style={{ marginBottom: 12 }}>{t.title}</h1>
        <p style={{ marginBottom: 28 }}>{t.sub}</p>

        <input
          type="date"
          min={today}
          value={chosenDate}
          onChange={(e) => { setChosenDate(e.target.value); setError(''); }}
        />

        {error && <p style={{ color: '#c0516b', marginBottom: 16, fontSize: '0.9rem' }}>{error}</p>}

        <button className="btn" onClick={handleNext} style={{ width: '100%', padding: '16px' }}>
          {isRetro ? 'NEXT >>>' : isKawaii ? 'Next!! 🍓' : 'Next →'}
        </button>
      </div>
    </div>
  );
}
