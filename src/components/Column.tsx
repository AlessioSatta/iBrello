import { IColumn, ITask } from "@alessiosatta/brello-business-logic";
import { useState } from "react";

import { DndManager, DndManagerData } from "../utils";
import TaskComponent from "./Task";

type Props = {
  column: IColumn;
  dndManager: DndManager<DndManagerData>;
  onDelete: () => void;
};

const ColumnComponent: React.FC<Props> = ({ column, dndManager, onDelete }) => {
  const [tasksList, setTasksList] = useState<ITask[]>(column.getTasks());
  const [columnTitle, setColumnTitle] = useState<string>(column.title);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [newColumnTitle, setNewColumnTitle] = useState<string>("");

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
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop()}
      style={{ marginLeft: "2em" }}
    >
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
            <TaskComponent
              column={column}
              dndManager={dndManager}
              task={task}
              onDelete={onTaskDelete}
            ></TaskComponent>
          </div>
        ))}
    </div>
  );
};

export default ColumnComponent;
