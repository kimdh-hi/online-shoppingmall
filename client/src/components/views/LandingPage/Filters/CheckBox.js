import React, { useState } from "react";
import { Collapse, Checkbox } from "antd";
const { Panel } = Collapse;

function CheckBox(props) {
  const [Checked, setChecked] = useState([]);

  const checkBoxhandler = id => {
    const currentIndex = Checked.indexOf(id); // 있으면 해당 인덱스, 없으면 -1 반환

    const newChecked = [...Checked];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    props.handleFilters(newChecked);
  };

  const renderCheckbox = () =>
    props.list &&
    props.list.map((value, index) => (
      <Checkbox
        key={index}
        onChange={() => checkBoxhandler(value._id)}
        checked={Checked.indexOf(value._id) === -1 ? false : true}
      >
        <span>{value.name}</span>
      </Checkbox>
    ));

  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Country" key="1">
          {renderCheckbox()}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBox;
