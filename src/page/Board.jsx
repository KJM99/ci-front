import { useEffect, useState } from "react";
import {
  addBoard,
  addBoardComment,
  deleteComment,
  getBoard,
  getComment,
} from "../api/board";

const Board = () => {
  const [name, setName] = useState(null);
  const [text, setText] = useState(null);
  const [viewData, setViewData] = useState([]);
  const [comment, setComment] = useState(null);
  const [commentData, setCommentData] = useState([]);
  const [inputData, setInputData] = useState([]);

  const fetchData = async () => {
    try {
      const response1 = await getBoard();
      setViewData(response1.data);
      const response2 = await getComment();
      setCommentData(response2.data);
      console.log(commentData);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const addData = async (e) => {
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

  const onClickDelete = async (commentId, boardId) => {
    try {
      const del = { commentId, boardId };
      await deleteComment(del);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async (boardId) => {
    if (comment === null) {
      alert("댓글을 입력해주세요!");
      return;
    }
    const update = [...inputData];
    update[boardId] = null;
    try {
      const com = { boardId, comment };
      // post 요청
      await addBoardComment(com);
      setComment(null);
      setInputData(update);
      fetchData();
    } catch (error) {
      console.log(error);
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

  const handleInputChange = (e, index) => {
    const update = [...inputData];
    update[index] = e.target.value;
    setComment(update[index]);
    setInputData(update);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
        }}
      >
        <input
          id="name"
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
          value={name === null ? "" : name}
        />
        <input
          id="text"
          type="text"
          placeholder="text"
          onChange={(e) => setText(e.target.value)}
          value={text === null ? "" : text}
        />
        <button onClick={addData}>add</button>
      </div>
      <div>
        {viewData.map((el, i) => (
          <div
            key={i}
            style={{
              border: "1px solid black",
            }}
          >
            <p style={{ marginLeft: "1rem" }}>
              <b>이름 : {el.name}</b>
            </p>
            <p style={{ marginLeft: "1rem" }}>내용 : {el.text}</p>
            <hr />
            <div>
              {commentData
                .filter((comment) => comment.boardId === i)
                .map((el1, j) => (
                  <div
                    key={j}
                    style={{
                      marginLeft: "2rem",
                      marginRight: "2rem",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p> ┗ {el1.comment}</p>
                    <button
                      style={{
                        width: "1rem",
                      }}
                      onClick={() => onClickDelete(el1.id, i)}
                    >
                      X
                    </button>
                  </div>
                ))}
            </div>
            <hr />
            <div
              key={i}
              style={{
                marginLeft: "1rem",
                display: "flex",
                marginBottom: "0.5rem",
              }}
            >
              <input
                id="comment"
                type="text"
                placeholder="comment"
                // onChange={(e) => setComment(e.target.value)}
                onChange={(e) => handleInputChange(e, i)}
                // value={comment === null ? "" : comment}
                value={inputData[i] || ""}
                style={{ width: "-webkit-fill-available" }}
              />
              <button onClick={() => addComment(i)}>Comment</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Board;
