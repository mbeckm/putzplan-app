import { addDays, addWeeks, addMonths } from 'date-fns'
import { Task } from '@/types/task'

export const calculateNextDueDate = (task: Task, fromDate: Date = new Date()): Date => {
  const { type, interval } = task.recurrence

  switch (type) {
    case 'daily':
      return addDays(fromDate, interval)
    case 'weekly':
      return addWeeks(fromDate, interval)
    case 'monthly':
      return addMonths(fromDate, interval)
    case 'custom':
      return addDays(fromDate, interval)
    default:
      return addDays(fromDate, interval)
  }
} 