class TrackerEntry {
  date: Date;
  quantity: number;
  entries: TrackerEntry[] = [];

  constructor({ date, quantity }: TrackerEntry) {
    this.date = date;
    this.quantity = quantity;
  }
}

export default TrackerEntry;
