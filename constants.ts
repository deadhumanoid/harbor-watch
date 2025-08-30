
import { AlertLevel } from './types';

export const ALERT_LEVEL_CONFIG = {
  [AlertLevel.LOW]: {
    label: 'Low',
    color: 'bg-green-500',
    textColor: 'text-green-500',
    borderColor: 'border-green-500',
    description: 'Conditions are normal. Monitor routine data.'
  },
  [AlertLevel.MODERATE]: {
    label: 'Moderate',
    color: 'bg-yellow-500',
    textColor: 'text-yellow-500',
    borderColor: 'border-yellow-500',
    description: 'Elevated conditions detected. Increase monitoring frequency.'
  },
  [AlertLevel.HIGH]: {
    label: 'High',
    color: 'bg-orange-500',
    textColor: 'text-orange-500',
    borderColor: 'border-orange-500',
    description: 'Significant threat. Prepare for potential coastal impact.'
  },
  [AlertLevel.SEVERE]: {
    label: 'Severe',
    color: 'bg-red-600',
    textColor: 'text-red-600',
    borderColor: 'border-red-600',
    description: 'Imminent and severe threat. Issue warnings and activate response protocols.'
  }
};

export const TIDE_WARNING_THRESHOLD = 3.0;
export const TIDE_DANGER_THRESHOLD = 3.5;
