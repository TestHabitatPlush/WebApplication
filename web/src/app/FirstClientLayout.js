"use client";
import { Provider } from "react-redux";
import store from "@/redux/store";
import SecondClientLayout from "./SecondClientLayout"; // Un-commented this

export default function FirstClientLayout({ children }) {
  return (
    <Provider store={store}>
      <SecondClientLayout>{children}</SecondClientLayout>{" "}
    </Provider>
  );
}
