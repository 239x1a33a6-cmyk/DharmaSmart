/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { backendApi, UserProfile as BackendUserProfile } from '@/services/backend-api';

export type UserRole = 'COMMUNITY_MEMBER' | 'ASHA_WORKER' | 'CLINIC' | 'DHO' | 'DISTRICT_ADMIN' | 'PHC_ADMIN' | 'STATE_AUTHORITY' | 'SUPER_ADMIN' | null;

export interface UserProfile {
    fullName: string;
    ageGroup: string;
    gender?: string;
    village: string;
    district: string;
    state: string;
    waterSource: string;
    language: string;
    ashaId?: string;
    subCenter?: string;
    phc?: string;
    block?: string;
    yearsOfExperience?: string;
    isProfileComplete: boolean;
}

interface User {
    id: string;
    mobile?: string;
    email?: string;
    role: UserRole;
    profile?: UserProfile;
}

interface AuthContextType {
    user: User | null;
    login: (type: 'OTP' | 'PASSWORD', identifier: string, secret: string) => Promise<void>;
    logout: () => void;
    updateProfile: (profile: UserProfile) => Promise<void>;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Map backend roles to frontend roles
function mapBackendRoleToFrontendRole(backendRoles: any[]): UserRole {
    if (!backendRoles || backendRoles.length === 0) return 'COMMUNITY_MEMBER';

    const roleMap: Record<string, UserRole> = {
        'Community': 'COMMUNITY_MEMBER',
        'ASHA': 'ASHA_WORKER',
        'Doctor': 'CLINIC',
        'District Admin': 'DISTRICT_ADMIN',
        'State Admin': 'STATE_AUTHORITY',
        'Super Admin': 'SUPER_ADMIN',
    };

    const roleName = backendRoles[0].name;
    return roleMap[roleName] || 'COMMUNITY_MEMBER';
}

// Convert backend user profile to frontend format
function convertBackendUserToFrontendUser(backendUser: BackendUserProfile): User {
    return {
        id: backendUser.id.toString(),
        email: backendUser.email,
        role: mapBackendRoleToFrontendRole(backendUser.roles),
        profile: {
            fullName: `${backendUser.first_name} ${backendUser.last_name}`.trim() || backendUser.username,
            ageGroup: '25-45', // Default, can be customized later
            village: 'Not Set',
            district: 'Not Set',
            state: 'Andhra Pradesh',
            waterSource: 'Not Set',
            language: 'English',
            isProfileComplete: backendUser.is_verified,
        },
    };
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in
        const checkAuth = async () => {
            if (backendApi.isAuthenticated()) {
                try {
                    const profile = await backendApi.getProfile();
                    const frontendUser = convertBackendUserToFrontendUser(profile);
                    setUser(frontendUser);
                } catch (error) {
                    console.error('Failed to load user profile:', error);
                    backendApi.clearTokens();
                }
            }
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (type: 'OTP' | 'PASSWORD', identifier: string, secret: string) => {
        setIsLoading(true);

        try {
            // For now, only support password login (USERNAME + PASSWORD)
            // The identifier is the username, secret is the password
            await backendApi.login(identifier, secret);

            // Fetch user profile after successful login
            const profile = await backendApi.getProfile();
            const frontendUser = convertBackendUserToFrontendUser(profile);

            setUser(frontendUser);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error('Login failed:', error);
            throw new Error('Invalid credentials. Please check your username and password.');
        }
    };

    const logout = () => {
        backendApi.logout();
        setUser(null);
    };

    const updateProfile = async (profile: UserProfile) => {
        if (!user) return;
        setIsLoading(true);

        try {
            // Update backend
            await backendApi.updateProfile({
                is_verified: true,
                // Add other profile fields if your UserSerializer supports them
            });

            // Update local state
            const updatedUser = { ...user, profile: { ...profile, isProfileComplete: true } };
            setUser(updatedUser);
        } catch (error) {
            console.error('Failed to update profile:', error);
            // Optionally handle error
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateProfile, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
