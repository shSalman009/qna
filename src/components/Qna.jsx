import React from "react";
import { useQna } from "../context/qnaContext";

import Item from "./Item";

export default function Qna() {
  const { qna, deleteQna, handleEdit } = useQna();

  return (
    <>
      {qna && (
        <div className="mr-10">
          <div className=" lg:pt-52 pt-40 mr-auto w-full h-full place-self-center lg:col-span-7">
            <h2 className="uppercase text-sea-red-400 max-w-2xl mb-8 text-4xl  tracking-tight leading-none md:text-5xl xl:text-6xl ">
              Faqs
            </h2>
            <div className={`w-full`}>
              {qna.map((item, index) => (
                <Item
                  handleEdit={handleEdit}
                  key={item.id}
                  index={index}
                  item={item}
                  deleteQna={deleteQna}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
