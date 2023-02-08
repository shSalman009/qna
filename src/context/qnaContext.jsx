import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import shortid from "shortid";
import { FireStoreDb } from "../firebase";

const Context = createContext();

export const useQna = () => {
  return useContext(Context);
};

export const QnaProvider = ({ children }) => {
  const [qna, setqna] = useState([]);
  const [editedItem, setEditedItem] = useState(null);

  const addQna = async (title, description) => {
    const key = shortid.generate();
    await setDoc(doc(FireStoreDb, "qna", key), {
      id: key,
      title,
      description,
    });
    fetchQna();
  };

  const deleteQna = async (id) => {
    await deleteDoc(doc(FireStoreDb, "qna", id));

    fetchQna();
  };

  const updateQna = async (id, title, description) => {
    console.log(id, title, description);
    if (id && title && description) {
      const washingtonRef = doc(FireStoreDb, "qna", id);

      await updateDoc(washingtonRef, {
        title,
        description,
      });
      setEditedItem(null);
      fetchQna();
    }
  };
  const handleEdit = (id) => {
    qna.forEach((item) => {
      if (item.id === id) {
        setEditedItem(item);
      }
    });
  };

  const cancelEdit = () => {
    setEditedItem(null);
  };

  const fetchQna = async () => {
    const store = [];

    const querySnapshot = await getDocs(collection(FireStoreDb, "qna"));
    querySnapshot.forEach((doc) => {
      store.push(doc.data());
    });
    setqna(store);
  };
  useEffect(() => {
    fetchQna();
  }, []);

  return (
    <Context.Provider
      value={{
        qna,
        addQna,
        deleteQna,
        updateQna,
        handleEdit,
        cancelEdit,
        editedItem,
      }}
    >
      {children}
    </Context.Provider>
  );
};
