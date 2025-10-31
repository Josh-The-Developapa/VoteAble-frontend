import React from 'react';
import './Team.css';
import JoshuaImage from '../../assets/Joshua.png';
import KhushImage from '../../assets/Khush Shah.jpg';
import AlbertImage from '../../assets/Albert Jordan Mulumba.jpeg';
import EmmanuelImage from '../../assets/Emmanuel Asiimwe.jpeg';
import AkhilImage from '../../assets/Akhil Muni.jpeg';
import SahithiImage from '../../assets/Sahithi Beecha.jpeg';
import JethroImage from '../../assets/Jethro Igulle.jpeg';
import HettImage from '../../assets/Hett.jpeg';
import FrancisImage from '../../assets/Francis Kigozi.jpeg';
import MalcolmImage from '../../assets/Malcolm.jpeg';

const TeamPage = () => {
  return (
    <div>
      <main style={{ background: '#f8fafc' }}>
        <div className="team-container">
          <div className="team-header">
            <h1>Our Team</h1>
            <p>
              Meet the dedicated professionals and students who ensure secure,
              transparent, and accessible democratic processes through
              innovative technology.
            </p>
          </div>

          {/* Founders Section */}
          <section className="team-block">
            <div className="team-section-header">
              <h2 className="team-section-title">
                Founders & Original Members
              </h2>
              <p className="team-section-subtitle">
                The founding team who established VoteAble's mission to provide
                secure, accessible voting technology. These visionaries designed
                our core systems and continue to provide strategic oversight
                while pursuing advanced studies.
              </p>
            </div>

            <div className="team-founders-grid">
              {/* Joshua Mukisa */}
              <div className="team-card">
                <img
                  className="team-card-image"
                  src={JoshuaImage}
                  alt="Joshua Mukisa"
                />
                <h3 className="team-card-name">Joshua Mukisa</h3>
                <p className="team-card-position">Founder & CEO</p>
                <p className="team-card-description">
                  Visionary founder who turned an idea into a fully-fledged
                  platform, setting the foundation for VoteAble's mission and
                  growth.
                </p>
              </div>

              {/* Khush Pratik Shah */}
              <div className="team-card">
                <img
                  className="team-card-image"
                  src={KhushImage}
                  alt="Khush Pratik Shah"
                />
                <h3 className="team-card-name">Khush Pratik Shah</h3>
                <p className="team-card-position">Co-Founder & COO</p>
                <p className="team-card-description">
                  Brought structure and operational excellence, leading the
                  platform's UI revamp and driving smooth election management.
                </p>
              </div>

              {/* Akhil Muni*/}
              <div className="team-card">
                <img
                  className="team-card-image"
                  src={AkhilImage}
                  alt="Akhil Muni"
                />
                <h3 className="team-card-name">Akhil Muni</h3>
                <p className="team-card-position">Co-Founder & CFO</p>
                <p className="team-card-description">
                  Early supporter and financial backbone, funding development
                  and expansion initiatives from the company's very start.
                </p>
              </div>

              {/* Albert Jordan Mulumba */}
              <div className="team-card">
                <img
                  className="team-card-image"
                  src={AlbertImage}
                  alt="Albert Jordan Mulumba"
                />
                <h3 className="team-card-name">Albert Jordan Mulumba</h3>
                <p className="team-card-position">Head of Design</p>
                <p className="team-card-description">
                  The creative mind behind VoteAble's sleek interface,
                  redefining the app's entire design system and visual identity.
                </p>
              </div>

              {/* Emmanuel Asiimwe */}
              <div className="team-card">
                <img
                  className="team-card-image"
                  src={EmmanuelImage}
                  alt="Emmanuel Asiimwe"
                />
                <h3 className="team-card-name">Emmanuel Asiimwe</h3>
                <p className="team-card-position">Chief Technology Officer</p>
                <p className="team-card-description">
                  Core developer and tech lead who brought Albert's designs to
                  life, ensuring platform stability, scalability, and
                  performance
                </p>
              </div>
            </div>
          </section>

          {/* Legacy Team 2025 - 2026 */}
          <section className="team-block">
            <div className="team-section-header">
              <h2 className="team-section-title">Legacy Team</h2>
              <div className="team-legacy-year">Academic Year 2025 - 2026</div>
              <p className="team-section-subtitle">
                {/* Previous academic year's team members who established Legacy
                Team operational procedures and successfully managed multiple
                election cycles before graduation. */}
                Current International Baccalaureate Diploma Programme students
                who manage daily operations, election administration, and
                platform maintenance for the 2025-2026 academic year under the
                direct supervision and guidance of the founding team.
              </p>
            </div>

            <div className="team-legacy-grid">
              <div className="team-card">
                <img className="team-card-image" src={SahithiImage} />
                <h3 className="team-card-name">Sahithi Beecha</h3>
                <p className="team-card-position">
                  Chief Executive Officer (CEO)
                </p>
                <p className="team-card-description">
                  Leads the Legacy Team with vision and authority, ensuring
                  every election runs seamlessly while carrying forward the
                  founder's mission.
                </p>
              </div>

              <div className="team-card">
                <img className="team-card-image" src={JethroImage} />
                <h3 className="team-card-name">Jethro Igulle</h3>
                <p className="team-card-position">
                  Co Chief Operations Officer (COO)
                </p>
                <p className="team-card-description">
                  Coordinates platform operations with precision, working
                  closely with leadership to keep election logistics running
                  smoothly.
                </p>
              </div>

              <div className="team-card">
                <img className="team-card-image" src={HettImage} />
                <h3 className="team-card-name">Hett Vaya</h3>
                <p className="team-card-position">
                  Co Chief Operations Officer (COO)
                </p>
                <p className="team-card-description">
                  Shares responsibility for daily operations, bringing structure
                  and consistency to the electoral process alongside Jethro.
                </p>
              </div>

              <div className="team-card">
                <div className="team-card-image">JR</div>
                <h3 className="team-card-name">Jerome Owachi</h3>
                <p className="team-card-position">
                  Chief Technology Officer (CTO)
                </p>
                <p className="team-card-description">
                  Key player in poll creation and backend coordination, bridging
                  communication between the tech and operations teams.
                </p>
              </div>

              <div className="team-card">
                <img className="team-card-image" src={FrancisImage} />
                <h3 className="team-card-name">Francis Kigozi</h3>
                <p className="team-card-position">
                  Director of Electoral Communications
                </p>
                <p className="team-card-description">
                  Manages all election-related communications, coordinating
                  announcements, voter outreach, and ensuring transparent
                  information flow throughout election cycles.
                </p>
              </div>

              <div className="team-card">
                <div className="team-card-image">ZS</div>
                <h3 className="team-card-name">Zia Sania</h3>
                <p className="team-card-position">
                  Head of Data Analytics & Processing
                </p>
                <p className="team-card-description">
                  Oversees voter data collection, preprocessing, and analysis,
                  ensuring data integrity and generating insights for election
                  reporting and platform improvements.
                </p>
              </div>

              <div className="team-card">
                <img className="team-card-image" src={MalcolmImage} />
                <h3 className="team-card-name">Malcolm</h3>
                <p className="team-card-position">
                  Election Security Coordinator
                </p>
                <p className="team-card-description">
                  Monitors platform security protocols, manages voter
                  verification processes, and ensures compliance with electoral
                  integrity standards throughout each voting period.
                </p>
              </div>

              <div className="team-card">
                <div className="team-card-image">AB</div>
                <h3 className="team-card-name">Abraham</h3>
                <p className="team-card-position">Data Operations Specialist</p>
                <p className="team-card-description">
                  Handles voter registration data collection and preprocessing,
                  maintaining accurate voter rolls and supporting the data
                  analytics pipeline for election administration.
                </p>
              </div>

              <div className="team-card">
                <div className="team-card-image">AR</div>
                <h3 className="team-card-name">Aretha</h3>
                <p className="team-card-position">Voter Experience Manager</p>
                <p className="team-card-description">
                  Enhances the voting experience by gathering user feedback,
                  troubleshooting voter issues, and implementing improvements to
                  platform accessibility and usability.
                </p>
              </div>

              <div className="team-card">
                <div className="team-card-image">KW</div>
                <h3 className="team-card-name">Kwagala</h3>
                <p className="team-card-position">
                  Electoral Compliance Officer
                </p>
                <p className="team-card-description">
                  Ensures all elections adhere to school policies and democratic
                  principles, maintaining procedural standards and documenting
                  election processes for institutional records.
                </p>
              </div>

              <div className="team-card">
                <div className="team-card-image">RA</div>
                <h3 className="team-card-name">Raiaan Lalani</h3>
                <p className="team-card-position">
                  Platform Support Coordinator
                </p>
                <p className="team-card-description">
                  Provides technical support to voters and candidates, manages
                  help desk operations, and coordinates with the tech team to
                  resolve platform issues during election windows.
                </p>
              </div>
            </div>
          </section>

          {/* Legacy Team 2026 - 2027 */}
          {/* <section className="team-block">
            <div className="team-section-header">
              <h2 className="team-section-title">Legacy Team</h2>
              <div className="team-legacy-year">Academic Year 2026 - 2027</div>
              <p className="team-section-subtitle">
                Current International Baccalaureate Diploma Programme students
                who will manage daily operations, election administration, and
                platform maintenance for the 2026-2027 academic year under the
                direct supervision and guidance of the founding team.
              </p>
            </div>

            <div className="team-legacy-grid">
              <div className="team-card">
                <div className="team-card-image">AM</div>
                <h3 className="team-card-name">Akarunga Marie</h3>
                <p className="team-card-position"></p>
                <p className="team-card-description"></p>
              </div>

              <div className="team-card">
                <div className="team-card-image">AP</div>
                <h3 className="team-card-name">Alvin Preston</h3>
                <p className="team-card-position"></p>
                <p className="team-card-description"></p>
              </div>

              <div className="team-card">
                <div className="team-card-image">JA</div>
                <h3 className="team-card-name">Janice</h3>
                <p className="team-card-position"></p>
                <p className="team-card-description"></p>
              </div>

              <div className="team-card">
                <div className="team-card-image">JY</div>
                <h3 className="team-card-name">Jay</h3>
                <p className="team-card-position"></p>
                <p className="team-card-description"></p>
              </div>

              <div className="team-card">
                <div className="team-card-image">PH</div>
                <h3 className="team-card-name">Phill</h3>
                <p className="team-card-position"></p>
                <p className="team-card-description"></p>
              </div>

              <div className="team-card">
                <div className="team-card-image">FZ</div>
                <h3 className="team-card-name">Faiza</h3>
                <p className="team-card-position"></p>
                <p className="team-card-description"></p>
              </div>
            </div>
          </section> */}
        </div>
      </main>
    </div>
  );
};

export default TeamPage;
