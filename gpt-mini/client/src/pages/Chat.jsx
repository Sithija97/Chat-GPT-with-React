import React, { useState } from "react";
import Head from "../components/Head";
import Messages from "../components/Messages";
import Form from "../components/Form";

const Chat = () => {
  const [messages, setMessages] = useState([
    { msg: "hi", type: "user", time: "10.46am" },
    { msg: "hi, how may I help you?", type: "bot", time: "10.46am" },
    { msg: "hi", type: "user", time: "10.46am" },
  ]);
  return (
    <div className="p-2">
      <div className="bg-[#2F343C] rounded-3xl p-12">
        <Head />
        <div className="w-full h-[1px] my-8 bg-[#4F5361]" />
        <Messages messages={messages} />
        <div className="w-full h-[1px] my-8 bg-[#4F5361]" />
        <Form />
      </div>
    </div>
  );
};

export default Chat;
