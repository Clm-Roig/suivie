import Tracker from '../../../models/Tracker';

// Number "duration" and "requiredCompletions.quantity" are used as a string for input control here.
export type FormValues = Omit<Tracker, 'duration' | 'frequency' | 'requiredCompletions'> & {
  duration: string;
  frequency: string;
  requiredCompletions: Array<{ quantity: string; unit: string }>;
};
