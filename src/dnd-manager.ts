export interface IDndManager<TData> {
  onDragStart(data: TData): void;
  onDrop(callback: (data: TData) => void): void;
}

export class DndManager<TData> implements IDndManager<TData> {
  private _data: TData | null = null;
  public onDragStart(data: TData): void {
    this._data = data;
  }
  public onDrop(callback: (data: TData) => void): void {
    if (this._data) callback(this._data);
  }
}
