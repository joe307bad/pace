import { PaceDto, PaceAverage } from '@pace/api/src/shared/dtos';
import * as http from '../../core/http';

const API_URL = 'http://localhost:3001/pace';

export const getAveragePaceGraph = () =>
  http.get<PaceAverage>(API_URL + '/graph');

export const addMilePace = (pace: Partial<PaceDto>) =>
  http.post<PaceDto>(API_URL, pace);
