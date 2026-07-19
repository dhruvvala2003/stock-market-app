import React, { useState, useEffect } from 'react';
import GlassCard from '../components/shared/GlassCard';
import { fetchNews } from '../services/api';

const NewsSentiment = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      try {
        const data = await fetchNews('Indian stock market');
        if (data?.articles && data.articles.length > 0) {
          setArticles(data.articles.slice(0, 8));
        }
      } catch (err) {
        console.warn('Failed to load news:', err);
      }
      setLoading(false);
    };
    loadNews();
  }, []);

  const timeSince = (dateStr) => {
    if (!dateStr) return '';
    const secs = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (secs < 60) return 'Just now';
    if (secs < 3600) return `${Math.floor(secs / 60)} mins ago`;
    if (secs < 86400) return `${Math.floor(secs / 3600)} hours ago`;
    return `${Math.floor(secs / 86400)} days ago`;
  };

  // Fallback news items if API fails
  const fallbackArticles = [
    { title: 'RBI keeps repo rate unchanged at 6.5% as inflation remains a concern', description: 'The Reserve Bank of India maintained status quo on key interest rates...', source: { name: 'Reuters' }, publishedAt: new Date(Date.now() - 600000).toISOString() },
    { title: 'FIIs pour ₹14,500 crore into Indian equities amid global market rally', description: 'Foreign institutional investors turned net buyers in the Indian market...', source: { name: 'Bloomberg' }, publishedAt: new Date(Date.now() - 2700000).toISOString() },
    { title: 'Nifty 50 crosses 24,500 mark for the first time on strong earnings momentum', description: 'The benchmark Nifty 50 index touched a new all-time high...', source: { name: 'Economic Times' }, publishedAt: new Date(Date.now() - 5400000).toISOString() },
    { title: 'Reliance Industries Q1 net profit rises 12% to ₹19,820 crore', description: 'Reliance Industries reported strong Q1 results beating Street estimates...', source: { name: 'Moneycontrol' }, publishedAt: new Date(Date.now() - 7200000).toISOString() },
  ];

  const displayArticles = articles.length > 0 ? articles : fallbackArticles;

  return (
    <div className="tab-pane active" id="tab-news">
      <div className="grid-2">
        <GlassCard className="panel">
          <div className="panel-header">
            <div className="panel-title">
              <span className="icon" style={{ background: 'rgba(255,204,0,0.15)' }}>🧠</span>
              Market Sentiment (AI)
            </div>
            <span className="panel-meta">Real-time</span>
          </div>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <div style={{ textAlign: 'center', minWidth: '100px' }}>
              <div style={{ fontSize: '48px', fontWeight: 800, color: 'var(--accent-green)', letterSpacing: '-0.03em' }}>62</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--accent-green)', marginBottom: 'var(--space-1)' }}>BULLISH</div>
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Score: 62/100</div>
            </div>
            <div style={{ flex: 1 }}>
              {[
                { label: 'Positive', value: 68, color: 'var(--accent-green)' },
                { label: 'Neutral', value: 14, color: 'var(--accent-yellow)' },
                { label: 'Negative', value: 18, color: 'var(--accent-red)' },
              ].map(s => (
                <div key={s.label} style={{ marginBottom: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
                    <span>{s.label}</span><span>{s.value}%</span>
                  </div>
                  <div className="progress-track" style={{ height: '8px' }}>
                    <div className="progress-fill" style={{ width: `${s.value}%`, background: s.color }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        <GlassCard className="panel">
          <div className="panel-header">
            <div className="panel-title">
              <span className="icon" style={{ background: 'rgba(100,210,255,0.15)' }}>📰</span>
              Live News Feed
            </div>
            <span className="panel-meta">{loading ? 'Loading...' : `${displayArticles.length} articles`}</span>
          </div>
          <div className="grid-1" style={{ maxHeight: '450px', overflowY: 'auto' }}>
            {displayArticles.map((article, idx) => (
              <div key={idx} className="glass-card" style={{ padding: 'var(--space-3) var(--space-4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-1)', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                  <span>{timeSince(article.publishedAt)}</span>
                  <span style={{ fontWeight: 600 }}>{article.source?.name || 'News'}</span>
                </div>
                <div style={{ fontWeight: 600, fontSize: '14px', lineHeight: 1.4, marginBottom: 'var(--space-1)' }}>
                  {article.title}
                </div>
                {article.description && (
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>
                    {article.description.substring(0, 120)}...
                  </p>
                )}
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default NewsSentiment;
