// @flow

import * as React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import DebtcollectiveHeader from "./DebtcollectiveHeader";
import * as serviceWorker from "./serviceWorker";

const root = document.getElementById("root");

const links = [
  { text: "Admin", href: "/admin/disputes", roles: ["admin"] },
  { text: "My Disputes", href: "/disputes/my" },
  { text: "Dispute Your Debt", href: "/" },
  { text: "Community", href: "https://community.debtcollective.org" }
];

if (root !== null) {
  ReactDOM.render(<DebtcollectiveHeader links={links} />, root);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
