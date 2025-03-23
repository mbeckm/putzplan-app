'use client'

import { useState } from 'react'
import { Task } from '@/types/task'

interface TaskCardProps {
  task: Task
  onClick: () => void
  onComplete: () => Promise<void>
}

export function TaskCard({ task, onClick, onComplete }: TaskCardProps) {
  const [isCompleting, setIsCompleting] = useState(false)

  const handleComplete = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsCompleting(true)
    try {
      await onComplete()
    } catch (error) {
      console.error('Error completing task:', error)
    } finally {
      setIsCompleting(false)
    }
  }

  return (
    <div
      onClick={onClick}
      className="bg-white shadow-sm rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-medium text-gray-900">{task.name}</h3>
        <button
          onClick={handleComplete}
          disabled={isCompleting}
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
        >
          {isCompleting ? (
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            'Complete'
          )}
        </button>
      </div>
      <div className="text-sm text-gray-500 space-y-1">
        <p>{task.duration_minutes} minutes</p>
        <p>{'🤢'.repeat(task.disgust_level)}</p>
        <p>Due: {new Date(task.next_due_date).toLocaleDateString()}</p>
      </div>
    </div>
  )
} 