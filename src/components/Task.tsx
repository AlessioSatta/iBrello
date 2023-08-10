import { IColumn, ITask } from "@alessiosatta/brello-business-logic";
import { useState } from "react";

import { DndManager, DndManagerData } from "../utils";
import { Button } from "react-bootstrap";

type Props = {
  column: IColumn;
  dndManager: DndManager<DndManagerData>;
  task: ITask;
  onDelete: () => void;
};

const TaskComponent: React.FC<Props> = ({
  column,
  dndManager,
  task,
  onDelete,
}) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [taskTitle, setTaskTitle] = useState<string>(task.title);

  const deleteTask = () => {
    task.delete();
    onDelete();
  };

  const handleDelete = () => {
    setDeleteConfirmation(true);
  };

  const handlerKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") updateTaskTitle();
  };

  const deleteConfirmed = () => {
    deleteTask();
    setDeleteConfirmation(false);
  };

  const deleteDenied = () => {
    setDeleteConfirmation(false);
  };

  const onDragStart = () => {
    dndManager.setData({ task, sourceColumn: column });
    dndManager.trigger("dragstart");
  };

  const updateTaskTitle = () => {
    setNewTaskTitle("");
    task.updateTitle(newTaskTitle);
    setTaskTitle(task.title);
  };

  return (
    <div
      draggable={true}
      onDragOver={(e) => e.preventDefault()}
      onDragStart={() => onDragStart()}
    >
      <h3>{taskTitle}</h3>

      <input
        type="text"
        value={newTaskTitle}
        placeholder="Insert a new Task's title"
        onChange={(e) => setNewTaskTitle(e.target.value)}
        onKeyDown={(e) => handlerKeyDown(e)}
      />
      <Button size="sm" onClick={() => updateTaskTitle()}>
        Update Task Title
      </Button>

      <Button size="sm" variant="danger" onClick={() => handleDelete()}>
        Delete Task
      </Button>

      {deleteConfirmation && (
        <>
          <h1>Delete this task?</h1>
          <Button size="lg" variant="danger" onClick={() => deleteConfirmed()}>
            Yes
          </Button>
          <Button size="lg" onClick={() => deleteDenied()}>
            No!
          </Button>
        </>
      )}
    </div>
  );
};

export default TaskComponent;
