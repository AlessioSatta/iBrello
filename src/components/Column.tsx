import {
  Column,
  ColumnInfo,
  IDataProvider,
  TaskInfo,
} from "@alessiosatta/brello-business-logic";
import { useEffect, useState } from "react";
import TaskComponent from "./Task";

type Props = {
  id: string;
  boardId: string;
  title: string;
  setColumns: any;
};

const ColumnComponent: React.FC<Props> = ({
  id,
  boardId,
  title,
  setColumns,
}) => {
  const [tasks, setTasks] = useState<TaskInfo[]>([]);
  const [inputColumn, setInputColumn] = useState<string>("");
  const [inputTask, setInputTask] = useState<string>("");
  const [newColumnTitle, setNewColumnTitle] = useState<string>("");

  const dataProvider: IDataProvider = {
    createTask(boardId: string, columnId: string, title: string) {
      const task: TaskInfo = {
        id: Math.floor(Math.random() * 1000).toString(),
        boardId: boardId,
        columnId: columnId,
        title: title,
      };
      return setTasks([...tasks, task]);
    },
    deleteColumn(columnId: string) {
      if (columnId == id)
        setColumns((current: ColumnInfo[]) => {
          return current.filter((a) => a.id != columnId);
        });
    },
    getColumnTasks(columnId: string) {
      // return tasks.filter((a) => a.columnId == columnId);
      if (columnId == id) return tasks;
    },
    updateColumnTitle(columnId: string, title: string) {
      if (columnId == id) setNewColumnTitle(title);
    },
  } as IDataProvider;

  const column = new Column({ id, title, boardId }, dataProvider);

  useEffect(() => {
    column.getTasks();
    console.log(tasks);
  }, [tasks]);

  return (
    <div>
      <h1>{newColumnTitle || title}</h1>
      <input
        type="text"
        value={inputColumn}
        onChange={(e) => {
          setInputColumn(e.target.value);
        }}
      />
      <button onClick={() => column.updateTitle(inputColumn)}>
        Update Column Title
      </button>
      <button onClick={() => column.delete()}>Delete column</button>
      <input
        type="text"
        value={inputTask}
        onChange={(e) => setInputTask(e.target.value)}
      />
      <button onClick={() => column.createTask(inputTask)}>Create task</button>

      {tasks &&
        tasks.map((task, i) => (
          <div key={i + task.id}>
            <TaskComponent
              id={task.id}
              boardId={task.boardId}
              column={column}
              columnId={id}
              setTasks={setTasks}
              title={task.title}
            ></TaskComponent>
          </div>
        ))}
    </div>
  );
};

export default ColumnComponent;
