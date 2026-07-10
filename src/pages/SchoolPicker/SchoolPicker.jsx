import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setSchoolSlug } from '../../utils/api';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function SchoolPicker() {
  const [schools, setSchools] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BACKEND_URL}/v1/schools`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setSchools(data.data || []);
        else setError('Could not load schools.');
      })
      .catch(() => setError('Could not load schools.'))
      .finally(() => setLoading(false));
  }, []);

  const choose = (slug) => {
    setSchoolSlug(slug);
    navigate('/home');
  };

  const filtered = schools.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h2 className="heading">Find your school</h2>
        <input
          className="joinInput"
          placeholder="Search schools..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {loading && <p>Loading schools...</p>}
        {error && <p className="namep">{error}</p>}
        {!loading && !error && filtered.length === 0 && (
          <p>No schools match "{query}".</p>
        )}
        {filtered.map((s) => (
          <button
            key={s.slug}
            className="button mt-20"
            onClick={() => choose(s.slug)}
          >
            {s.name}
          </button>
        ))}
      </div>
    </div>
  );
}
