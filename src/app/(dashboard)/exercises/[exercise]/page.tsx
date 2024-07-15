"use client";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { logExercise } from "../../../../lib/db";
import { useAuth } from "../../../../lib/context/auth";

const createSet = () => ({ id: Date.now(), value: "" });

export default function Page({ params }: { params: { exercise: string } }) {
  const { user } = useAuth();
  const [weight, setWeight] = useState("");
  const [sets, setSets] = useState([createSet()]);
  const [note, setNote] = useState("");
  const [validated, setValidated] = useState(false);

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedWeight = Number.parseInt(weight);
    const parsedSets = sets
      .map(({ value }) => Number.parseInt(value))
      .filter(Number.isInteger);

    const valid = Number.isInteger(parsedWeight) && parsedSets.length > 0;
    setValidated(!valid);
    if (!valid) return;

    const success = await logExercise(user!, {
      exercise: params.exercise,
      weight: parsedWeight,
      sets: parsedSets,
      note,
      timestamp: Date.now(),
    });

    // Reset form
    if (success) {
      setWeight("");
      setSets([createSet()]);
      setNote("");
    }
  };

  return (
    <div>
      <h1>{params.exercise}</h1>
      <Form noValidate validated={validated} onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Weight</Form.Label>
          <Form.Control
            required
            inputMode="numeric"
            pattern="[0-9]*"
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Sets</Form.Label>
          {sets.map((set, i) => (
            <Form.Control
              required={sets.length == 1 || i < sets.length - 1}
              className="mb-3"
              key={set.id}
              inputMode="numeric"
              pattern="[0-9]*"
              type="text"
              value={set.value}
              onChange={(e) => onChangeSet(i, e.target.value)}
            />
          ))}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Note</Form.Label>
          <Form.Control
            id="note"
            type="text"
            value={note}
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
