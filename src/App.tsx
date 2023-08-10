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

  const createBoard = () => {
    app.createBoard(newBoardTitle);
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
          placeholder="Insert Board title"
          onChange={(e) => setNewBoardTitle(e.target.value)}
          onKeyDown={(e) => handlerKeyDown(e)}
        />

        <Button onClick={() => createBoard()} size="sm">
          Create board
        </Button>

        <select
          name="Select Board"
          value={selectedBoard}
          onChange={(e) => setSelectedBoard(e.target.value)}
          defaultValue="Default"
          autoFocus={true}
        >
          <option value="Default">Select a Board</option>
          {boardsList.map((board, i) => (
            <option value={board.title} key={i + board.title}>
              {board.title}
            </option>
          ))}
        </select>
      </div>

      {boardsList.map((board, i) => {
        if (board.title === selectedBoard)
          return (
            <div key={i + board.title}>
              <BoardComponent
                board={board}
                onDelete={onBoardDelete}
              ></BoardComponent>
            </div>
          );
        return;
      })}
    </div>
  );
};

export default AppComponent;
