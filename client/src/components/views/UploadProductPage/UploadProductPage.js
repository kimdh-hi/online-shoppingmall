import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";

//const { Title } = Typography;
const { TextArea } = Input;

const Countries = [
  { key: 1, value: "Korea" },
  { key: 2, value: "USA" },
  { key: 3, value: "China" },
  { key: 4, value: "Japan" },
];

function UploadProductPage(props) {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState(0);
  const [Country, setCountry] = useState(1);
  const [Images, setImages] = useState([]);

  const titleChangeHandler = event => {
    setTitle(event.currentTarget.value);
  };

  const descriptionChangeHandler = event => {
    setDescription(event.currentTarget.value);
  };

  const priceChangeHandler = event => {
    setPrice(event.currentTarget.value);
  };

  const countryChangeHandler = event => {
    setCountry(event.currentTarget.value);
  };

  const updateImages = newImages => {
    setImages(newImages);
  };

  const submitHandler = event => {
    event.preventDefault();

    if (!Title || !Description || !Price || !Countries || !Images) {
      return alert("Please fill out a form.");
    }

    console.log("1**************");

    const body = {
      writer: props.user.userData._id,
      title: Title,
      description: Description,
      price: Price,
      images: Images,
      country: Country,
    };

    Axios.post("/api/product", body).then(response => {
      if (response.data.success) {
        alert("Upload success !!");
        props.history.push("/");
      } else {
        alert("Upload failed..");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2>Upload products</h2>
      </div>

      <Form onSubmit={submitHandler}>
        <FileUpload refreshFunction={updateImages} />
        <br />
        <br />

        <label>이름</label>
        <Input value={Title} onChange={titleChangeHandler} />
        <br />
        <br />

        <label>설명</label>
        <TextArea value={Description} onChange={descriptionChangeHandler} />
        <br />
        <br />

        <label>가격</label>
        <Input type="number" value={Price} onChange={priceChangeHandler} />
        <br />
        <br />

        <select onChange={countryChangeHandler} value={Country}>
          {Countries.map(item => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />

        <button type="submit">등록</button>
      </Form>
    </div>
  );
}
export default UploadProductPage;
