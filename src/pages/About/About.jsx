import React, { useEffect, useRef, useState, useCallback } from 'react';
import './About.css';
import Header from '../../components/Header/Header.jsx';
import Logo from '../../assets/Logo.svg';
import TeamPic from '../../assets/team-pic.png';
import LaptopPic from '../../assets/Laptop.png';
import EmmanuelImage from '../../assets/Emmanuel.jpg';
import JoshuaImage from '../../assets/Joshua.png';
import AlbertImage from '../../assets/Albert.png';
import KhushImage from '../../assets/Khush Shah.jpeg';
import AkhilImage from '../../assets/Akhil Muni.jpeg';

/* ============================================================
   TEAM DATA
   Edit this block only. Any link left as '' is hidden automatically,
   so nothing broken ever ships. Instagram takes the handle WITHOUT
   the @. LinkedIn and website take full URLs. Email is a plain address.
   ============================================================ */
const TEAM = [
  {
    id: 'joshua',
    name: 'Joshua Mukisa',
    role: 'Founder & CEO',
    image: JoshuaImage,
    bio: '', // TODO: one or two lines
    links: {
      website: 'https://joshuamukisa.com',
      instagram: 'jmuks_k',
      linkedin: 'https://www.linkedin.com/in/joshua-mukisa/',
      email: '',
    },
  },
  {
    id: 'khush',
    name: 'Khush P. Shah',
    role: 'Co-Founder & COO',
    image: KhushImage,
    bio: '',
    links: {
      website: '',
      instagram: 'khush_p_shah',
      linkedin: '',
      email: '',
    }, // TODO: instagram handle
  },
  {
    id: 'akhil',
    name: 'Akhil Muni',
    role: 'CFO',
    image: AkhilImage,
    bio: '',
    links: { website: '', instagram: 'akhil_did.it', linkedin: '', email: '' }, // TODO: instagram handle
  },
  {
    id: 'albert',
    name: 'Jordan Mulumba',
    role: 'Head of Design',
    image: AlbertImage,
    bio: '',
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
    bio: '',
    links: {
      website: '',
      instagram: 'asiimwemmanuel_101',
      linkedin: 'https://www.linkedin.com/in/asiimwemmanuel/',
      email: '',
    }, // TODO: instagram handle
  },
];

/* ============================================================
   ICONS (inline so there are no new dependencies)
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

/* Turns the raw data into display-ready rows, skipping empty ones */
function buildLinks(links) {
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

/* ============================================================
   PROFILE MODAL
   ============================================================ */
function ProfileModal({ member, onClose }) {
  const cardRef = useRef(null);
  const rows = buildLinks(member.links);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus the dialog itself (not the close button) so no focus ring
    // flashes on open. Keyboard users can still Tab straight into it.
    cardRef.current?.focus({ preventScroll: true });

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !cardRef.current) return;
      const focusable = cardRef.current.querySelectorAll(
        'a[href], button:not([disabled])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
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
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="profile-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="profile-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-name"
        tabIndex={-1}
        ref={cardRef}
      >
        <button
          type="button"
          className="profile-close"
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

        <img src={member.image} alt={member.name} className="profile-pic" />
        <h3 id="profile-name" className="profile-name">
          {member.name}
        </h3>
        <p className="profile-role">{member.role}</p>
        {member.bio && <p className="profile-bio">{member.bio}</p>}

        {rows.length > 0 ? (
          <ul className="profile-links">
            {rows.map((row) => (
              <li key={row.key}>
                <a
                  href={row.href}
                  className="profile-link"
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
          <p className="profile-empty">Links coming soon.</p>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
function AboutVoteable() {
  const [activeId, setActiveId] = useState(null);
  const triggerRef = useRef(null);
  const activeMember = TEAM.find((m) => m.id === activeId) || null;

  useEffect(() => {
    const elements = document.querySelectorAll('.anim-fade-up, .anim-fade-in');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const openProfile = (id, e) => {
    triggerRef.current = e.currentTarget;
    setActiveId(id);
  };

  const closeProfile = useCallback(() => {
    setActiveId(null);
    // return focus to the member that opened the profile
    requestAnimationFrame(() =>
      triggerRef.current?.focus({ preventScroll: true }),
    );
  }, []);

  return (
    <div>
      {/* <Header /> */}
      <div className="about-container">
        {/* LEFT SECTION */}
        <div className="about-left">
          <img
            src={Logo}
            alt="VoteAble Logo"
            className="logo2 anim-fade-up anim-delay-1"
          />
          <h1 className="anim-fade-up anim-delay-2">
            Voting <br />
            Made <br />
            <span className="highlight" style={{ fontFamily: 'Sora' }}>
              Simple.
            </span>
          </h1>
          <p className="about-description anim-fade-up anim-delay-3">
            Streamlining the electoral process with digital innovation, we offer
            intuitive and modern solutions to challenges encountered during
            elections.
          </p>
        </div>

        {/* MIDDLE SECTION */}
        <div className="about-middle">
          <div className="middle-top">
            <h2
              className="anim-fade-up anim-delay-2"
              style={{
                fontFamily: 'Sora',
                marginBottom: 0,
              }}
            >
              Why
              <span className="highlight" style={{ fontFamily: 'Sora' }}>
                {' '}
                VoteAble
              </span>
              ?
            </h2>
            <p className="about-story anim-fade-up anim-delay-3">
              Our school had a lot of problems with the old voting system.
              Elections were often redone, votes recast, and results took weeks
              to come in. VoteAble was created to fix these issues, but we
              quickly realized it could do so much more. What started as an
              initiative to simplify the electoral process at Aga Khan is now
              expanding to other international schools in Uganda, providing a
              reliable, fast, and efficient e-voting solution for school
              elections.
            </p>
          </div>
          <img
            src={LaptopPic}
            alt="Laptop"
            className="laptop-pic anim-fade-up anim-delay-4"
          />
        </div>

        {/* RIGHT SECTION */}
        <div className="about-right">
          <img
            src={TeamPic}
            alt="Our Team"
            className="group-pic anim-fade-in anim-delay-1"
          />
          <div className="team-intro">
            <h2
              className="anim-fade-up anim-delay-2"
              style={{ textAlign: 'center' }}
            >
              Our Team
            </h2>
            <p className="team-hint anim-fade-up anim-delay-2">
              Tap a founder to learn more and get in touch
            </p>
            <div className="team-members">
              {TEAM.map((member, i) => (
                <button
                  key={member.id}
                  type="button"
                  className={`team-member anim-fade-up anim-delay-${Math.min(i + 2, 6)}`}
                  onClick={(e) => openProfile(member.id, e)}
                  aria-haspopup="dialog"
                  aria-label={`${member.name}, ${member.role}. View profile`}
                >
                  <img src={member.image} alt="" className="member-pic" />
                  <p>{member.name}</p>
                  <p className="role">{member.role}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {activeMember && (
        <ProfileModal member={activeMember} onClose={closeProfile} />
      )}
    </div>
  );
}

export default AboutVoteable;
