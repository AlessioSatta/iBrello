import { IBoard, IColumn } from "@alessiosatta/brello-business-logic";
import React from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import "../style/Board.scss";
import { DndManager, DndManagerData } from "../utils";
import ColumnComponent from "./Column";

type Props = {
  board: IBoard;
  onDelete: () => void;
};

const BoardComponent: React.FC<Props> = ({ board, onDelete }) => {
  const [boardTitle, setBoardTitle] = useState<string>(board.title);
  const [columnsList, setColumnsList] = useState<IColumn[]>(board.getColumns());
  const [newBoardTitle, setNewBoardTitle] = useState<string>("");
  const [newColumnTitle, setNewColumnTitle] = useState<string>("");

  const dndManager = new DndManager<DndManagerData>();
  dndManager.on("drop", (data) => {
    if (data) {
      const { task, targetColumn } = data;
      if (task && targetColumn) task.moveToColumn(targetColumn);
    }
  });

  const createColum = () => {
    board.createColum(newColumnTitle);
    setColumnsList(board.getColumns());
    setNewColumnTitle("");
  };

  const deleteBoard = () => {
    board.delete();
    onDelete();
  };

  const onColumnDelete = () => {
    setColumnsList(board.getColumns());
  };

  const updateBoardTitle = () => {
    setNewBoardTitle("");
    board.updateTitle(newBoardTitle);
    setBoardTitle(board.title);
  };

  return (
    <div className="wrapper">
      <h1>{boardTitle}</h1>
      <input
        type="text"
        value={newBoardTitle}
        onChange={(e) => setNewBoardTitle(e.target.value)}
      />
      <button onClick={() => updateBoardTitle()}>Update Board Title</button>
      <input
        type="text"
        value={newColumnTitle}
        onChange={(e) => setNewColumnTitle(e.target.value)}
      />
      <button onClick={() => createColum()}>Create columm</button>
      <button onClick={() => deleteBoard()}>Delete board</button>
      <Container fluid={true}>
        <Row md={"auto"} xl={{ cols: 12 }} xxl={"auto"} className="column-size">
          {columnsList.map((column, i) => (
            <div key={i + column.title}>
              <Col xl={"auto"}>
                <ColumnComponent
                  column={column}
                  dndManager={dndManager}
                  onDelete={onColumnDelete}
                ></ColumnComponent>
              </Col>
            </div>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default React.memo(BoardComponent);
