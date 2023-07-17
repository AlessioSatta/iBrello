import {
  Column,
  ColumnInfo,
  IDataProvider,
  TaskInfo,
} from "@alessiosatta/brello-business-logic";
import { useEffect, useState } from "react";

const ColumnComponent = (props: any) => {
  const { id, boardId, title, setColumns } = props;
  const [tasks, setTasks] = useState<TaskInfo[]>([]);
  const [inputColumn, setInputColumn] = useState<string>("");
  const [newColumnTitle, setNewColumnTitle] = useState<string>("");

  const dataProvider: IDataProvider = {
    getColumnTasks(columnId) {
      return tasks.filter((a) => a.columnId == columnId);
    },
    updateColumnTitle(columnId, title) {
      if (columnId) setNewColumnTitle(title);
    },
    createTask(boardId, columnId, title) {
      const task: TaskInfo = {
        id: Math.floor(Math.random() * 1000).toString(),
        boardId: boardId,
        columnId: columnId,
        title: title,
      };
      return setTasks([...tasks, task]);
    },
    deleteColumn(columnId) {
      setColumns((current: ColumnInfo[]) => {
        return current.filter((a) => a.id != columnId);
      });
    },
  } as IDataProvider;

  const column = new Column({ id, title, boardId }, dataProvider);

  useEffect(() => {
    column.getTasks();
  }, []);

  return (
    <>
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
    </>
  );
};

export default ColumnComponent;
