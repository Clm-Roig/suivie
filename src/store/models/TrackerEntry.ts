class TrackerEntry {
  date: string;
  quantity: number;

  constructor({ date, quantity }: TrackerEntry) {
    this.date = date;
    this.quantity = quantity;
  }
}

export default TrackerEntry;
