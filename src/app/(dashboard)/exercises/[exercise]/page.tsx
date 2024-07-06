export default function Page({ params }: { params: { exercise: string } }) {
  return <div>Hello, {params.exercise}</div>;
}
