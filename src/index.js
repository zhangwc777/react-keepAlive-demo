import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AliveScope } from 'react-activation'
import Layout from "./layout"
import Element from "./router"
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AliveScope>
      <Element></Element>
    </AliveScope>
  </BrowserRouter>

);

