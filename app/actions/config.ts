import { awsConfigType } from '../types';

export const UPDATE_AWS_CONFIG = 'UPDATE_AWS_CONFIG';

export function updateAwsConfig(config: awsConfigType) {
  return {
    type: UPDATE_AWS_CONFIG,
    newConfig: config,
  };
}
