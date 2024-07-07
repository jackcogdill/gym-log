"use client";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";

const defaultWeight = 0; // TODO: read from previous log entry

export default function Page({ params }: { params: { exercise: string } }) {
  const [weight, setWeight] = useState(defaultWeight);
  const [sets, setSets] = useState<Array<number | undefined>>([]);
  const [note, setNote] = useState("");

  const createSetInput = (index: number) => {
    const id = `set-units-${index}`;
    return (
      <InputGroup className="mb-3">
        <Form.Control
          inputMode="numeric"
          pattern="[0-9]*"
          type="text"
          placeholder="-"
          aria-describedby={id}
          onChange={(e) => onChangeSet(index, e.target.value)}
        />
        <InputGroup.Text id={id}>reps</InputGroup.Text>
      </InputGroup>
    );
  };

  const setInputs = [];
  for (let i = 0; i < sets.length; ++i) {
    setInputs.push(createSetInput(i));
  }
  if (sets.length === 0 || sets[sets.length - 1] !== undefined) {
    setInputs.push(createSetInput(sets.length));
  }

  const onChangeSet = (index: number, value: string) => {
    const n = Number.parseInt(value);
    const newReps = Number.isNaN(n) ? undefined : n;
    const newSets = [...sets];
    newSets[index] = newReps;
    while (newSets.length > 0 && newSets[newSets.length - 1] === undefined) {
      newSets.pop();
    }
    setSets(newSets);
  };

  const onChangeWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setWeight(Number.parseInt(value));
  };

  // TODO: validation
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("weight", weight);
    console.log(
      "sets",
      sets.filter((x) => x),
    );
    console.log("note", note);
  };

  return (
    <div>
      <h1>{params.exercise}</h1>
      <Form noValidate onSubmit={onSubmit}>
        <Form.Label htmlFor="weight">Weight</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            id="weight"
            inputMode="numeric"
            pattern="[0-9]*"
            type="text"
            placeholder={`${defaultWeight}`}
            aria-describedby="weight-units"
            onChange={onChangeWeight}
          />
          <InputGroup.Text id="weight-units">lbs</InputGroup.Text>
        </InputGroup>

        <Form.Group className="mb-3">
          <Form.Label>Sets</Form.Label>
          {setInputs}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Note</Form.Label>
          <Form.Control
            id="note"
            type="text"
            onChange={(e) => setNote(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Log
        </Button>
      </Form>
    </div>
  );
}
