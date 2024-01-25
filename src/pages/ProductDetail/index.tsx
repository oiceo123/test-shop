import React, { useState, useEffect } from "react";
import axios from "../../api";
import type { Product } from "../../types/Prouduct";
import { Link, useParams } from "react-router-dom";

import "./ProductDetail.scss";
import {
  Row,
  Col,
  Flex,
  Rate,
  InputNumber,
  Button,
  Breadcrumb,
  Card,
} from "antd";

import ImageGroupComponent from "../../components/ImageGroup";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product>();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <Row justify="center">
      <Col span={22}>
        <Breadcrumb
          style={{ marginBottom: "12px" }}
          separator=">"
          items={[
            {
              title: <Link to={`/`}>Knacx Shop</Link>,
            },
            {
              title: (
                <Link to={`/products/category/${product?.category}`}>
                  {product?.category}
                </Link>
              ),
            },
            {
              title: product?.brand,
            },
            {
              title: product?.title,
            },
          ]}
        />
        <Row className="web-pages-productDetail-container">
          <Col span={10} className="web-pages-productDetail-container-image">
            <ImageGroupComponent
              images={product?.images ? product?.images : []}
            />
          </Col>
          <Col span={14} className="web-pages-productDetail-container-detail">
            <Flex justify="space-between" vertical style={{ height: "100%" }}>
              <div>
                <div className="web-pages-productDetail-title">
                  {product?.title}
                </div>
                <div className="web-pages-productDetail-rating">
                  <span>{product?.rating}</span>
                  <Rate
                    disabled
                    allowHalf
                    value={product?.rating}
                    style={{ color: "#ee4d2d" }}
                  />
                </div>
                <div className="web-pages-productDetail-price">
                  {product?.price && product.discountPercentage && (
                    <span className="web-pages-productDetail-price-before-discount">
                      &#3647; {product?.price}
                    </span>
                  )}
                  <span className="web-pages-productDetail-price-after-discount">
                    &#3647;
                    {product?.price && product.discountPercentage
                      ? Math.ceil(
                          product?.price *
                            (1 - product?.discountPercentage / 100)
                        )
                      : product?.price}
                  </span>
                  {product?.discountPercentage && (
                    <span className="web-pages-productDetail-price-discount">
                      {product?.discountPercentage}% ส่วนลด
                    </span>
                  )}
                </div>
              </div>
              <div>
                <Row align="middle" className="web-pages-productDetail-amount">
                  <Col span={4}>จำนวน</Col>
                  <Col span={4}>
                    {" "}
                    <InputNumber
                      controls={false}
                      addonBefore="-"
                      addonAfter="+"
                      defaultValue={1}
                      min={1}
                      max={100}
                    />
                  </Col>
                  <Col offset={1} span={5}>
                    มีสินค้าทั้งหมด {product?.stock} ชิ้น
                  </Col>
                </Row>
                <Row className="web-pages-productDetail-button">
                  <Col span={6} style={{ marginRight: "16px" }}>
                    <Flex vertical gap="small" style={{ width: "100%" }}>
                      <Button className="web-pages-productDetail-button-add">
                        เพิ่มสินค้า
                      </Button>
                    </Flex>
                  </Col>
                  <Col span={6}>
                    <Flex vertical gap="small" style={{ width: "100%" }}>
                      <Button className="web-pages-productDetail-button-buy">
                        ซื้อสินค้า
                      </Button>
                    </Flex>
                  </Col>
                </Row>
              </div>
            </Flex>
          </Col>
        </Row>
        <Row className="web-pages-productDetail-container-description">
          <Col span={24}>
            <Card title="รายละเอียดสินค้า" style={{ width: "100%" }}>
              <p>{product?.description}</p>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ProductDetail;
