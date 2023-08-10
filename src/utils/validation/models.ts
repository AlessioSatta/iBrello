export class ValidationManager {
  private _data: { prevData: string; currentData: string } = {
    prevData: "",
    currentData: "",
  };

  public getCurrentData(): string {
    return this._data.currentData;
  }

  public getPrevData(): string {
    return this._data.prevData;
  }
  public setCurrentData(data: string): void {
    this._data.currentData = data;
  }

  public setPrevData(data: string): void {
    this._data.prevData = data;
  }
}
