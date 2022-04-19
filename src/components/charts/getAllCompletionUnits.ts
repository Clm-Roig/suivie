import { DEFAULT_COMPLETION_NAME } from '../../config/Constants';
import TrackerEntry from '../../models/TrackerEntry';

const getAllCompletionUnits = (entries: TrackerEntry[]) => {
  const units: string[] = entries.flatMap((e) => e.completions.map((c) => c.unit));
  if (entries.some((e) => e.completions.length === 0)) {
    units.push(DEFAULT_COMPLETION_NAME);
  }
  return Array.from(new Set(units));
};

export default getAllCompletionUnits;
