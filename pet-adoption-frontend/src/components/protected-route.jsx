import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useIsAuthenticated()
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, router])

    return (
        isAuthenticated ? children : null
    );
}

export default ProtectedRoute;