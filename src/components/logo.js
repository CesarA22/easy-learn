import { useNavigate } from "react-router-dom";
import "./logo.styles.css";
import logo from "../assets/logo.png";

export function Logo() {
  const navigate = useNavigate();
  return (
    <div className="logo">
      <img src={logo} alt="logo" className="logo__img" />
      <div className="logo__text" onClick={() => navigate("/")}>
        Easy Learn
      </div>
    </div>
  );
}
