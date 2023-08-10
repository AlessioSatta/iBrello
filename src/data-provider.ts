import {
  BoardInfo,
  ColumnInfo,
  IDataProvider,
  TaskInfo,
} from "@alessiosatta/brello-business-logic";

export class DataProvider implements IDataProvider {
  private _boards: BoardInfo[] = [
    { id: "1", title: "Board 1" },
    { id: "2", title: "Board 2" },
  ];
  private _columns: ColumnInfo[] = [
    { boardId: "1", id: "1", title: "Column 1" },
    { boardId: "1", id: "2", title: "Column 2" },
    { boardId: "2", id: "3", title: "Column 2" },
  ];
  private _tasks: TaskInfo[] = [
    { id: "1", title: "Task 1", boardId: "1", columnId: "1" },
    { id: "2", title: "Task 2", boardId: "1", columnId: "1" },
    { id: "3", title: "Task 3", boardId: "1", columnId: "2" },
    { id: "4", title: "Task 4", boardId: "2", columnId: "3" },
  ];
  public updateTaskColumn(taskId: string, targetColumnId: string): void {
    const taskToUpdateColumn = this._tasks.find((a) => a.id == taskId);
    if (taskToUpdateColumn) taskToUpdateColumn.columnId = targetColumnId;
  }

  public deleteColumn(columnId: string): void {
    const columnToDelete = this._columns.find((a) => a.id == columnId);
    if (columnToDelete)
      this._columns.splice(this._columns.indexOf(columnToDelete), 1);
  }
  public deleteTask(taskId: string): void {
    const taskToDelete = this._tasks.find((a) => a.id == taskId);
    if (taskToDelete) this._tasks.splice(this._tasks.indexOf(taskToDelete), 1);
  }

  public deleteBoard(boardId: string): void {
    const boardToDelete = this._boards.find((a) => a.id == boardId);
    if (boardToDelete)
      this._boards.splice(this._boards.indexOf(boardToDelete), 1);
    this._columns = this._columns.filter((a) => a.boardId != boardId);
    this._tasks = this._tasks.filter((a) => a.boardId != boardId);
  }

  public createBoard(title: string): BoardInfo {
    const board: BoardInfo = {
      id: this._generateId(),
      title,
    };
    this._boards.push(board);
    return board;
  }

  public createColum(boardId: string, title: string): ColumnInfo {
    const column: ColumnInfo = {
      boardId,
      id: this._generateId(),
      title,
    };
    this._columns.push(column);
    return column;
  }

  public createTask(
    boardId: string,
    columnId: string,
    title: string
  ): TaskInfo {
    const task: TaskInfo = {
      boardId,
      columnId,
      id: this._generateId(),
      title,
    };

    this._tasks.push(task);
    return task;
  }

  public getBoards(): BoardInfo[] {
    return this._boards;
  }

  public getColumns(boardId: string): ColumnInfo[] {
    return this._columns.filter((a) => a.boardId == boardId);
  }

  public getColumnTasks(columnId: string): TaskInfo[] {
    return this._tasks.filter((a) => a.columnId == columnId);
  }

  public upateBoardTitle(boardId: string, title: string): void {
    const board = this._boards.find((a) => a.id == boardId);
    if (board) board.title = title;
  }

  public updateColumnTitle(columnId: string, title: string): void {
    const column = this._columns.find((a) => a.id == columnId);
    if (column) column.title = title;
  }

  public updateTaskTitle(taskId: string, title: string): void {
    const task = this._tasks.find((a) => a.id == taskId);
    if (task) task.title = title;
  }

  private _generateId(): string {
    return Math.floor(Math.random() * 1000).toString();
  }
}
