import Search from "./search";

export default function Page() {
  return (
    <div className="h-50 d-flex align-items-center justify-content-center ">
      <Search exercises={["bench", "squat", "row"]} />
    </div>
  );
}
