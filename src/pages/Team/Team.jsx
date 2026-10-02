import React, { useEffect, useRef, useState, useCallback } from 'react';
import './Team.css';
import JoshuaImage from '../../assets/Joshua.png';
import KhushImage from '../../assets/Khush Shah.jpeg';
import AlbertImage from '../../assets/Albert.png';
import EmmanuelImage from '../../assets/Emmanuel.jpg';
import AkhilImage from '../../assets/Akhil Muni.jpeg';
import SahithiImage from '../../assets/Sahithi Beecha.jpeg';
import JayImage from '../../assets/Jay.jpeg';
import MarieImage from '../../assets/Marie.jpeg';
import JaniceImage from '../../assets/Janice.png';
import FaizaImage from '../../assets/Faiza.jpeg';
import HettImage from '../../assets/Hett.jpeg';

/* ============================================================
   TEAM DATA. This is the only block you edit.
   - `image` is optional. Members without one get initials.
   - `links` is optional. Empty or missing links are hidden.
     instagram = handle WITHOUT the @, website/linkedin = full URL.
   ============================================================ */
const FOUNDERS = [
  {
    id: 'joshua',
    name: 'Joshua Mukisa',
    role: 'Founder & CEO',
    image: JoshuaImage,
    bio: "The one who started it all. Joshua Mukisa is the visionary founder who turned an idea into a fully-fledged platform, setting the foundation for VoteAble's mission and growth. ",
    links: {
      website: 'https://joshuamukisa.com',
      instagram: 'jmuks_k',
      linkedin: 'https://www.linkedin.com/in/joshua-mukisa/',
      email: '',
    },
  },
  {
    id: 'khush',
    name: 'Khush Pratik Shah',
    role: 'Co-Founder & COO',
    image: KhushImage,
    bio: "Brought structure and operational excellence, leading the platform's UI revamp and driving smooth election management.",
    links: {
      website: '',
      instagram: 'khush_p_shah',
      linkedin: '',
      email: '',
    },
  },
  {
    id: 'akhil',
    name: 'Akhil Muni',
    role: 'Co-Founder & CFO',
    image: AkhilImage,
    bio: "Early supporter and financial backbone, funding development and expansion initiatives from the company's very start.",
    links: { website: '', instagram: 'akhil_did.it', linkedin: '', email: '' },
  },
  {
    id: 'albert',
    name: 'Jordan Mulumba',
    role: 'Head of Design',
    image: AlbertImage,
    bio: "The creative mind behind VoteAble's sleek interface, redefining the app's entire design system and visual identity.",
    links: {
      website: 'https://buildsbyj.com',
      instagram: '_jordan_am',
      linkedin: 'https://www.linkedin.com/in/albertjm/',
      email: '',
    }, // TODO: website + instagram handle
  },
  {
    id: 'emmanuel',
    name: 'Emmanuel Asiimwe',
    role: 'Chief Technology Officer',
    image: EmmanuelImage,
    bio: "Core developer and tech lead who brought Albert's designs to life, ensuring platform stability, scalability, and performance.",
    links: {
      website: '',
      instagram: 'asiimwemmanuel_101',
      linkedin: 'https://www.linkedin.com/in/asiimwemmanuel/',
      email: '',
    }, // TODO: instagram handle
  },
];

/* One object per academic year. Years show in the order listed, and the one
   marked current: true is selected when the page opens. To add a year, add a
   new object and move current: true to it. */
const GENERATIONS = [
  {
    id: '2026-2027',
    label: '2026 – 2027',
    current: true,
    blurb:
      'International Baccalaureate Diploma Programme students at Aga Khan High School, Kampala, leading election administration, school-wide coordination and the continued development of the Legacy Team under the guidance of its founding team.',

    members: [
      {
        id: 'jay',
        name: 'Jay Patel',
        role: 'Chief Executive Officer',
        image: JayImage,
        bio: 'Leads the Legacy Team, coordinating its members, organizing election operations and ensuring the team continues the work established by its founders.',
      },

      {
        id: 'marie',
        name: 'Akarunga Marie',
        role: 'Chief Operations Officer',
        image: MarieImage,
        bio: 'Oversees the day-to-day operations of the Legacy Team, coordinating members, logistics and collaboration with the Student Council.',
        links: { instagram: 'mammdd_tttt' },
      },

      {
        id: 'zoey',
        name: 'Zoey Langariti',
        role: 'Chief Strategy Officer',
        image: '',
        bio: 'Drives forward planning and strategic coordination, helping the team anticipate key dates, prepare initiatives and maintain continuity between student cohorts.',
      },

      {
        id: 'alvin',
        name: 'Alvin Preston Nantajja',
        role: 'Director of Field Operations',
        image: '',
        bio: 'Coordinates the team’s work on the ground, mobilizing students and helping turn Legacy Team initiatives into action across the school.',
        links: { instagram: 'preston_nantajja' },
      },

      {
        id: 'janice',
        name: 'Janice',
        role: 'Director of Electoral Affairs',
        image: JaniceImage,
        bio: 'Oversees electoral affairs within the Legacy Team, supporting the organization, coordination and administration of student elections and ensuring electoral activities are carried out effectively.',
      },

      {
        id: 'faiza',
        name: 'Faiza',
        role: 'Director of Election Operations',
        image: FaizaImage,
        bio: 'Coordinates the operational execution of student elections, helping organize personnel, timelines and logistical requirements to ensure electoral activities run smoothly.',
      },

      {
        id: 'phill',
        name: 'Phillip Ssebombo',
        role: 'Director of Governance & Administration',
        image: '',
        bio: 'Supports the Legacy Team’s governance and institutional continuity, helping maintain the systems, processes and standards that allow its work to continue across student cohorts.',
      },
    ],
  },
  {
    id: '2025-2026',
    label: '2025 – 2026',
    current: false,
    blurb:
      'Former International Baccalaureate Diploma Programme students at Aga Khan High School, Kampala, who ran daily operations, election administration and platform maintenance under the guidance of the founding team.',
    members: [
      {
        id: 'sahithi',
        name: 'Sahithi Beecha',
        role: 'Chief Executive Officer',
        image: SahithiImage,
        bio: "Leads the Legacy Team with vision and authority, ensuring every election runs seamlessly while carrying forward the founders' mission.",
      },
      {
        id: 'hett',
        name: 'Hett Vaya',
        role: 'Co-Chief Operations Officer',
        image: HettImage,
        bio: 'Shares responsibility for daily operations, bringing structure and consistency to the electoral process alongside Jethro.',
      },
      {
        id: 'jerome',
        name: 'Jerome Owachi',
        role: 'Chief Technology Officer',
        bio: 'Key player in poll creation and backend coordination, bridging communication between the tech and operations teams.',
      },
      {
        id: 'zia',
        name: 'Zia Sania',
        role: 'Head of Data Analytics & Processing',
        bio: 'Oversees voter data collection, preprocessing, and analysis, ensuring data integrity and generating insights for election reporting and platform improvements.',
      },
      {
        id: 'abraham',
        name: 'Abraham',
        role: 'Data Operations Specialist',
        bio: 'Handles voter registration data collection and preprocessing, maintaining accurate voter rolls and supporting the data analytics pipeline.',
      },
      {
        id: 'aretha',
        name: 'Aretha',
        role: 'Voter Experience Manager',
        bio: 'Enhances the voting experience by gathering user feedback, troubleshooting voter issues, and improving platform accessibility and usability.',
      },
      {
        id: 'kwagala',
        name: 'Kwagala',
        role: 'Electoral Compliance Officer',
        bio: 'Ensures all elections adhere to school policies and democratic principles, and documents election processes for institutional records.',
      },
      {
        id: 'raiaan',
        name: 'Raiaan Lalani',
        role: 'Platform Support Coordinator',
        bio: 'Provides technical support to voters and candidates, manages help desk operations, and coordinates with the tech team during election windows.',
      },
    ],
  },
];

/* ============================================================
   HELPERS
   ============================================================ */
const iconProps = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

const ICONS = {
  website: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.6 2.6 4 5.6 4 9s-1.4 6.4-4 9c-2.6-2.6-4-5.6-4-9s1.4-6.4 4-9z" />
    </svg>
  ),
  instagram: (
    <svg {...iconProps}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
    </svg>
  ),
  linkedin: (
    <svg {...iconProps}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10.5V16" />
      <path d="M8 7.6v.01" />
      <path d="M12 16v-5.5" />
      <path d="M12 13c0-1.7 1-2.6 2.3-2.6 1.4 0 2.2.9 2.2 2.6V16" />
    </svg>
  ),
  email: (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </svg>
  ),
};

const Arrow = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
);

function getInitials(name) {
  const parts = name.trim().split(/\s+/);
  return parts.length > 1
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase();
}

function buildLinks(links = {}) {
  const rows = [];
  if (links.website) {
    rows.push({
      key: 'website',
      label: links.website
        .replace(/^https?:\/\/(www\.)?/, '')
        .replace(/\/$/, ''),
      href: links.website,
    });
  }
  if (links.instagram) {
    const handle = links.instagram.replace(/^@/, '');
    rows.push({
      key: 'instagram',
      label: `@${handle}`,
      href: `https://instagram.com/${handle}`,
    });
  }
  if (links.linkedin) {
    rows.push({ key: 'linkedin', label: 'LinkedIn', href: links.linkedin });
  }
  if (links.email) {
    rows.push({
      key: 'email',
      label: links.email,
      href: `mailto:${links.email}`,
    });
  }
  return rows;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.tm-reveal');
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('is-in');
            io.unobserve(en.target);
          }
        }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* One card design for founders AND legacy members */
function PortraitCard({ member, index, className, onOpen }) {
  return (
    <button
      type="button"
      className={`tm-founder ${className}`}
      style={{ '--i': index }}
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label={`${member.name}, ${member.role}. View profile`}
    >
      <span className="tm-founder-media">
        {member.image ? (
          <img src={member.image} alt="" className="tm-founder-img" />
        ) : (
          <span className="tm-founder-img tm-initials" aria-hidden="true">
            {getInitials(member.name)}
          </span>
        )}
        <span className="tm-founder-arrow">
          <Arrow />
        </span>
      </span>
      <span className="tm-founder-info">
        <span className="tm-founder-name">{member.name}</span>
        <span className="tm-founder-role">{member.role}</span>
      </span>
    </button>
  );
}

/* ============================================================
   PROFILE MODAL
   ============================================================ */
function ProfileModal({ entry, onClose }) {
  const { member, tag } = entry;
  const cardRef = useRef(null);
  const rows = buildLinks(member.links);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    cardRef.current?.focus({ preventScroll: true });

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !cardRef.current) return;
      const items = cardRef.current.querySelectorAll(
        'a[href], button:not([disabled])',
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === cardRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="tm-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="tm-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tm-modal-name"
        tabIndex={-1}
        ref={cardRef}
      >
        <button
          type="button"
          className="tm-modal-close"
          onClick={onClose}
          aria-label="Close profile"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {member.image ? (
          <img src={member.image} alt={member.name} className="tm-modal-pic" />
        ) : (
          <div className="tm-modal-pic tm-initials" aria-hidden="true">
            {getInitials(member.name)}
          </div>
        )}
        <span className="tm-modal-tag">{tag}</span>
        <h3 id="tm-modal-name" className="tm-modal-name">
          {member.name}
        </h3>
        <p className="tm-modal-role">{member.role}</p>
        {member.bio && <p className="tm-modal-bio">{member.bio}</p>}

        {rows.length > 0 ? (
          <ul className="tm-modal-links">
            {rows.map((row) => (
              <li key={row.key}>
                <a
                  href={row.href}
                  className="tm-modal-link"
                  target={row.key === 'email' ? undefined : '_blank'}
                  rel={row.key === 'email' ? undefined : 'noopener noreferrer'}
                >
                  {ICONS[row.key]}
                  <span>{row.label}</span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="tm-modal-empty">Links coming soon.</p>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
const TeamPage = () => {
  useReveal();
  const [genId, setGenId] = useState(
    (GENERATIONS.find((g) => g.current) || GENERATIONS[0]).id,
  );
  const [active, setActive] = useState(null);
  const triggerRef = useRef(null);
  const gen = GENERATIONS.find((g) => g.id === genId) || GENERATIONS[0];

  const open = (member, tag, e) => {
    triggerRef.current = e.currentTarget;
    setActive({ member, tag });
  };

  const close = useCallback(() => {
    setActive(null);
    requestAnimationFrame(() =>
      triggerRef.current?.focus({ preventScroll: true }),
    );
  }, []);

  return (
    <main className="tm-page">
      <div className="tm-wrap">
        {/* HERO */}
        <header className="tm-hero">
          <span className="tm-eyebrow">Meet the team</span>
          <h1>
            The people behind <span className="tm-accent">VoteAble.</span>
          </h1>
          <p>
            Students and professionals building secure, transparent and
            accessible democratic processes through technology. One founding
            team, and a new generation of leaders every year.
          </p>
        </header>

        {/* FOUNDERS */}
        <section className="tm-section" aria-labelledby="tm-founders-title">
          <div className="tm-section-head tm-reveal">
            <span className="tm-kicker">The founding team</span>
            <h2 id="tm-founders-title">Founders &amp; Original Members</h2>
            <p>
              The team who established VoteAble's mission, designed its core
              systems, and continue to guide it while pursuing advanced studies.
            </p>
          </div>

          <div className="tm-founders">
            {FOUNDERS.map((m, i) => (
              <PortraitCard
                key={m.id}
                member={m}
                index={i}
                className="tm-reveal"
                onOpen={(e) => open(m, 'Founding Team', e)}
              />
            ))}
          </div>
        </section>

        {/* LEGACY */}
        <section className="tm-section" aria-labelledby="tm-legacy-title">
          <div className="tm-section-head tm-reveal">
            <span className="tm-kicker">Generation by generation</span>
            <h2 id="tm-legacy-title">The Legacy Teams</h2>
            <p key={gen.id} className="tm-fade">
              {gen.blurb}
            </p>
          </div>

          {GENERATIONS.length > 1 ? (
            <div
              className="tm-years"
              role="group"
              aria-label="Choose an academic year"
            >
              <span className="tm-years-label">Academic year</span>
              <div className="tm-years-list">
                {GENERATIONS.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    className={`tm-year${g.id === genId ? ' is-active' : ''}`}
                    aria-pressed={g.id === genId}
                    onClick={() => setGenId(g.id)}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <h3 className="tm-gen-title">Academic Year {gen.label}</h3>
          )}

          <div className="tm-founders" key={`grid-${gen.id}`}>
            {gen.members.map((m, i) => (
              <PortraitCard
                key={m.id}
                member={m}
                index={i}
                className="tm-pop"
                onOpen={(e) => open(m, `Legacy Team · ${gen.label}`, e)}
              />
            ))}
          </div>
        </section>
      </div>

      {active && <ProfileModal entry={active} onClose={close} />}
    </main>
  );
};

export default TeamPage;
