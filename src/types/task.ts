import { Task as SupabaseTask, TaskCompletion } from '@/lib/supabase'

export type Task = SupabaseTask & {
  completions?: TaskCompletion[]
}

export type RecurrenceType = 'daily' | 'weekly' | 'biweekly' | 'monthly'

export const recurrenceTypeLabels: Record<RecurrenceType, string> = {
  daily: 'Every day',
  weekly: 'Once a week',
  biweekly: 'Every two weeks',
  monthly: 'Once a month',
}

// Re-export TaskCompletion type from Supabase
export type { TaskCompletion } 