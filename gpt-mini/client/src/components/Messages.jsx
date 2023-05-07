import React from "react";

const Message = ({ msg, type, time }) => {
  return (
    <div
      className={`flex items-center ${
        type === "bot" ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`flex flex-col items-start justify-center  text-white rounded-xl p-3 ${
          type === "bot"
            ? "bg-[#3A3F47] rounded-tl-none"
            : "bg-[#8AA1FF] rounded-br-none"
        }`}
      >
        <p>{msg}</p>
        <span className={`text-xs mt-2 ${type === "bot" && "text-[#949494]"}`}>
          {time}
        </span>
      </div>
    </div>
  );
};

const Messages = ({ messages }) => {
  return (
    <div className="w-[600px] max-h-96 overflow-y-scroll scrollbar-hide">
      {messages.length ? (
        messages.map((message, index) => <Message key={index} {...message} />)
      ) : (
        <p>ask from bot..</p>
      )}
    </div>
  );
};

export default Messages;
