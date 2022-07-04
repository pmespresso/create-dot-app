import React from "react";
import { Card, Col, Row } from "reactstrap";
import styled from "styled-components";

interface Props {
  id: string;
  handle?: string;
  postsCount: number;
  followersCount: number;
}

const StyledSpaceCard = styled(Card)`
  display: flex;
  justify-content: center;
  align-items: center;
  .title {
    color: black;
  }

  .footer {
    color: black;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    width: 100%;
  }

  height: 10em;
  padding: 10px;
`;

export function SpaceCard(props: Props) {
  const { id, handle, postsCount, followersCount } = props;

  return (
    <StyledSpaceCard>
      <p className="title">{`Space: ${id} ${handle ? `-- ${handle}` : ""}`}</p>

      <Row className="footer">
        <Col>
          <small>{`Posts: ${postsCount}`}</small>
        </Col>
        <Col>
          <small>{`Followers: ${followersCount}`}</small>
        </Col>
      </Row>
    </StyledSpaceCard>
  );
}
