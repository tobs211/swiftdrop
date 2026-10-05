import { useState } from 'react'
import './App.css'

const deliveries = {
  'SD-84920': {
    type: 'Express grocery',
    pickup: 'Downtown Central Hub',
    destination: 'Uptown Residence',
    courier: 'Marcus Vance',
    initials: 'MV',
    eta: 14,
    progress: 65,
    speed: '28 mph',
  },
  'SD-10942': {
    type: 'Legal documents',
    pickup: 'Financial District',
    destination: 'Morgan & Associates',
    courier: 'Elena Rostova',
    initials: 'ER',
    eta: 7,
    progress: 85,
    speed: '32 mph',
  },
  'SD-55910': {
    type: 'Fragile electronics',
    pickup: 'TechPark Warehouse',
    destination: 'Silicon Valley Suites',
    courier: 'Samir Patel',
    initials: 'SP',
    eta: 25,
    progress: 35,
    speed: '24 mph',
  },
}

const packageRates = { small: 10, medium: 15, large: 24, extra: 42 }
const serviceRates = { standard: 1, sameday: 1.4, lightning: 2.1 }
function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [quote, setQuote] = useState(null)
  const [trackingId, setTrackingId] = useState('SD-84920')
  const [trackingInput, setTrackingInput] = useState('')
  const [notice, setNotice] = useState('')
  const [service, setService] = useState('standard')
  const delivery = deliveries[trackingId] ?? {
    type: 'Local delivery',
    pickup: 'Main Distribution Center',
    destination: 'Customer designated location',
    courier: 'Jordan Lee',
    initials: 'JL',
    eta: 18,
    progress: 50,
    speed: '25 mph',
  }

  function showNotice(message) {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 3200)
  }

  function calculateQuote(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const packageSize = form.get('packageSize')
    const selectedService = form.get('serviceSpeed')
    const amount = packageRates[packageSize] * serviceRates[selectedService]
    const eta = {
      standard: 'Within 24 hours',
      sameday: 'Within 4 hours',
      lightning: 'Under 60 minutes',
    }[selectedService]

    setQuote({ amount: amount.toFixed(2), eta })
  }

  function searchTracking(event) {
    event.preventDefault()
    const id = trackingInput.trim().toUpperCase()
    if (!id) return
    setTrackingId(id)
    showNotice(`Showing delivery ${id}`)
  }

  function chooseService(nextService) {
    setService(nextService)
    document.querySelector('#estimator')?.scrollIntoView({ behavior: 'smooth' })
  }

  function submitNewsletter(event) {
    event.preventDefault()
    event.currentTarget.reset()
    showNotice('Thanks for subscribing to SwiftDrop updates.')
  }

  function submitSignIn(event) {
    event.preventDefault()
    setModalOpen(false)
    showNotice('Your sign-in request is ready.')
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="SwiftDrop home">
          <span className="brand-mark" aria-hidden="true">S</span>
          <span>swift<span className="brand-light">drop</span></span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
        <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#tracking" onClick={() => setMenuOpen(false)}>Track a delivery</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
          <button className="nav-signin" type="button" onClick={() => setModalOpen(true)}>Sign in</button>
          <a className="button button-small button-dark nav-cta" href="#estimator" onClick={() => setMenuOpen(false)}>
            Get a quote <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> CITY DELIVERY, REIMAGINED</p>
            <h1>Good things<br />move <em>fast.</em></h1>
            <p className="hero-description">From everyday essentials to the important stuff, get it across town with a little more care and a lot less waiting.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#estimator">Plan a delivery <span aria-hidden="true">↗</span></a>
              <a className="text-link" href="#tracking">Follow a package <span aria-hidden="true">→</span></a>
            </div>
            <div className="hero-proof">
              <div className="proof-avatars" aria-hidden="true"><span>J</span><span>M</span><span>A</span></div>
              <p><strong>50,000+</strong> happy handoffs<br /><span>Rated 4.9 out of 5 by our neighbors</span></p>
            </div>
          </div>
          <div className="hero-art" aria-label="Illustrated live delivery route">
            <div className="art-topline"><span>ON THE MOVE</span><span className="live-indicator">LIVE <i /></span></div>
            <div className="map-scene">
              <div className="map-block block-one" /><div className="map-block block-two" />
              <div className="map-block block-three" /><div className="map-block block-four" />
              <div className="map-block block-five" /><div className="map-block block-six" />
              <div className="route-line" />
              <span className="map-pin pickup-pin">A</span>
              <span className="map-pin drop-pin">B</span>
              <span className="courier-marker" aria-hidden="true">✦</span>
              <span className="map-label label-pickup">PICKUP</span>
              <span className="map-label label-drop">YOUR DOOR</span>
            </div>
            <div className="delivery-ticket">
              <div className="ticket-icon" aria-hidden="true">↗</div>
              <div><span>YOUR COURIER IS</span><strong>Making good time</strong></div>
              <div className="ticket-eta"><strong>14</strong><span>MIN</span></div>
            </div>
            <span className="art-caption">LOCAL ROUTES, THOUGHTFULLY TAKEN</span>
          </div>
          <div className="hero-bottomline"><span>01 / MADE FOR THE WAY YOU MOVE</span><span>SCROLL TO EXPLORE ↓</span></div>
        </section>

        <section className="service-strip" id="services" aria-label="Delivery benefits">
          <div><span className="strip-number">01</span><strong>Door to door</strong><span>No depot detours</span></div>
          <div><span className="strip-number">02</span><strong>Real-time updates</strong><span>Know where it is</span></div>
          <div><span className="strip-number">03</span><strong>People who care</strong><span>Handled with intention</span></div>
          <div><span className="strip-number">04</span><strong>Here when you need us</strong><span>Support, around the clock</span></div>
        </section>

        <section className="section quote-section" id="estimator">
          <div className="section-heading">
            <p className="eyebrow">A GOOD PLACE TO START</p>
            <h2>Let’s get it<br /><em>going.</em></h2>
            <p>Tell us a little about your delivery. We’ll take it from here.</p>
          </div>
          <div className="quote-panel">
            <form className="quote-form" onSubmit={calculateQuote}>
              <div className="form-row">
                <label>Pickup location<input name="pickup" required placeholder="Street, neighborhood" /></label>
                <label>Drop-off location<input name="dropoff" required placeholder="Where should it go?" /></label>
              </div>
              <div className="form-row">
                <label>Package size<select name="packageSize" defaultValue="medium"><option value="small">Small · up to 1 kg</option><option value="medium">Medium · up to 5 kg</option><option value="large">Large · up to 15 kg</option><option value="extra">Extra large · 15 kg+</option></select></label>
                <label>How soon?<select name="serviceSpeed" value={service} onChange={(event) => setService(event.target.value)}><option value="standard">Standard · within 24 hours</option><option value="sameday">Same-day · within 4 hours</option><option value="lightning">Lightning · under 60 minutes</option></select></label>
              </div>
              <div className="form-submit">
                <button className="button button-dark" type="submit">See my estimate <span aria-hidden="true">→</span></button>
                <span>No commitment. No surprises.</span>
              </div>
            </form>
            {quote && (
              <div className="quote-result" role="status">
                <div><span>ESTIMATED TOTAL</span><strong>${quote.amount}</strong></div>
                <div><span>DELIVERY WINDOW</span><strong>{quote.eta}</strong></div>
                <button className="button button-green" type="button" onClick={() => setModalOpen(true)}>Book this delivery <span aria-hidden="true">↗</span></button>
              </div>
            )}
          </div>
        </section>

        <section className="tracking-section" id="tracking">
          <div className="tracking-intro">
            <p className="eyebrow">A LITTLE CLOSER, EVERY MINUTE</p>
            <h2>It’s on<br /><em>its way.</em></h2>
            <p>That in-between time, made easier. Check in on your delivery whenever you like.</p>
            <form className="tracking-search" onSubmit={searchTracking}>
              <label className="visually-hidden" htmlFor="tracking-code">Tracking number</label>
              <input id="tracking-code" value={trackingInput} onChange={(event) => setTrackingInput(event.target.value)} placeholder="Enter tracking number" />
              <button type="submit" aria-label="Search tracking number">→</button>
            </form>
            <p className="tracking-hint">TRY A SAMPLE</p>
            <div className="sample-list">
              {Object.entries(deliveries).map(([id, item]) => (
                <button className={trackingId === id ? 'sample-active' : ''} type="button" key={id} onClick={() => setTrackingId(id)}>
                  <span>{id}</span><span>{item.type} ↗</span>
                </button>
              ))}
            </div>
          </div>
          <div className="tracking-card">
            <div className="tracking-card-head"><div><span>DELIVERY IN PROGRESS</span><strong>{trackingId}</strong></div><span className="live-indicator">LIVE <i /></span></div>
            <div className="tracking-map" aria-label={`Map showing a delivery from ${delivery.pickup} to ${delivery.destination}`}>
              <div className="map-block block-one" /><div className="map-block block-two" />
              <div className="map-block block-three" /><div className="map-block block-four" />
              <div className="map-block block-five" /><div className="map-block block-six" />
              <div className="route-line" style={{ '--route-progress': `${delivery.progress}%` }} />
              <span className="map-pin pickup-pin">A</span>
              <span className="map-pin drop-pin">B</span>
              <span className="courier-marker tracking-courier" style={{ left: `${Math.max(12, Math.min(88, delivery.progress))}%` }} aria-hidden="true">✦</span>
              <span className="map-label label-pickup">{delivery.pickup}</span>
              <span className="map-label label-drop">{delivery.destination}</span>
              <div className="map-speed">↗ &nbsp;{delivery.speed} · moving</div>
            </div>
            <div className="courier-details"><span className="courier-avatar">{delivery.initials}</span><div><span>YOUR COURIER</span><strong>{delivery.courier}</strong></div><button type="button" onClick={() => showNotice(`A secure chat with ${delivery.courier} is ready.`)}>Message <span aria-hidden="true">↗</span></button></div>
            <div className="delivery-progress"><div><span>Picked up</span><span>On the way</span><strong>{delivery.eta} min</strong></div><div className="progress-track"><span style={{ width: `${delivery.progress}%` }} /></div><div className="progress-endpoints"><span>ORDER CONFIRMED</span><span>AT YOUR DOOR</span></div></div>
          </div>
        </section>

        <section className="section pricing-section" id="pricing">
          <div className="pricing-heading"><div><p className="eyebrow">STRAIGHTFORWARD BY DESIGN</p><h2>Good service.<br /><em>Clear prices.</em></h2></div><p>Pick the pace that feels right. Your final estimate adjusts to package size.</p></div>
          <div className="pricing-grid">
            <article className="price-option"><span className="price-kicker">NO RUSH</span><h3>Standard</h3><p>For the everyday things that still matter.</p><div className="price-amount"><strong>$10</strong><span>starting at</span></div><ul><li>Within 24 hours</li><li>Live delivery updates</li><li>Up to 1 kg included</li></ul><button className="button button-outline" type="button" onClick={() => chooseService('standard')}>Choose standard <span>→</span></button></article>
            <article className="price-option price-featured"><span className="price-kicker">A LITTLE SOONER</span><h3>Same-day</h3><p>For plans that can’t wait until tomorrow.</p><div className="price-amount"><strong>$14</strong><span>starting at</span></div><ul><li>Within 4 hours</li><li>Live courier tracking</li><li>Priority support</li></ul><button className="button button-light" type="button" onClick={() => chooseService('sameday')}>Choose same-day <span>→</span></button></article>
            <article className="price-option"><span className="price-kicker">RIGHT AWAY</span><h3>Lightning</h3><p>One courier, one direct trip across town.</p><div className="price-amount"><strong>$21</strong><span>starting at</span></div><ul><li>Under 60 minutes</li><li>Dedicated courier</li><li>Priority support</li></ul><button className="button button-outline" type="button" onClick={() => chooseService('lightning')}>Choose lightning <span>→</span></button></article>
          </div>
        </section>

        <section className="closing-band"><p>THE CITY FEELS SMALLER ALREADY.</p><a href="#estimator">Send something with care <span>↗</span></a></section>
      </main>

      <footer className="site-footer">
        <div className="footer-main"><div className="footer-brand"><a className="brand" href="#home"><span className="brand-mark" aria-hidden="true">S</span><span>swift<span className="brand-light">drop</span></span></a><p>Across town, with care.</p></div><div className="footer-links"><div><strong>EXPLORE</strong><a href="#services">Our service</a><a href="#pricing">Delivery options</a><a href="#tracking">Track a package</a></div><div><strong>HERE TO HELP</strong><a href="mailto:hello@swiftdrop.example">Get in touch</a><a href="#home">Safety & care</a><a href="#home">Privacy</a></div></div><form className="newsletter" onSubmit={submitNewsletter}><label htmlFor="newsletter-email">A GOOD NOTE NOW AND THEN</label><div><input id="newsletter-email" type="email" required placeholder="Your email address" /><button type="submit" aria-label="Subscribe to newsletter">→</button></div><span>Delivery news, local stories, zero noise.</span></form></div>
        <div className="footer-bottom"><span>© 2026 SwiftDrop. Made for the way you move.</span><span>LOCAL BY NATURE · HERE FOR EVERYONE</span></div>
      </footer>

      {modalOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setModalOpen(false) }}><section className="sign-in-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close" type="button" aria-label="Close sign in" onClick={() => setModalOpen(false)}>×</button><p className="eyebrow">GOOD TO SEE YOU</p><h2 id="modal-title">Welcome<br /><em>back.</em></h2><form onSubmit={submitSignIn}><label>Email address<input type="email" required placeholder="you@example.com" /></label><label>Password<input type="password" required placeholder="Your password" /></label><button className="button button-dark" type="submit">Continue <span>→</span></button></form><p className="modal-note">New to SwiftDrop? Your account is created when you book your first delivery.</p></section></div>}
      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
  )
}

export default App