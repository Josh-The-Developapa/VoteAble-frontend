import React from 'react';

const TeamPage = () => {
  return (
    <div>
      <style>
        {`
          .team-container {
            width: 100vw;
            margin: 0 auto;
            padding: 0 24px;
          }

          .team-header {
            text-align: center;
            margin-bottom: 64px;
            padding: 40px 0;
            background: #ffffff;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
          }

          .team-header h1 {
            font-size: 40px;
            font-weight: 700;
            margin-bottom: 16px;
            color: #1a202c;
          }

          .team-header p {
            font-size: 18px;
            color: #64748b;
            max-width: 600px;
            margin: 0 auto;
          }

          .team-block {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 48px 40px;
            margin-bottom: 32px;
          }

          .team-section-header {
            text-align: center;
            margin-bottom: 48px;
          }

          .team-section-title {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 12px;
            color: #1a202c;
          }

          .team-section-subtitle {
            font-size: 16px;
            color: #64748b;
            max-width: 700px;
            margin: 0 auto;
            line-height: 1.6;
          }

          .team-legacy-year {
            display: inline-block;
            background: #f1f5f9;
            color: #475569;
            padding: 8px 16px;
            border-radius: 4px;
            font-weight: 600;
            margin-bottom: 16px;
            font-size: 14px;
            border: 1px solid #e2e8f0;
          }

          .team-members-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 32px;
          }

          .team-card {
            text-align: center;
            padding: 32px 24px;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
          }

          .team-card-image {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            margin: 0 auto 32px;
            background: #f1f5f9;
            border: 3px solid #e2e8f0;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #64748b;
            font-size: 28px;
            font-weight: 700;
          }

          .team-card-name {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 8px;
            color: #1a202c;
          }

          .team-card-position {
            color: #4c1d95;
            font-weight: 500;
            font-size: 14px;
            margin-bottom: 16px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .team-card-description {
            color: #64748b;
            font-size: 14px;
            line-height: 1.6;
          }

          .team-founders-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 24px;
          }

          .team-founders-grid .team-card {
            border-left: 4px solid #4c1d95;
          }

          .team-legacy-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 24px;
          }

          @media (max-width: 768px) {
            .team-container {
              padding: 0 16px;
            }

            .team-header {
              padding: 24px 20px;
              margin-bottom: 40px;
            }

            .team-header h1 {
              font-size: 32px;
            }

            .team-header p {
              font-size: 16px;
            }

            .team-block {
              padding: 32px 20px;
            }

            .team-section-title {
              font-size: 28px;
            }

            .team-members-grid,
            .team-founders-grid,
            .team-legacy-grid {
              grid-template-columns: 1fr;
              gap: 20px;
            }
          }
        `}
      </style>

      <main style={{ padding: '48px 0' }}>
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
              <div className="team-card">
                <div className="team-card-image">JD</div>
                <h3 className="team-card-name">John Doe</h3>
                <p className="team-card-position">Co-Founder & CEO</p>
                <p className="team-card-description">
                  Led the conceptualization and development of VoteAble's secure
                  voting infrastructure. Currently pursuing Computer Science at
                  Stanford University while maintaining strategic oversight of
                  platform development.
                </p>
              </div>

              <div className="team-card">
                <div className="team-card-image">JS</div>
                <h3 className="team-card-name">Jane Smith</h3>
                <p className="team-card-position">Co-Founder & CTO</p>
                <p className="team-card-description">
                  Architected the technical foundation and security protocols
                  that power our platform. Studying Software Engineering at MIT
                  while continuing to guide technical development and security
                  standards.
                </p>
              </div>

              <div className="team-card">
                <div className="team-card-image">MJ</div>
                <h3 className="team-card-name">Michael Johnson</h3>
                <p className="team-card-position">Lead Developer</p>
                <p className="team-card-description">
                  Developed core platform functionality and established
                  development best practices. Now at UC Berkeley pursuing
                  Cybersecurity while providing technical mentorship to current
                  teams.
                </p>
              </div>

              <div className="team-card">
                <div className="team-card-image">SW</div>
                <h3 className="team-card-name">Sarah Wilson</h3>
                <p className="team-card-position">Head of Operations</p>
                <p className="team-card-description">
                  Established operational procedures, compliance frameworks, and
                  user experience standards. Studying Business Administration at
                  Harvard while overseeing operational excellence initiatives.
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
                Current International Baccalaureate Diploma Programme students
                who manage daily operations, election administration, and
                platform maintenance under the direct supervision and guidance
                of the founding team.
              </p>
            </div>

            <div className="team-legacy-grid">
              <div className="team-card">
                <div className="team-card-image">AR</div>
                <h3 className="team-card-name">Alex Rodriguez</h3>
                <p className="team-card-position">Legacy Team Lead</p>
                <p className="team-card-description">
                  Coordinates all Legacy Team operations and serves as primary
                  liaison with founders. IB Year 2 student responsible for
                  ensuring seamless election administration and team
                  coordination.
                </p>
              </div>

              <div className="team-card">
                <div className="team-card-image">EP</div>
                <h3 className="team-card-name">Emily Parker</h3>
                <p className="team-card-position">Technical Manager</p>
                <p className="team-card-description">
                  Oversees platform maintenance, feature implementation, and
                  technical documentation. IB Year 2 student with extensive
                  programming experience in election technology systems.
                </p>
              </div>

              <div className="team-card">
                <div className="team-card-image">DL</div>
                <h3 className="team-card-name">David Lee</h3>
                <p className="team-card-position">Security Coordinator</p>
                <p className="team-card-description">
                  Maintains security protocols, monitors system integrity, and
                  ensures compliance with election security standards. IB Year 1
                  student specializing in cybersecurity applications.
                </p>
              </div>

              <div className="team-card">
                <div className="team-card-image">LT</div>
                <h3 className="team-card-name">Lisa Thompson</h3>
                <p className="team-card-position">User Experience Lead</p>
                <p className="team-card-description">
                  Focuses on accessibility compliance, user interface
                  optimization, and voter experience enhancement. IB Year 2
                  student with expertise in human-computer interaction design.
                </p>
              </div>

              <div className="team-card">
                <div className="team-card-image">RC</div>
                <h3 className="team-card-name">Ryan Chen</h3>
                <p className="team-card-position">Partnership Coordinator</p>
                <p className="team-card-description">
                  Manages institutional partnerships, stakeholder
                  communications, and voter education initiatives. IB Year 1
                  student with strong communication and project management
                  skills.
                </p>
              </div>

              <div className="team-card">
                <div className="team-card-image">MG</div>
                <h3 className="team-card-name">Maya Gupta</h3>
                <p className="team-card-position">Data & Analytics Lead</p>
                <p className="team-card-description">
                  Conducts election data analysis, generates administrative
                  reports, and maintains statistical records for transparency
                  and auditing purposes. IB Year 2 student with advanced
                  mathematics background.
                </p>
              </div>
            </div>
          </section>

          {/* Legacy Team 2024 - 2025 */}
          <section className="team-block">
            <div className="team-section-header">
              <h2 className="team-section-title">Legacy Team</h2>
              <div className="team-legacy-year">Academic Year 2024 - 2025</div>
              <p className="team-section-subtitle">
                Previous academic year's team members who established Legacy
                Team operational procedures and successfully managed multiple
                election cycles before graduation.
              </p>
            </div>

            <div className="team-legacy-grid">
              <div className="team-card">
                <div className="team-card-image">KB</div>
                <h3 className="team-card-name">Kevin Brown</h3>
                <p className="team-card-position">Former Team Lead</p>
                <p className="team-card-description">
                  Established Legacy Team operational framework and successfully
                  led multiple election cycles. Graduated with IB Diploma and
                  now pursuing higher education in Political Science.
                </p>
              </div>

              <div className="team-card">
                <div className="team-card-image">AN</div>
                <h3 className="team-card-name">Anna Nelson</h3>
                <p className="team-card-position">Former Technical Manager</p>
                <p className="team-card-description">
                  Developed comprehensive training documentation and technical
                  procedures for Legacy Team succession. Graduated with
                  distinction in Computer Science IB and now studying Software
                  Engineering.
                </p>
              </div>

              <div className="team-card">
                <div className="team-card-image">JK</div>
                <h3 className="team-card-name">Jake Kim</h3>
                <p className="team-card-position">
                  Former Security Coordinator
                </p>
                <p className="team-card-description">
                  Implemented robust security protocols and incident response
                  procedures that continue to protect the platform. Now pursuing
                  Cybersecurity studies at university level.
                </p>
              </div>

              <div className="team-card">
                <div className="team-card-image">SO</div>
                <h3 className="team-card-name">Sophie O'Connor</h3>
                <p className="team-card-position">Former UX Lead</p>
                <p className="team-card-description">
                  Enhanced platform accessibility and user interface design to
                  meet international accessibility standards. Graduated with
                  High Achievement in Visual Arts IB and now studying UX Design.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default TeamPage;
