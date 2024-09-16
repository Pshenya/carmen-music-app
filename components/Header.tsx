"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";

import { useUser, useAuthModal } from "@/hooks";
import Button from "./ui/Button";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  hideOverlay?: boolean;
}

const Header: React.FC<HeaderProps> = ({ children, className, hideOverlay, style }) => {
  const authModal = useAuthModal();
  const router = useRouter();

  const { user } = useUser();

  return (
    <div className="relative">
      <div className={`${hideOverlay && 'hidden'} absolute h-[70vh] -top-[200px] -left-20 right-0 bg-[url('/images/bg-gradient.png')] bg-cover z-0`}></div>
      <div className={`${hideOverlay && 'hidden'} absolute h-[70vh] top-[200px] -left-20 right-0 backdrop-filter backdrop-blur-[30px]`} style={{background: 'linear-gradient(transparent, rgba(0 0 0 / .5))' }}></div>

      <div className={twMerge(`h-fit bg-black bg-opacity-65 backdrop-blur p-6`, className)} style={style}>
        <div className="w-full mb-4 md:mb-8 flex items-center justify-between">
          <div className="hidden md:flex gap-x-2 items-center">
            <button
                className="rounded-full bg-transparent border border-primary flex items-center justify-center hover:opacity-75 transition"
                onClick={() => router.back()}
            >
              <RxCaretLeft className="text-primary" size={35}/>
            </button>
            <button
                className="rounded-full bg-transparent border border-primary flex items-center justify-center hover:opacity-75 transition"
                onClick={() => router.forward()}
            >
              <RxCaretRight className="text-primary" size={35}/>
            </button>
          </div>
          <div className="flex md:hidden gap-x-2 items-center">
            <button
                className="rounded-full p-2 bg-primary flex items-center justify-center hover:opacity-75 transition"
                onClick={() => router.push('/')}>
              <HiHome className="text-black" size={20}/>
            </button>
            <button
                className="rounded-full p-2 bg-transparent border-2 border-primary flex items-center justify-center hover:opacity-75 transition"
                onClick={() => router.push('/search')}
            >
              <BiSearch className="text-primary" size={20}/>
            </button>
          </div>
          <div className="flex justify-between items-center gap-x-4">
            {user ? (
              <div className="flex gap-x-4 items-center">
                {/* <div>
                  <Button className="bg-white px-6 py-2" onClick={handleLogout}>
                    Log out
                  </Button>
                </div> */}
                <div>
                  <Button className="bg-primary" onClick={() => router.push("/account")}>
                    <FaUserAlt />
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <Button className="bg-transparent text-neutral-300 font-medium" onClick={authModal.onOpen}>
                    Sign up
                  </Button>
                </div>
                <div>
                  <Button className="bg-primary px-6 py-2" onClick={authModal.onOpen}>
                    Log in
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Header
