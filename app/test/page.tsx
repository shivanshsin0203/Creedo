"use client";

import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import {LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { Skeleton } from "@/components/ui/skeleton";
export default function ClientPage() {
    const {
        permissions,
        isLoading,
        user,
        accessToken,
        organization,
        userOrganizations,
        getPermission,
        getBooleanFlag,
        getIntegerFlag,
        getFlag,
        getStringFlag,
        getClaim,
        getAccessToken,
        getToken,
        getIdToken,
        getOrganization,
        getPermissions,
        getUserOrganizations,
        isAuthenticated
    } = useKindeBrowserClient();

    
    console.log(getBooleanFlag("flag", false));
    console.log(getIntegerFlag("eat:chips", 1));
    console.log(getStringFlag("eat:chips", "ds"));
    console.log(getFlag("eat:chips", false, "b"));
    console.log(isAuthenticated);
    console.log("accessToken", accessToken);
    console.log(getClaim("aud"));
    if (isLoading) return <div className=" justify-center items-center"><Skeleton/></div>;

    return (
        <div className="pt-20">
           
            <LoginLink postLoginRedirectURL="/dashboard">Login</LoginLink>
            <div className="mb-8">
                <h4 className="text-2xl font-bold dark:text-white mb-2">User</h4>

                <pre className="p-4 rounded bg-slate-950 text-green-300">
                    {JSON.stringify(user, null, 2)}
                </pre>
            </div>

            <div className="mb-8">
                <h4 className="text-2xl font-bold dark:text-white mb-2">Permissions</h4>

                <pre className="p-4 rounded bg-slate-950 text-green-300">
                    {JSON.stringify(permissions, null, 2)}
                </pre>
            </div>

            <div className="mb-8">
                <h4 className="text-2xl font-bold dark:text-white mb-2">Organization</h4>

                <pre className="p-4 rounded bg-slate-950 text-green-300">
                    {JSON.stringify(organization, null, 2)}
                </pre>
            </div>

            <div className="mb-8">
                <h4 className="text-2xl font-bold dark:text-white mb-2">User organizations</h4>

                <pre className="p-4 rounded bg-slate-950 text-green-300">
                    {JSON.stringify(userOrganizations, null, 2)}
                </pre>
            </div>

            <div className="mb-8">
                <h4 className="text-2xl font-bold dark:text-white mb-2">Access token</h4>

                <pre className="p-4 rounded bg-slate-950 text-green-300">
                    {JSON.stringify(accessToken, null, 2)}
                </pre>
            </div>
        </div>
    );
}