import React, { useEffect, useRef } from "react";
import { Message } from "../Message/Message";

export const Chat = ({ messages }) => {
  const chatEndRef = useRef(null); // Reference for scrolling to the bottom

  useEffect(() => {
    // Scrolling to the bottom when messages change
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col space-y-3 p-3  max-w-md mx-auto pb-6">
      {messages
        ?.filter((message) => message.role !== "system")
        .map((message) => {
          return <Message key={message.id} message={message} />;
        })}
      <div ref={chatEndRef} /> {/* This div is used to scroll to the bottom */}
    </div>
  );
};
