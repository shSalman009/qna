import React from "react";
import Main from "./components/Main";
import { QnaProvider } from "./context/qnaContext";

export default function App() {
  return (
    <QnaProvider>
      <Main />
    </QnaProvider>
  );
}
