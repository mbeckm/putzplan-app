'use client'

import React, { useState } from 'react'
import { Task } from '@/types/task'
import { updateTask } from '@/services/tasks'
import { recurrenceTypeLabels } from '@/types/task'
import type { TaskUpdate } from '@/lib/supabase'

export interface TaskDetailModalProps {
  task: Task
  onClose: () => void
  onDelete: () => Promise<void>
  onTasksChange: () => Promise<void>
}

type FormData = {
  name: string
  duration_minutes: number
  disgust_level: number
  recurrence_type: string
  cleaning_instructions: string
}

export function TaskDetailModal({ task, onClose, onDelete, onTasksChange }: TaskDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: task.name,
    duration_minutes: task.duration_minutes,
    disgust_level: task.disgust_level,
    recurrence_type: task.recurrence_type,
    cleaning_instructions: task.cleaning_instructions || '',
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration_minutes' || name === 'disgust_level' ? parseInt(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      await updateTask(task.id, {
        name: formData.name,
        duration_minutes: formData.duration_minutes,
        disgust_level: formData.disgust_level,
        cleaning_instructions: formData.cleaning_instructions,
      })
      await onTasksChange()
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating task:', error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-lg w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Task Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Task Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="duration_minutes" className="block text-sm font-medium text-gray-700">
                Duration (minutes)
              </label>
              <input
                type="number"
                id="duration_minutes"
                name="duration_minutes"
                value={formData.duration_minutes}
                onChange={handleInputChange}
                min="1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="disgust_level" className="block text-sm font-medium text-gray-700">
                Disgust Level
              </label>
              <select
                id="disgust_level"
                name="disgust_level"
                value={formData.disgust_level}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              >
                {[1, 2, 3, 4, 5].map(level => (
                  <option key={level} value={level}>
                    {'🤢'.repeat(level)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="cleaning_instructions" className="block text-sm font-medium text-gray-700">
                Cleaning Instructions
              </label>
              <textarea
                id="cleaning_instructions"
                name="cleaning_instructions"
                value={formData.cleaning_instructions}
                onChange={handleInputChange}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Task Name</h3>
              <p className="mt-1 text-sm text-gray-900">{task.name}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Duration</h3>
              <p className="mt-1 text-sm text-gray-900">{task.duration_minutes} minutes</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Disgust Level</h3>
              <p className="mt-1 text-sm text-gray-900">{'🤢'.repeat(task.disgust_level)}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Next Due Date</h3>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(task.next_due_date).toLocaleDateString()}
              </p>
            </div>

            {task.cleaning_instructions && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Cleaning Instructions</h3>
                <p className="mt-1 text-sm text-gray-900">{task.cleaning_instructions}</p>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                onClick={onDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 