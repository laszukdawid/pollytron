import { awsConfigType } from '../reducers/types';

export const UPDATE_AWS_CONFIG = 'UPDATE_AWS_CONFIG';

export function updateAwsConfig(config: awsConfigType) {
  return {
    type: UPDATE_AWS_CONFIG,
    config,
  };
}
