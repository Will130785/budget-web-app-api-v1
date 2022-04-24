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

export interface IUserTest {
  username: string,
  password: string,
  createdAt: Date,
  _id: string,
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
