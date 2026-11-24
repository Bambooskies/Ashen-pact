import { useState } from 'react'
import reviveScript from '../kubejs/server_scripts/revive.js?raw'
import './App.css'

const steps = [
  {
    number: '01',
    title: 'Find a soul',
    description: 'A spectator within 20 blocks is eligible to return.',
    detail: '20-block radius',
  },
  {
    number: '02',
    title: 'Pay the price',
    description: 'The ember is consumed. Both players permanently lose one heart.',
    detail: '−2 max HP each',
  },
  {
    number: '03',
    title: 'Rise again',
    description: 'The fallen player returns at 5 hearts with a brief weakness.',
    detail: '60 seconds',
  },
]

function EmberMark({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M25 4c2 9-5 11-2 17 2-3 5-5 8-7 0 7 9 10 9 19a16 16 0 1 1-32 0c0-7 5-12 9-17 0 7 3 8 4 9 3-5-2-10 4-21Z"
        fill="currentColor"
      />
      <path
        d="M24 28c1 4-3 5-2 9a5 5 0 0 0 10 0c0-3-3-5-4-7-1 2-2 2-2 3 0-2-1-3-2-5Z"
        fill="#211915"
      />
    </svg>
  )
}

function App() {
  const [revivals, setRevivals] = useState(0)
  const [copyStatus, setCopyStatus] = useState('')
  const hearts = Math.max(10 - revivals, 0)
  const maxHealth = 20 - revivals * 2

  async function copyScript() {
    try {
      await navigator.clipboard.writeText(reviveScript)
      setCopyStatus('Copied to clipboard')
    } catch {
      setCopyStatus('Clipboard unavailable — select the code to copy it.')
    }
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Soul Ember home">
          <span className="brand-mark"><EmberMark /></span>
          <span>ASHEN<span className="brand-divider">/</span>PACT</span>
        </a>
        <nav className="top-nav" aria-label="Main navigation">
          <a href="#ritual">The ritual</a>
          <a href="#cost">The cost</a>
          <a href="#code">Source</a>
        </nav>
        <a className="github-link" href="#code">
          <span className="github-icon" aria-hidden="true">◇</span>
          <span>Project files</span>
          <span aria-hidden="true">↓</span>
        </a>
      </header>

      <section className="hero page-width" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> KUBEJS GAMEPLAY SCRIPT</p>
          <h1>Some souls<br />aren’t <em>finished.</em></h1>
          <p className="hero-description">
            Bring a fallen teammate back from spectator mode. The ember answers —
            but every resurrection takes a little more from both of you.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#ritual">
              Discover the ritual <span aria-hidden="true">↓</span>
            </a>
            <a className="button button-quiet" href="#code">
              View source <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="hero-meta">
            <span><i className="status-dot" /> Minecraft 1.20.1</span>
            <span className="meta-divider" />
            <span>KubeJS 6</span>
            <span className="meta-divider" />
            <span>Server-side</span>
          </div>
        </div>

        <div className="ritual-art" aria-label="Illustration of the soul ember ritual">
          <div className="art-glow" />
          <div className="art-ring art-ring-one" />
          <div className="art-ring art-ring-two" />
          <div className="rune rune-one">ᛉ</div>
          <div className="rune rune-two">ᚦ</div>
          <div className="rune rune-three">ᚨ</div>
          <div className="altar">
            <div className="altar-top">
              <span className="altar-glyph">✳</span>
              <span className="altar-glyph">✳</span>
              <span className="altar-glyph">✳</span>
            </div>
            <div className="skull">
              <span className="skull-eye skull-eye-left" />
              <span className="skull-eye skull-eye-right" />
              <span className="skull-nose" />
              <span className="skull-teeth" />
            </div>
            <div className="altar-base" />
          </div>
          <div className="ember-orb"><EmberMark /></div>
          <div className="art-caption"><span /> THE LAST LIGHT <span /></div>
          <div className="art-coordinate">X  ·  Y  ·  Z</div>
        </div>
      </section>

      <section className="stat-strip page-width" aria-label="Ritual summary">
        <div className="stat">
          <span className="stat-value">20<span className="stat-unit"> blocks</span></span>
          <span className="stat-label">Soul-search radius</span>
        </div>
        <div className="stat">
          <span className="stat-value">−1<span className="stat-unit"> heart</span></span>
          <span className="stat-label">Permanent cost · per player</span>
        </div>
        <div className="stat">
          <span className="stat-value">5<span className="stat-unit"> hearts</span></span>
          <span className="stat-label">Health on return</span>
        </div>
        <div className="stat stat-last">
          <span className="stat-value">60<span className="stat-unit"> sec</span></span>
          <span className="stat-label">Weakness &amp; slowness</span>
        </div>
      </section>

      <section className="section page-width" id="ritual">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 — THE EXCHANGE</p>
            <h2>A second chance.<br /><em>A shared sacrifice.</em></h2>
          </div>
          <p className="section-intro">
            A small server-side script turns a Wither Skeleton Skull into a
            point of return — and makes sure nobody walks away untouched.
          </p>
        </div>
        <div className="steps">
          {steps.map((step) => (
            <article className="step-card" key={step.number}>
              <span className="step-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <span className="step-detail">{step.detail}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="cost-section" id="cost">
        <div className="page-width cost-layout">
          <div className="cost-copy">
            <p className="eyebrow">02 — THE PRICE OF RETURN</p>
            <h2>Every return<br />leaves a <em>mark.</em></h2>
            <p>
              The pact remembers. Max health is reduced permanently for both
              players, stacking with every revival. No upgrades. No undo.
            </p>
            <div className="cost-note">
              <span className="note-icon">✳</span>
              <span>Try the ritual below. This is a visual demo, not connected to a Minecraft server.</span>
            </div>
          </div>
          <div className="simulator">
            <div className="simulator-top">
              <span className="simulator-label"><i className="status-dot" /> RITUAL SIMULATOR</span>
              <span className="revival-count">{String(revivals).padStart(2, '0')} / ∞</span>
            </div>
            <div className="players">
              {['The one who returned', 'The one who called'].map((label) => (
                <div className="player-row" key={label}>
                  <div className="player-avatar">{label === 'The one who returned' ? '✧' : '✦'}</div>
                  <div className="player-info">
                    <span className="player-name">{label}</span>
                    <span className="heart-row" aria-label={`${hearts} of 10 hearts remaining`}>
                      {Array.from({ length: 10 }, (_, index) => (
                        <span className={index < hearts ? 'heart heart-on' : 'heart'} key={index}>♥</span>
                      ))}
                    </span>
                  </div>
                  <span className="health-value">{maxHealth} HP</span>
                </div>
              ))}
            </div>
            <div className="simulator-bottom">
              <span>Permanent max-health loss <strong>−{revivals * 2} HP</strong></span>
              <div className="simulator-actions">
                <button className="reset-button" type="button" onClick={() => setRevivals(0)} disabled={revivals === 0}>
                  Reset
                </button>
                <button className="ritual-button" type="button" onClick={() => setRevivals((value) => value + 1)}>
                  <EmberMark /> Perform ritual
                </button>
              </div>
            </div>
            {revivals >= 10 && (
              <p className="simulator-warning">
                At 10 revivals, the formula reaches 0 HP. Vanilla attribute limits and death behavior may vary.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="section code-section page-width" id="code">
        <div className="section-heading code-heading">
          <div>
            <p className="eyebrow">03 — UNDER THE HOOD</p>
            <h2>Small script.<br /><em>Lasting consequences.</em></h2>
          </div>
          <div className="install-card">
            <span className="install-label">INSTALL PATH</span>
            <code>kubejs/server_scripts/revive.js</code>
            <span className="install-hint">Requires the <code>kubejs:soul_ember</code> item.</span>
          </div>
        </div>
        <div className="code-window">
          <div className="code-bar">
            <div className="window-dots"><i /><i /><i /></div>
            <span>revive.js</span>
            <button type="button" className="copy-button" onClick={copyScript}>
              <span aria-hidden="true">▣</span> Copy script
            </button>
          </div>
          <pre><code>{reviveScript}</code></pre>
        </div>
        <p className="copy-status" aria-live="polite">{copyStatus}</p>
      </section>

      <footer className="footer page-width">
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark"><EmberMark /></span>
          <span>ASHEN<span className="brand-divider">/</span>PACT</span>
        </a>
        <span>A tiny resurrection mechanic for KubeJS.</span>
        <a href="#top">Back to the surface ↑</a>
      </footer>
    </main>
  )
}

export default App
