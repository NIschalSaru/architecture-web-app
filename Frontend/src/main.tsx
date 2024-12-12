// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ConfigProvider } from "antd";
import { ANT_CONFIG } from "./constants/common.ts";
import { BrowserRouter } from "react-router-dom";
// import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'swiper/css/bundle';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// createRoot(document.getElementById("root")!).render(
//   <ConfigProvider theme={ANT_CONFIG}>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </ConfigProvider>
// );
ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider theme={ANT_CONFIG}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConfigProvider>
);
