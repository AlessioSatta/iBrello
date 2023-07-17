import {
  IDataProvider,
  Task,
  TaskInfo,
} from "@alessiosatta/brello-business-logic";
import { useState } from "react";

const TaskComponent = (props: any) => {
  const { id, boardId, column, columnId, setTasks, title } = props;
  const [inputTask, setInputTask] = useState<string>("");
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");

  const dataProvider: IDataProvider = {
    deleteTask(taskId: string): void {
      if (taskId == id)
        setTasks((current: TaskInfo[]) => {
          return current.filter((a) => a.id != taskId);
        });
    },
    updateTaskColumn(taskId: string, targetColumnId: string) {
      //   if (taskId == id)
      //     setTasks((prevState: TaskInfo) => {
      //       return {
      //         ...prevState,
      //         columnId: targetColumnId,
      //       };
      //     });
      console.log(taskId, targetColumnId);
    },
    updateTaskTitle(taskId: string, title: string): void {
      if (taskId == id) setNewTaskTitle(title);
    },
  } as IDataProvider;

  const task = new Task({ id, boardId, columnId, title }, dataProvider);

  return (
    <div
      draggable
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
