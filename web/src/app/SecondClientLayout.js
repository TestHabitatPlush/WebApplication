"use client";
import React, { useEffect } from "react";
import AuthHandler from "@/handlers/AuthHandler";
import "./globals.css";

export default function SecondClientLayout({ children }) {
  const { setIntitalReduxState } = AuthHandler();
  useEffect(() => {
    setIntitalReduxState();
  });

  return <React.Fragment>{children}</React.Fragment>;
}
