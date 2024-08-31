import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Role, hasAccess } from '../utils/roleUtils';

interface ProtectedElementProps {
    requiredRole: Role;
    children: React.ReactNode;
}

const ProtectedElement: React.FC<ProtectedElementProps> = ({ requiredRole, children})=> {
    const userRole = useSelector((state:RootState)=> state.auth.role);

    if(!hasAccess(userRole as Role, requiredRole)){
        return <>You don't have access to this page...</>
    }
    return <>{children}</>
}

export default ProtectedElement;