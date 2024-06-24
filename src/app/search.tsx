"use client";

import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Link from "next/link";
import { useState } from "react";

export default function Search({ exercises }: { exercises: string[] }) {
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
          {Array.from(exercises.entries()).map(([i, name]) => (
            <Dropdown.Item as={Link} href={`/exercises/${name}`} key={i}>
              {name}
            </Dropdown.Item>
          ))}
          {value && !exercises.includes(value) ? (
            <>
              <Dropdown.Divider />
              <Dropdown.Item
                as={Link}
                href={`/exercises/${value}`}
                key={exercises.length}
              >
                {`＋ ${value}`}
              </Dropdown.Item>
            </>
          ) : null}
        </Dropdown.Menu>
      </Dropdown>
    </Form>
  );
}
