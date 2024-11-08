"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import React from "react";
import AnimatedCursor from "react-animated-cursor";
import ReactQueryProvider from "@/contexts/reactQueryProvider";
import { NextUIProvider } from "@nextui-org/react";

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <ReactQueryProvider>
        <NextUIProvider>{children}</NextUIProvider>
      </ReactQueryProvider>

      <AnimatedCursor innerSize={10} color="0, 0, 0" showSystemCursor={false} />
    </Provider>
  );
};

export default Providers;
