import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";

export default function Search({ names }: { names: string[] }) {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
    setShow(!!value);
  };

  return (
    <Form>
      <Form.Control
        type="text"
        size="lg"
        htmlSize={28}
        placeholder="Exercise"
        onChange={onChange}
        value={value}
      />
      <Dropdown show={show}>
        <Dropdown.Menu className="w-100 mt-2">
          {Array.from(names.entries()).map(([i, name]) => (
            <Dropdown.Item eventKey={i}>{name}</Dropdown.Item>
          ))}
          {value && !names.includes(value) ? (
            <>
              <Dropdown.Divider />
              <Dropdown.Item
                eventKey={names.length}
              >{`＋ ${value}`}</Dropdown.Item>
            </>
          ) : null}
        </Dropdown.Menu>
      </Dropdown>
    </Form>
  );
}
