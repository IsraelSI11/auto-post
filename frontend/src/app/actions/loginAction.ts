"use server";

interface LoginParams {
    email: string;
    password: string;
}

export async function loginAction({ email, password }: LoginParams) {
    const response = await fetch(`${process.env.API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    const data = await response.json();
    return data;
}