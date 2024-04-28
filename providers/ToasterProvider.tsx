"use client";

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <Toaster toastOptions={{
      style: {
        borderRadius: "50px",
        background: "#3370e2",
        color: "#fff",
      }
    }} />
  )
}

export default ToasterProvider;
