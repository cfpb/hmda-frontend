export const STATUS = {
  PENDING: 0,
  PROGRESS: 1,
  DONE: 2,
  EDITS: 3,
  ERROR: 4,
  SKIP: 5,
} 

export const CHECK = {
  isPending: (status) => status === STATUS.PENDING,
  isProgress: (status) => status === STATUS.PROGRESS,
  isDone: (status) => status === STATUS.DONE,
  isEdits: (status) => status === STATUS.EDITS,
  isError: (status) => status === STATUS.ERROR,
  isSkip: (status) => status === STATUS.SKIP,
}

