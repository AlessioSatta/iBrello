import { ITask } from "@alessiosatta/brello-business-logic";
import { useState } from "react";

import { IDndManager } from "../dnd-manager";

type Props = {
  dndManager: IDndManager<ITask>;
  task: ITask;
  onDelete: () => void;
};

const TaskComponent: React.FC<Props> = ({ dndManager, task, onDelete }) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [taskTitle, setTaskTitle] = useState<string>(task.title);

  const deleteTask = () => {
    task.delete();
    onDelete();
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
      onDragStart={() => dndManager.onDragStart(task)}
      style={{ marginLeft: "2em" }}
    >
      <h1>{taskTitle}</h1>
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
      />
      <button onClick={() => updateTaskTitle()}>Update Task Title</button>
      <button onClick={() => deleteTask()}>Delete Task</button>
    </div>
  );
};

export default TaskComponent;
