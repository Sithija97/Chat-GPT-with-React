import { send, user, bot } from "./assets/index";

function App() {
  return (
    <main className="chatGPT-app">
      <section className="chat-container">
        <div className="layout">
          <div className="chat-bubble">
            <div className="avatar">
              <img src={user} alt="" />
            </div>
            <div className="post">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
          </div>
          <div className="chat-bubble bot">
            <div className="avatar">
              <img src={bot} alt="" />
            </div>
            <div className="post">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
          </div>
        </div>
      </section>
      <footer>
        <input
          type="text"
          className="composebar"
          autoFocus
          placeholder="Ask Anything"
          onChange={() => {}}
        />
        <div className="send-button">
          <img src={send} alt="" />
        </div>
      </footer>
    </main>
  );
}

export default App;
