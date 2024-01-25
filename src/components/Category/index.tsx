import React from "react";
import { useHistory } from "react-router-dom";
import { Card } from "antd";

interface Props {
  categories: string[];
}

const gridStyle: React.CSSProperties = {
  width: "10%",
  textAlign: "center",
  cursor: "pointer",
};

const CategoryComponent: React.FC<Props> = (props) => {
  const { categories } = props;
  const history = useHistory();

  const handleClick = (category: string) => {
    history.push(`/products/category/${category}`);
  };

  return (
    <>
      {categories && (
        <Card title="หมวดหมู่">
          {categories.map((category) => (
            <Card.Grid style={gridStyle} onClick={() => handleClick(category)}>
              {category}
            </Card.Grid>
          ))}
        </Card>
      )}
    </>
  );
};

export default CategoryComponent;
