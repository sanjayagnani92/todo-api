// payloads.ts

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegistrationPayload {
  email: string;
  password: string;
  name?: string;
}

export interface UserIdParam {
  id: number;
}

export interface CreateTodoPayload {
  title: string;
  dueDate: Date;
  description?: string;
  completed?: boolean;
}
