"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const InstagramGallery = ({ token, limit = 12 }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${token}&limit=${limit}`
        );
        setPosts(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Instagram posts:", error);
        setError("Failed to load Instagram posts. Please try again later.");
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token, limit]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {posts.map((post) => (
        <div key={post.id} className="relative overflow-hidden pb-100%">
          <a href={post.permalink} target="_blank" rel="noopener noreferrer">
            <img
              src={
                post.media_type === "VIDEO"
                  ? post.thumbnail_url
                  : post.media_url
              }
              alt={post.caption}
              className="absolute h-full w-full object-cover"
            />
          </a>
        </div>
      ))}
    </div>
  );
};

export default InstagramGallery;
