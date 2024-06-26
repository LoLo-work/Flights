const URL = 'http://localhost:3001';

interface LoginRequest {
    email: string;
    password: string;
}

interface RegisterRequest {
    surname: string;
    lastname: string;
    email: string;
    birthdate: string;
    gender: string;
    password: string;
}

interface LoginResponse {
    token: string;
    id: number;
    surname: string;
    lastname: string;
    email: string;
    birthdate: string;
    gender: string;
}

interface RegisterResponse {
    token: string;
    user: {
        id: number;
        surname: string;
        lastname: string;
        email: string;
        birthdate: string;
        gender: string;
    }
}

export async function login({email, password}: LoginRequest): Promise<LoginResponse> {
    const response: Response = await fetch(`${URL}/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });

    if (!response.ok) {
        throw response;
    }
    return response.json();
}

export async function register({
                                   surname,
                                   lastname,
                                   email,
                                   birthdate,
                                   gender,
                                   password
                               }: RegisterRequest): Promise<RegisterResponse> {
    const response: Response = await fetch(`${URL}/register`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({surname, lastname, email, birthdate, gender, password})
    });

    if (!response.ok) {
        throw response;
    }

    return response.json();
}