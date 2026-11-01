export type TechniqueType = 'normal' | 'drop_set' | 'bi_set' | 'rest_pause' | 'pyramid';

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  equipment?: string;
  videoUrl?: string;
  imageUrl?: string;
}

export interface WorkoutExercise extends Exercise {
  sets: number;
  reps: number;
  restSeconds: number;
  weight?: number;
  technique?: TechniqueType;
  techniqueConfig?: Record<string, any>;
  groupId?: string; // Para bi-sets
}

export interface WorkoutDay {
  dayKey: string; // 'SEG', 'TER', etc.
  name: string;
  exercises: WorkoutExercise[];
}

export interface WorkoutPlan {
  id: string;
  name: string;
  objective: string;
  level: string;
  days: WorkoutDay[];
}