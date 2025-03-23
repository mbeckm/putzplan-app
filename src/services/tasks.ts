import { supabase } from '@/lib/supabase'
import type { Task, TaskInsert, TaskUpdate, TaskCompletion, TaskCompletionInsert } from '@/lib/supabase'
import { RecurrenceType } from '@/types/task'

export async function getTasks(): Promise<Task[]> {
  const { data: tasks, error } = await supabase
    .from('tasks')
    .select('*, task_completions(*)')
    .order('next_due_date', { ascending: true })

  if (error) {
    console.error('Error fetching tasks:', error)
    throw error
  }

  return tasks || []
}

export async function getTask(id: string): Promise<Task | null> {
  const { data: task, error } = await supabase
    .from('tasks')
    .select('*, task_completions(*)')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching task:', error)
    throw error
  }

  return task
}

export async function createTask(task: Omit<TaskInsert, 'id' | 'created_at' | 'created_by'>): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .insert({
      ...task,
      created_at: new Date().toISOString(),
      created_by: (await supabase.auth.getUser()).data.user?.id,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating task:', error)
    throw error
  }

  return data
}

export async function updateTask(id: string, updates: TaskUpdate): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating task:', error)
    throw error
  }

  return data
}

export async function deleteTask(id: string): Promise<void> {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting task:', error)
    throw error
  }
}

export async function completeTask(taskId: string): Promise<TaskCompletion> {
  const { data, error } = await supabase
    .from('task_completions')
    .insert({
      task_id: taskId,
      completed_at: new Date().toISOString(),
      completed_by: (await supabase.auth.getUser()).data.user?.id,
    })
    .select()
    .single()

  if (error) {
    console.error('Error completing task:', error)
    throw error
  }

  // Update the task's next due date based on recurrence
  const { data: task } = await supabase
    .from('tasks')
    .select('recurrence_type, recurrence_interval')
    .eq('id', taskId)
    .single()

  if (task) {
    const nextDueDate = calculateNextDueDate(
      task.recurrence_type as RecurrenceType,
      task.recurrence_interval
    )

    await updateTask(taskId, { next_due_date: nextDueDate.toISOString() })
  }

  return data
}

function calculateNextDueDate(recurrenceType: RecurrenceType, interval: number = 1): Date {
  const now = new Date()
  const nextDueDate = new Date(now)

  switch (recurrenceType) {
    case 'daily':
      nextDueDate.setDate(now.getDate() + interval)
      break
    case 'weekly':
      nextDueDate.setDate(now.getDate() + (7 * interval))
      break
    case 'biweekly':
      nextDueDate.setDate(now.getDate() + (14 * interval))
      break
    case 'monthly':
      nextDueDate.setMonth(now.getMonth() + interval)
      break
    default:
      throw new Error(`Invalid recurrence type: ${recurrenceType}`)
  }

  return nextDueDate
} 