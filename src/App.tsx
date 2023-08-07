import { App, IBoard } from "@alessiosatta/brello-business-logic";
import { useState } from "react";
import BoardComponent from "./components/Board";

type Props = {
  app: App;
};

const AppComponent: React.FC<Props> = ({ app }) => {
  const [boardsList, setBoardsList] = useState<IBoard[]>(app.getBoards());
  const [newBoardTitle, setNewBoardTitle] = useState<string>("");

  const createBoard = () => {
    app.createBoard(newBoardTitle);
    setBoardsList(app.getBoards());
  };

  const onBoardDelete = () => {
    setBoardsList(app.getBoards());
  };

  return (
    <>
      <input
        type="text"
        value={newBoardTitle}
        onChange={(e) => setNewBoardTitle(e.target.value)}
      />
      <button onClick={() => createBoard()}>Create board</button>
      {boardsList.map((board, i) => (
        <div key={i + board.title}>
          <BoardComponent
            board={board}
            onDelete={onBoardDelete}
          ></BoardComponent>
        </div>
      ))}
    </>
  );
};

export default AppComponent;
