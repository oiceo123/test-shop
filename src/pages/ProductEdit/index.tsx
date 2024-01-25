import React, { useState, useEffect } from "react";
import axios from "../../api";
import { useParams } from "react-router-dom";
import { Product } from "../../types/Prouduct";

import Swal from "sweetalert2";
import { Row, Col, Button, Form, Input, InputNumber, Select, Flex } from "antd";
import type { FormProps } from "antd";

import "./ProductEdit.scss";
import UploadImageComponent from "../../components/UploadImage";

const { TextArea } = Input;

const ProductEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [product, setProduct] = useState<Product>();
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, []);

  if (product) {
    form.setFieldValue("title", product.title);
    form.setFieldValue("description", product.description);
    form.setFieldValue("price", product.price);
    form.setFieldValue("discountPercentage", product.discountPercentage);
    form.setFieldValue("stock", product.stock);
    form.setFieldValue("category", product.category);
    form.setFieldValue("brand", product.brand);
  }

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.error("error", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/products/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("error", error);
    }
  };

  /* eslint-disable @typescript-eslint/ban-ts-comment */
  // @ts-ignore
  const editProduct = async (payload) => {
    try {
      const res = await axios.put(
        `https://dummyjson.com/products/${id}`,
        payload
      );
      setProduct(res.data);
      Swal.fire({
        icon: "success",
        text: "แก้ไขรายการสินค้าสำเร็จ",
      });
    } catch (error) {
      console.error("error", error);
    }
  };

  const onFinish: FormProps["onFinish"] = (values) => {
    const payload = { ...values };
    editProduct(payload);
  };

  return (
    <Row justify="center">
      <Col span={12}>
        <Row className="web-pages-productEdit-container">
          <Col span={24}>
            <Form
              form={form}
              name="edit-product"
              size="large"
              layout="vertical"
              onFinish={onFinish}
              scrollToFirstError
            >
              <Form.Item
                name="title"
                label="ชื่อสินค้า"
                rules={[{ required: true, message: "กรุณากรอกชื่อสินค้า" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="description"
                label="รายละเอียดสินค้า"
                rules={[
                  { required: true, message: "กรุณากรอกรายละเอียดสินค้า" },
                ]}
              >
                <TextArea rows={4} />
              </Form.Item>
              <Row>
                <Col span={8}>
                  <Form.Item
                    name="price"
                    label="ราคา"
                    rules={[{ required: true, message: "กรุณากรอกราคา" }]}
                  >
                    <InputNumber min={0} precision={2} controls={false} />
                  </Form.Item>
                </Col>
                <Col offset={1} span={7}>
                  <Form.Item
                    name="discountPercentage"
                    label="ส่วนลด"
                    rules={[{ required: true, message: "กรุณากรอกส่วนลด" }]}
                  >
                    <InputNumber min={0} precision={2} controls={false} />
                  </Form.Item>
                </Col>
                <Col offset={1} span={7}>
                  <Form.Item
                    name="stock"
                    label="จำนวนสินค้า"
                    rules={[
                      { required: true, message: "กรุณากรอกจำนวนสินค้า" },
                    ]}
                  >
                    <InputNumber min={0} precision={0} controls={false} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item
                    name="category"
                    label="หมวดหมู่"
                    rules={[{ required: true, message: "กรุณาเลือกหมวดหมู่" }]}
                  >
                    <Select placeholder="กรุณาเลือกหมวดหมู่">
                      {categories &&
                        categories.map((category, index) => (
                          <Select.Option value={category} key={index}>
                            {category}
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col offset={1} span={11}>
                  <Form.Item
                    name="brand"
                    label="แบรนด์"
                    rules={[{ required: true, message: "กรุณากรอกแบรนด์" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name="thumbnail"
                label="ภาพหน้าปก"
                valuePropName="fileList"
              >
                <UploadImageComponent limit={1} />
              </Form.Item>
              <Form.Item
                name="images"
                label="ภาพสินค้า"
                valuePropName="fileList"
              >
                <UploadImageComponent limit={5} />
              </Form.Item>
              <Form.Item>
                <Flex vertical style={{ width: "100%", marginTop: "24px" }}>
                  <Button type="primary" htmlType="submit">
                    แก้ไขสินค้า
                  </Button>
                </Flex>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ProductEdit;
