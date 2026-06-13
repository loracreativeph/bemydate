import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function LinkGenerated() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  if (!state?.link) {
    navigate('/');
    return null;
  }

  const copyLink = () => {
    navigator.clipboard.writeText(state.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="page theme-romantic" style={{ background: 'radial-gradient(ellipse at 60% 0%, #ffd6e0 0%, #fff0f3 60%)', minHeight: '100vh' }}>
      <div className="card animate-fade-in" style={{ maxWidth: 520 }}>
        <div style={{ fontSize: '3rem', marginBottom: 16 }} className="animate-float">💌</div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#c0516b', marginBottom: 12 }}>
          Your card is ready!
        </h1>
        <p style={{ color: '#7a3040', marginBottom: 8 }}>
          Send this link to <strong>{state.receiverName}</strong> and wait for the magic ✨
        </p>

        <div className="link-box">{state.link}</div>

        <button className="btn copy-btn" onClick={copyLink} style={{ marginRight: 12 }}>
          {copied ? '✅ Copied!' : '📋 Copy Link'}
        </button>
        <button
          className="btn btn-outline"
          style={{ marginTop: 12 }}
          onClick={() => navigate('/')}
        >
          Make another 🌹
        </button>

        <p style={{ marginTop: 28, fontSize: '0.8rem', color: '#9a6070', lineHeight: 1.6 }}>
          Once they respond, you'll get an email with all the details 📬
        </p>
      </div>
    </div>
  );
}
