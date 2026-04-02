export async function signup(payload){
    const res = await fetch('/api/app/user/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            password: payload.password,
            confirmPassword: payload.confirmPassword,
            role: payload.role,
        }),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || 'Failed to signup')
    }
    return data;
}

export async function login(payload){
    const res = await fetch('/api/app/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            role: payload.role,
        }),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || 'Failed to login')
    }
    return data;
}

