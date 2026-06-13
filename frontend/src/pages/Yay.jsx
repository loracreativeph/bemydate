import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getDateRequest } from '../api';

const CONFETTI_COLORS = ['#ff6b9d', '#c0516b', '#ffd700', '#a8edea', '#fed6e3', '#ff6fff', '#00e5ff'];

function Confetti() {
  const pieces = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    left: `${Math.random() * 100}vw`,
    delay: `${Math.random() * 2}s`,
    size: `${6 + Math.random() * 8}px`,
    duration: `${2 + Math.random() * 2}s`,
  }));
  return (
    <>
      {pieces.map((p) => (
        <div key={p.id} className="confetti-piece" style={{
          left: p.left, top: '-10px', width: p.size, height: p.size,
          background: p.color, animationDuration: p.duration, animationDelay: p.delay,
        }} />
      ))}
    </>
  );
}

export default function Yay() {
  const { id } = useParams();
  const { state } = useLocation();
  const [data, setData] = useState(null);

  useEffect(() => {
    getDateRequest(id).then((res) => setData(res.data));
  }, [id]);

  const theme = data?.theme || 'romantic';
  const isRetro = theme === 'retro';
  const isKawaii = theme === 'kawaii';

  const closings = {
    romantic: { emoji: '💖', title: 'It\'s official — it\'s a date!', sub: 'Get ready for the most magical evening 🌹 An email with all the details has been sent to both of you!', extra: '✨ Every love story is beautiful, but yours is my favourite ✨' },
    kawaii: { emoji: '🎀', title: 'OMG IT\'S A DATE!!!', sub: 'YAYYYY!! This is the BEST day ever!! 🍓 Check your emails uwu 💌', extra: '🌸 You said yes and now everything is perfect 🌸' },
    retro: { emoji: '🕹️', title: 'DATE CONFIRMED ✓', sub: 'MISSION ACCEPTED. EMAIL SENT TO ALL PARTIES. PREPARE FOR OPTIMAL DATE SEQUENCE.', extra: '[ ACHIEVEMENT UNLOCKED: SAID YES ] 🏆' },
    minimalist: { emoji: '🤍', title: 'It\'s a date.', sub: 'You\'ve both been notified by email. Looking forward to it.', extra: 'Good things take time. This will be one of them.' },
  };
  const c = closings[theme] || closings.romantic;

  return (
    <div
      className={`page theme-${theme}`}
      style={{
        minHeight: '100vh',
        background: isRetro ? 'radial-gradient(ellipse at 50% 0%, #2a0050 0%, #0d0d2b 70%)' : isKawaii ? 'linear-gradient(135deg, #fff0fa 0%, #ffe8f7 100%)' : theme === 'minimalist' ? '#fafafa' : 'radial-gradient(ellipse at 60% 0%, #ffd6e0 0%, #fff0f3 60%)',
        overflow: 'hidden', position: 'relative',
      }}
    >
      <Confetti />
      <div className="card animate-fade-in" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: '4rem', marginBottom: 16 }} className={isRetro ? '' : 'animate-float'}>{c.emoji}</div>
        <h1 style={{ marginBottom: 16 }}>{c.title}</h1>

        {state?.chosenDate && (
          <div style={{ display: 'inline-block', background: 'var(--bg2, #fff0f3)', borderRadius: 12, padding: '10px 20px', margin: '0 0 16px', fontSize: '0.95rem', color: 'var(--accent, #c0516b)', fontWeight: 600 }}>
            📅 {new Date(state.chosenDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        )}

        {state?.foodVibe && (
          <div style={{ display: 'inline-block', background: 'var(--bg2, #fff0f3)', borderRadius: 12, padding: '10px 20px', margin: '0 0 24px', fontSize: '0.95rem', color: 'var(--accent, #c0516b)', fontWeight: 600 }}>
            {state.foodVibe}
          </div>
        )}

        <p style={{ marginBottom: 24 }}>{c.sub}</p>
        <p style={{ fontSize: '0.85rem', fontStyle: isRetro ? 'normal' : 'italic', opacity: 0.6, fontFamily: isRetro ? "'Press Start 2P', monospace" : 'inherit' }}>{c.extra}</p>
      </div>
    </div>
  );
}
