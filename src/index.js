// @flow

import "./index.css";
import * as React from "react";
import * as serviceWorker from "./serviceWorker";
import DebtcollectiveHeader from "./DebtcollectiveHeader";
import ReactDOM from "react-dom";

const root = document.getElementById("root");

const links = [
  { href: "/admin/disputes", roles: ["admin"], text: "Admin" },
  { href: "/disputes/my", text: "My Disputes" },
  { href: "/", text: "Dispute Your Debt" },
  { href: "https://community.debtcollective.org", text: "Community" },
];

if (root !== null) {
  ReactDOM.render(<DebtcollectiveHeader links={links} />, root);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
