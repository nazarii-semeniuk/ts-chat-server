export type User = {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName?: string;
    avatar?: string;
    createdAt: Date;
}

export type UserLoginDTO = Pick<User, 'email' | 'password'>;

export type UserRegisterDTO = Pick<User, 'email' | 'password' | 'firstName'>;

export type SafeUser = Omit<User, 'password'>