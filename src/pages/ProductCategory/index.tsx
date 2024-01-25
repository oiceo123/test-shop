import React, { useState, useEffect } from "react";
import axios from "../../api";
import { Link, useParams, useHistory, useLocation } from "react-router-dom";
import type { Product } from "../../types/Prouduct";
import { useQuery } from "../../hooks/useQuery";

import Swal from "sweetalert2";
import { Row, Col, Empty, Flex, Spin, Pagination } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import CardComponent from "../../components/Card/Card";

const ProductCategory: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState<boolean>(true);

  const query = useQuery();
  const [total, setTotal] = useState<number>(0);
  const [limit, setLimit] = useState<number>(30);
  const skip = +(query.get("skip") || "0");
  const currentPage = +(query.get("page") || "1");

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    fetchProductsByCategory();
  }, []);

  useEffect(() => {
    setProductsLoading(true);
    fetchProductsByCategory();
  }, [skip]);

  const fetchProductsByCategory = async () => {
    try {
      const res = await axios.get(
        `/products/category/${category}?limit=${limit}&skip=${skip}`
      );
      setProducts(res.data.products);
      setTotal(res.data.total);
      setProductsLoading(false);
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

  const handleEdit = (
    event: React.MouseEvent | React.KeyboardEvent,
    id: number
  ) => {
    event.preventDefault();
    event.stopPropagation();
    history.push(`/products/edit/${id}`);
  };

  const handleDelete = (
    event: React.MouseEvent | React.KeyboardEvent,
    id: number
  ) => {
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
    history.push(`${location.pathname}?page=${page}&skip=${skipItem}`);
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
        {products && products.length > 0 ? (
          <>
            <Row gutter={[16, 16]}>
              {products.map((product) => (
                <Col span={4} key={product.id}>
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
                          onKeyDown={(event) => {
                            handleEdit(event, product.id);
                          }}
                        >
                          <EditOutlined />
                        </div>,
                        <div
                          onClick={(event) => {
                            handleDelete(event, product.id);
                          }}
                          onKeyDown={(event) => {
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

export default ProductCategory;
