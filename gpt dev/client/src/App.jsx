import { useEffect, useState } from "react";
import axios from "axios";
import { send, user, bot, loadingIcon } from "./assets/index";

function App() {
  const [prompt, setPrompt] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    document.querySelector(".layout").scrollTop =
      document.querySelector(".layout").scrollHeight;
  }, [posts]);

  const fetchResponseFromOpenAI = async () => {
    const { data } = await axios.post("http://localhost:8000/", { prompt });
    autoTypingBotResponse(data.bot?.trim());
  };

  const autoTypingBotResponse = (response) => {
    let index = 0;
    let interval = setInterval(() => {
      if (index < response.length) {
        setPosts((prevState) => {
          let lastItem = prevState.pop();
          if (lastItem.type !== "bot") {
            prevState.push({
              type: "bot",
              post: response.charAt(index - 1),
            });
          } else {
            prevState.push({
              type: "bot",
              post: lastItem.post + response.charAt(index - 1),
            });
          }
          return [...prevState];
        });
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30);
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
    setPosts((prev) => [
      ...prev,
      {
        type: "loading",
        post: "",
      },
    ]);
    await fetchResponseFromOpenAI();
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
        <div className="send-button" onClick={handleSubmit}>
          <img src={send} alt="" />
        </div>
      </footer>
    </main>
  );
}

export default App;
