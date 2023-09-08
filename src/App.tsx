import { App, IBoard } from "@alessiosatta/brello-business-logic";
import { useState } from "react";

import "./style/App.scss";
import BoardComponent from "./components/Board";
import { Button } from "react-bootstrap";

type Props = {
  app: App;
};

const AppComponent: React.FC<Props> = ({ app }) => {
  const [boardsList, setBoardsList] = useState<IBoard[]>(app.getBoards());
  const [newBoardTitle, setNewBoardTitle] = useState<string>("");
  const [selectedBoard, setSelectedBoard] = useState<string>("");

  const dynamicBoardList = () =>
    boardsList.length > 0
      ? boardsList.map((board, i) => {
          if (board.title === selectedBoard)
            return (
              <div key={board.title}>
                <BoardComponent
                  board={board}
                  onDelete={onBoardDelete}
                  boardsList={boardsList}
                ></BoardComponent>
              </div>
            );
          return;
        })
      : null;

  const dynamicSelectionBoard = (boardsList: IBoard[]) =>
    boardsList.length > 0 ? (
      <>
        <label>Select a board</label>
        <select
          name="Board selection"
          value={selectedBoard}
          onChange={(e) => setSelectedBoard(e.target.value)}
          autoFocus={true}
        >
          <option key={"Default"}>-</option>
          {boardsList.map((board, i) => (
            <>
              <option value={board.title} key={i + board.title}>
                {board.title}
              </option>
            </>
          ))}
        </select>
      </>
    ) : null;

  const createBoard = () => {
    if (
      !boardsList.length ||
      !boardsList.find(
        (a) => a.title.toLowerCase() == newBoardTitle.toLowerCase()
      )
    ) {
      if (newBoardTitle.length) app.createBoard(newBoardTitle);
      else alert("Cannot creat a board without a title");
    } else {
      alert("This board already exist");
    }
    setBoardsList(app.getBoards());
    setNewBoardTitle("");
  };

  const handlerKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") createBoard();
  };

  const onBoardDelete = () => {
    setBoardsList(app.getBoards());
  };

  return (
    <div className="wrapper">
      <h1 className="app-title">iBrello</h1>
      <div className="app-handlers">
        <input
          type="text"
          value={newBoardTitle}
          placeholder="Insert Board Title"
          onChange={(e) => setNewBoardTitle(e.target.value)}
          onKeyDown={(e) => handlerKeyDown(e)}
        />

        <Button onClick={() => createBoard()} size="sm">
          Create board
        </Button>

        {dynamicSelectionBoard(boardsList)}
      </div>

      {dynamicBoardList()}
    </div>
  );
};

export default AppComponent;
