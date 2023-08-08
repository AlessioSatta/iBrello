import { IColumn, ITask } from "@alessiosatta/brello-business-logic";

export type DndManagerData = {
  task?: ITask;
  sourceColumn?: IColumn;
  targetColumn?: IColumn;
};
