export interface UserData {
    name: string | null,
    email: string | null
    age: number | null
    id?: number | null
}

export interface UserState {
    users: UserData[] | [],
    loading: boolean,
    error: string | null
}

