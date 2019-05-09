import Header from "@debtcollective/header";
import React, { Component } from "react";

const links = [
  { href: "/admin/disputes", roles: ["admin"], text: "Admin" },
  { href: "/disputes/my", text: "My Disputes" },
  { href: "/", text: "Dispute Your Debt" },
  { href: "https://community.debtcollective.org", text: "Community" },
];

export default class App extends Component {
  render() {
    return (
      <div>
        <Header links={links} />
      </div>
    );
  }
}
