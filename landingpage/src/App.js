import './App.css';
import Logo from './Logo';

function App() {
  return (
    <div className="mainquest">
      <nav className="nav">
        <a href="/" className="logo-wrap">
          <Logo size={28} />
          <span>MainQuest</span>
        </a>
        <a
          className="nav-cta"
          href="https://expo.dev/go"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get the app
        </a>
      </nav>

      <header className="hero">
        <Logo size={64} className="logo-hero" />
        <h1 className="hero-title">
          Discover and connect.<br />
          <span className="accent">No more going alone.</span>
        </h1>
        <p className="hero-subtitle">
          College is a high-pressure bubble — too busy for a life, too scared to explore it alone.
          MainQuest helps you find people who share your interests so you can try new things together.
        </p>
        <a
          className="cta-button"
          href="https://expo.dev/go"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get MainQuest
        </a>
      </header>

      <section className="problem">
        <h2 className="section-label">The problem</h2>
        <p className="problem-text">
          When you want to try something outside your comfort zone — hiking, a coffee date, the gym —
          you often don't know anyone to go with. MainQuest makes it easy to post what you want to do,
          find others who are down, and connect before the event.
        </p>
      </section>

      <section className="features">
        <h2 className="section-label">Features</h2>
        <div className="feature-grid">
          <article className="feature-card">
            <span className="feature-icon" aria-hidden>🏠</span>
            <h3>Home</h3>
            <p>
              Pick your interests (hiking, coffee, gym, etc.) and get AI-powered event recommendations.
              Sync with Outlook or Google Calendar.
            </p>
          </article>
          <article className="feature-card">
            <span className="feature-icon" aria-hidden>🤝</span>
            <h3>Quests</h3>
            <p>
              Post events you want to do and how many people you need. Others join with one tap.
              When the crew is full, a group chat forms until 24 hours after the event.
            </p>
          </article>
          <article className="feature-card">
            <span className="feature-icon" aria-hidden>🎮</span>
            <h3>Bingo</h3>
            <p>
              Collect experiences like Pokémon GO cards. Compete with friends and complete as many
              as you can in a month.
            </p>
          </article>
          <article className="feature-card">
            <span className="feature-icon" aria-hidden>👤</span>
            <h3>Profile</h3>
            <p>
              AI voice chatbot learns your interests in under 5 minutes for better matching.
              A digital scrapbook of every sidequest and who you went with.
            </p>
          </article>
        </div>
      </section>

      <section className="cta-section">
        <h2 className="cta-title">Ready to explore?</h2>
        <p className="cta-subtitle">
          MainQuest is built for college students. Available on iOS with Expo Go — no App Store download required to try it.
        </p>
        <a
          className="cta-button cta-button-large"
          href="https://expo.dev/go"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get the app
        </a>
      </section>

      <footer className="footer">
        <a href="/" className="logo-wrap">
          <Logo size={24} />
          <span>MainQuest</span>
        </a>
        <p className="footer-tagline">Social platform for college students to discover and connect.</p>
      </footer>
    </div>
  );
}

export default App;
