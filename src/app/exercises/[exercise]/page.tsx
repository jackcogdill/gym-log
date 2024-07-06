import Header from "../../header";

export default function Page({ params }: { params: { exercise: string } }) {
  return (
    <>
      <Header />
      <div>Hello, {params.exercise}</div>
    </>
  );
}
