import { useState } from "react";
import { send, user, bot, loadingIcon } from "./assets/index";

function App() {
  const [prompt, setPrompt] = useState("");
  const [posts, setPosts] = useState([]);

  const onSubmit = () => {
    if (prompt.trim() === "") return;
    updatePosts(prompt);
    setPrompt("");
  };

  const updatePosts = (post) => {
    setPosts([...posts, { type: "user", post }]);
  };

  const onKeyUp = (e) => {
    if (e.key === "Enter" || e.which === 13) {
      onSubmit();
    }
  };

  return (
    <main className="chatGPT-app">
      <section className="chat-container">
        <div className="layout">
          {posts.map((post, idx) => (
            <div
              key={idx}
              className={`chat-bubble ${
                post.type === "bot" || post.type === "loading" ? "bot" : ""
              }`}
            >
              <div className="avatar">
                <img
                  src={
                    post.type === "bot" || post.type === "loading" ? bot : user
                  }
                  alt=""
                />
              </div>
              {post.type === "loading" ? (
                <div className="loader">
                  <img src={loadingIcon} alt="" />
                </div>
              ) : (
                <div className="post">{post.post}</div>
              )}
            </div>
          ))}
        </div>
      </section>
      <footer>
        <input
          type="text"
          className="composebar"
          autoFocus
          placeholder="Send a message..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyUp={onKeyUp}
        />
        <div className="send-button" onClick={onSubmit}>
          <img src={send} alt="" />
        </div>
      </footer>
    </main>
  );
}

export default App;
