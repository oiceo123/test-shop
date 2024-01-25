import React, { useEffect, useState } from "react";
import axios from "../../api";
import { Link, useHistory } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";
import type { Product } from "../../types/Prouduct";

import Swal from "sweetalert2";
import { Row, Col, Empty, Flex, Spin, Pagination } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import CardComponent from "../../components/Card/Card";

const ProductSearch: React.FC = () => {
  const query = useQuery();
  const history = useHistory();
  const search = query.get("q");
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductLoading] = useState<boolean>(true);

  const [total, setTotal] = useState<number>(0);
  const [limit, setLimit] = useState<number>(30);
  const skip = +(query.get("skip") || "0");
  const currentPage = +(query.get("page") || "1");

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setProductLoading(true);
    fetchProductBySearchParam();
  }, [search, skip]);

  const fetchProductBySearchParam = async () => {
    try {
      const res = await axios.get(
        `products/search?q=${search}&limit=${limit}&skip=${skip}`
      );
      setProducts(res.data.products);
      setTotal(res.data.total);
      setProductLoading(false);
    } catch (error) {
      console.error("error", error);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      const res = await axios.delete(`products/${id}`);
      const newProducts = products.filter(
        (product) => res.data.id !== product.id
      );
      setProducts(newProducts);
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleEdit = (event: React.MouseEvent, id: number) => {
    event.preventDefault();
    event.stopPropagation();
    history.push(`/products/edit/${id}`);
  };

  const handleDelete = (event: React.MouseEvent, id: number) => {
    event.preventDefault();
    event.stopPropagation();

    Swal.fire({
      icon: "warning",
      text: "คุณแน่ใจที่จะลบสินค้านี้ใช่ไหม",
      confirmButtonText: "Delete",
      confirmButtonColor: "red",
      showCancelButton: true,
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id);
      }
    });
  };

  const handleChangePaginate = (page: number) => {
    const skipItem = limit * (page - 1);
    history.push(
      `${location.pathname}?q=${search}&page=${page}&skip=${skipItem}`
    );
  };

  if (productsLoading) {
    return (
      <Flex
        gap="small"
        justify="center"
        align="center"
        className="web-global-spinner-container"
      >
        <Spin tip="Loading" size="large">
          <div className="web-global-spiner-text" />
        </Spin>
      </Flex>
    );
  }

  return (
    <Row justify="center">
      <Col span={22}>
        {products && products.length ? (
          <>
            <Row gutter={[16, 16]}>
              {products.map((product) => (
                <Col span={4}>
                  <Link to={`/products/${product.id}`}>
                    <CardComponent
                      cover={product.thumbnail || ""}
                      title={product.title}
                      price={product.price}
                      actions={[
                        <div
                          onClick={(event) => {
                            handleEdit(event, product.id);
                          }}
                        >
                          <EditOutlined />
                        </div>,
                        <div
                          onClick={(event) => {
                            handleDelete(event, product.id);
                          }}
                        >
                          <DeleteOutlined />
                        </div>,
                      ]}
                    />
                  </Link>
                </Col>
              ))}
            </Row>
            <Row className="web-global-pagination-container">
              <Col span={24}>
                <Pagination
                  current={currentPage}
                  defaultCurrent={1}
                  total={total}
                  showSizeChanger={false}
                  pageSize={30}
                  onChange={handleChangePaginate}
                />
              </Col>
            </Row>
          </>
        ) : (
          <Empty style={{ marginLeft: "auto", marginRight: "auto" }} />
        )}
      </Col>
    </Row>
  );
};

export default ProductSearch;