export interface IUser {
  username: string,
  password: string,
  createdAt: Date,
  id: string,
  budgetData: {
    budgets: [
      {
        title: string
      },
      {
        timeline: string
      },
      {
        amount: number
      },
      {
        current: boolean
      }
    ]
  }
}
