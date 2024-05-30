import { useEffect, useState } from "react";
import { addBoard, getBoard } from "../api/board";

const Board = () => {
  const [name, setName] = useState(null);
  const [text, setText] = useState(null);
  const [viewData, setViewData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getBoard();
      console.log(response);
      setViewData(response.data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const submitData = async (e) => {
    try {
      e.preventDefault();
      const data = { name, text };
      await addBoard(data);
      setName(null);
      setText(null);
      fetchData();
    } catch (error) {
      console.log(error.response?.data.message);
    }
  };

  // const handleKeyPress = (event) => {
  //   if (event.key === "Enter") {
  //     submitData();
  //   }
  // };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <label htmlFor="name" />
        <input
          id="name"
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
          value={name === null ? "" : name}
        />
        <label htmlFor="text" />
        <input
          id="text"
          type="text"
          placeholder="text"
          onChange={(e) => setText(e.target.value)}
          value={text === null ? "" : text}
        />
      </div>
      <div>
        <button onClick={submitData}>submit</button>
      </div>
      <div>
        {viewData.map((el, i) => (
          <div key={i}>
            <p>
              <b>{el.name}</b> : {el.text}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Board;
