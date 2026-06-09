import './CultivaArchDiagram.css';

/**
 * Diagrama de arquitetura do CultivaClub — SVG portado verbatim de
 * legacy/index.html, convertido para JSX (atributos camelCase). Mantém
 * <title> + aria-labelledby, os defs (markers, pattern grid) e o figcaption.
 */
export function CultivaArchDiagram() {
  return (
    <figure className="arch">
      <div className="arch__head">
        <span className="kicker kicker--accent">ARQUITETURA</span>
        <span className="kicker kicker--muted">CULTIVACLUB · MONOLITO MODULAR</span>
      </div>

      <div className="arch__svg-wrap">
        <svg
          viewBox="0 0 1240 360"
          className="arch__svg"
          xmlns="http://www.w3.org/2000/svg"
          aria-labelledby="arch-title"
        >
          <title id="arch-title">Diagrama de arquitetura do CultivaClub</title>
          <defs>
            <marker
              id="arr-cu"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="#E37B3E" />
            </marker>
            <marker
              id="arr-mi"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="#A7E26B" />
            </marker>
            <pattern
              id="arch-grid"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 24 0 L 0 0 0 24"
                fill="none"
                stroke="rgba(244,239,230,0.04)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>

          <rect width="100%" height="100%" fill="url(#arch-grid)" />

          {/* USER */}
          <g>
            <circle
              cx="70"
              cy="150"
              r="34"
              fill="rgba(244,239,230,0.04)"
              stroke="#2A2620"
            />
            <path
              d="M70 138 a8 8 0 1 1 0.001 0 M55 168 c0-8 7-14 15-14 s15 6 15 14"
              fill="none"
              stroke="#E37B3E"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <text
              x="70"
              y="200"
              textAnchor="middle"
              fontFamily="Geist Mono, monospace"
              fontSize="10"
              letterSpacing="2"
              fill="#C7C0B2"
            >
              USUÁRIO
            </text>
          </g>

          {/* arrow user -> vercel */}
          <line
            x1="106"
            y1="150"
            x2="190"
            y2="150"
            stroke="#E37B3E"
            strokeWidth="1.4"
            markerEnd="url(#arr-cu)"
          />
          <text
            x="148"
            y="140"
            textAnchor="middle"
            fontFamily="Geist Mono"
            fontSize="9"
            letterSpacing="1.5"
            fill="#E37B3E"
          >
            HTTPS
          </text>

          {/* VERCEL CONTAINER */}
          <g>
            <text
              x="290"
              y="65"
              textAnchor="middle"
              fontFamily="Geist Mono"
              fontSize="10"
              letterSpacing="2"
              fill="#8C857A"
            >
              ▲  VERCEL
            </text>
            <rect
              x="190"
              y="80"
              width="200"
              height="140"
              rx="3"
              fill="rgba(244,239,230,0.025)"
              stroke="#2A2620"
            />
            <rect
              x="210"
              y="108"
              width="160"
              height="84"
              rx="3"
              fill="#15130F"
              stroke="#2A2620"
            />
            <text
              x="290"
              y="142"
              textAnchor="middle"
              fontFamily="Fraunces, serif"
              fontStyle="italic"
              fontSize="18"
              fill="#F4EFE6"
            >
              CultivaClub
            </text>
            <text
              x="290"
              y="170"
              textAnchor="middle"
              fontFamily="Geist Mono"
              fontSize="10"
              letterSpacing="2"
              fill="#C7C0B2"
            >
              WEB FRONTEND
            </text>
          </g>

          {/* arrow vercel -> render */}
          <line
            x1="390"
            y1="150"
            x2="500"
            y2="150"
            stroke="#E37B3E"
            strokeWidth="1.4"
            markerEnd="url(#arr-cu)"
          />
          <text
            x="445"
            y="140"
            textAnchor="middle"
            fontFamily="Geist Mono"
            fontSize="9"
            letterSpacing="1.5"
            fill="#E37B3E"
          >
            REST / JSON
          </text>

          {/* RENDER CONTAINER */}
          <g>
            <text
              x="620"
              y="65"
              textAnchor="middle"
              fontFamily="Geist Mono"
              fontSize="10"
              letterSpacing="2"
              fill="#8C857A"
            >
              ●  RENDER
            </text>
            <rect
              x="500"
              y="80"
              width="240"
              height="180"
              rx="3"
              fill="rgba(227,123,62,0.07)"
              stroke="#E37B3E"
            />
            <rect
              x="520"
              y="108"
              width="200"
              height="130"
              rx="3"
              fill="#15130F"
              stroke="rgba(227,123,62,0.45)"
            />
            <text
              x="620"
              y="138"
              textAnchor="middle"
              fontFamily="Fraunces, serif"
              fontStyle="italic"
              fontSize="17"
              fill="#F4EFE6"
            >
              CultivaClub
            </text>
            <text
              x="620"
              y="160"
              textAnchor="middle"
              fontFamily="Fraunces, serif"
              fontStyle="italic"
              fontSize="15"
              fill="#C9A56A"
            >
              Monolito
            </text>
            <line
              x1="540"
              y1="175"
              x2="700"
              y2="175"
              stroke="rgba(227,123,62,0.25)"
              strokeWidth="1"
            />
            <text
              x="620"
              y="194"
              textAnchor="middle"
              fontFamily="Geist Mono"
              fontSize="9"
              letterSpacing="1.5"
              fill="#C7C0B2"
            >
              SPRING BOOT · JAVA 21
            </text>
            <text
              x="620"
              y="215"
              textAnchor="middle"
              fontFamily="Geist Mono"
              fontSize="10"
              letterSpacing="2"
              fill="#E37B3E"
            >
              :10000
            </text>
          </g>

          {/* arrows render -> dbs */}
          <line
            x1="740"
            y1="130"
            x2="880"
            y2="125"
            stroke="#E37B3E"
            strokeWidth="1.4"
            markerEnd="url(#arr-cu)"
          />
          <text
            x="810"
            y="116"
            textAnchor="middle"
            fontFamily="Geist Mono"
            fontSize="9"
            letterSpacing="1"
            fill="#E37B3E"
          >
            HikariPool · Usuarios
          </text>

          <line
            x1="740"
            y1="190"
            x2="880"
            y2="220"
            stroke="#E37B3E"
            strokeWidth="1.4"
            markerEnd="url(#arr-cu)"
          />
          <text
            x="810"
            y="215"
            textAnchor="middle"
            fontFamily="Geist Mono"
            fontSize="9"
            letterSpacing="1"
            fill="#E37B3E"
          >
            HikariPool · Objetos
          </text>

          {/* NEON POSTGRES CONTAINER */}
          <g>
            <text
              x="1020"
              y="65"
              textAnchor="middle"
              fontFamily="Geist Mono"
              fontSize="10"
              letterSpacing="2"
              fill="#8C857A"
            >
              ●  NEON POSTGRESQL
            </text>
            <rect
              x="880"
              y="80"
              width="280"
              height="220"
              rx="3"
              fill="rgba(167,226,107,0.04)"
              stroke="#2A2620"
            />

            {/* db usuarios */}
            <g transform="translate(965, 100)">
              <ellipse
                cx="55"
                cy="10"
                rx="55"
                ry="9"
                fill="#1B1814"
                stroke="#A7E26B"
                strokeWidth="1.2"
              />
              <path
                d="M0,10 L0,58 a55,9 0 0 0 110,0 L110,10"
                fill="#1B1814"
                stroke="#A7E26B"
                strokeWidth="1.2"
              />
              <ellipse
                cx="55"
                cy="30"
                rx="55"
                ry="9"
                fill="none"
                stroke="#A7E26B"
                strokeWidth="0.6"
                opacity="0.4"
              />
              <ellipse
                cx="55"
                cy="48"
                rx="55"
                ry="9"
                fill="none"
                stroke="#A7E26B"
                strokeWidth="0.6"
                opacity="0.4"
              />
              <text
                x="55"
                y="38"
                textAnchor="middle"
                fontFamily="Geist Mono"
                fontSize="9"
                fill="#C7C0B2"
              >
                database
              </text>
              <text
                x="55"
                y="55"
                textAnchor="middle"
                fontFamily="Geist Mono"
                fontSize="11"
                fontWeight="600"
                fill="#A7E26B"
              >
                usuarios
              </text>
            </g>

            {/* db objetos */}
            <g transform="translate(965, 198)">
              <ellipse
                cx="55"
                cy="10"
                rx="55"
                ry="9"
                fill="#1B1814"
                stroke="#A7E26B"
                strokeWidth="1.2"
              />
              <path
                d="M0,10 L0,58 a55,9 0 0 0 110,0 L110,10"
                fill="#1B1814"
                stroke="#A7E26B"
                strokeWidth="1.2"
              />
              <ellipse
                cx="55"
                cy="30"
                rx="55"
                ry="9"
                fill="none"
                stroke="#A7E26B"
                strokeWidth="0.6"
                opacity="0.4"
              />
              <ellipse
                cx="55"
                cy="48"
                rx="55"
                ry="9"
                fill="none"
                stroke="#A7E26B"
                strokeWidth="0.6"
                opacity="0.4"
              />
              <text
                x="55"
                y="38"
                textAnchor="middle"
                fontFamily="Geist Mono"
                fontSize="9"
                fill="#C7C0B2"
              >
                database
              </text>
              <text
                x="55"
                y="55"
                textAnchor="middle"
                fontFamily="Geist Mono"
                fontSize="11"
                fontWeight="600"
                fill="#A7E26B"
              >
                objetos
              </text>
            </g>
          </g>

          {/* UPTIMEROBOT */}
          <g>
            <rect
              x="180"
              y="280"
              width="280"
              height="64"
              rx="3"
              fill="rgba(167,226,107,0.05)"
              stroke="#A7E26B"
            />
            <circle
              cx="208"
              cy="312"
              r="10"
              fill="none"
              stroke="#A7E26B"
              strokeWidth="1.2"
            />
            <circle cx="205" cy="309" r="1.5" fill="#A7E26B" />
            <circle cx="211" cy="309" r="1.5" fill="#A7E26B" />
            <path
              d="M204 315 L212 315"
              stroke="#A7E26B"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <text
              x="232"
              y="307"
              fontFamily="Geist Mono"
              fontSize="10"
              letterSpacing="2"
              fill="#A7E26B"
            >
              UPTIMEROBOT
            </text>
            <text x="232" y="324" fontFamily="Geist Mono" fontSize="9" fill="#C7C0B2">
              Ping /actuator/health
            </text>
            <text x="232" y="338" fontFamily="Geist Mono" fontSize="9" fill="#8C857A">
              a cada 5 min
            </text>
          </g>

          {/* arrow uptime -> render (dotted) */}
          <path
            d="M 460 295 Q 520 280 575 260"
            fill="none"
            stroke="#A7E26B"
            strokeWidth="1.2"
            strokeDasharray="5,4"
            markerEnd="url(#arr-mi)"
            opacity="0.85"
          />
          <text
            x="520"
            y="275"
            textAnchor="middle"
            fontFamily="Geist Mono"
            fontSize="9"
            letterSpacing="1.5"
            fill="#A7E26B"
          >
            keep-alive
          </text>
        </svg>
      </div>

      <figcaption className="arch__cap">
        Fluxo end-to-end: usuário acessa o frontend hospedado na{' '}
        <strong>Vercel</strong>, que conversa via REST/JSON com o monolito Spring
        Boot rodando na <strong>Render</strong> (porta :10000). A persistência fica
        em dois databases lógicos no <strong>Neon PostgreSQL</strong> —{' '}
        <code>usuarios</code> e <code>objetos</code> — cada um com seu pool Hikari
        dedicado. O <strong>UptimeRobot</strong> garante zero cold-start pingando{' '}
        <code>/actuator/health</code> a cada 5 minutos.
      </figcaption>
    </figure>
  );
}
