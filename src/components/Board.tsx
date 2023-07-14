import {
  Board,
  ColumnInfo,
  IDataProvider,
} from "@alessiosatta/brello-business-logic";
import { useEffect, useState } from "react";

const BoardComponent = (props: any) => {
  const { id, title } = props;
  const [input, setInput] = useState<string>("");
  const [newBoardTitle, setNewBoardTitle] = useState<string>("");
  const [columns, setColumns] = useState<ColumnInfo[]>([]);

  const dataProvider: IDataProvider = {
    upateBoardTitle(boardId, title) {
      if (boardId) setNewBoardTitle(title);
    },
    deleteBoard(boardId) {},
    getColumns(boardId) {
      if (boardId) return columns;
    },
    createColum(boardId, title) {
      const columm: ColumnInfo = {
        id: Math.floor(Math.random() * 1000).toString(36),
        title: title,
        boardId: boardId,
      };
      return setColumns([...columns, columm]);
    },
  } as IDataProvider;

  const board = new Board({ id, title }, dataProvider);

  useEffect(() => {
    board.getColumns();
  }, [columns]);

  return (
    <>
      <h1>{newBoardTitle || title}</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <button onClick={() => board.updateTitle(input)}>
        Update Board Title
      </button>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={() => board.createColum("TItolo")}>Create columm</button>
      {columns &&
        columns.map((column, i) => (
          <div key={i + column.id}>
            <ColumnComponent
              id={column.id}
              title={column.title}
              boardId={id}
            ></ColumnComponent>
          </div>
        ))}
    </>
  );
};

export default BoardComponent;
