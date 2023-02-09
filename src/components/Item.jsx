import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Item = ({ item, index, deleteQna, handleEdit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const variants = {
    initial: {
      rotate: isOpen ? -180 : 180,
    },
    animate: {
      zIndex: 1,
      rotate: 0,
      transition: {
        type: "tween",
        duration: 0.5,
        ease: "circOut",
      },
    },
  };
  const variants2 = {
    initial: {
      height: 0,
      opacity: 0,
    },
    animate: {
      height: "auto",
      opacity: 1,
      transition: {
        height: {
          duration: 0.4,
        },
        opacity: {
          duration: 0.25,
          delay: 0.15,
        },
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        height: {
          duration: 0.4,
        },
        opacity: {
          duration: 0.25,
        },
      },
    },
  };

  return (
    <div className="flex flex-col w-full rounded-lg">
      <div className="flex px-2 h-14 items-center w-full relative text-2xl uppercase text-left text-black border-b border-gray-200 cursor-pointer">
        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-11/12 h-full flex justify-start items-center"
        >
          <h4 className="text-2xl font-semibold">
            {index + 1}. {item.title}
          </h4>
        </div>
        <div
          className="w-1/12 h-full flex justify-end items-center relative"
          onClick={() => setIsEdit(!isEdit)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-three-dots-vertical"
            viewBox="0 0 16 16"
          >
            {" "}
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />{" "}
          </svg>
          {isEdit && (
            <ul className="absolute right-8 top-0 h-full z-20 bg-neutral-100 rounded-sm flex gap-2">
              <li
                onClick={() => {
                  deleteQna(item.id);
                }}
                className="text-base h-full flex justify-center items-center whitespace-nowrap font-semibold px-5 capitalize hover:bg-gray-200"
              >
                Delete
              </li>
              <li
                onClick={() => {
                  handleEdit(item.id);
                }}
                className="text-base h-full flex justify-center items-center whitespace-nowrap font-semibold px-5 capitalize hover:bg-gray-200"
              >
                Edit
              </li>
            </ul>
          )}
        </div>
        <div className="w-1/12 flex justify-end items-center select-none">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={isOpen ? "open" : "closed"}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {isOpen ? (
                <img src="images/remove.png" alt="" />
              ) : (
                <img src="images/add.png" alt="" />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            variants={variants2}
            key="test"
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <p className="py-4 px-2 text-lg font-medium bg-neutral-200">
              {item.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Item;
