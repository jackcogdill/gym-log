"use client";

import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Link from "next/link";
import { HighlightRanges } from "@nozbe/microfuzz";
import { getExerciseNames } from "../lib/db";
import { useAuth } from "../lib/context/auth";
import { useFuzzySearchList, Highlight } from "@nozbe/microfuzz/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface SearchResult {
  item: string;
  highlightRanges: HighlightRanges | null;
}

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

  const filteredExercises: SearchResult[] = useFuzzySearchList({
    list: exercises,
    queryText: query,
    mapResultItem: ({ item, matches: [highlightRanges] }) => ({
      item,
      highlightRanges,
    }),
  });

  const results = filteredExercises.map(({ item, highlightRanges }) => (
    <Dropdown.Item as={Link} href={`/exercises/${item}`} key={item}>
      <Highlight
        text={item}
        ranges={highlightRanges}
        className={"text-bg-primary"}
      />
    </Dropdown.Item>
  ));

  if (query && !exercises.includes(query)) {
    results.push(<Dropdown.Divider key={"__divider"} />);
    results.push(
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
        <Dropdown.Menu className="w-100 mt-2">{results}</Dropdown.Menu>
      </Dropdown>
    </Form>
  );
}
