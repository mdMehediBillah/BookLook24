import React from "react";

export const Message = ({ message }) => {
  const isUser = message.role === "user";
  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } items-start mb-2`}
    >
      <div className={`mr-2 flex-shrink-0 ${isUser ? "order-last" : ""}`}>
        <img
          src={
            isUser
              ? "https://s2.qwant.com/thumbr/474x474/7/5/5b47214d60a203f38b7656bae56309264379280e7e0391c774bc52ffec6c23/th.jpg?u=https%3A%2F%2Ftse.mm.bing.net%2Fth%3Fid%3DOIP.W7v-AALRH1JvsaBNXnIzIwHaHa%26pid%3DApi&q=0&b=1&p=0&a=0"
              : "https://s2.qwant.com/thumbr/474x474/e/9/0193f549921330175bf9119055b20f227ab52f3429b4d4416c0b9d37209d6d/th.jpg?u=https%3A%2F%2Ftse.mm.bing.net%2Fth%3Fid%3DOIP.ba_saMt-O2Wh-OK4mrKX_QHaHa%26pid%3DApi&q=0&b=1&p=0&a=0"
          }
          alt={isUser ? "User" : "AI"}
          className="w-8 h-8 rounded-full"
        />
      </div>
      <div
        className={`${
          isUser ? "bg-cyan-600 text-white" : "bg-rose-400 text-white"
        } p-2 rounded-lg max-w-xs break-words`}
      >
        {message.content}
      </div>
    </div>
  );
};


