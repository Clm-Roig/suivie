import { subDays } from 'date-fns';
import Tracker from '../../models/Tracker';
import TrackerStatus from '../../models/TrackerStatus';

class TrackersActions {
  // A mock function to mimic making an async request for data
  fetchAll() {
    return new Promise<{ data: Tracker[] }>((resolve) =>
      setTimeout(
        () =>
          resolve({
            data: [
              {
                beginDate: new Date().toString(),
                name: "Boire plus d'eau",
                defaultQuantity: 1,
                status: TrackerStatus.active,
                unit: "litre d'eau",
                entries: []
              },
              {
                beginDate: new Date().toString(),
                defaultQuantity: 1,
                name: 'Faire du yoga',
                status: TrackerStatus.active,
                unit: 'séance',
                entries: []
              },
              {
                beginDate: subDays(new Date(), 7).toString(),
                defaultQuantity: 15,
                duration: 45,
                name: 'Faire des pompes',
                status: TrackerStatus.active,
                unit: 'pompes',
                entries: []
              }
            ]
          }),
        900
      )
    );
  }
}
export default new TrackersActions();
