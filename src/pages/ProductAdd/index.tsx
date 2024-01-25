import React, { useState, useEffect, useContext } from "react";
import axios from "../../api";
import { AddedProductsContext } from "../../context/AddedProductsContext";

import Swal from "sweetalert2";
import { Row, Col, Button, Form, Input, InputNumber, Select, Flex } from "antd";
import type { FormProps } from "antd";

import "./ProductAdd.scss";
import UploadImageComponent from "../../components/UploadImage";

const { TextArea } = Input;

const ProductAdd: React.FC = () => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<string[]>([]);
  const { addedProducts, setAddedProducts } = useContext(AddedProductsContext);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/products/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("error", error);
    }
  };

  const onFinish: FormProps["onFinish"] = async (values) => {
    const payload = { ...values };
    try {
      const res = await axios.post("/products/add", payload);
      setAddedProducts([...addedProducts, res.data]);
      Swal.fire({
        icon: "success",
        text: "เพิ่มรายการสินค้าสำเร็จ",
      });
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <Row justify="center">
      <Col span={12}>
        <Row className="web-pages-productAdd-container">
          <Col span={24}>
            <Form
              form={form}
              name="add-product"
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
                        categories.map((category) => (
                          <Select.Option value={category}>
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
                    เพิ่มสินค้า
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

export default ProductAdd;
