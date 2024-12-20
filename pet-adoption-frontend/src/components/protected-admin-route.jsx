import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const ProtectedAdminRoute = ({ children }) => {
    const isAuthenticated = useIsAuthenticated()
    const user = useAuthUser();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated || user.role !== "ADMIN") {
            router.push('/');
        }
    }, [isAuthenticated, router])

    return (
        isAuthenticated ? children : null
    );
}

export default dynamic(() => Promise.resolve(ProtectedAdminRoute), { ssr: false });