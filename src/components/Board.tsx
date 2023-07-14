import {
  Board,
  BoardInfo,
  ColumnInfo,
  IDataProvider,
} from "@alessiosatta/brello-business-logic";
import { useEffect, useState } from "react";
import ColumnComponent from "./Column";

const BoardComponent = (props: any) => {
  const { id, title, boardsList, setBoardsList } = props;
  const [inputBoard, setInputBoard] = useState<string>("");
  const [inputColumn, setInputColumn] = useState<string>("");
  const [newBoardTitle, setNewBoardTitle] = useState<string>("");
  const [columns, setColumns] = useState<ColumnInfo[]>([
    {
      boardId: id,
      id: Math.floor(Math.random() * 1000).toString(36),
      title: "Colonna 1",
    },
  ]);

  const dataProvider: IDataProvider = {
    createColum(boardId, title) {
      const columm: ColumnInfo = {
        id: Math.floor(Math.random() * 1000).toString(36),
        title: title,
        boardId: boardId,
      };
      return setColumns([...columns, columm]);
    },
    deleteBoard(boardId) {
      setBoardsList((current: BoardInfo[]) => {
        return current.filter((a) => a.id != boardId);
      });
    },
    getColumns(boardId) {
      if (boardId) return columns;
    },
    upateBoardTitle(boardId, title) {
      if (boardId) setNewBoardTitle(title);
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
        value={inputBoard}
        onChange={(e) => {
          setInputBoard(e.target.value);
        }}
      />
      <button onClick={() => board.updateTitle(inputBoard)}>
        Update Board Title
      </button>
      <button onClick={() => board.delete()}>Delete board</button>
      <input
        type="text"
        value={inputColumn}
        onChange={(e) => setInputColumn(e.target.value)}
      />
      <button onClick={() => board.createColum(inputColumn)}>
        Create columm
      </button>
      {columns &&
        columns.map((column, i) => (
          <div key={i + column.id}>
            <ColumnComponent
              id={column.id}
              title={column.title}
              boardId={id}
              setColumns={() => setColumns([])}
              columns={columns}
            ></ColumnComponent>
          </div>
        ))}
    </>
  );
};

export default BoardComponent;
