import { IBoard, IColumn } from "@alessiosatta/brello-business-logic";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

import "../style/Board.scss";
import { DndManager, DndManagerData } from "../utils";
import ColumnComponent from "./Column";

type Props = {
  board: IBoard;
  onDelete: () => void;
  setBoardTitleValidation: any;
};

const BoardComponent: React.FC<Props> = ({
  board,
  onDelete,
  setBoardTitleValidation,
}) => {
  const [boardTitle, setBoardTitle] = useState<string>(board.title);
  const [columnsList, setColumnsList] = useState<IColumn[]>(board.getColumns());
  const [columnTitleValidation, setColumnTitleValidation] =
    useState<string>("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState<string>("");
  const [newColumnTitle, setNewColumnTitle] = useState<string>("");
  const [sameColumnTitleAlert, setSameColumnTitleAlter] =
    useState<boolean>(false);

  const dndManager = new DndManager<DndManagerData>();
  dndManager.on("drop", (data) => {
    if (data) {
      const { task, targetColumn } = data;
      if (task && targetColumn) task.moveToColumn(targetColumn);
    }
  });

  const createColum = () => {
    if (!sameColumnTitleAlert) board.createColum(newColumnTitle);
    setColumnsList(board.getColumns());
    setNewColumnTitle("");
  };

  const deleteBoard = () => {
    board.delete();
    onDelete();
  };

  const handleDelete = () => {
    setDeleteConfirmation(true);
  };

  const handlerKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") createColum();
  };

  const deleteConfirmed = () => {
    deleteBoard();
    setDeleteConfirmation(false);
  };

  const deleteDenied = () => {
    setDeleteConfirmation(false);
  };

  const onColumnDelete = () => {
    setColumnsList(board.getColumns());
  };

  const updateBoardTitle = () => {
    setNewBoardTitle("");
    board.updateTitle(newBoardTitle);
    setBoardTitle(board.title);
  };

  useEffect(() => {
    setBoardTitleValidation(board.title);
    if (columnTitleValidation.toLowerCase() != newColumnTitle.toLowerCase()) {
      setSameColumnTitleAlter(false);
    } else {
      setSameColumnTitleAlter(true);
    }
  }, [columnTitleValidation, newColumnTitle, board.title]);

  return (
    <div className="wrapper">
      <div className="board-nav">
        <h1 className="board-title">{boardTitle}</h1>

        <div className="board-handlers">
          <input
            type="text"
            value={newBoardTitle}
            placeholder="Insert a new Board's Title"
            onChange={(e) => setNewBoardTitle(e.target.value)}
          />
          <Button size="sm" onClick={() => updateBoardTitle()}>
            Update Board Title
          </Button>

          <br />

          <input
            type="text"
            value={newColumnTitle}
            placeholder="Insert Column title"
            onChange={(e) => setNewColumnTitle(e.target.value)}
            onKeyDown={(e) => handlerKeyDown(e)}
          />
          <Button
            size="sm"
            onClick={() => createColum()}
            disabled={sameColumnTitleAlert}
          >
            Create columm
          </Button>

          <Button size="sm" variant="danger" onClick={() => handleDelete()}>
            Delete board
          </Button>
          {deleteConfirmation && (
            <>
              <h1>Delete this board and all it's content?</h1>
              <Button
                size="lg"
                variant="danger"
                onClick={() => deleteConfirmed()}
              >
                Yes
              </Button>
              <Button size="lg" onClick={() => deleteDenied()}>
                No!
              </Button>
            </>
          )}
        </div>
      </div>

      <Container fluid={true}>
        <Row md={"auto"} xl={{ cols: 12 }} xxl={"auto"} className="column-size">
          {columnsList.map((column, i) => (
            <div key={i + column.title}>
              <Col xl={"auto"}>
                <Card bg={"success"}>
                  <ColumnComponent
                    column={column}
                    dndManager={dndManager}
                    onDelete={onColumnDelete}
                    setColumnTitleValidation={setColumnTitleValidation}
                  ></ColumnComponent>
                </Card>
              </Col>
            </div>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default React.memo(BoardComponent);
