import { create } from 'zustand';
import { WorkoutPlan, WorkoutExercise } from '../types';

interface WorkoutState {
  currentPlan: WorkoutPlan | null;
  activeDayIndex: number;
  currentExerciseIndex: number;
  isResting: boolean;
  restEndTime: number | null;
  
  setPlan: (plan: WorkoutPlan) => void;
  setActiveDay: (index: number) => void;
  setCurrentExercise: (index: number) => void;
  startRest: (seconds: number) => void;
  stopRest: () => void;
}

export const useWorkoutStore = create<WorkoutState>((set) => ({
  currentPlan: null,
  activeDayIndex: 0,
  currentExerciseIndex: 0,
  isResting: false,
  restEndTime: null,

  setPlan: (plan) => set({ currentPlan: plan }),
  setActiveDay: (index) => set({ activeDayIndex: index }),
  setCurrentExercise: (index) => set({ currentExerciseIndex: index }),
  
  startRest: (seconds) => set({ 
    isResting: true, 
    restEndTime: Date.now() + (seconds * 1000) 
  }),
  
  stopRest: () => set({ 
    isResting: false, 
    restEndTime: null 
  }),
}));