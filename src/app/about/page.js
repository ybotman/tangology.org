"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+3:wght@300;400;600&family=JetBrains+Mono:wght@400;600&display=swap');
      `}</style>
      <div style={{ backgroundColor: "#0D0D0D", minHeight: "100vh", color: "#F5F0E8" }}>
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: "rgba(13,13,13,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(200,169,110,0.12)" }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
            <Link href="/" className="no-underline" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#C8A96E", letterSpacing: "0.18em", fontSize: "1rem", fontWeight: 700 }}>
              TANGOLOGY
            </Link>
            <Link href="/" className="no-underline flex items-center gap-1" style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#A89F94", fontSize: "0.85rem" }}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
              Back
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="pt-20 pb-16 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">

            {/* Hero */}
            <div className="text-center mb-12">
              <h1 className="mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#C8A96E", fontSize: "2.5rem", fontWeight: 700 }}>
                About Tangology
              </h1>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#A89F94", fontSize: "1.1rem", lineHeight: 1.6 }}>
                A community-driven knowledge base for Argentine tango
              </p>
            </div>

            {/* Mission */}
            <section className="mb-12">
              <h2 className="mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#F5F0E8", fontSize: "1.5rem", fontWeight: 700 }}>
                Our Mission
              </h2>
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#A89F94", fontSize: "1rem", lineHeight: 1.8 }}>
                <p className="mb-4">
                  Tangology exists to preserve, document, and share the rich history and culture of Argentine tango.
                  We believe this knowledge should be accessible to everyone — dancers, musicians, researchers, and enthusiasts worldwide.
                </p>
                <p>
                  Our goal is to create the most comprehensive, accurate, and navigable resource for tango history,
                  connecting 140 years of music, dance, and culture from the conventillos of Buenos Aires to milongas around the globe.
                </p>
              </div>
            </section>

            {/* Founder */}
            <section className="mb-12 p-6 rounded-lg" style={{ backgroundColor: "#1E1B18", border: "1px solid rgba(200,169,110,0.1)" }}>
              <h2 className="mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#F5F0E8", fontSize: "1.5rem", fontWeight: 700 }}>
                The Founder
              </h2>
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#A89F94", fontSize: "1rem", lineHeight: 1.8 }}>
                <p className="mb-4">
                  <strong style={{ color: "#F5F0E8" }}>Toby Balsley</strong> is a tango dancer, technologist, and researcher
                  based in the San Francisco Bay Area. He has been dancing Argentine tango since 2008 and has studied with
                  masters in Buenos Aires, across the US, and internationally.
                </p>
                <p className="mb-4">
                  As the founder of{" "}
                  <a href="https://hdtsllc.com" target="_blank" rel="noopener noreferrer"
                    className="no-underline transition-colors duration-200"
                    style={{ color: "#C8A96E" }}>
                    HDTS LLC
                  </a>
                  , Toby brings expertise in data systems and knowledge management to the challenge of preserving tango history.
                </p>
                <p>
                  Connect: {" "}
                  <a href="https://tobytango.com" target="_blank" rel="noopener noreferrer"
                    className="no-underline transition-colors duration-200"
                    style={{ color: "#4A90B8" }}>
                    tobytango.com
                  </a>
                </p>
              </div>
            </section>

            {/* How We Build Content */}
            <section id="process" className="mb-12">
              <h2 className="mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#F5F0E8", fontSize: "1.5rem", fontWeight: 700 }}>
                How We Build Content
              </h2>
              <div className="p-5 rounded-lg mb-6" style={{ backgroundColor: "#1A1614", border: "1px solid rgba(139,46,59,0.3)", borderLeft: "3px solid #8B2E3B" }}>
                <p style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#A89F94", fontSize: "0.95rem", lineHeight: 1.7 }}>
                  <strong style={{ color: "#F5F0E8" }}>Transparency Notice:</strong> Tangology uses AI-assisted research
                  to help compile and organize historical information. This content is not written by humans alone —
                  it is a collaboration between AI research tools and human curation.
                </p>
              </div>

              <div style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#A89F94", fontSize: "1rem", lineHeight: 1.8 }}>
                <p className="mb-4">Our content pipeline works like this:</p>

                <div className="space-y-4 mb-6">
                  <div className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(200,169,110,0.15)", color: "#C8A96E", fontWeight: 600 }}>1</span>
                    <div>
                      <p><strong style={{ color: "#F5F0E8" }}>Research</strong> — AI models search academic papers, historical archives, interviews, and verified sources to compile comprehensive white papers on each topic.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(200,169,110,0.15)", color: "#C8A96E", fontWeight: 600 }}>2</span>
                    <div>
                      <p><strong style={{ color: "#F5F0E8" }}>Human Review</strong> — Every piece of content is reviewed by humans with tango expertise. We flag uncertain claims for verification by the HITM (Human-In-The-Middle) network of tango masters.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(200,169,110,0.15)", color: "#C8A96E", fontWeight: 600 }}>3</span>
                    <div>
                      <p><strong style={{ color: "#F5F0E8" }}>Community Contribution</strong> — We welcome corrections, additions, and expertise from the global tango community. This is an open, living knowledge base.</p>
                    </div>
                  </div>
                </div>

                <p>
                  This approach allows us to cover the vast scope of tango history while maintaining accuracy through human oversight.
                  We believe in transparency about our methods — you deserve to know how this content is created.
                </p>
              </div>
            </section>

            {/* Why AI? */}
            <section className="mb-12">
              <h2 className="mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#F5F0E8", fontSize: "1.5rem", fontWeight: 700 }}>
                Why AI-Assisted?
              </h2>
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#A89F94", fontSize: "1rem", lineHeight: 1.8 }}>
                <p className="mb-4">
                  Tango history spans 140+ years, thousands of people, hundreds of orchestras, and countless milongas across the globe.
                  No single person could compile this knowledge alone.
                </p>
                <p className="mb-4">
                  AI helps us:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Process and synthesize information from Spanish and English sources</li>
                  <li>Cross-reference dates, names, and events across multiple timelines</li>
                  <li>Identify gaps in coverage and connections between topics</li>
                  <li>Scale the research effort beyond what any individual could achieve</li>
                </ul>
                <p>
                  The human role remains essential: providing direction, verifying accuracy, connecting with primary sources,
                  and ensuring the content serves the tango community well.
                </p>
              </div>
            </section>

            {/* Contribute */}
            <section className="mb-12 p-6 rounded-lg text-center" style={{ backgroundColor: "#1E1B18", border: "1px solid rgba(200,169,110,0.15)" }}>
              <h2 className="mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#F5F0E8", fontSize: "1.3rem", fontWeight: 700 }}>
                Found an Error? Know More?
              </h2>
              <p className="mb-4" style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#A89F94", fontSize: "0.95rem" }}>
                We welcome corrections, additions, and expertise from the tango community.
              </p>
              <a href="mailto:contribute@tangology.org"
                className="inline-block no-underline px-5 py-2.5 rounded-full transition-all duration-200"
                style={{ backgroundColor: "rgba(200,169,110,0.15)", color: "#C8A96E", fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.9rem", fontWeight: 600 }}>
                Get in Touch
              </a>
            </section>

            {/* Footer */}
            <footer className="text-center pt-8" style={{ borderTop: "1px solid rgba(200,169,110,0.08)" }}>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#3A3530", fontSize: "0.8rem" }}>
                © 2026 Tangology.org · A project of{" "}
                <a href="https://hdtsllc.com" target="_blank" rel="noopener noreferrer" className="no-underline" style={{ color: "#4A4540" }}>
                  HDTS LLC
                </a>
              </p>
            </footer>
          </div>
        </main>
      </div>
    </>
  );
}
