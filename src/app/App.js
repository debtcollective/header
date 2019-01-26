import React, { Component } from "react";
import logo from "../assets/logo.svg";
import * as styled from "./styled";

class App extends Component {
  render() {
    return (
      <styled.Wrapper>
        <styled.Container className="App-header">
          <styled.Logo src={logo} alt="logo" />
        </styled.Container>
      </styled.Wrapper>
    );
  }
}

export default App;
