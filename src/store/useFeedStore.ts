import { create } from 'zustand'

import { toDateKey } from '@/shared/utils/dateKey'

interface FeedState {
  selectedDateKey: string
  setSelectedDateKey: (dateKey: string) => void
}

export const useFeedStore = create<FeedState>((set) => ({
  selectedDateKey: toDateKey(new Date()),
  setSelectedDateKey: (dateKey) => set({ selectedDateKey: dateKey })
}))
