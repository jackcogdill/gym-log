"use client";

import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Link from "next/link";
import { getExerciseNames } from "../lib/db";
import { useAuth } from "../lib/context/auth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Search() {
  const { user } = useAuth();
  const router = useRouter();
  const [exercises, setExercises] = useState<string[]>([]);
  const [exercise, setExercise] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    getExerciseNames(user!).then(setExercises);
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setExercise(value);
    setShowDropdown(!!value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/exercises/${exercise}`);
  };

  // TODO: fuzzy search
  const items = [];
  for (const [i, name] of Array.from(exercises.entries())) {
    items.push(
      <Dropdown.Item as={Link} href={`/exercises/${name}`} key={i}>
        {name}
      </Dropdown.Item>,
    );
  }
  if (exercise && !exercises.includes(exercise)) {
    items.push(<Dropdown.Divider />);
    items.push(
      <Dropdown.Item
        as={Link}
        href={`/exercises/${exercise}`}
        key={exercises.length}
      >
        {`＋ ${exercise}`}
      </Dropdown.Item>,
    );
  }

  return (
    <Form onSubmit={onSubmit}>
      <Form.Control
        type="text"
        size="lg"
        htmlSize={28}
        placeholder="Exercise"
        onChange={onChange}
      />
      <Dropdown show={showDropdown}>
        <Dropdown.Menu className="w-100 mt-2">{items}</Dropdown.Menu>
      </Dropdown>
    </Form>
  );
}
