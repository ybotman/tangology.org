"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Script from "next/script";

// TimelineJS3 event data - key moments in tango history
const timelineData = {
  title: {
    text: {
      headline: "Key Events in Tango History",
      text: "<p>Shows, films, recordings, political events, and the passing of the masters — the defining moments that shaped tango.</p>",
    },
  },
  eras: [
    { start_date: { year: "1896" }, end_date: { year: "1920" }, text: { headline: "Guardia Vieja" } },
    { start_date: { year: "1920" }, end_date: { year: "1935" }, text: { headline: "Guardia Nueva" } },
    { start_date: { year: "1935" }, end_date: { year: "1955" }, text: { headline: "Época de Oro" } },
    { start_date: { year: "1955" }, end_date: { year: "1983" }, text: { headline: "Decadencia" } },
    { start_date: { year: "1983" }, end_date: { year: "1995" }, text: { headline: "Renacimiento" } },
    { start_date: { year: "1995" }, end_date: { year: "2010" }, text: { headline: "Investigación" } },
    { start_date: { year: "2010" }, end_date: { year: "2032" }, text: { headline: "Neo-Traditional" } },
  ],
  events: [
    {
      start_date: { year: "1906" },
      text: {
        headline: "First Recordings",
        text: "<p>Between 1905 and 1910, tango leapt from the streets of Buenos Aires onto wax cylinders and shellac discs. Ángel Villoldo (1861–1919), 'the father of tango song,' had his iconic <em>El Choclo</em> (1903) recorded no later than 1906 by the Victor Argentine Orchestra in Philadelphia — because at that time, there were no recording studios in Argentina.</p><p>These recordings transformed tango. Before the phonograph, tango existed only in the moment. Once captured on disc, the music could cross oceans. Within a few years, 'El Choclo' was being performed across Europe and North America.</p>",
      },
      group: "Recording",
    },
    {
      start_date: { year: "1912" },
      end_date: { year: "1914" },
      text: {
        headline: "Paris Tangomania",
        text: "<p>By 1912, tango had exploded from Buenos Aires into the salons of Paris, igniting 'Tangomania.' <em>Tango Teas</em> and <em>Tango Cafés</em> opened across Paris, London, Berlin, and Shanghai. The craze spawned tango corsets, tango shoes, and tango-orange as a fashionable color.</p><p>The backlash was fierce: Pope Pius X declared tango immoral. Kaiser Wilhelm II forbade officers to dance it in uniform. The scandal only fueled popularity. World War I eventually cooled the fever, but tango had permanently embedded itself in European culture.</p>",
      },
      group: "Cultural",
    },
    {
      start_date: { year: "1935", month: "6", day: "24" },
      text: {
        headline: "Carlos Gardel Dies",
        text: "<p>On June 24, 1935, a Ford Trimotor carrying Carlos Gardel collided with another plane during takeoff at Medellín, Colombia. Gardel — just 44 and at the zenith of his career — was killed, along with his lyricist Alfredo Le Pera. The news paralyzed Latin America. Millions went into mourning.</p><p>His 1917 recording of <em>Mi noche triste</em> is widely considered the birth of the tango-canción. His most famous songs — <em>El día que me quieras</em>, <em>Volver</em>, <em>Por una cabeza</em> — remain staples nearly a century later. The Argentine saying <em>'Gardel cada día canta mejor'</em> ('Gardel sings better every day') captures how his legend has only grown.</p>",
      },
      group: "Death",
    },
    {
      start_date: { year: "1935" },
      text: {
        headline: "D'Arienzo Revolution",
        text: "<p>After Gardel's death, complex orchestral tango was drifting away from the dance floor. Young people dismissed it as 'music for old people.' Enter Juan D'Arienzo, who would be crowned 'El Rey del Compás' — The King of the Beat. In 1935, pianist Rodolfo Biagi suggested shifting to the driving 2/4 rhythm of the old-guard milonga. The effect was electrifying.</p><p>D'Arienzo's revolution saved social tango dancing. His approach brought young people streaming back to the milongas. His success directly catalyzed tango's Golden Age (1935–1955), inspiring Troilo, Di Sarli, and Pugliese.</p>",
      },
      group: "Music",
    },
    {
      start_date: { year: "1955", month: "9" },
      text: {
        headline: "Perón Overthrown",
        text: "<p>On September 16, 1955, the Revolución Libertadora toppled President Juan Domingo Perón, bringing an abrupt end to Argentina's Golden Age of Tango. Under Perón, tango had experienced an extraordinary golden age — he promoted tango as authentic Argentine expression.</p><p>The new junta reversed this: tango songs with Peronist sympathies or lunfardo lyrics were censored. Laws banning minors from nightclubs were selectively applied to milongas. The mentor system was dismantled, and tango was driven underground for nearly three decades.</p>",
      },
      group: "Political",
    },
    {
      start_date: { year: "1976" },
      end_date: { year: "1983" },
      text: {
        headline: "Dirty War / Guerra Sucia",
        text: "<p>On March 24, 1976, a military junta launched the Dirty War. The regime 'disappeared' an estimated 22,000 to 30,000 people. Curfews, bans on gatherings, and pervasive fear ruled Argentina until 1983.</p><p>For tango, the Dirty War was existentially devastating. The roughly 200 milongas at tango's peak were reduced to a handful of clandestine gatherings. By the time the dictatorship fell, an entire generation had grown up without tango.</p>",
      },
      group: "Political",
    },
    {
      start_date: { year: "1983", month: "11", day: "11" },
      text: {
        headline: "'Tango Argentino' Paris Premiere",
        text: "<p>On November 11, 1983, at the Théâtre du Châtelet during the Festival d'Automne in Paris, <em>Tango Argentino</em> took the stage and changed tango history forever. Created by Claudio Segovia and Héctor Orezzoli, the cast included Juan Carlos Copes and María Nieves, Virulazo and Elvira Santamaría, young Pablo Verón, and the Sexteto Mayor.</p><p>By 1983, tango was all but dead as social dance in Buenos Aires. The show single-handedly ignited a worldwide renaissance. If today tango is danced from Verona to Alaska, it is because of <em>Tango Argentino</em>.</p>",
      },
      group: "Show",
    },
    {
      start_date: { year: "1983", month: "12" },
      text: {
        headline: "Democracy Returns",
        text: "<p>On October 30, 1983, Raúl Alfonsín won Argentina's first free elections in a decade. Civilian government brought immediate end to curfews and gathering bans. Just weeks before, <em>Tango Argentino</em> had premiered in Paris — a historic coincidence.</p><p>Surviving milongueros — many now in their 60s and 70s — began to emerge and dance publicly again. A younger generation sought them out, hungry to reclaim stolen cultural heritage.</p>",
      },
      group: "Political",
    },
    {
      start_date: { year: "1985" },
      text: {
        headline: "'Tango Argentino' Broadway",
        text: "<p>The show transferred to Broadway at the Mark Hellinger Theatre on October 9, 1985, running for 199 performances and earning three Tony nominations including Best Musical. America discovered authentic Argentine tango — nothing like the rose-in-teeth ballroom caricature.</p>",
      },
      group: "Show",
    },
    {
      start_date: { year: "1996", month: "4", day: "29" },
      text: {
        headline: "Pepito Avellaneda Dies",
        text: "<p>'Pepito Avellaneda' died on April 29, 1996, at age 65. He earned the title 'The King of the Milonga' — referring to the fast, rhythmic milonga dance, which he elevated to art. His style was orillero — the playful tango of outer neighborhoods.</p><p><em>'Dancing is everything for me. I feed on it. I dance and I am nurtured.'</em></p>",
      },
      group: "Death",
    },
    {
      start_date: { year: "1997" },
      text: {
        headline: "'The Tango Lesson' Released",
        text: "<p><em>The Tango Lesson</em> (1997) is a semi-autobiographical drama by British filmmaker Sally Potter. The film follows Sally discovering a tango performance by Pablo Verón in Paris. She travels to Buenos Aires, studying with Gustavo Naveira and Fabián Salas.</p><p>The film brought tango to mainstream art-house audiences and introduced authentic tango culture beyond clichés.</p>",
      },
      group: "Film",
    },
    {
      start_date: { year: "2001" },
      end_date: { year: "2002" },
      text: {
        headline: "Argentine Economic Crisis",
        text: "<p>In December 2001, Argentina's economy imploded in <em>La Crisis</em>. Argentina defaulted on $93 billion — then the largest sovereign default in history. Unemployment soared above 23%.</p><p>The crisis paradoxically transformed tango. Many of Buenos Aires' best teachers emigrated to teach worldwide. When conditions stabilized, the devalued peso made Buenos Aires cheap, sparking a boom in tango tourism.</p>",
      },
      group: "Political",
    },
    {
      start_date: { year: "2003" },
      text: {
        headline: "First Campeonato Mundial",
        text: "<p>In 2003, Buenos Aires launched the first Campeonato Mundial de Baile de Tango (World Tango Championship). Two categories: <strong>Tango de Pista</strong> (social dance style) and <strong>Tango Escenario</strong> (choreographed stage routines).</p><p>By 2024, over 750 couples from 53 countries competed. Qualifying rounds are held worldwide — Tokyo, Moscow, London, New York, Istanbul.</p>",
      },
      group: "Cultural",
    },
    {
      start_date: { year: "2005", month: "7", day: "1" },
      text: {
        headline: "Carlos Gavito Dies",
        text: "<p>Carlos Eduardo Gavito (1942–2005) grew up in Avellaneda. His rise to fame came when he joined <em>Forever Tango</em>, opening on Broadway in 1997 and seen by more than five million people.</p><p>Gavito's style was famously minimalist: dramatic pauses and slow movements to let music breathe. His philosophy: tango is not about steps but connection — 'a three-minute commitment.'</p>",
      },
      group: "Death",
    },
    {
      start_date: { year: "2009", month: "9", day: "30" },
      text: {
        headline: "UNESCO Heritage",
        text: "<p>On September 30, 2009, UNESCO inscribed tango on the Representative List of the Intangible Cultural Heritage of Humanity. The recognition was a joint nomination by Argentina and Uruguay.</p><p>The recognition formally acknowledged that tango embodies 'diversity and cultural dialogue.' It gave tango communities formal status as cultural bearers and bolstered cultural tourism worldwide.</p>",
      },
      group: "Cultural",
    },
    {
      start_date: { year: "2010", month: "1", day: "7" },
      text: {
        headline: "Tete Rusconi Dies",
        text: "<p>Pedro Alberto 'Tete' Rusconi (1936–2010) was a towering figure in social tango. With partner Silvia Ceriani, he became one of the first to teach close-embrace tango in the US around 1993–94. Susana Miller coined 'milonguero style' while working as his assistant.</p><p>He famously said: <em>'Dance the music. Because the music is the tango.'</em> Pina Bausch said he had 'an orchestra in his head.'</p>",
      },
      group: "Death",
    },
    {
      start_date: { year: "2020", month: "3" },
      end_date: { year: "2022" },
      text: {
        headline: "COVID-19 Pandemic",
        text: "<p>On March 8, 2020, Buenos Aires' milongas closed as Argentina imposed one of the world's strictest COVID-19 lockdowns. For tango — defined by the abrazo (embrace) — the pandemic was an existential threat.</p><p>Of approximately 200 milongas, 40-50 closed permanently. Juan Carlos Copes — who had starred in the 1983 <em>Tango Argentino</em> — died of COVID-19 on January 16, 2021. The post-pandemic world is rebuilding, but what was lost can never be fully restored.</p>",
      },
      group: "Political",
    },
  ],
};

// Event type colors matching tangology palette
const EVENT_COLORS = {
  Show: { bg: "#8B2E3B", text: "#F5F0E8" },
  Film: { bg: "#2E5B8B", text: "#F5F0E8" },
  Music: { bg: "#8B6914", text: "#F5F0E8" },
  Political: { bg: "#6B4423", text: "#F5F0E8" },
  Cultural: { bg: "#4A6741", text: "#F5F0E8" },
  Death: { bg: "#4A4540", text: "#F5F0E8" },
  Recording: { bg: "#5B4A3B", text: "#F5F0E8" },
};

export default function EventsPage() {
  const params = useParams();
  const locale = params?.locale || "en";
  const timelineRef = useRef(null);
  const [timelineLoaded, setTimelineLoaded] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (scriptLoaded && timelineRef.current && window.TL) {
      // Add custom styles for dark theme
      const style = document.createElement("style");
      style.textContent = `
        /* Base timeline container */
        .tl-timeline {
          background-color: #1A1714 !important;
          font-family: 'Source Sans 3', sans-serif !important;
        }

        /* Story slider - the main content area (FIX WHITE BACKGROUND) */
        .tl-storyslider {
          background-color: #1A1714 !important;
        }
        .tl-slider-container-mask {
          background-color: #1A1714 !important;
        }
        .tl-slider-background {
          background-color: #1A1714 !important;
        }

        /* Individual slides */
        .tl-slide {
          background-color: #1A1714 !important;
        }
        .tl-slide-content-container {
          background-color: #1A1714 !important;
        }
        .tl-slide-content {
          background-color: #1A1714 !important;
        }
        .tl-slide-scrollable-container {
          background-color: #1A1714 !important;
        }

        /* Headlines - main title in slides (FIX HARD TO READ TEXT) */
        .tl-headline {
          color: #C8A96E !important;
          font-family: 'Playfair Display', Georgia, serif !important;
        }
        .tl-headline-date {
          color: #D4B896 !important;
          font-family: 'JetBrains Mono', monospace !important;
        }

        /* Text content in slides */
        .tl-text p {
          color: #D4CCC0 !important;
          line-height: 1.7 !important;
        }
        .tl-text em {
          color: #C8A96E !important;
        }

        /* Timemarkers (the boxes on the timeline) */
        .tl-timemarker-content-container {
          background-color: #2A2520 !important;
          border: 1px solid rgba(200,169,110,0.3) !important;
        }
        .tl-timemarker-content-container .tl-timemarker-content .tl-timemarker-text h2.tl-headline {
          color: #F5F0E8 !important;
          font-family: 'Playfair Display', Georgia, serif !important;
          font-size: 0.85rem !important;
        }
        .tl-timemarker-content-container .tl-timemarker-content .tl-timemarker-text p {
          color: #A89F94 !important;
        }
        .tl-timemarker.tl-timemarker-active .tl-timemarker-content-container {
          background-color: #3A3530 !important;
          border-color: #C8A96E !important;
        }

        /* Timeline navigation bar */
        .tl-timenav {
          background-color: #0D0D0D !important;
        }
        .tl-timenav-container {
          background-color: #1A1714 !important;
        }
        .tl-timeaxis {
          background-color: #1A1714 !important;
        }
        .tl-timeaxis-background {
          background-color: #1A1714 !important;
        }
        .tl-timeaxis-tick {
          border-color: rgba(200,169,110,0.2) !important;
        }
        .tl-timeaxis-tick-text span {
          color: #C8A96E !important;
          font-family: 'JetBrains Mono', monospace !important;
        }

        /* Navigation arrows */
        .tl-slidenav-icon {
          color: #C8A96E !important;
        }
        .tl-slidenav-icon::before {
          color: #C8A96E !important;
        }
        .tl-slidenav-title {
          color: #A89F94 !important;
        }
        .tl-slidenav-description {
          color: #8A8178 !important;
        }

        /* Menubar */
        .tl-menubar {
          background-color: #1E1B18 !important;
        }
        .tl-menubar-button {
          color: #C8A96E !important;
        }

        /* Marker lines */
        .tl-timemarker .tl-timemarker-line-left,
        .tl-timemarker .tl-timemarker-line-right {
          background-color: rgba(200,169,110,0.3) !important;
        }

        /* Era bands */
        .tl-timeera {
          background-color: rgba(200,169,110,0.08) !important;
        }
        .tl-timeera-content-container {
          background-color: transparent !important;
        }
        .tl-timeera-content-container .tl-timeera-text h2.tl-headline {
          color: #C8A96E !important;
          font-family: 'Source Sans 3', sans-serif !important;
          font-size: 0.7rem !important;
          text-shadow: 0 1px 2px rgba(0,0,0,0.5) !important;
        }

        /* Scroll hint */
        .tl-scroll-right, .tl-scroll-left {
          background: linear-gradient(to right, transparent, #1A1714) !important;
        }
      `;
      document.head.appendChild(style);

      new window.TL.Timeline("timeline-embed", timelineData, {
        hash_bookmark: true,
        initial_zoom: 1,
        scale_factor: 1,
        timenav_position: "bottom",
        optimal_tick_width: 80,
        timenav_height_percentage: 25,
      });
      setTimelineLoaded(true);
    }
  }, [scriptLoaded]);

  return (
    <>

      {/* TimelineJS CSS */}
      <link rel="stylesheet" href="https://cdn.knightlab.com/libs/timeline3/latest/css/timeline.css" />

      {/* TimelineJS Script */}
      <Script
        src="https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js"
        onLoad={() => setScriptLoaded(true)}
      />

      <div style={{ backgroundColor: "#0D0D0D", minHeight: "100vh", color: "#F5F0E8" }}>
        {/* Header */}
        <header
          className="sticky top-0 z-40"
          style={{
            backgroundColor: "rgba(13,13,13,0.95)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(200,169,110,0.1)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
            <Link
              href={`/${locale}`}
              className="no-underline"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#C8A96E",
                letterSpacing: "0.15em",
                fontSize: "0.95rem",
                fontWeight: 700,
              }}
            >
              TANGOLOGY
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href={`/${locale}/timeline`}
                className="no-underline px-3 py-1.5 rounded-full text-xs transition-colors"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  border: "1px solid rgba(200,169,110,0.2)",
                  color: "#A89F94",
                }}
              >
                Era Timeline
              </Link>
              <Link
                href={`/${locale}`}
                className="no-underline flex items-center gap-1.5"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: "#A89F94",
                  fontSize: "0.85rem",
                }}
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Home
              </Link>
            </div>
          </div>
        </header>

        <main className="py-8 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Page title */}
            <div className="text-center mb-6">
              <h1
                className="mb-2"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "#C8A96E",
                  fontSize: "2.25rem",
                  fontWeight: 700,
                }}
              >
                Key Events
              </h1>
              <p
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: "#A89F94",
                  fontSize: "1rem",
                }}
              >
                Defining moments in tango history — scroll horizontally or use the timeline below
              </p>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {Object.entries(EVENT_COLORS).map(([type, colors]) => (
                <span
                  key={type}
                  className="px-2.5 py-1 rounded-full text-xs"
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    backgroundColor: colors.bg,
                    color: colors.text,
                  }}
                >
                  {type}
                </span>
              ))}
            </div>

            {/* TimelineJS Container */}
            <div
              className="rounded-lg overflow-hidden mb-6"
              style={{
                backgroundColor: "#1A1714",
                border: "1px solid rgba(200,169,110,0.1)",
              }}
            >
              <div
                id="timeline-embed"
                ref={timelineRef}
                style={{ width: "100%", height: "600px" }}
              />
              {!timelineLoaded && (
                <div className="flex items-center justify-center h-96">
                  <div
                    className="w-8 h-8 border-2 rounded-full animate-spin"
                    style={{
                      borderColor: "rgba(200,169,110,0.2)",
                      borderTopColor: "#C8A96E",
                    }}
                  />
                </div>
              )}
            </div>

            {/* Related pages */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Link
                href={`/${locale}/timeline`}
                className="no-underline px-4 py-2 rounded-full transition-colors"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "0.85rem",
                  backgroundColor: "rgba(200,169,110,0.08)",
                  border: "1px solid rgba(200,169,110,0.15)",
                  color: "#C8A96E",
                }}
              >
                View Era Timeline
              </Link>
              <Link
                href={`/${locale}/people`}
                className="no-underline px-4 py-2 rounded-full transition-colors"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "0.85rem",
                  backgroundColor: "rgba(200,169,110,0.08)",
                  border: "1px solid rgba(200,169,110,0.15)",
                  color: "#C8A96E",
                }}
              >
                People Profiles
              </Link>
              <Link
                href={`/${locale}/orchestras`}
                className="no-underline px-4 py-2 rounded-full transition-colors"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "0.85rem",
                  backgroundColor: "rgba(200,169,110,0.08)",
                  border: "1px solid rgba(200,169,110,0.15)",
                  color: "#C8A96E",
                }}
              >
                Orchestras
              </Link>
            </div>

            {/* Disclaimer */}
            <div
              className="p-4 rounded-lg"
              style={{
                backgroundColor: "rgba(200,169,110,0.05)",
                borderLeft: "4px solid #C8A96E",
              }}
            >
              <p
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: "#A89F94",
                  fontSize: "0.85rem",
                  lineHeight: 1.6,
                }}
              >
                <strong style={{ color: "#C8A96E" }}>Disclaimer:</strong> This timeline was researched
                and compiled using AI assistance. Errors may exist — corrections and contributions from
                the tango community are welcome.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
