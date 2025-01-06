export interface User {
    userId: number,
    userName: string,
    userPassword: string,
}

export type UserWithoutId = Omit<User, "userId">

export type UserWithoutPassword = Omit<User, "userPassword">