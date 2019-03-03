import * as React from "react";
import "./Toast.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


export function Toast() {
  return <ToastContainer
    className='toast-container'
    toastClassName="dark-toast"
    progressClassName={"toast__progress"}
  />;
}
