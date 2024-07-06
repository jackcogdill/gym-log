import Search from "./search";
import Header from "./header";

export default function Page() {
  return (
    <>
      <Header />
      <div className="h-50 d-flex align-items-center justify-content-center ">
        <Search exercises={["bench", "squat", "row"]} />
      </div>
    </>
  );
}
