import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function LinkGenerated() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  // ✅ FIX: use requestId instead of link
  if (!state?.requestId) {
    return (
      <div className="page">
        <div className="card">
          <p>Missing data. Please create a new card.</p>
          <button className="btn" onClick={() => navigate('/')}>
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const fullLink = `${window.location.origin}/card/${state.requestId}`;

  const copyLink = () => {
    navigator.clipboard.writeText(fullLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className="page theme-romantic"
      style={{
        background: 'radial-gradient(ellipse at 60% 0%, #ffd6e0 0%, #fff0f3 60%)',
        minHeight: '100vh'
      }}
    >
      <div className="card animate-fade-in" style={{ maxWidth: 520 }}>
        <div style={{ fontSize: '3rem', marginBottom: 16 }}>💌</div>

        <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#c0516b' }}>
          Your card is ready!
        </h1>

        <p style={{ color: '#7a3040', marginBottom: 20 }}>
          Send this link to <strong>{state.receiverName}</strong>
        </p>

        <div className="link-box">{fullLink}</div>

        <button className="btn" onClick={copyLink}>
          {copied ? '✅ Copied!' : '📋 Copy Link'}
        </button>

        <button
          className="btn btn-outline"
          style={{ marginTop: 12 }}
          onClick={() => navigate('/')}
        >
          Make another 🌹
        </button>
      </div>
    </div>
  );
}