/**
 * src/pages/SchoolPicker/SchoolPicker.jsx
 * ---------------------------------------------------------------------------
 * NEW FILE. Shown when the app is loaded on the bare root domain — no
 * subdomain, no resolvable school slug (see getSchoolSlug() in
 * utils/api.js). Instead of every tenant-scoped request 400ing with "No
 * school specified for this request", the user picks their school here
 * and gets redirected to that school's actual subdomain.
 *
 * Talks to GET /v1/schools — the one backend route that intentionally
 * has no resolveTenant/protect guard (see controllers/publicController.js).
 */

import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../utils/api';
import './SchoolPicker.css';

function goToSchool(slug) {
    const { protocol, hostname, port } = window.location;
    const isLocalDev = hostname === 'localhost' || hostname.endsWith('.localhost');

    if (isLocalDev) {
        window.location.href = `${ protocol }//${ slug }.localhost${ port ? ':' + port : '' }/home`;
        return;
    }

    // Strip any existing subdomain to get the bare root domain
    // (voteable.live), then prefix the chosen school's slug onto it.
    const parts = hostname.split('.');
    const rootDomain = parts.length > 2 ? parts.slice(-2).join('.') : hostname;
    window.location.href = `${ protocol }//${ slug }.${ rootDomain }/home`;
}

function SchoolPicker() {
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchSchools() {
            try {
                const res = await apiFetch('/v1/schools');
                const data = await res.json();
                if (!res.ok || !data.success) {
                    throw new Error(data.error || 'Failed to load schools');
                }
                setSchools(data.data);
            } catch (err) {
                setError('Could not load the list of schools. Please try again shortly.');
            } finally {
                setLoading(false);
            }
        }
        fetchSchools();
    }, []);

    return (
        <div className="schoolPickerContainer">
            <div className="schoolPickerHeader">
                <p className="schoolPickerLabel">VoteAble</p>
                <h1 className="schoolPickerTitle">Choose your school</h1>
            </div>

            {loading && <p className="schoolPickerStatus">Loading schools…</p>}
            {error && <p className="schoolPickerStatus error">{error}</p>}

            {!loading && !error && schools.length === 0 && (
                <p className="schoolPickerStatus">No schools are available right now.</p>
            )}

            <div className="schoolGrid">
                {schools.map((school) => (
                    <button
                        key={school.slug}
                        className="schoolCard"
                        style={school.primaryColor ? { borderColor: school.primaryColor } : undefined}
                        onClick={() => goToSchool(school.slug)}
                    >
                        {school.logoUrl && (
                            <img src={school.logoUrl} alt={school.name} className="schoolCardLogo" />
                        )}
                        <span className="schoolCardName">{school.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default SchoolPicker;