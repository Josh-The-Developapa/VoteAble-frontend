import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import ContextProvider from './Context/ContextProvider.jsx';
import NotFound from './pages/404-page/NotFound.jsx';
import About from './pages/About/About.jsx';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import MyPolls from './pages/MyPolls/MyPolls.jsx';
import CreatePoll from './pages/Polls/Create-poll/CreatePoll.jsx';
import Results from './pages/Results/Results.jsx';

// import App from './App'
import './index.css';
import Layout from './Layout/Layout.jsx';
import Account from './pages/Account/Account.jsx';

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
    element: <Navigate to="/home" />,
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
  </React.StrictMode>
);
