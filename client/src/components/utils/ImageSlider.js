import React from "react";
import { Carousel } from "antd";

function ImageSlider(props) {
  return (
    <div>
      <Carousel autoplay>
        {props.images.map((image, index) => (
          <div key={index}>
            <img
              src={`http://localhost:5000/${image}`}
              style={{ width: "100%", maxHeight: "150px" }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ImageSlider;
