'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createTask } from '@/services/tasks'
import { RecurrenceType, recurrenceTypeLabels } from '@/types/task'

export default function CreateTaskPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    
    try {
      await createTask({
        name: formData.get('name') as string,
        duration_minutes: parseInt(formData.get('duration_minutes') as string, 10),
        disgust_level: parseInt(formData.get('disgust_level') as string, 10),
        recurrence_type: formData.get('recurrence_type') as string,
        recurrence_interval: 1,
        next_due_date: new Date().toISOString(),
        cleaning_instructions: formData.get('cleaning_instructions') as string || null,
      })

      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      console.error('Error creating task:', err)
      setError('Failed to create task. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Task</h1>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Task Name 📝
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
            placeholder="Enter task name"
          />
        </div>

        <div>
          <label htmlFor="duration_minutes" className="block text-sm font-medium mb-2">
            Duration (minutes) ⏱️
          </label>
          <input
            type="number"
            id="duration_minutes"
            name="duration_minutes"
            required
            min="1"
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
            placeholder="Estimated time to complete this task"
          />
        </div>

        <div>
          <label htmlFor="disgust_level" className="block text-sm font-medium mb-2">
            Disgust Level 🤢
          </label>
          <input
            type="range"
            id="disgust_level"
            name="disgust_level"
            min="1"
            max="5"
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-600">
            <span>Not gross</span>
            <span>Very gross</span>
          </div>
        </div>

        <div>
          <label htmlFor="recurrence_type" className="block text-sm font-medium mb-2">
            Recurrence 🔄
          </label>
          <select
            id="recurrence_type"
            name="recurrence_type"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          >
            {Object.entries(recurrenceTypeLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="cleaning_instructions" className="block text-sm font-medium mb-2">
            Cleaning Instructions 📋
          </label>
          <textarea
            id="cleaning_instructions"
            name="cleaning_instructions"
            rows={4}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
            placeholder="Optional: Add specific instructions or notes"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Creating...' : 'Create Task'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 bg-gray-100 text-gray-800 rounded-lg px-4 py-2 hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
} 