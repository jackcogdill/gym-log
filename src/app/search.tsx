import Form from "react-bootstrap/Form";

export default function Search() {
  return (
    <Form>
      <Form.Control
        type="text"
        size="lg"
        htmlSize={28}
        placeholder="Exercise"
      />
    </Form>
  );
}
