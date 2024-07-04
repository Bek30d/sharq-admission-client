import React from "react";
import { MessageType } from "../page";

const MessageItem = (message: MessageType) => {
  return (
    <div
      className={`p-6 bg-white rounded-2xl mb-3 border border-transparent ${
        !message.is_readed ? "!border-[#0055FB] shadow-xl cursor-pointer" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#18324D] font-medium">{message.title}</h3>
        <p className="text-[#0055FB]">Ariza raqami: {message.id}</p>
      </div>
      <p className="text-[#18324D] mb-4">{message.description}</p>

      <p className="text-[#6E7781] text-sm">{message.date}</p>
    </div>
  );
};

export default MessageItem;
