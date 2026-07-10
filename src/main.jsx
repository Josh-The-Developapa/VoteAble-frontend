import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import Login from './pages/Login/Login.jsx';
import MyPolls from './pages/MyPolls/MyPolls.jsx';
import ContextProvider from './Context/ContextProvider.jsx';
import CreatePoll from './pages/Polls/Create-poll/CreatePoll.jsx';
import Results from './pages/Results/Results.jsx';
import NotFound from './pages/404-page/NotFound.jsx';
import Home from './pages/Home/Home.jsx';
import About from './pages/About/About.jsx';
import SchoolPicker from './pages/SchoolPicker/SchoolPicker.jsx';
import { getSchoolSlug } from './utils/api';

// import App from './App'
import './index.css';
import Account from './pages/Account/Account.jsx';
import Layout from './Layout/Layout.jsx';
import FeedPage from './pages/Feed/Feed.jsx';
import TeamPage from './pages/Team/Team.jsx';

// Root path behavior depends on whether a school slug could be resolved
// (see getSchoolSlug() in utils/api.js — subdomain, or VITE_SCHOOL_SLUG
// fallback in local dev). On a real tenant subdomain (or local dev with
// VITE_SCHOOL_SLUG set), behave exactly as before: straight to /home.
// On the bare root domain with no slug at all (e.g. voteable.live
// itself), show the school picker instead of letting every tenant-scoped
// request downstream 400 with "No school specified for this request".
function RootRoute() {
  const slug = getSchoolSlug();
  if (slug) return <Navigate to="/home" />;
  return <Layout page={<SchoolPicker />} />;
}

const router = createBrowserRouter([
  {
    path: '/home',
    element: <Layout page={<Home />} />,
  },
  {
    path: '/*',
    element: <Layout page={<NotFound />} />,
  },
  {
    path: '/',
    element: <RootRoute />,
  },
  {
    path: '/login',
    element: <Layout page={<Login />} />,
  },
  // {
  //   path: '/voted-users/:pollId',
  //   element: <VotedUsers />,
  // },
  {
    path: '/results/:pollId',
    element: <Layout page={<Results />} />,
  },
  {
    path: '/team',
    element: <Layout page={<TeamPage />} />,
  },
  {
    path: '/create-poll',
    element: <Layout page={<CreatePoll />} />,
  },

  // {
  //   path: '/feed',
  //   element: <Layout page={<FeedPage />} />,
  // },
  // {
  //   path: '/poll/:pollId',
  //   element: <Poll />,
  // },
  {
    path: '/polls',
    element: <Layout page={<MyPolls />} />,
  },
  // {
  //   path: '/subscribe',
  //   element: <Subscription />,
  // },
  // {
  //   path: '/create-poll-chain',
  //   element: <CreatePollChain />,
  // },
  // {
  //   path: '/my-poll-chains',
  //   element: <PollChains />,
  // },
  // {
  //   path: '/poll-chain/:id',
  //   element: <PollChain />,
  // },
  // {
  //   path: '/privacy-policy',
  //   element: <PrivacyPolicy />,
  // },
  {
    path: '/account',
    element: <Layout page={<Account />} />,
  },
  {
    path: '/about',
    element: <Layout page={<About />} />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
      {/* <Footer /> */}
    </ContextProvider>
  </React.StrictMode>,
);
