export class Counter {
  private map: Map<string, number>;

  constructor() {
    this.map = new Map();
  }

  increment(key: string) {
    const currentCount = this.map.get(key) || 0;
    const nextCount = currentCount + 1;
    this.map.set(key, nextCount);
    return nextCount;
  }
}
