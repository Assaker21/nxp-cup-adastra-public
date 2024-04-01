import Textarea from "@mui/joy/Textarea";
import Typography from "@mui/joy/Typography";
import VectorCanvas from "./VectorCanvas";
import { convertStringToJson } from "./utils";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [vectors, setVectors] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const result = convertStringToJson(inputValue);
    if (!result?.allVectors) return;

    setVectors([
      {
        startX: result.mainVector.x0 * 10,
        startY: result.mainVector.y0 * 10,
        endX: result.mainVector.x1 * 10,
        endY: result.mainVector.y1 * 10,
        color: "green",
        lineWidth: 5,
      },
      ...result.allVectors.map((vector) => ({
        startX: vector.x0 * 10,
        startY: vector.y0 * 10,
        endX: vector.x1 * 10,
        endY: vector.y1 * 10,
        color: !vector.ignored ? "red" : "gray",
        lineWidth: 3,
      })),
      ...result.allTransformedVectors.map((vector) => ({
        startX: vector.x0 * 10,
        startY: vector.y0 * 10,
        endX: vector.x1 * 10,
        endY: vector.y1 * 10,
        color: !vector.ignored ? "blue" : "gray",
        lineWidth: 3,
      })),
    ]);
  }, [inputValue]);

  return (
    <>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "12px",
          margin: "0 auto",
          width: "100%",
          maxWidth: "800px",
        }}
      >
        <Textarea
          value={inputValue}
          onChange={({ target }) => {
            setInputValue(target.value);
          }}
          label="Input"
          minRows={10}
        />
        <VectorCanvas vectors={vectors} />
      </section>
    </>
  );
}

export default App;
