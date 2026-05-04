// Slim Bootstrap import: we only use Container/Row/Col (grid) + the reset
// (reboot). Skipping the full bundle saves ~170KB raw CSS.
import "bootstrap/dist/css/bootstrap-reboot.min.css";
import "bootstrap/dist/css/bootstrap-grid.min.css";

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
