/**
 * A Completions is a measure of an action accomplished in order to fulfill a Tracker.
 *
 * @interface Completion
 * @member {number} quantity amount of something (= unit) measured (ex: 10)
 * @member {string} unit individual thing to measure (ex: "squats")
 */
export default interface Completion {
  quantity: number;
  unit: string;
}
