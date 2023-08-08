type DndManagerHandler<TData> = (data: TData | null) => void;

export class DndManager<TData> {
  private _data: TData | null = null;

  private _handlers: {
    dragstart: DndManagerHandler<TData>[];
    drop: DndManagerHandler<TData>[];
  } = { dragstart: [], drop: [] };

  public getData(): TData | null {
    return this._data;
  }

  public setData(data: TData | null): void {
    this._data = data;
  }

  public on(
    event: "dragstart" | "drop",
    handler: DndManagerHandler<TData>
  ): void {
    this._handlers[event].push(handler);
  }

  public off(
    event: "dragstart" | "drop",
    handler: DndManagerHandler<TData>
  ): void {
    this._handlers[event].filter((a) => a !== handler);
  }

  public trigger(event: "dragstart" | "drop"): void {
    this._handlers[event].forEach((a) => a(this._data));
  }
}

// export class DndManager {
//   private _dragStartCallbacks: (() => void)[] = [];
//   private _dropCallbacks: ((data: DndManagerDropData) => void)[] = [];
//   private _sourceColumn: IColumn | null = null;
//   private _task: ITask | null = null;

//   public dragStart(task: ITask, sourceColumn: IColumn): void {
//     this._sourceColumn = sourceColumn;
//     this._task = task;
//     this._dragStartCallbacks.forEach((a) => a());
//   }
//   public drop(targetColumn: IColumn): void {
//     if (this._task && this._sourceColumn)
//       this._dropCallbacks.forEach((a) =>
//         a({
//           task: this._task as ITask,
//           sourceColumn: this._sourceColumn as IColumn,
//           targetColumn,
//         })
//       );
//   }

//   public onDragStart(callback: () => void): void {
//     this._dragStartCallbacks.push(callback);
//   }
//   public onDrop(callback: (data: DndManagerDropData) => void): void {
//     this._dropCallbacks.push(callback);
//   }
// }
