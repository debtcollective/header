// @flow

import "./index.css";
import Header from "./lib";
import React from "react";
import ReactDOM from "react-dom";

const root = document.getElementById("root");

const links = [
  { href: "/admin/disputes", roles: ["admin"], text: "Admin" },
  { href: "/disputes/my", text: "My Disputes" },
  { href: "/", text: "Dispute Your Debt" },
  { href: "https://community.debtcollective.org", text: "Community" },
];

if (root !== null) {
  ReactDOM.render(<Header links={links} />, root);
}
