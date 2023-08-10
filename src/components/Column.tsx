import { IColumn, ITask } from "@alessiosatta/brello-business-logic";
import { useState } from "react";

import { DndManager, DndManagerData } from "../utils";
import TaskComponent from "./Task";
import { Button, Card } from "react-bootstrap";

type Props = {
  column: IColumn;
  dndManager: DndManager<DndManagerData>;
  onDelete: () => void;
};

const ColumnComponent: React.FC<Props> = ({ column, dndManager, onDelete }) => {
  const [columnTitle, setColumnTitle] = useState<string>(column.title);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState<string>("");
  const [tasksList, setTasksList] = useState<ITask[]>(column.getTasks());
  const [taskTitle, setTaskTitle] = useState<string>("");

  const dropHandler = (data: DndManagerData | null) => {
    // console.log(column.title);
    if (data) {
      const { sourceColumn, targetColumn } = data;
      if (column === sourceColumn || column === targetColumn)
        setTasksList(column.getTasks());
    }
  };
  dndManager.on("drop", dropHandler);

  const createTask = () => {
    column.createTask(taskTitle);
    setTasksList(column.getTasks());
    setTaskTitle("");
  };

  const deleteColumn = () => {
    dndManager.off("drop", dropHandler);
    column.delete();
    onDelete();
  };

  const handleDelete = () => {
    setDeleteConfirmation(true);
  };

  const deleteConfirmed = () => {
    deleteColumn();
    setDeleteConfirmation(false);
  };

  const deleteDenied = () => {
    setDeleteConfirmation(false);
  };

  const onDrop = () => {
    const data = dndManager.getData() || {};
    dndManager.setData({ ...data, targetColumn: column });
    dndManager.trigger("drop");
  };

  const onTaskDelete = () => {
    setTasksList(column.getTasks());
  };

  const updateColumnTitle = () => {
    setNewColumnTitle("");
    column.updateTitle(newColumnTitle);
    setColumnTitle(column.title);
  };

  return (
    <div onDragOver={(e) => e.preventDefault()} onDrop={() => onDrop()}>
      <h2>{columnTitle}</h2>
      <input
        type="text"
        value={newColumnTitle}
        placeholder="Insert a new Column's title"
        onChange={(e) => {
          setNewColumnTitle(e.target.value);
        }}
      />
      <Button size="sm" onClick={() => updateColumnTitle()}>
        Update Column Title
      </Button>
      <br />
      <input
        type="text"
        value={taskTitle}
        placeholder="Insert Task title"
        onChange={(e) => setTaskTitle(e.target.value)}
      />

      <Button size="sm" onClick={() => createTask()}>
        Create task
      </Button>
      <br />

      <Button size="sm" variant="danger" onClick={() => handleDelete()}>
        Delete column
      </Button>

      {deleteConfirmation && (
        <>
          <h1>Delete this column and all it's content?</h1>
          <Button size="lg" variant="danger" onClick={() => deleteConfirmed()}>
            Yes
          </Button>
          <Button size="lg" onClick={() => deleteDenied()}>
            No!
          </Button>
        </>
      )}

      {tasksList &&
        tasksList.map((task, i) => (
          <div key={i + task.title}>
            <Card bg={"secondary"}>
              <Card.Body>
                <TaskComponent
                  column={column}
                  dndManager={dndManager}
                  task={task}
                  onDelete={onTaskDelete}
                ></TaskComponent>
              </Card.Body>
            </Card>
          </div>
        ))}
    </div>
  );
};

export default ColumnComponent;
