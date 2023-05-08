import React, { useState } from "react";
import Head from "../components/Head";
import Messages from "../components/Messages";
import Form from "../components/Form";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  return (
    <div className="p-2">
      <div className="bg-[#2F343C] rounded-3xl p-12">
        <Head />
        <div className="w-full h-[1px] my-8 bg-[#4F5361]" />
        <Messages messages={messages} />
        <div className="w-full h-[1px] my-8 bg-[#4F5361]" />
        <Form setMessages={setMessages} />
      </div>
    </div>
  );
};

export default Chat;
