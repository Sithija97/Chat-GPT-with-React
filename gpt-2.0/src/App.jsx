import { useState } from "react";
import "./App.css";
import "./normalise.css";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <aside className="side-menu">
        <div className="side-menu-button">
          <span>+</span>
          New Chat
        </div>
      </aside>
      <section className="chatbox"></section>
    </div>
  );
}

export default App;
