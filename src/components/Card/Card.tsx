import React from "react";
import type { CardProps } from "antd";

import "./Card.scss";
import { Card, Flex } from "antd";

const { Meta } = Card;

interface Props {
  cover: string;
  title: string;
  price: number;
  actions: CardProps["actions"];
}

const CardComponent: React.FC<Props> = (props) => {
  const { cover, actions, title, price } = props;
  return (
    <Card
      cover={<img src={cover} />}
      actions={actions}
      className="web-component-card-container"
    >
      <Flex justify="space-between" vertical style={{ height: "100%" }}>
        <Meta title={title} />
        <div style={{ fontSize: "1rem", color: "#ee4d2d" }}>&#3647;{price}</div>
      </Flex>
    </Card>
  );
};

export default CardComponent;
