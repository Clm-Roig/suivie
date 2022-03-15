import Tracker from "../../models/Tracker";
import TrackerStatus from "../../models/TrackerStatus";

class TrackersActions {
  // A mock function to mimic making an async request for data
  fetchAll() {
    return new Promise<{ data: Tracker[] }>((resolve) =>
      setTimeout(() => resolve({ data: [
        {
          beginDate: new Date().toString(),
          name: "Boire",
          status: TrackerStatus.active,
          entries: []
        },
        {
          beginDate: new Date().toString(),
          name: "Manger",
          status: TrackerStatus.active,
          entries: []
        }
      ] }), 500)
    );

  }
}
export default new TrackersActions();
