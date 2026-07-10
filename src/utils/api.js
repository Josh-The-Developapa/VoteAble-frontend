/**
 * src/utils/api.js  (frontend)
 * ---------------------------------------------------------------------------
 * NEW FILE. Centralizes how the React app talks to the backend so tenant
 * resolution and cookie handling are consistent everywhere, instead of
 * each component (Login.jsx, Poll.jsx, MyPolls.jsx, CreatePoll.jsx, ...)
 * calling `fetch` slightly differently.
 *
 * TWO IMPORTANT FIXES BAKED IN HERE:
 *
 * 1. `credentials: "include"` is now set on every request. The original
 *    components called `fetch(url, { method, headers, body })` with NO
 *    `credentials` option. By default, fetch does NOT send or store
 *    cookies for cross-origin requests — since the React app
 *    (voteable.live) and the API (api.voteable.live, or a different
 *    Render/Heroku host) are different origins, the `jwt` cookie set by
 *    `sendTokenResponse` in the backend was likely never actually being
 *    persisted/sent by the browser in production. This file fixes that
 *    in one place.
 *
 * 2. Every request now carries the resolved school slug as an
 *    `X-School-Slug` header, which `middleware/tenant.js` reads as a
 *    fallback when there's no meaningful subdomain (e.g. local dev on
 *    localhost, or a deployment that doesn't use subdomains). In
 *    production, where the app IS served from
 *    `<schoolSlug>.voteable.live`, the backend will resolve the tenant
 *    from the subdomain instead and this header is redundant but
 *    harmless.
 *
 * USAGE (replaces raw `fetch` calls throughout the app):
 *   import { apiFetch } from '../../utils/api';
 *   const res = await apiFetch('/v1/login', { method: 'POST', body: {...} });
 *   const data = await res.json();
 */

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * Resolve the current tenant's slug on the frontend. In production this
 * comes from the subdomain the app itself is being served on
 * (agakhan.voteable.live -> "agakhan"). In local dev there is no
 * meaningful subdomain, so it falls back to a Vite env var so different
 * developers/testers can point their local app at different seeded
 * schools.
 */
export function getSchoolSlug() {
    const host = window.location.hostname;
    const parts = host.split(".");
    const looksLikeSubdomain = parts.length > 2 || (parts.length === 2 && parts[1] !== "localhost");

    if (looksLikeSubdomain) return parts[0];

    const fallback = import.meta.env.VITE_SCHOOL_SLUG || "";
    if (!fallback) {
        // This is almost always a local-dev misconfiguration, not a real
        // production scenario (production is expected to resolve the
        // tenant from the subdomain instead). Surface it loudly so it
        // doesn't look like a mysterious 400 from the backend.
        console.warn(
            "[VoteAble] No school slug could be resolved for this request. " +
            "On localhost, set VITE_SCHOOL_SLUG in your frontend .env (e.g. VITE_SCHOOL_SLUG=akesu) " +
            "and restart the dev server — Vite only reads env vars at startup."
        );
    }
    return fallback;
}

export async function apiFetch(path, { method = "GET", body, headers = {} } = {}) {
    return fetch(`${BACKEND_URL}${path}`, {
        method,
        credentials: "include", // send/receive the httpOnly jwt cookie
        headers: {
            "Content-Type": body instanceof FormData ? undefined : "application/json",
            "X-School-Slug": getSchoolSlug(),
            ...headers,
        },
        body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
    });
}
