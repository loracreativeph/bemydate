import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDateRequest } from '../api';

const THEME_CONTENT = {
  romantic: {
    deco: '🌹 🌸 🌹',
    title: (name) => `Will you go on a date with me, ${name}?`,
    subtitle: 'My heart has been waiting for this moment... 💕',
    yesLabel: 'Yes, absolutely! 💖',
    noLabel: 'No...',
  },
  kawaii: {
    deco: '🍓 ✨ 🍓',
    title: (name) => `Hewwo ${name}!! Will you go on a date with me?? 🥺`,
    subtitle: 'pwetty pwease?? UwU 🌸',
    yesLabel: 'Yes yes YES!! 🎀',
    noLabel: 'N-nope',
  },
  retro: {
    deco: '💾 📼 💾',
    title: (name) => `PLAYER 2 DETECTED: ${name.toUpperCase()}`,
    subtitle: '>>> REQUESTING DATE.EXE — ACCEPT? Y/N <<<',
    yesLabel: '[ YES ] ▶',
    noLabel: '[ NO ]',
  },
  minimalist: {
    deco: '',
    title: (name) => `${name}, will you go on a date with me?`,
    subtitle: 'A simple question deserves a simple answer.',
    yesLabel: 'Yes',
    noLabel: 'No',
  },
};

export default function Card() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [noPos, setNoPos] = useState({ x: null, y: null });
  const [noAttempts, setNoAttempts] = useState(0);

  useEffect(() => {
    getDateRequest(id)
      .then((res) => setData(res.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  const runAwayNo = () => {
    setNoAttempts((n) => n + 1);
    const vw = window.innerWidth - 120;
    const vh = window.innerHeight - 60;
    const x = Math.floor(Math.random() * vw);
    const y = Math.floor(Math.random() * vh);
    setNoPos({ x, y });
  };

  const handleYes = () => navigate(`/pick-date/${id}`);

  if (loading) return (
    <div className="page">
      <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', color: '#c0516b' }}>
        Loading your surprise... 🌹
      </p>
    </div>
  );

  if (notFound) return (
    <div className="page">
      <div className="card">
        <p style={{ fontSize: '1.1rem' }}>💔 This date card doesn't exist or has expired.</p>
      </div>
    </div>
  );

  const theme = data.theme || 'romantic';
  const content = THEME_CONTENT[theme];
  const isRetro = theme === 'retro';
  const isKawaii = theme === 'kawaii';

  const noMessages = [
    'Nice try! 😏', 'Not so fast! 🏃', 'Come back here! 💨',
    'You can\'t escape! 😂', 'Hehehe~ 😈', 'The cursor is mine now 🖱️',
    'CATCH ME IF YOU CAN', 'Nope, not today!', 'You\'re getting warmer... to YES 🔥',
  ];

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
        position: 'relative',
        overflow: isRetro ? 'hidden' : 'visible',
      }}
    >
      {isRetro && (
        <div style={{
          position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)',
        }} />
      )}

      <div className="card animate-fade-in" style={{ position: 'relative', zIndex: 1 }}>
        {content.deco && <div className="deco">{content.deco}</div>}

        <h1 className={isRetro ? '' : 'animate-heart'} style={{ marginBottom: 16 }}>
          {content.title(data.receiverName)}
        </h1>
        <p style={{ marginBottom: 40 }}>{content.subtitle}</p>

        {noAttempts > 0 && (
          <p style={{
            fontSize: '0.85rem', marginBottom: 20, opacity: 0.7,
            color: isRetro ? '#00e5ff' : '#c0516b',
            fontStyle: isRetro ? 'normal' : 'italic',
            fontFamily: isRetro ? "'Press Start 2P', monospace" : 'inherit',
          }}>
            {noMessages[Math.min(noAttempts - 1, noMessages.length - 1)]}
          </p>
        )}

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'center' }}>
          <button
            className="btn"
            onClick={handleYes}
            style={{ fontSize: isKawaii ? '1.1rem' : '1rem', padding: '16px 32px' }}
          >
            {content.yesLabel}
          </button>

          <button
            className="btn btn-outline"
            onMouseEnter={runAwayNo}
            onTouchStart={runAwayNo}
            onClick={runAwayNo}
            style={{
              position: noPos.x !== null ? 'fixed' : 'relative',
              left: noPos.x !== null ? noPos.x : 'auto',
              top: noPos.y !== null ? noPos.y : 'auto',
              transition: 'left 0.1s, top 0.1s',
              zIndex: 999,
              fontSize: '0.9rem',
              opacity: noAttempts > 5 ? 0.3 : 1,
              userSelect: 'none',
            }}
          >
            {content.noLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
