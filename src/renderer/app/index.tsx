import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import Camera from "./Camera";

const container = document.getElementById("render");
const root = createRoot(container!);
root.render(<Camera />);
