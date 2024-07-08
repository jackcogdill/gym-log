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
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    getExerciseNames(user!).then(setExercises);
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
    setShowDropdown(!!value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/exercises/${query}`);
  };

  // TODO: fuzzy search
  const items = [];
  for (const exercise of exercises) {
    items.push(
      <Dropdown.Item as={Link} href={`/exercises/${exercise}`} key={exercise}>
        {exercise}
      </Dropdown.Item>,
    );
  }
  if (query && !exercises.includes(query)) {
    items.push(<Dropdown.Divider key={"__divider"} />);
    items.push(
      <Dropdown.Item as={Link} href={`/exercises/${query}`} key={query}>
        {`＋ ${query}`}
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
