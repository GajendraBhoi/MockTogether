import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        user: null,
        isLoading: true
    });

    const navigate = useNavigate();

    const validateAuth = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:3000/validate-token', {
                credentials: 'include'
            });

            if (response.ok) {
                const { valid } = await response.json();

                if (valid) {
                    setAuthState({
                        isAuthenticated: true,
                        user: null,
                        isLoading: false
                    });
                    return;
                }
            }

            setAuthState({
                isAuthenticated: false,
                user: null,
                isLoading: false
            });
        } catch (error) {
            console.error('Auth validation error:', error);
            setAuthState(prev => ({ ...prev, isLoading: false }));
        }
    }, []);


    useEffect(() => {
        validateAuth();
    }, [validateAuth]);

    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {

                const data = await response.json();
                console.log("res", data)
                setAuthState({
                    isAuthenticated: true,
                    user: data.user,
                    isLoading: false
                });
                navigate('/');
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const logout = async () => {
        try {
            await fetch('http://localhost:3000/logout', {
                method: 'POST',
                credentials: 'include'
            });
            setAuthState({
                isAuthenticated: false,
                user: null,
                isLoading: false
            });
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <AuthContext.Provider value={{
            ...authState,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);