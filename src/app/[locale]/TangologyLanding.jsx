import { useState, useEffect, useRef } from "react";

const ERAS = [
  { name: "La Guardia Vieja", subtitle: "The Old Guard", years: "1880–1920", color: "#6B8E5A" },
  { name: "La Guardia Nueva", subtitle: "The New Guard", years: "1920–1935", color: "#4A90B8" },
  { name: "La Época de Oro", subtitle: "The Golden Age", years: "1935–1955", color: "#C8A96E" },
  { name: "La Decadencia", subtitle: "The Decline", years: "1955–1983", color: "#8B6E5A" },
  { name: "El Renacimiento", subtitle: "The Rebirth", years: "1983–present", color: "#8B2E3B" },
];

const NAV_CARDS = [
  { title: "Timeline", desc: "140 years from the conventillos to the world stage", count: "5 eras", href: "#" },
  { title: "Glossary", desc: "Terms, concepts, and culture of the milonga", count: "87 terms", href: "#" },
  { title: "Orchestras", desc: "The Big Four, and the ensembles that built the Golden Age", count: "23 profiles", href: "#" },
  { title: "People", desc: "Dancers, singers, musicians, and cultural figures", count: "89 profiles", href: "#" },
  { title: "Venues", desc: "Buenos Aires milongas, historic and living", count: "16 venues", href: "#" },
  { title: "Styles", desc: "From milonguero to nuevo — how the dance evolved", count: "9 styles", href: "#" },
];

const NAV_LINKS = ["Timeline", "Glossary", "Orchestras", "People", "Styles", "Venues"];

const STATS = [
  { num: "87", label: "Terms" },
  { num: "23", label: "Orchestras" },
  { num: "89", label: "People" },
  { num: "16", label: "Venues" },
  { num: "9", label: "Styles" },
  { num: "6", label: "Eras" },
];

const QUICK_ERAS = [
  { label: "Guardia Vieja", id: "guardia-vieja", years: "1880–1920" },
  { label: "Guardia Nueva", id: "guardia-nueva", years: "1920–1935" },
  { label: "Época de Oro", id: "epoca-de-oro", years: "1935–1955" },
  { label: "Decadencia", id: "decadencia", years: "1955–1983" },
  { label: "Renacimiento", id: "renacimiento", years: "1983–present" },
];

const KEY_EVENTS = [
  { label: "Tango Argentino (1983)", id: "tango-argentino-1983", desc: "Broadway show that sparked global revival" },
  { label: "Gardel's Death (1935)", id: "gardel-death", desc: "End of an era" },
  { label: "UNESCO Recognition (2009)", id: "unesco-2009", desc: "Intangible Cultural Heritage" },
  { label: "First Recording (1917)", id: "first-recording", desc: "Mi Noche Triste" },
  { label: "Tango Lesson Film (1997)", id: "tango-lesson", desc: "Sally Potter's exploration" },
];

const TOPICS = [
  { label: "The Bandoneón", id: "bandoneon", desc: "The soul of tango's sound" },
  { label: "Women in Tango", id: "women-in-tango", desc: "From forbidden to featured" },
  { label: "Tango & Technology", id: "tango-technology", desc: "Recording, radio, and revival" },
  { label: "The Lyrics & Poetry", id: "lyrics-poetry", desc: "Lunfardo and longing" },
  { label: "Milonga Culture", id: "milonga-culture", desc: "Codes, cabeceo, and community" },
  { label: "Tango Fashion", id: "tango-fashion", desc: "From compadrito to modern" },
];

const QUOTES = [
  { text: "Tango is a sad thought that is danced.", author: "Enrique Santos Discépolo" },
  { text: "The tango is the direct expression of something that poets have often tried to state in words: the belief that a fight may be a celebration.", author: "Jorge Luis Borges" },
  { text: "To dance tango, you must listen to the heart of your partner.", author: "Carlos Gavito" },
  { text: "Tango is not in the feet. It is in the heart.", author: "Traditional" },
  { text: "The embrace is the first step. Everything else follows from there.", author: "Gustavo Naveira" },
  { text: "In tango, we don't make mistakes. We make variations.", author: "Traditional" },
  { text: "The best dancer is the one who makes his partner look like the best dancer.", author: "Traditional" },
  { text: "Tango: three minutes of love.", author: "Traditional" },
  { text: "You don't choose tango. Tango chooses you.", author: "Traditional" },
  { text: "The music tells us what to do. We just listen.", author: "Pepito Avellaneda" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, isVisible];
}

function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);

  // Get current locale from URL
  const currentLocale = typeof window !== 'undefined' ? (window.location.pathname.startsWith('/es') ? 'es' : 'en') : 'en';
  const otherLocale = currentLocale === 'en' ? 'es' : 'en';
  const currentPath = typeof window !== 'undefined' ? window.location.pathname.replace(/^\/(en|es)/, '') || '/' : '/';

  const switchLocale = (locale) => {
    const newPath = locale === 'en' ? currentPath : `/${locale}${currentPath}`;
    window.location.href = newPath;
  };

  return (
    <div className="relative ml-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-1 rounded transition-colors duration-200"
        style={{
          fontFamily: "'Source Sans 3', sans-serif",
          color: "#A89F94",
          fontSize: "0.8rem",
          fontWeight: 500,
          border: "1px solid rgba(200,169,110,0.15)",
          backgroundColor: isOpen ? "rgba(200,169,110,0.1)" : "transparent",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(200,169,110,0.4)"; }}
        onMouseLeave={(e) => { if (!isOpen) e.currentTarget.style.borderColor = "rgba(200,169,110,0.15)"; }}
      >
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
        {currentLocale.toUpperCase()}
        <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-1 py-1 rounded shadow-lg"
          style={{ backgroundColor: "#1E1B18", border: "1px solid rgba(200,169,110,0.2)", minWidth: "80px" }}
        >
          <button
            onClick={() => switchLocale('en')}
            className="w-full px-3 py-1.5 text-left transition-colors duration-200"
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "0.8rem",
              color: currentLocale === 'en' ? "#C8A96E" : "#A89F94",
              backgroundColor: currentLocale === 'en' ? "rgba(200,169,110,0.1)" : "transparent",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(200,169,110,0.15)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = currentLocale === 'en' ? "rgba(200,169,110,0.1)" : "transparent"; }}
          >
            English
          </button>
          <button
            onClick={() => switchLocale('es')}
            className="w-full px-3 py-1.5 text-left transition-colors duration-200"
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "0.8rem",
              color: currentLocale === 'es' ? "#C8A96E" : "#A89F94",
              backgroundColor: currentLocale === 'es' ? "rgba(200,169,110,0.1)" : "transparent",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(200,169,110,0.15)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = currentLocale === 'es' ? "rgba(200,169,110,0.1)" : "transparent"; }}
          >
            Español
          </button>
        </div>
      )}
    </div>
  );
}

function GrainOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-10"
      style={{
        opacity: 0.04,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
      }}
    />
  );
}

function Header({ scrolled, onMenuToggle, menuOpen }) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(13,13,13,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(200,169,110,0.12)" : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16">
        <a href="#" className="flex items-center gap-1.5 no-underline">
          <span
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#C8A96E", letterSpacing: "0.18em", fontSize: "1.1rem", fontWeight: 700 }}
          >
            TANGOLOGY
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="no-underline text-sm transition-colors duration-200"
              style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#A89F94", fontWeight: 400 }}
              onMouseEnter={(e) => (e.target.style.color = "#F5F0E8")}
              onMouseLeave={(e) => (e.target.style.color = "#A89F94")}
            >
              {link}
            </a>
          ))}
          <button className="ml-2 p-1.5 rounded-full transition-colors duration-200" style={{ color: "#A89F94" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C8A96E")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#A89F94")}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          {/* Language Switcher */}
          <LanguageSwitcher />
        </nav>

        <button
          className="md:hidden p-2"
          onClick={onMenuToggle}
          style={{ color: "#A89F94" }}
        >
          {menuOpen ? (
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          ) : (
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t" style={{ backgroundColor: "rgba(13,13,13,0.97)", borderColor: "rgba(200,169,110,0.1)" }}>
          <div className="px-6 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a key={link} href="#" className="no-underline py-1" style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#A89F94", fontSize: "1rem" }}>
                {link}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function QuickAccessTabs() {
  const [activeTab, setActiveTab] = useState("eras");

  const tabs = [
    { id: "eras", label: "By Era" },
    { id: "events", label: "Key Events" },
    { id: "topics", label: "Topics" },
  ];

  return (
    <div className="mt-10 sm:mt-12 w-full max-w-2xl mx-auto">
      {/* Tab buttons */}
      <div className="flex justify-center gap-1 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-4 py-1.5 rounded-full text-sm transition-all duration-200"
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              backgroundColor: activeTab === tab.id ? "rgba(200,169,110,0.15)" : "transparent",
              color: activeTab === tab.id ? "#C8A96E" : "#6B6560",
              border: activeTab === tab.id ? "1px solid rgba(200,169,110,0.3)" : "1px solid transparent",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex flex-wrap justify-center gap-2">
        {activeTab === "eras" && QUICK_ERAS.map((era) => (
          <a
            key={era.id}
            href={`#${era.id}`}
            className="group no-underline px-3 py-1.5 rounded-lg transition-all duration-200"
            style={{ backgroundColor: "rgba(30,27,24,0.6)", border: "1px solid rgba(200,169,110,0.1)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(200,169,110,0.1)";
              e.currentTarget.style.borderColor = "rgba(200,169,110,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(30,27,24,0.6)";
              e.currentTarget.style.borderColor = "rgba(200,169,110,0.1)";
            }}
          >
            <span style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#F5F0E8", fontSize: "0.85rem", fontWeight: 500 }}>
              {era.label}
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#6B6560", fontSize: "0.7rem", marginLeft: "0.5rem" }}>
              {era.years}
            </span>
          </a>
        ))}

        {activeTab === "events" && KEY_EVENTS.map((event) => (
          <a
            key={event.id}
            href={`#${event.id}`}
            className="group no-underline px-3 py-1.5 rounded-lg transition-all duration-200"
            style={{ backgroundColor: "rgba(30,27,24,0.6)", border: "1px solid rgba(139,46,59,0.15)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(139,46,59,0.1)";
              e.currentTarget.style.borderColor = "rgba(139,46,59,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(30,27,24,0.6)";
              e.currentTarget.style.borderColor = "rgba(139,46,59,0.15)";
            }}
          >
            <span style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#F5F0E8", fontSize: "0.85rem", fontWeight: 500 }}>
              {event.label}
            </span>
          </a>
        ))}

        {activeTab === "topics" && TOPICS.map((topic) => (
          <a
            key={topic.id}
            href={`#${topic.id}`}
            className="group no-underline px-3 py-1.5 rounded-lg transition-all duration-200"
            style={{ backgroundColor: "rgba(30,27,24,0.6)", border: "1px solid rgba(74,144,184,0.15)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(74,144,184,0.1)";
              e.currentTarget.style.borderColor = "rgba(74,144,184,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(30,27,24,0.6)";
              e.currentTarget.style.borderColor = "rgba(74,144,184,0.15)";
            }}
          >
            <span style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#F5F0E8", fontSize: "0.85rem", fontWeight: 500 }}>
              {topic.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

function Hero({ searchFocused, setSearchFocused }) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteFade, setQuoteFade] = useState(true);

  useEffect(() => {
    // Start with random quote
    setQuoteIndex(Math.floor(Math.random() * QUOTES.length));

    const interval = setInterval(() => {
      setQuoteFade(false);
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
        setQuoteFade(true);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const currentQuote = QUOTES[quoteIndex];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden" style={{ backgroundColor: "#0D0D0D" }}>
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 45%, rgba(200,169,110,0.07) 0%, rgba(139,46,59,0.03) 40%, transparent 70%)",
        }}
      />
      <GrainOverlay />

      <div className="relative z-20 text-center max-w-3xl mx-auto">
        <h1
          className="mb-3 sm:mb-4"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: "#C8A96E",
            fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
            fontWeight: 700,
            letterSpacing: "0.12em",
            lineHeight: 1.05,
          }}
        >
          TANGOLOGY
        </h1>
        <p
          className="mb-2"
          style={{
            fontFamily: "'Source Sans 3', sans-serif",
            color: "#F5F0E8",
            fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
            fontWeight: 300,
            letterSpacing: "0.02em",
          }}
        >
          A Curated Study of Argentine Tango
        </p>
        <p
          className="mb-10 sm:mb-14"
          style={{
            fontFamily: "'Source Sans 3', sans-serif",
            color: "#6B6560",
            fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
            letterSpacing: "0.25em",
            fontWeight: 400,
          }}
        >
          HISTORY &nbsp;·&nbsp; MUSIC &nbsp;·&nbsp; PEOPLE &nbsp;·&nbsp; CULTURE
        </p>

        <div
          className="relative mx-auto w-full max-w-xl transition-all duration-300"
          style={{
            border: searchFocused ? "1px solid rgba(200,169,110,0.5)" : "1px solid rgba(200,169,110,0.18)",
            borderRadius: "999px",
            backgroundColor: searchFocused ? "rgba(30,27,24,0.9)" : "rgba(30,27,24,0.6)",
            boxShadow: searchFocused ? "0 0 24px rgba(200,169,110,0.08)" : "none",
          }}
        >
          <div className="flex items-center px-5 py-3 sm:py-3.5">
            <svg width="18" height="18" fill="none" stroke={searchFocused ? "#C8A96E" : "#6B6560"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="flex-shrink-0 transition-colors duration-200">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search 161 entries — orchestras, terms, people, venues..."
              className="flex-1 bg-transparent border-none outline-none ml-3 placeholder-current"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                color: "#F5F0E8",
                fontSize: "0.95rem",
                "::placeholder": { color: "#6B6560" },
              }}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>

        {/* Rotating Quote */}
        <div
          className="mt-10 sm:mt-12 transition-opacity duration-500"
          style={{ opacity: quoteFade ? 1 : 0 }}
        >
          <p
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#6B6560",
              fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)",
              fontStyle: "italic",
              lineHeight: 1.5,
              maxWidth: "32rem",
              margin: "0 auto",
            }}
          >
            "{currentQuote.text}"
          </p>
          <p
            className="mt-2"
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              color: "#4A4540",
              fontSize: "0.8rem",
            }}
          >
            — {currentQuote.author}
          </p>
        </div>

      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce" style={{ opacity: 0.3 }}>
        <svg width="20" height="20" fill="none" stroke="#A89F94" strokeWidth="2" viewBox="0 0 24 24">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}

function NavCard({ card, index, isVisible }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={card.href}
      className="block no-underline transition-all duration-300"
      style={{
        backgroundColor: hovered ? "#2A2520" : "#1E1B18",
        borderRadius: "8px",
        border: "1px solid rgba(200,169,110,0.08)",
        borderLeft: hovered ? "3px solid #C8A96E" : "3px solid rgba(200,169,110,0.2)",
        padding: "1.25rem 1.5rem",
        transform: isVisible
          ? hovered ? "translateY(-2px)" : "translateY(0)"
          : "translateY(20px)",
        opacity: isVisible ? 1 : 0,
        transitionDelay: isVisible ? `${index * 80}ms` : "0ms",
        boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.3)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#F5F0E8", fontSize: "1.2rem", fontWeight: 700 }}>
          {card.title}
        </h3>
        <span style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#C8A96E", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em" }}>
          {card.count}
        </span>
      </div>
      <p style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#A89F94", fontSize: "0.88rem", lineHeight: 1.5, fontWeight: 400 }}>
        {card.desc}
      </p>
    </a>
  );
}

function NavGrid() {
  const [ref, isVisible] = useInView(0.1);
  return (
    <section ref={ref} className="py-16 sm:py-24 px-4 sm:px-6" style={{ backgroundColor: "#0D0D0D" }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-center mb-3"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#F5F0E8", fontSize: "1.6rem", fontWeight: 700 }}
        >
          Explore
        </h2>
        <p className="text-center mb-6" style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#6B6560", fontSize: "0.9rem" }}>
          Dive into the world of Argentine tango
        </p>

        {/* Quick Access Tabs - By Era, Key Events, Topics */}
        <QuickAccessTabs />

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {NAV_CARDS.map((card, i) => (
            <NavCard key={card.title} card={card} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Spotlight() {
  const [ref, isVisible] = useInView();
  const [hovered, setHovered] = useState(false);
  return (
    <section ref={ref} className="py-16 sm:py-20 px-4 sm:px-6" style={{ backgroundColor: "#0F0D0B" }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#F5F0E8", fontSize: "1.4rem", fontWeight: 700 }}>
            Spotlight
          </h2>
          <div className="flex-1 h-px" style={{ backgroundColor: "rgba(200,169,110,0.15)" }} />
        </div>

        <div
          className="transition-all duration-500"
          style={{
            backgroundColor: hovered ? "#2A2520" : "#1E1B18",
            borderRadius: "10px",
            border: "1px solid rgba(200,169,110,0.08)",
            borderLeft: "4px solid #8B2E3B",
            padding: "2rem 2rem 2rem 2.25rem",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "100ms",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8">
            <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(200,169,110,0.1)" }}>
              <span style={{ fontSize: "2rem" }}>🎵</span>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-baseline gap-2 mb-1">
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#F5F0E8", fontSize: "1.5rem", fontWeight: 700 }}>
                  Aníbal Troilo
                </h3>
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#C8A96E", fontSize: "0.9rem", fontStyle: "italic" }}>
                  "Pichuco"
                </span>
              </div>
              <p className="mb-3" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#6B6560", fontSize: "0.8rem" }}>
                1914–1975 · Bandoneón · Orchestra Leader
              </p>
              <p className="mb-3" style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#A89F94", fontSize: "0.95rem", lineHeight: 1.65 }}>
                The supreme bandoneón master whose orchestra defined the emotional heart of Golden Age tango. His partnerships with singers Fiorentino, Marino, and Goyeneche produced the most beloved social dance recordings in history. July 11, his birthday, is National Bandoneón Day in Argentina.
              </p>
              <p className="mb-4" style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#8B6E5A", fontSize: "0.88rem", fontStyle: "italic" }}>
                "Dancers love Troilo because his music breathes — it gives you space to interpret, to feel, to pause."
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 no-underline transition-colors duration-200"
                style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#C8A96E", fontSize: "0.9rem", fontWeight: 600 }}
              >
                Explore profile
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelinePreview() {
  const [ref, isVisible] = useInView();
  return (
    <section ref={ref} className="py-16 sm:py-20 px-4 sm:px-6" style={{ backgroundColor: "#0D0D0D" }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#F5F0E8", fontSize: "1.4rem", fontWeight: 700 }}>
              The Timeline
            </h2>
            <div className="hidden sm:block flex-1 h-px w-16" style={{ backgroundColor: "rgba(200,169,110,0.15)" }} />
          </div>
          <a
            href="#"
            className="hidden sm:inline-flex items-center gap-1.5 no-underline"
            style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#C8A96E", fontSize: "0.85rem", fontWeight: 600 }}
          >
            Explore full timeline
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0" style={{ scrollbarWidth: "none" }}>
          {ERAS.map((era, i) => (
            <a
              key={era.name}
              href="#"
              className="flex-shrink-0 no-underline rounded-lg p-4 sm:p-5 transition-all duration-500 group"
              style={{
                backgroundColor: "#1E1B18",
                border: "1px solid rgba(200,169,110,0.06)",
                borderTop: `3px solid ${era.color}`,
                minWidth: "160px",
                flex: "1 1 0",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(12px)",
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <p
                className="mb-0.5"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "#F5F0E8",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                }}
              >
                {era.name}
              </p>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#6B6560", fontSize: "0.78rem", fontStyle: "italic", marginBottom: "0.5rem" }}>
                {era.subtitle}
              </p>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", color: era.color, fontSize: "0.75rem", fontWeight: 600 }}>
                {era.years}
              </p>
            </a>
          ))}
        </div>

        <div className="sm:hidden text-center mt-6">
          <a
            href="#"
            className="inline-flex items-center gap-1.5 no-underline"
            style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#C8A96E", fontSize: "0.85rem", fontWeight: 600 }}
          >
            Explore full timeline →
          </a>
        </div>
      </div>
    </section>
  );
}

function StatsRibbon() {
  const [ref, isVisible] = useInView();
  return (
    <section ref={ref} className="py-10 sm:py-12 px-4" style={{ backgroundColor: "#1A1614" }}>
      <div
        className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-10"
        style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(10px)", transition: "all 0.6s ease" }}
      >
        {STATS.map((s, i) => (
          <div key={s.label} className="flex items-baseline gap-1.5">
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#C8A96E", fontSize: "1.3rem", fontWeight: 700 }}>
              {s.num}
            </span>
            <span style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#6B6560", fontSize: "0.85rem" }}>
              {s.label}
            </span>
            {i < STATS.length - 1 && (
              <span className="hidden sm:inline ml-4" style={{ color: "rgba(200,169,110,0.15)" }}>·</span>
            )}
          </div>
        ))}
      </div>
      <p className="text-center mt-4" style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#4A4540", fontSize: "0.78rem", letterSpacing: "0.08em" }}>
        COMMUNITY-VERIFIED KNOWLEDGE
      </p>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 sm:py-16 px-4 sm:px-6" style={{ backgroundColor: "#0A0908", borderTop: "1px solid rgba(200,169,110,0.06)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <p
          className="mb-2"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#C8A96E", fontSize: "1.1rem", fontWeight: 700, letterSpacing: "0.15em" }}
        >
          TANGOLOGY
        </p>
        <p className="mb-6" style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#6B6560", fontSize: "0.88rem", lineHeight: 1.6 }}>
          The open study of Argentine tango — history, music, people, culture
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-8">
          {[
            { label: "About", href: "/about" },
            { label: "Timeline", href: "#" },
            { label: "Glossary", href: "#" },
            { label: "People", href: "#" },
            { label: "Orchestras", href: "#" },
            { label: "Contribute", href: "/about#process" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="no-underline transition-colors duration-200"
              style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#6B6560", fontSize: "0.82rem" }}
              onMouseEnter={(e) => (e.target.style.color = "#C8A96E")}
              onMouseLeave={(e) => (e.target.style.color = "#6B6560")}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="mb-6" style={{ borderTop: "1px solid rgba(200,169,110,0.06)", paddingTop: "1.5rem" }}>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#4A4540", fontSize: "0.8rem", lineHeight: 1.6 }}>
            Founded by{" "}
            <a href="/about" className="no-underline transition-colors duration-200" style={{ color: "#6B6560" }}
              onMouseEnter={(e) => (e.target.style.color = "#C8A96E")}
              onMouseLeave={(e) => (e.target.style.color = "#6B6560")}>
              Toby Balsley
            </a>
            {" "}·{" "}
            <a href="https://hdtsllc.com" target="_blank" rel="noopener noreferrer" className="no-underline transition-colors duration-200" style={{ color: "#6B6560" }}
              onMouseEnter={(e) => (e.target.style.color = "#C8A96E")}
              onMouseLeave={(e) => (e.target.style.color = "#6B6560")}>
              HDTS LLC
            </a>
          </p>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#3A3530", fontSize: "0.75rem", marginTop: "0.5rem" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
              </svg>
              AI-assisted research · Human-curated · <a href="/about#process" className="no-underline" style={{ color: "#4A4540" }}
                onMouseEnter={(e) => (e.target.style.color = "#C8A96E")}
                onMouseLeave={(e) => (e.target.style.color = "#4A4540")}>
                Learn how we build content
              </a>
            </span>
          </p>
        </div>

        <p
          className="mb-6"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: "#3A3530",
            fontSize: "0.85rem",
            fontStyle: "italic",
            maxWidth: "28rem",
            margin: "0 auto 1.5rem",
            lineHeight: 1.6,
          }}
        >
          "Tango is a sad thought that is danced."
          <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.75rem", display: "block", marginTop: "0.25rem" }}>
            — Enrique Santos Discépolo
          </span>
        </p>

        <p style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#2A2520", fontSize: "0.72rem" }}>
          © 2026 Tangology.org
        </p>
      </div>
    </footer>
  );
}

export default function TangologyLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+3:wght@300;400;600&family=JetBrains+Mono:wght@400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0D0D0D; }
        input::placeholder { color: #6B6560 !important; }
        ::-webkit-scrollbar { display: none; }
      `}</style>
      <div style={{ backgroundColor: "#0D0D0D", minHeight: "100vh", color: "#F5F0E8" }}>
        <Header scrolled={scrolled} onMenuToggle={() => setMenuOpen(!menuOpen)} menuOpen={menuOpen} />
        <Hero searchFocused={searchFocused} setSearchFocused={setSearchFocused} />
        <NavGrid />
        <Spotlight />
        <TimelinePreview />
        <StatsRibbon />
        <Footer />
      </div>
    </>
  );
}
