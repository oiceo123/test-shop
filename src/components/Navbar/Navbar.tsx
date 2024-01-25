import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";

import { Row, Col, Input, Flex, Button } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";
import type { SearchProps } from "antd/es/input/Search";

import "./Navbar.scss";

const { Search } = Input;

const Navbar: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const query = useQuery();
  const search = query.get("q");
  const [serachValue, setSearchValue] = useState(search);

  useEffect(() => {
    setSearchValue(search);
  }, [search]);

  const handleChangeSearch: SearchProps["onChange"] = (e) => {
    setSearchValue(e.target.value);
  };

  const onSearch: SearchProps["onSearch"] = (value) => {
    history.push(`/products/search?q=${value}`);
  };

  const handleClickAdd = () => {
    history.push("/products/add");
  };

  return (
    <Row className="web-components-navbar-container">
      <Col span={6}>
        <Link to="/" className="web-components-navbar-container-title">
          Test Shop
        </Link>
      </Col>
      <Col span={12}>
        <Search
          size="large"
          placeholder="ค้นหาสินค้า"
          onSearch={onSearch}
          onChange={handleChangeSearch}
          value={serachValue ? serachValue : undefined}
          enterButton
        />
      </Col>
      {location.pathname !== "/products/add" && (
        <Col offset={3} span={3}>
          <Flex vertical gap="small" style={{ width: "100%" }}>
            <Button size="large" onClick={handleClickAdd}>
              <AppstoreAddOutlined
                style={{ fontSize: "1rem", marginRight: "2px" }}
              />
              <span>เพิ่มสินค้า</span>
            </Button>
          </Flex>
        </Col>
      )}
    </Row>
  );
};

export default Navbar;
