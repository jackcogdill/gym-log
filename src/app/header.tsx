import Button from "react-bootstrap/Button";
import { useAuth } from "../lib/context/auth";
import { signOut } from "../lib/firebase/actions";

export default function Header() {
  const { user } = useAuth();
  return (
    <div className="d-flex align-items-center justify-content-end">
      {user!.displayName}
      <Button variant="secondary" size="sm" className="ms-2" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}
