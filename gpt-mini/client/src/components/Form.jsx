import React from "react";
import { useState } from "react";
import axios from "axios";
import { formatRelative } from "date-fns";

const SendIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path d="M1.94631 9.31555C1.42377 9.14137 1.41965 8.86034 1.95706 8.6812L21.0433 2.31913C21.5717 2.14297 21.8748 2.43878 21.7268 2.95706L16.2736 22.0433C16.1226 22.5718 15.8179 22.5901 15.5946 22.0877L12.0002 14.0002L18.0002 6.00017L10.0002 12.0002L1.94631 9.31555Z"></path>
  </svg>
);

const Form = ({ setMessages }) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  const messageResponse = async () => {
    const { data } = await axios.post(`http://localhost:9000/prompt`, {
      message,
    });
    setMessages((prev) => [
      ...prev,
      {
        msg: data,
        type: "bot",
        time: formatRelative(new Date(), new Date()),
      },
    ]);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message) return;

    setMessages((prev) => [
      ...prev,
      {
        msg: message,
        type: "user",
        time: formatRelative(new Date(), new Date()),
      },
    ]);

    setMessage("");
    setIsLoading(true);
    await messageResponse();
    setIsLoading(false);
  };

  return (
    <div className="relative">
      <form className="flex items-center">
        <input
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="Type your message here"
          className="bg-[#3A3F47] text-white placeholder:text-[#949494] text-sm rounded-xl p-3 w-full outline-none"
        />
        <button
          type="submit"
          onClick={sendMessage}
          className="bg-[#3A3F47] hover:opacity-50 active:opacity-100 text-white text-sm px-4 py-2 rounded-xl absolute top-1 right-0"
        >
          {isLoading ? (
            <p>loading..</p>
          ) : (
            <SendIcon className="w-5 h-5 fill-[#2576f8]" />
          )}
        </button>
      </form>
    </div>
  );
};

export default Form;
