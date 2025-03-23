'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getTasks, completeTask, deleteTask } from '@/services/tasks'
import type { Task } from '@/types/task'
import { TaskDetailModal } from '@/components/TaskDetailModal'
import { TaskCard } from '@/components/TaskCard'
import SignOutButton from '@/components/SignOutButton'
import { supabase } from '@/lib/supabase'

export default function DashboardPage() {
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/auth')
        return
      }
    }
    checkSession()
  }, [router])

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      setIsLoading(true)
      const tasks = await getTasks()
      setTasks(tasks)
    } catch (err) {
      console.error('Error loading tasks:', err)
      setError('Failed to load tasks. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
  }

  const handleTaskComplete = async (taskId: string) => {
    try {
      await completeTask(taskId)
      await loadTasks() // Reload tasks to get updated next_due_date
    } catch (err) {
      console.error('Error completing task:', err)
      // Show error toast or message
    }
  }

  const handleTaskDelete = async (taskId: string) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return
    }

    try {
      await deleteTask(taskId)
      setTasks(tasks.filter(task => task.id !== taskId))
      setSelectedTask(null)
    } catch (err) {
      console.error('Error deleting task:', err)
      // Show error toast or message
    }
  }

  const handleModalClose = () => {
    setSelectedTask(null)
  }

  // Group tasks by due date
  const groupedTasks = tasks.reduce<Record<string, Task[]>>((groups, task) => {
    const dueDate = new Date(task.next_due_date)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    let group = 'Later'
    if (dueDate < today) {
      group = 'Overdue'
    } else if (dueDate.toDateString() === today.toDateString()) {
      group = 'Today'
    } else if (dueDate.toDateString() === tomorrow.toDateString()) {
      group = 'Tomorrow'
    }

    if (!groups[group]) {
      groups[group] = []
    }
    groups[group].push(task)
    return groups
  }, {})

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
          {error}
          <button
            onClick={loadTasks}
            className="ml-4 text-sm underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Tasks Dashboard</h1>
        <Link
          href="/dashboard/tasks/new"
          className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
        >
          Add New Task
        </Link>
        <SignOutButton />
      </div>

      {Object.entries(groupedTasks).map(([group, tasks]) => (
        <div key={group} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{group}</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => handleTaskClick(task)}
                onComplete={() => handleTaskComplete(task.id)}
              />
            ))}
          </div>
        </div>
      ))}

      {tasks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No tasks found</p>
          <Link
            href="/dashboard/tasks/new"
            className="text-blue-600 hover:underline"
          >
            Create your first task
          </Link>
        </div>
      )}

      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={handleModalClose}
          onDelete={() => handleTaskDelete(selectedTask.id)}
          onTasksChange={loadTasks}
        />
      )}
    </div>
  )
} 