import {
  App,
  BoardInfo,
  IDataProvider,
} from "@alessiosatta/brello-business-logic";
import { useEffect, useState } from "react";
import BoardComponent from "./components/Board";

function AppComponent() {
  const [input, setInput] = useState<string>("");
  const [boardsList, setBoardsList] = useState<BoardInfo[]>([]);

  const dataProvider: IDataProvider = {
    createBoard(title) {
      const board: BoardInfo = {
        id: Math.floor(Math.random() * 1000).toString(),
        title: title,
      };
      return setBoardsList([...boardsList, board]);
    },
    getBoards() {
      return boardsList;
    },
  } as IDataProvider;

  const app = new App(dataProvider);

  useEffect(() => {
    app.getBoards();
  }, [boardsList]);

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={() => app.createBoard(input)}>Create board</button>
      {boardsList &&
        boardsList.map((board, i) => (
          <div key={i + board.id}>
            <BoardComponent
              id={board.id}
              title={board.title}
              setBoardsList={setBoardsList}
            ></BoardComponent>
          </div>
        ))}
    </div>
  );
}

export default AppComponent;
