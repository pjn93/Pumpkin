import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import CallofDuty from "./CallofDuty";
import Gta from "./Gta";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import axios from "axios";

function App() {
  const navigate = useNavigate();
  const [navActive, setNavActive] = useState("home");
  const [data, setData] = useState({});

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp") {
        // Go to the previous route
        navigate("/gta");
        console.log("gta:");
        setNavActive("gta");
      } else if (event.key === "ArrowDown") {
        // Go to the next route
        navigate("/");
        setNavActive("home");
        console.log("home:");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await axios.get(
      "https://run.mocky.io/v3/31709b10-7d7a-448f-8d52-103cfaca1875"
    );
    setData(data);
  };

  return (
    <div className="App">
      <Header navActive={navActive} />
      <Routes>
        <Route path="/" element={<CallofDuty data={data?.games?.[0]} />} />
        <Route path="/gta" element={<Gta data={data?.games?.[1]} />} />
      </Routes>
    </div>
  );
}

export default App;
