import React from "react";

function Message({msg}) {
  return (
    <li className="bg-gray-800 text-white p-2 rounded-md shadow-sm">
      {msg}
    </li>
  );
}

export default Message;
