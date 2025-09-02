import React from 'react';
import './Feed.css';

const posts = [
  {
    id: 1,
    image: 'http://localhost:8000/uploads/poster-1.png',
  },
  {
    id: 2,
    image: 'http://localhost:8000/uploads/poster-2.jpeg',
  },
  {
    id: 3,
    image: 'http://localhost:8000/uploads/poster-3.jpeg',
  },
  {
    id: 4,
    image: 'http://localhost:8000/uploads/poster-4.jpeg',
  },
  //   {
  //     id: 5,
  //     image: 'http://localhost:8000/uploads/poster-1.png',
  //     caption: 'Cast your vote for the best startup idea!',
  //   },
  //   {
  //     id: 6,
  //     image: 'http://localhost:8000/uploads/poster-1.png',
  //     caption: 'Cast your vote for the best startup idea!',
  //   },
  //   {
  //     id: 7,
  //     image: 'http://localhost:8000/uploads/poster-1.png',
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
