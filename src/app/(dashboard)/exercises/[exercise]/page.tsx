"use client";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import { logExercise } from "../../../../lib/db";
import { useAuth } from "../../../../lib/context/auth";

const defaultWeight = 0; // TODO: read from previous log entry

const createSet = () => ({ id: Date.now(), value: "" });

export default function Page({ params }: { params: { exercise: string } }) {
  const { user } = useAuth();
  const [weight, setWeight] = useState(defaultWeight);
  const [sets, setSets] = useState([createSet()]);
  const [note, setNote] = useState("");

  const onChangeSet = (index: number, value: string) => {
    const newSets = [...sets];
    newSets[index].value = value;
    while (newSets.length - 1 > index && !newSets[newSets.length - 1].value) {
      newSets.pop();
    }
    if (newSets.length > 0 && newSets[newSets.length - 1].value) {
      newSets.push(createSet());
    }
    setSets(newSets);
  };

  const onChangeWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setWeight(Number.parseInt(value));
  };

  // TODO: validation
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const { currentTarget } = e;
    e.preventDefault();

    const success = await logExercise(user!, {
      exercise: params.exercise,
      weight,
      sets: sets
        .map(({ value }) => Number.parseInt(value))
        .filter(Number.isInteger),
      note,
      timestamp: Date.now(),
    });

    // Reset form
    if (success) {
      setSets([createSet()]);
      currentTarget.reset();
    }
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
          {sets.map((set, i) => (
            <InputGroup className="mb-3" key={set.id}>
              <Form.Control
                inputMode="numeric"
                pattern="[0-9]*"
                type="text"
                value={set.value}
                onChange={(e) => onChangeSet(i, e.target.value)}
              />
            </InputGroup>
          ))}
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
