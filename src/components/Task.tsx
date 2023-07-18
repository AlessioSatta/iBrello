import {
  Column,
  IDataProvider,
  Task,
  TaskInfo,
} from "@alessiosatta/brello-business-logic";
import { useState } from "react";

type Props = {
  id: string;
  boardId: string;
  column: Column;
  columnId: string;
  setTasks: any;
  title: string;
};

const TaskComponent: React.FC<Props> = ({
  id,
  boardId,
  column,
  columnId,
  setTasks,
  title,
}) => {
  const [inputTask, setInputTask] = useState<string>("");
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");

  const dataProvider: IDataProvider = {
    deleteTask(taskId: string): void {
      if (taskId == id)
        setTasks((current: TaskInfo[]) => {
          return current.filter((a) => a.id != taskId);
        });
    },
    updateTaskColumn(taskId: string, targetColumnId: string) {},
    updateTaskTitle(taskId: string, title: string): void {
      if (taskId == id) setNewTaskTitle(title);
    },
  } as IDataProvider;

  const task = new Task({ id, boardId, columnId, title }, dataProvider);

  return (
    <div
      draggable={true}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={() => task.moveToColumn(column)}
    >
      <h1>{newTaskTitle || title}</h1>
      <input
        type="text"
        value={inputTask}
        onChange={(e) => setInputTask(e.target.value)}
      />
      <button onClick={() => task.updateTitle(inputTask)}>
        Update Task Title
      </button>
      <button onClick={() => task.delete()}>Delete Task</button>
    </div>
  );
};

export default TaskComponent;
