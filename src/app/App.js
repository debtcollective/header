// @flow

import React, { Component } from "react";
import logo from "../assets/logo.svg";
import * as styled from "./styled";

export type Props = {
  alt: string
};

class App extends Component<Props> {
  static defaultProps = {
    alt: "A default alt for logo"
  };

  render() {
    return (
      <styled.Wrapper>
        <styled.Container>
          <styled.Logo src={logo} alt={this.props.alt} />
        </styled.Container>
      </styled.Wrapper>
    );
  }
}

export default App;
