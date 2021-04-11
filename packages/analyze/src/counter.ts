export class Counter {
  private _map: Map<string, number>;

  constructor() {
    this._map = new Map();
  }

  public increment(key: string) {
    const currentCount = this._map.get(key) || 0;
    const nextCount = currentCount + 1;
    this._map.set(key, nextCount);
    return nextCount;
  }

  public get map(): Map<string, number> {
    return this._map;
  }
}
