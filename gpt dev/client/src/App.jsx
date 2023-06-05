import { useEffect, useState } from "react";
import axios from "axios";
import { send, user, bot, loadingIcon } from "./assets/index";

function App() {
  const [prompt, setPrompt] = useState("");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.querySelector(".layout").scrollTop =
      document.querySelector(".layout").scrollHeight;
  }, [posts]);

  const fetchResponseFromOpenAI = async () => {
    const { data } = await axios.post("http://localhost:8000/", { prompt });
    console.log(data);
    setPosts((prev) => [
      ...prev,
      {
        type: "bot",
        post: data.bot,
      },
    ]);
  };

  const handleSubmit = async () => {
    if (prompt.trim() === "") return;

    setPosts((prev) => [
      ...prev,
      {
        type: "user",
        post: prompt,
      },
    ]);

    setPrompt("");
    setIsLoading(true);
    await fetchResponseFromOpenAI();
    setIsLoading(false);
  };

  const onKeyUp = (e) => {
    if (e.key === "Enter" || e.which === 13) {
      handleSubmit();
    }
  };

  return (
    <main className="chatGPT-app">
      <section className="chat-container">
        <div className="layout">
          {posts.map((post, idx) => (
            <div
              key={idx}
              className={`chat-bubble ${post.type === "bot" ? "bot" : ""}`}
            >
              <div className="avatar">
                <img src={post.type === "bot" ? bot : user} alt="" />
              </div>
              {/* {isLoading ? (
                <div className="loader">
                  <img src={loadingIcon} alt="" />
                </div>
              ) : (
                <div className="post">{post.post}</div>
              )} */}
              <div className="post">{post.post}</div>
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
        <div className="send-button" onClick={handleSubmit}>
          <img src={send} alt="" />
        </div>
      </footer>
    </main>
  );
}

export default App;
