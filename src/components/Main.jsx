import React from "react";
import Add from "./Add";
import Qna from "./Qna";

export default function Main() {
  return (
    <div>
      <div className="container mx-auto px-4 flex">
        <div className="w-9/12">
          <Qna />
        </div>
        <div className="w-3/12">
          <Add />
        </div>
      </div>
    </div>
  );
}
