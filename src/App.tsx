import {
  App,
  BoardInfo,
  IDataProvider,
} from "@alessiosatta/brello-business-logic";
import { useEffect, useState } from "react";
import BoardComponent from "./components/Board";

function AppComponent() {
  const [input, setInput] = useState<string>("");
  const [boards, setBoards] = useState<BoardInfo[]>([]);

  const dataProvider: IDataProvider = {
    createBoard(title) {
      const board: BoardInfo = {
        id: Math.floor(Math.random() * 1000).toString(36),
        title: title,
      };
      return setBoards([...boards, board]);
    },
    getBoards() {
      return boards;
    },
  } as IDataProvider;

  const app = new App(dataProvider);

  useEffect(() => {
    app.getBoards();
  }, []);

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={() => app.createBoard(input)}>Create board</button>
      {boards &&
        boards.map((board, i) => (
          <div key={i + board.id}>
            <BoardComponent id={board.id} title={board.title}></BoardComponent>
          </div>
        ))}
    </div>
  );
}

export default AppComponent;
