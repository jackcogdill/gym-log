"use client";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import {
  logExercise,
  subscribeExercise,
  ExerciseLog,
} from "../../../../lib/db";
import { useAuth } from "../../../../lib/context/auth";

const createSet = () => ({ id: Date.now(), value: "" });

export default function Page({ params }: { params: { exercise: string } }) {
  const exercise = decodeURIComponent(params.exercise);
  const { user } = useAuth();
  const [weight, setWeight] = useState("");
  const [sets, setSets] = useState([createSet()]);
  const [note, setNote] = useState("");
  const [validated, setValidated] = useState(false);
  const [history, setHistory] = useState<ExerciseLog[]>([]);

  useEffect(() => {
    return subscribeExercise(user!, exercise, (snapshot) => {
      const newHistory: ExerciseLog[] = [];
      snapshot.forEach((doc) => {
        if (!doc.exists()) return;
        newHistory.push(doc.data() as ExerciseLog);
      });
      newHistory.sort((a, b) => b.timestamp - a.timestamp); // descending
      setHistory(newHistory);
    });
  }, []);

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
      exercise,
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
      <h1>{exercise}</h1>
      <Form
        noValidate
        validated={validated}
        onSubmit={onSubmit}
        className="mb-5"
      >
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
      <h2>History</h2>
      <Table
        striped
        bordered
        hover
        responsive
        style={{
          wordBreak: "break-all", // prevent overflow
        }}
      >
        <thead>
          <tr>
            <th>Weight</th>
            <th>Sets</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {history.map((log) => (
            <>
              <tr key={log.timestamp}>
                <td>{log.weight}</td>
                <td>{log.sets.join(" ")}</td>
                <td>{new Date(log.timestamp).toDateString()}</td>
              </tr>
              {log.note && (
                <tr key={log.timestamp + "_"}>
                  <td colSpan={3}>{log.note}</td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
