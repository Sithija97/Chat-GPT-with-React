import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post(`http://localhost:3001/`, { message }).then((res) => {
      setLoading(false);
      setResponse(res.data.message);
    });
  };

  return (
    <div class="chat-container">
      <div class="chat-box">
        {loading ? (
          <div class="spinner-container">
            <div class="spinner"></div>
          </div>
        ) : (
          <div>{response}</div>
        )}
      </div>
      <form class="chat-form" onSubmit={handleSubmit}>
        <div class="input-group">
          <textarea
            class="chat-input"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
