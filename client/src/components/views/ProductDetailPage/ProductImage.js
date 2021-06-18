import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";

function ProductImage(props) {
  const [Images, setImages] = useState([]);

  useEffect(() => {
    if (props.product_info.images && props.product_info.images.length > 0) {
      let images = [];
      props.product_info.images.map(image => {
        images.push({
          original: `http://localhost:5000/${image}`,
          thumbnail: `http://localhost:5000/${image}`,
        });
      });
      setImages(images);
    }
  }, [props.product_info]); // props.product_info가 바뀔 때마다 useEffect를 실행

  return (
    <div>
      <ImageGallery items={Images} />
    </div>
  );
}

export default ProductImage;
