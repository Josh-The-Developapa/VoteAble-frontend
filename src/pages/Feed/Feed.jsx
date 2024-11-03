import React from 'react';
import './Feed.css';

const posts = [
  {
    id: 1,
    image: 'https://backend.voteable.live/uploads/poster-1.png',
  },
  {
    id: 2,
    image: 'https://backend.voteable.live/uploads/poster-2.jpeg',
  },
  {
    id: 3,
    image: 'https://backend.voteable.live/uploads/poster-3.jpeg',
  },
  {
    id: 4,
    image: 'https://backend.voteable.live/uploads/poster-4.jpeg',
  },
  //   {
  //     id: 5,
  //     image: 'https://backend.voteable.live/uploads/poster-1.png',
  //     caption: 'Cast your vote for the best startup idea!',
  //   },
  //   {
  //     id: 6,
  //     image: 'https://backend.voteable.live/uploads/poster-1.png',
  //     caption: 'Cast your vote for the best startup idea!',
  //   },
  //   {
  //     id: 7,
  //     image: 'https://backend.voteable.live/uploads/poster-1.png',
  //     caption: 'Cast your vote for the best startup idea!',
  //   },
  // Add more posts as necessary
];

const FeedPage = () => {
  return (
    <div className="feed-container">
      {posts.map((post) => (
        <div key={post.id} className="feed-post">
          <img src={post.image} alt="Post" className="post-image" />
          {/* <div className="post-caption">{post.caption}</div> */}
        </div>
      ))}
    </div>
  );
};

export default FeedPage;
