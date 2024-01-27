"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { IoIosNotifications } from "react-icons/io";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { CgProfile } from "react-icons/cg";

const Navicons = () => {
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
    isAuthenticated,
  } = useKindeBrowserClient();
  // Empty dependency array ensures the effect runs only once on mount
  const router = useRouter();
  return (
    <>
      {isAuthenticated ? (
        <div className="flex space-x-5 items-center justify-center pr-3">
          <CgProfile
            className="cursor-pointer text-2xl hover:scale-125 transition-all"
            onClick={() => {
              router.push("/profile");
            }}
          />
          <IoIosNotifications
            className="cursor-pointer text-2xl hover:scale-125 transition-all"
            onClick={() => {
              router.push("/notification");
            }}
          />
          <IoChatbubbleEllipsesOutline
            className="cursor-pointer text-2xl hover:scale-125 transition-all "
            onClick={() => {
              router.push("/connection");
            }}
          />
        </div>
      ) : (
        <div className="flex space-x-3 items-center justify-center">
          <LoginLink className="bg-orange-500 text-white rounded-full py-2 px-4 focus:outline-none">
            Sign Up
          </LoginLink>
          <BsThreeDots className="cursor-pointer" />
        </div>
      )}
    </>
  );
};

export default Navicons;
