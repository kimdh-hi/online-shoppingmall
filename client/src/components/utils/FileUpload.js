import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Icon } from "antd";
import axios from "axios";

// https://www.npmjs.com/package/react-dropzone
function FileUpload(props) {
  const [Images, setImages] = useState([]);

  const dropHandler = files => {
    let formData = new FormData();

    const config = {
      header: { "content-type": "miultipart/form-data" },
    };
    formData.append("file", files[0]);

    axios.post("/api/product/images", formData, config).then(response => {
      if (response.data.success) {
        // console.log(response.data);
        setImages([...Images, response.data.filePath]);
        // 부모 컴포넌트 (UploadProductPage)로 변경된 state전달
        props.refreshFunction([...Images, response.data.filePath]);
      } else {
        alert("failed to upload products");
      }
    });
  };

  const imageDeleteHandler = image => {
    // 클릭된 이미지의 인덱스를 얻어온다.
    // 첫번째 이미지의 인덱스는 0
    const currentIndex = Images.indexOf(image);

    let newImages = [...Images];
    // 선택된 인덱스부터 1개의 이미지를 delete
    newImages.splice(currentIndex, 1);

    setImages(newImages);
    // 부모 컴포넌트 (UploadProductPage)로 변경된 state전달
    props.refreshFunction(newImages);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              style={{
                width: 300,
                height: 240,
                border: "2px solid orange",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <Icon type="plus" style={{ fontSize: "3rem" }} />
            </div>
          </section>
        )}
      </Dropzone>

      <div
        style={{
          display: "flex",
          width: "350px",
          height: "240px",
          overflowX: "scroll",
        }}
      >
        {Images.map((image, index) => (
          <div onDoubleClick={() => imageDeleteHandler(image)} key={index}>
            <img
              style={{ minWidth: "300px", width: "300px", height: "240px" }}
              src={`http://localhost:5000/${image}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
