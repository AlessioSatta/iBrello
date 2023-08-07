import { IColumn, ITask } from "@alessiosatta/brello-business-logic";
import { useState } from "react";
import TaskComponent from "./Task";

type Props = {
  column: IColumn;
  onDelete: () => void;
};

const ColumnComponent: React.FC<Props> = ({ column, onDelete }) => {
  const [tasksList, setTasksList] = useState<ITask[]>(column.getTasks());
  const [columnTitle, setColumnTitle] = useState<string>(column.title);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [newColumnTitle, setNewColumnTitle] = useState<string>("");

  const createTask = () => {
    column.createTask(taskTitle);
    setTasksList(column.getTasks());
    setTaskTitle("");
  };

  const deleteColumn = () => {
    column.delete();
    onDelete();
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
    <div style={{ marginLeft: "2em" }}>
      <h1>{columnTitle}</h1>
      <input
        type="text"
        value={newColumnTitle}
        onChange={(e) => {
          setNewColumnTitle(e.target.value);
        }}
      />
      <button onClick={() => updateColumnTitle()}>Update Column Title</button>
      <button onClick={() => deleteColumn()}>Delete column</button>
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />
      <button onClick={() => createTask()}>Create task</button>

      {tasksList &&
        tasksList.map((task, i) => (
          <div key={i + task.title}>
            <TaskComponent task={task} onDelete={onTaskDelete}></TaskComponent>
          </div>
        ))}
    </div>
  );
};

export default ColumnComponent;
