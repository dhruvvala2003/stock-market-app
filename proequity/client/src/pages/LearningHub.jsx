import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/shared/GlassCard';

// --- Data Structures ---
const technicalModules = [
  {
    id: 'tech1',
    title: 'Module 1: Chart Types & Candlesticks',
    terms: [
      {
        title: '🕯️ Candlestick Anatomy',
        content: [
          'Every candlestick has 4 components: Open (first trade), High (highest price), Low (lowest price), Close (last trade).',
          'Body: Range between open and close. Green/White: Close > Open (bullish). Red/Black: Close < Open (bearish).',
          'Wicks (Shadows): Lines extending from body. Upper wick = price rejected from highs. Lower wick = price found support.',
          'Long body: Strong conviction. Short body: Indecision. No body (Doji): Open = Close = pure indecision.'
        ],
        formula: 'Candle Range = High - Low\nBody Size = |Close - Open|\nUpper Wick = High - Max(Open, Close)\nLower Wick = Min(Open, Close) - Low',
        conclusion: '✅ Master candlestick reading before any indicator. Price action is king - indicators are just derivatives of price.'
      }
    ]
  },
  {
    id: 'tech2',
    title: 'Module 2: Moving Averages & Trends',
    terms: [
      {
        title: '📈 Moving Averages Explained',
        content: [
          'SMA (Simple Moving Average): Average of last N closing prices. SMA(20) = average of last 20 days.',
          'EMA (Exponential Moving Average): Gives more weight to recent prices. More responsive than SMA.',
          'Trend Identification: Price > SMA 50 > SMA 200 = Bullish alignment. All sloping up = strong trend.',
          'Golden Cross: SMA 50 crosses above SMA 200 = long-term bullish. Death Cross: Opposite = bearish.'
        ],
        formula: 'SMA(N) = (P1 + P2 + ... + PN) / N\nEMA(today) = (Price x k) + (EMA(yesterday) x (1 - k))\nwhere k = 2 / (N + 1)',
        conclusion: '✅ Use SMA for support/resistance. Use EMA for entry/exit signals. Combine both for confirmation.'
      }
    ]
  },
  {
    id: 'tech3',
    title: 'Module 3: Momentum Indicators (RSI, MACD)',
    terms: [
      {
        title: '📉 RSI - Relative Strength Index',
        content: [
          'Measures speed and magnitude of price changes. Range: 0-100.',
          'Overbought (>70): Potential sell zone. Oversold (<30): Potential buy zone.',
          'Divergence: Price makes new high, RSI doesn\'t = bearish (sell). Price new low, RSI higher = bullish (buy).'
        ],
        formula: 'RSI = 100 − [100 / (1 + RS)]\nRS = Average of X days up closes / Average of X days down closes',
        conclusion: '✅ RSI for entry timing. MACD for trend confirmation. Never use one indicator alone — always seek confluence.'
      }
    ]
  },
  {
    id: 'tech4',
    title: 'Module 4: Support, Resistance & Fibonacci',
    terms: [
      {
        title: '🛡️ Support & Resistance',
        content: [
          'Support: Price level where buying overcomes selling. Previous lows, moving averages, psychological levels (₹100, ₹1,000).',
          'Resistance: Price level where selling overcomes buying. Previous highs, round numbers, Fibonacci levels.',
          'Role Reversal: When support breaks, it becomes resistance. When resistance breaks, it becomes support.'
        ],
        formula: 'Key Levels: 23.6%, 38.2%, 50%, 61.8%, 78.6%\nDraw from swing low to swing high (uptrend) or high to low (downtrend)',
        conclusion: '✅ Combine Fibonacci with volume and candlestick patterns for highest probability trades. Confluence = confidence.'
      }
    ]
  },
  {
    id: 'tech5',
    title: 'Module 5: Chart Patterns',
    terms: [
      {
        title: '🔍 Chart Patterns Encyclopedia',
        content: [
          'Continuation Patterns: Flag, Pennant, Triangle, Wedge. Form during pause in trend. Breakout = trend resumes.',
          'Reversal Patterns: Head & Shoulders, Double Top/Bottom, Rounding. Form at trend extremes. Break neckline = reversal confirmed.',
          'Volume Rule: Breakout on high volume = genuine. Breakout on low volume = false breakout (trap).',
          'Measured Move: Flag pole height = minimum target after breakout. Head to neckline = minimum target after H&S breakout.'
        ],
        conclusion: '✅ Chart patterns work best on daily/weekly timeframes. Intraday patterns are less reliable due to noise.'
      }
    ]
  }
];

const fundamentalModules = [
  {
    id: 'fund1',
    title: 'Module 1: Financial Statements Deep Dive',
    terms: [
      {
        title: '📄 Three Financial Statements',
        content: [
          'Income Statement (P&L): Revenue → Expenses → Profit. Shows profitability over time.',
          'Balance Sheet: Assets = Liabilities + Equity. Snapshot of financial position at a point in time.',
          'Cash Flow Statement: Operating + Investing + Financing = Net Cash Change. Most honest statement — harder to manipulate.',
          'Red Flags: Revenue growing but cash flow not = accounting tricks. Receivables growing faster than revenue = channel stuffing.'
        ],
        formula: 'Net Income = Revenue − COGS − Operating Expenses − Interest − Tax\nFree Cash Flow = Operating Cash Flow − Capital Expenditures',
        conclusion: '✅ Always read all three statements together. Cash flow is the truth-teller. If net income > cash flow consistently, dig deeper.'
      }
    ]
  },
  {
    id: 'fund2',
    title: 'Module 2: Valuation Methods',
    terms: [
      {
        title: '💰 Valuation Methods',
        content: [
          '1. DCF (Discounted Cash Flow): Sum of all future cash flows discounted to present. Most theoretically correct but assumption-heavy.',
          '2. Relative Valuation (Multiples): Compare PE, PB, EV/EBITDA to peers and history. Quick but less precise.',
          '3. Asset-Based: Sum of parts valuation. Useful for conglomerates (Reliance, Tata).',
          '4. Dividend Discount: For income stocks. Value = D₁ / (r − g). Only works for stable dividend payers.'
        ],
        formula: 'DCF Value = Σ [FCFₜ / (1 + WACC)ᵗ] + Terminal Value / (1 + WACC)ⁿ\nFair Value = Industry Avg PE × Company EPS',
        conclusion: '✅ Use multiple methods. If they converge on similar value = high confidence. If wide apart = too uncertain, skip.'
      }
    ]
  },
  {
    id: 'fund3',
    title: 'Module 3: Quality Assessment Framework',
    terms: [
      {
        title: '✅ 8-Point Quality Check',
        content: [
          '1. Revenue Growth: 5-year CAGR > 10% = good. Consistency > one-off spikes.',
          '2. Margin Trend: Expanding = pricing power. Contracting = competition.',
          '3. Cash Flow Quality: OCF/Net Profit > 1.0 = real profits.',
          '4. Debt Levels: D/E < 0.5 = conservative. > 1.5 = risky.',
          '5. Promoter Integrity: Pledge < 10%. Related party transactions minimal.',
          '6. Institutional Confidence: Rising FII/DII = validation.',
          '7. Management Quality: ROIC > WACC consistently. Capital allocation discipline.',
          '8. Competitive Moat: Brand, network effects, switching costs, cost advantage.'
        ],
        conclusion: '✅ A stock passing 6+ checks = investable. 4-5 = with caution. < 4 = avoid regardless of price.'
      }
    ]
  },
  {
    id: 'fund4',
    title: 'Module 4: Sector Analysis',
    terms: [
      {
        title: '🏭 Sector-Specific Metrics',
        content: [
          'Banks: NIM (Net Interest Margin), GNPA (Gross NPA), PCR (Provision Coverage), CASA Ratio.',
          'IT: Revenue per employee, Attrition rate, Utilization, Deal TCV (Total Contract Value).',
          'Pharma: ANDA filings, R&D spend %, USFDA status, Patent cliff exposure.',
          'Auto: Volume growth, ASP (Average Selling Price), Market share, EV transition progress.',
          'Realty: Pre-sales, Collection efficiency, Net debt/EBITDA, Land bank value.'
        ],
        conclusion: '✅ Each sector has unique metrics. Master sector-specific KPIs before investing. What matters in banking is irrelevant in pharma.'
      }
    ]
  },
  {
    id: 'fund5',
    title: 'Module 5: Economic Indicators',
    terms: [
      {
        title: '🌍 Key Economic Indicators',
        content: [
          'GDP Growth: > 6% = healthy economy. < 4% = slowdown. Affects all sectors.',
          'Inflation (CPI/WPI): 2-6% = RBI comfort zone. > 6% = rate hikes likely. < 2% = deflation risk.',
          'Interest Rates (Repo): Lower = bullish for equities (cheaper borrowing). Higher = bearish.',
          'Fiscal Deficit: < 3.5% of GDP = sustainable. > 5% = macro risk.',
          'Current Account: Surplus = strong currency. Deficit > 3% = currency weakness risk.'
        ],
        conclusion: '✅ Current India: GDP 7.2%, CPI 4.8%, Repo 6.5% = Goldilocks. Favorable for equities. Watch fiscal deficit and CAD.'
      }
    ]
  }
];

const glossary = [
  { title: '📘 EPS — Earnings Per Share', desc: 'Net profit divided by shares outstanding.', formula: 'EPS = Net Profit / Shares Outstanding', tip: 'Growing EPS = company creating value. Declining = destroying value.' },
  { title: '📘 P/E — Price to Earnings', desc: 'How much you pay for ₹1 of annual earnings.', formula: 'P/E = Price / EPS', tip: 'Lower = cheaper. Compare to sector and history.' },
  { title: '📘 P/B — Price to Book', desc: 'How much you pay for net assets per share.', formula: 'P/B = Price / Book Value per Share', tip: '< 1 = potential value. > 3 = premium for intangibles.' },
  { title: '📘 ROE — Return on Equity', desc: 'How efficiently equity capital generates profit.', formula: 'ROE = Net Income / Shareholders\' Equity', tip: '> 15% = good. > 20% = excellent. Check DuPont for quality.' },
  { title: '📘 ROCE — Return on Capital Employed', desc: 'How efficiently ALL capital (debt + equity) generates profit.', formula: 'ROCE = EBIT / Capital Employed', tip: '> 15% = capital efficient. Best measure of business quality.' },
  { title: '📘 EBITDA Margin', desc: 'Operating profit before depreciation, interest, tax.', formula: 'EBITDA Margin = EBITDA / Revenue', tip: 'Expanding = pricing power. Contracting = competitive pressure.' },
  { title: '📘 Free Cash Flow (FCF)', desc: 'Cash available after all expenses and capital investments.', formula: 'FCF = Operating Cash Flow − Capex', tip: 'Positive and growing = company can reward shareholders.' },
  { title: '📘 Debt-to-Equity', desc: 'How much debt relative to shareholders\' equity.', formula: 'D/E = Total Debt / Shareholders\' Equity', tip: '< 0.5 = conservative. > 1.5 = risky. Banks excluded.' },
  { title: '📘 Beta', desc: 'Stock\'s sensitivity to market movements.', formula: 'β = Covariance(Stock, Market) / Variance(Market)', tip: '1.0 = moves with market. > 1.0 = more volatile. < 1.0 = less volatile.' },
  { title: '📘 Sharpe Ratio', desc: 'Risk-adjusted return. Higher = better return per unit of risk.', formula: 'Sharpe = (Return − Risk Free) / Std Dev', tip: '> 1 = good. > 1.5 = excellent. < 0 = worse than risk-free.' },
  { title: '📘 Alpha', desc: 'Excess return over benchmark. Measures skill, not luck.', formula: 'α = Portfolio Return − Expected Return', tip: 'Positive alpha = outperforming. Negative = underperforming.' },
  { title: '📘 PEG Ratio', desc: 'PE adjusted for growth. < 1 = undervalued.', formula: 'PEG = PE / Earnings Growth Rate', tip: 'Best for growth stocks. Peter Lynch\'s favorite metric.' }
];

// --- Subcomponents ---

const AccordionItem = ({ module, activeId, onToggle }) => {
  const isActive = activeId === module.id;

  return (
    <motion.div className="module-item" initial={false}>
      <motion.div 
        className="collapse-header" 
        onClick={() => onToggle(module.id)}
        whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
        style={{ cursor: 'pointer', padding: '16px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <span style={{ fontWeight: 600, fontSize: '15px' }}>{module.title}</span>
        <motion.span 
          animate={{ rotate: isActive ? 180 : 0 }} 
          transition={{ duration: 0.3 }}
          style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}
        >
          ▼
        </motion.span>
      </motion.div>
      
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '20px' }}>
              {module.terms.map((term, idx) => (
                <div key={idx} className="glossary-term glass" style={{ marginBottom: idx === module.terms.length - 1 ? 0 : '20px' }}>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '12px', fontSize: '16px' }}>{term.title}</h4>
                  {term.content.map((para, pIdx) => (
                    <p key={pIdx} style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '8px' }}>
                      {/* Bold the part before the colon if it exists */}
                      {para.includes(':') ? (
                        <>
                          <strong style={{ color: 'var(--text-primary)' }}>{para.split(':')[0]}:</strong>
                          {para.split(':').slice(1).join(':')}
                        </>
                      ) : para}
                    </p>
                  ))}
                  
                  {term.formula && (
                    <div className="formula" style={{ margin: '16px 0', padding: '12px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', borderLeft: '3px solid var(--accent-cyan)', fontFamily: 'monospace', color: 'var(--accent-cyan)', whiteSpace: 'pre-line', fontSize: '13px' }}>
                      {term.formula}
                    </div>
                  )}
                  
                  {term.conclusion && (
                    <div className="conclusion" style={{ marginTop: '16px', padding: '12px', background: 'rgba(52,199,89,0.1)', borderRadius: '8px', color: 'var(--accent-green)', fontSize: '14px', fontWeight: 500 }}>
                      {term.conclusion}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};


// --- Main Component ---
const LearningHub = () => {
  const [activeTechModule, setActiveTechModule] = useState(null);
  const [activeFundModule, setActiveFundModule] = useState(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div className="tab-pane active" id="tab-learning" variants={container} initial="hidden" animate="show">
      
      <motion.div variants={item}>
        <GlassCard className="panel" style={{ marginBottom: 'var(--space-5)' }}>
          <div className="panel-header" style={{ borderBottom: 'none', paddingBottom: 0 }}>
            <div className="panel-title">
              <span className="icon" style={{ background: 'rgba(100,210,255,0.15)' }}>🎓</span>
              Learning Hub - Master the Markets
            </div>
            <span className="panel-meta">From Basics to Advanced</span>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, padding: '0 20px 20px 20px' }}>
            Welcome to the most comprehensive stock market learning platform. Every concept is explained with real examples, formulas, and actionable insights. Click any topic to explore.
          </p>
        </GlassCard>
      </motion.div>

      {/* Learning Modules */}
      <div className="grid-2" style={{ marginBottom: 'var(--space-5)', alignItems: 'start' }}>
        
        {/* Technical Analysis */}
        <motion.div variants={item}>
          <GlassCard className="panel" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="panel-header" style={{ padding: '20px', background: 'rgba(255,255,255,0.02)' }}>
              <div className="panel-title">
                <span className="icon" style={{ background: 'rgba(255,149,0,0.15)' }}>📈</span>
                Technical Analysis Mastery
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {technicalModules.map(module => (
                <AccordionItem 
                  key={module.id} 
                  module={module} 
                  activeId={activeTechModule} 
                  onToggle={(id) => setActiveTechModule(activeTechModule === id ? null : id)} 
                />
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Fundamental Analysis */}
        <motion.div variants={item}>
          <GlassCard className="panel" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="panel-header" style={{ padding: '20px', background: 'rgba(255,255,255,0.02)' }}>
              <div className="panel-title">
                <span className="icon" style={{ background: 'rgba(52,199,89,0.15)' }}>📊</span>
                Fundamental Analysis Mastery
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {fundamentalModules.map(module => (
                <AccordionItem 
                  key={module.id} 
                  module={module} 
                  activeId={activeFundModule} 
                  onToggle={(id) => setActiveFundModule(activeFundModule === id ? null : id)} 
                />
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Glossary */}
      <motion.div variants={item}>
        <GlassCard className="panel" style={{ marginBottom: 'var(--space-5)' }}>
          <div className="panel-header">
            <div className="panel-title">
              <span className="icon" style={{ background: 'rgba(175,82,222,0.15)' }}>📖</span>
              Financial Terms Glossary
            </div>
          </div>
          <div className="grid-3" style={{ gap: 'var(--space-3)' }}>
            {glossary.map((term, i) => (
              <motion.div key={i} className="glossary-term glass-card" style={{ padding: '16px' }} whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px', fontSize: '15px' }}>{term.title}</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', lineHeight: 1.4 }}>{term.desc}</p>
                <div style={{ padding: '8px', background: 'rgba(0,0,0,0.2)', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', color: 'var(--accent-purple)', marginBottom: '8px', borderLeft: '2px solid var(--accent-purple)' }}>
                  {term.formula}
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', margin: 0, fontStyle: 'italic' }}>{term.tip}</p>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

    </motion.div>
  );
};

export default LearningHub;
