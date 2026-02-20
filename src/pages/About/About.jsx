import React, { useEffect } from 'react';
import './About.css';
import Header from '../../components/Header/Header.jsx';
import Logo from '../../assets/Logo.svg';
import TeamPic from '../../assets/team-pic.png';
import LaptopPic from '../../assets/Laptop.png';
import EmmanuelImage from '../../assets/Emmanuel Asiimwe.jpeg';
import JoshuaImage from '../../assets/Joshua.png';
import AlbertImage from '../../assets/Albert Jordan Mulumba.jpeg';
import KhushImage from '../../assets/Khush Shah.jpg';
import AkhilImage from '../../assets/Akhil Muni.jpeg';

function AboutVoteable() {
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
            <div className="team-members">
              <div className="team-member anim-fade-up anim-delay-2">
                <img
                  src={JoshuaImage}
                  alt="Joshua's Pic"
                  className="member-pic"
                />
                <p>Joshua Mukisa</p>
                <p className="role">Founder & CEO</p>
              </div>
              <div className="team-member anim-fade-up anim-delay-3">
                <img
                  src={KhushImage}
                  alt="Khush's Pic"
                  className="member-pic"
                />
                <p>Khush P. Shah</p>
                <p className="role" style={{ fontSize: '15px' }}>
                  Co-Founder & COO
                </p>
              </div>
              <div className="team-member anim-fade-up anim-delay-4">
                <img
                  src={AkhilImage}
                  alt="Akhil's Pic"
                  className="member-pic"
                />
                <p>Akhil Muni</p>
                <p className="role" style={{ fontSize: '15px' }}>
                  CFO
                </p>
              </div>
              <div className="team-member anim-fade-up anim-delay-5">
                <img
                  src={AlbertImage}
                  alt="Albert's Pic"
                  className="member-pic"
                />
                <p>Albert J. Mulumba</p>
                <p className="role">Head of Design</p>
              </div>
              <div className="team-member anim-fade-up anim-delay-6">
                <img
                  src={EmmanuelImage}
                  alt="Emmanuel's Pic"
                  className="member-pic"
                />
                <p style={{ fontSize: '15px' }}>Emmanuel Asiimwe</p>
                <p className="role">Chief Technology Officer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutVoteable;
