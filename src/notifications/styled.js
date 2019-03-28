// @flow

import { grey } from "@material-ui/core/colors";
import styled from "styled-components";

const NotificationsPanelBody = styled.div`
  overflow-y: auto;
  max-height: 20.625rem;
`;

const NotificationsPanelContainer = styled.div`
  border: 1px solid ${grey[400]};
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1),
    0 2px 2px -2px rgba(0, 0, 0, 0.02), 0 1px 4px 0 rgba(0, 0, 0, 0.04);
  overflow: hidden;
  position: relative;
  width: 25rem;
`;

const NotificationsPanelFooter = styled.div`
  border-top: 1px solid ${grey[400]};
  height: 2.125rem;
`;

const NotificationsPanelHeader = styled.div`
  align-items: center;
  border-bottom: 1px solid ${grey[400]};
  display: flex;
  height: 2.125rem;
  padding: 0 0.625rem;
`;

const NotificationsPanelItem = styled.div`
  align-items: center;
  display: flex;
  padding: 0.625rem 1.875rem 0.625rem 0.625rem;

  > div:last-child {
    margin-left: 0.625rem;
  }

  p {
    margin: 0;
  }

  span {
    display: block;
    margin: 0;
  }
`;

export const NotificationsPanelComponents = {
  Body: NotificationsPanelBody,
  Container: NotificationsPanelContainer,
  Footer: NotificationsPanelFooter,
  Header: NotificationsPanelHeader,
  Item: NotificationsPanelItem,
};
