import React, { useState } from "react";
import { Collapse, Radio } from "antd";
const { Panel } = Collapse;

function RadioBox(props) {
  const [Value, setValue] = useState(0);

  const radioGroupHandler = event => {
    setValue(event.target.value);
    props.handleFilters(event.target.value);
  };

  const renderRadioBox = () =>
    props.list &&
    props.list.map(value => (
      <Radio key={value._id} value={value._id}>
        {value.name}
      </Radio>
    ));

  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Price" key="1">
          <Radio.Group onChange={radioGroupHandler} value={Value}>
            {renderRadioBox()}
          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  );
}

export default RadioBox;
