import { useState, useEffect } from "react";
import API from "./api";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/posts");

      setPosts(response.data);
    } catch (err) {
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async () => {
    if (!title.trim() || !body.trim()) {
      setError("Please fill all fields");
      return;
    }

    try {
      setError("");

      await API.post("/posts", {
        title,
        body,
      });

      setTitle("");
      setBody("");

      fetchPosts();
    } catch (err) {
      setError("Failed to create post");
    }
  };

  const deletePost = async (id) => {
    try {
      setError("");

      await API.delete(`/posts/${id}`);

      fetchPosts();
    } catch (err) {
      setError("Failed to delete post");
    }
  };

  return (
    <div className="container">
      <h1>Post Management App</h1>

      {error && <p className="error">{error}</p>}

      <div className="form">
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Enter body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <button onClick={createPost}>
          Create Post
        </button>
      </div>

      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <div className="posts">
          {posts.length === 0 ? (
            <p>No posts available.</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="card">
                <h3>{post.title}</h3>

                <p>{post.body}</p>

                <button
                  className="delete-btn"
                  onClick={() => deletePost(post.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default App;