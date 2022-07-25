import { QuarterlyApiUrl } from '../../constants';

export const getGraphsInfo = () => fetch(QuarterlyApiUrl)
  .then(res => res.json());

export const getGraph = endpoint => fetch(`${QuarterlyApiUrl}/${endpoint}`)
  .then(res => res.json());