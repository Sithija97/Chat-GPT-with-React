import { useState } from "react";
import "./App.css";
import "./normalise.css";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <aside className="side-menu">
        <div className="side-menu-button">
          <span>
            <b>+</b>
          </span>
          New Chat
        </div>
      </aside>
      <section className="chatbox">
        <div className="chat-input-holder">
          <textarea rows={1} className="chat-input-textarea"></textarea>
        </div>
      </section>
    </div>
  );
}

export default App;
