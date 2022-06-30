import Tracker from '../../../models/Tracker';

// Number "duration" and "requiredCompletions.quantity" are used as a string for input control here.
export type FormValues = Omit<
  Tracker,
  'defaultCompletions' | 'duration' | 'frequency' | 'requiredCompletions'
> & {
  defaultCompletions: Array<{ creationDate: string; quantity: string; unit: string }>;
  duration: string;
  frequency: string;
  requiredCompletions: Array<{ creationDate: string; quantity: string; unit: string }>;
};
