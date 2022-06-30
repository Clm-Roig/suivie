/**
 * A Completions is a measure of an action accomplished in order to fulfill a Tracker.
 *
 * @interface Completion
 * @member {string} creationDate
 * @member {number} quantity amount of something (= unit) measured (ex: 10)
 * @member {string} unit individual thing to measure (ex: "squats")
 */
export default interface Completion {
  creationDate: string;
  quantity: number;
  unit: string;
}
