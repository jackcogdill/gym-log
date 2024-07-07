import Search from "../search";

export default function Page() {
  // TODO: read from db
  return <Search exercises={["bench", "squat", "row"]} />;
}
