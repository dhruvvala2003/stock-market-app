import React, { useEffect, useState } from 'react';
import GlassCard from '../components/shared/GlassCard';
import { fetchNews } from '../services/api';

export default function NewsSentiment() {
  const [articles, setArticles] = useState([]); const [error, setError] = useState('Loading approved news source…');
  useEffect(() => { fetchNews('Indian stock market').then(data => { setArticles(data.articles || []); setError(''); }).catch(err => setError(err.message)); }, []);
  return <div className="tab-pane active" id="tab-news"><GlassCard className="panel"><div className="panel-header"><div className="panel-title">Verified news & events</div><span className="panel-meta">Primary / licensed only</span></div>{error ? <p style={{ color: 'var(--accent-yellow)' }}>{error}</p> : articles.length ? articles.map(article => <article key={article.url} className="glass-card" style={{ padding: 16, marginTop: 10 }}><div className="panel-meta">{article.source?.name} · {article.publishedAt}</div><a href={article.url} target="_blank" rel="noreferrer" style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{article.title}</a></article>) : <p style={{ color: 'var(--text-secondary)' }}>No verified events are available.</p>}</GlassCard><GlassCard className="panel" style={{ marginTop: 'var(--space-5)' }}><div className="panel-title">Sentiment</div><p style={{ color: 'var(--text-secondary)', marginTop: 12 }}>Unavailable until an evidence-backed news classification pipeline is implemented. No synthetic score is displayed.</p></GlassCard></div>;
}
