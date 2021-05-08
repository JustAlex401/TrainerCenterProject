import {GET_EXERCISES_AND_TRAINERS} from './constants';

export function getExercisesAndTrainers (data) {
  return {
      type:GET_EXERCISES_AND_TRAINERS,
      payload: data
  }
}

