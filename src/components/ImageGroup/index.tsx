import React, { useState } from "react";
import "./ImageGroup.scss";
import { Image } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

interface Props {
  images: string[];
}

const ImageGroupComponent: React.FC<Props> = ({ images }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [mainIndex, setMainIndex] = useState(0);

  const handleNextClick = () => {
    let nextIndex = startIndex + 1;
    if (nextIndex > images.length - 5) {
      nextIndex = nextIndex - 1;
    }
    setStartIndex(nextIndex);
  };

  const handlePrevClick = () => {
    let prevIndex = startIndex - 1;
    if (prevIndex < 0) {
      prevIndex = 0;
    }
    setStartIndex(prevIndex);
  };

  const handleSelect = (index: number) => {
    setMainIndex(index);
  };

  return (
    <div className="web-image-group-container">
      <div className="web-image-group-image-main-container">
        <Image src={images[mainIndex]} />
      </div>
      <div className="web-image-group-image-gallery-container">
        {images.length > 5 && (
          <LeftOutlined
            onClick={handlePrevClick}
            className="web-image-group-button-previous"
          />
        )}
        <div
          className={
            images.length > 5
              ? "web-image-group-image-gallery-more-than-5"
              : "web-image-group-image-gallery-less-than-5"
          }
        >
          {images.slice(startIndex, startIndex + 5).map((image, index) => (
            <img
              key={index}
              src={image}
              className={
                mainIndex === index + startIndex
                  ? "web-image-group-image-selected"
                  : ""
              }
              onClick={() => handleSelect(index + startIndex)}
              onKeyDown={() => handleSelect(index + startIndex)}
            />
          ))}
        </div>
        {images.length > 5 && (
          <RightOutlined
            onClick={handleNextClick}
            className="web-image-group-button-next"
          />
        )}
      </div>
    </div>
  );
};

export default ImageGroupComponent;
