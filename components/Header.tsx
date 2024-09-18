"use client";

import { usePathname, useRouter } from "next/navigation";
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
  const pathname = usePathname();

  const { user } = useUser();

  return (
    <div className="relative">
      <div className={`${hideOverlay && 'hidden'} absolute h-[70vh] -top-[200px] -left-20 right-0 bg-[url('/images/bg-gradient.png')] bg-cover z-0`}></div>
      <div className={`${hideOverlay && 'hidden'} absolute h-[70vh] top-[200px] -left-20 right-0 backdrop-filter backdrop-blur-[30px]`} style={{background: 'linear-gradient(transparent, rgba(0 0 0 / .5))' }}></div>

      <div className={twMerge(`h-fit bg-black bg-opacity-65 backdrop-blur p-6`, className)} style={style}>
        <div className="w-full mb-4 md:mb-8 flex items-center justify-between">
          {pathname === '/' ? (
            <div className="italic text-white">
              Made by <span className="bg-primary/90">Pavel Pshenyshniuk</span>
            </div>
          ) : (
            <div className="hidden md:flex gap-x-2 items-center">
              <button
                  className="rounded-full bg-transparent border border-neutral-100 flex items-center justify-center hover:opacity-75 transition"
                  onClick={() => router.back()}
              >
                <RxCaretLeft className="text-neutral-100" size={35}/>
              </button>
              <button
                  className="rounded-full bg-transparent border border-neutral-100 flex items-center justify-center hover:opacity-75 transition"
                  onClick={() => router.forward()}
              >
                <RxCaretRight className="text-neutral-100" size={35}/>
              </button>
            </div>
          )}
          {/* Mobile header */}
          <div className="flex md:hidden gap-x-2 items-center">
            {pathname === '/library' ? (
              <h1 className="text-white text-3xl font-semibold">
                Library
              </h1>
            ) : (
              <button
                  className={`${pathname === '/' ? 'hidden' : 'flex'} rounded-full bg-transparent border border-neutral-300 flex items-center justify-center hover:opacity-75 transition`}
                  onClick={() => router.back()}
              >
                <RxCaretLeft className="text-neutral-300" size={25}/>
              </button>
            )}
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
                  <Button className="bg-primary p-2 md:p-3" onClick={() => router.push("/account")}>
                    <FaUserAlt />
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <Button className="bg-primary px-6 py-2" onClick={authModal.onOpen}>
                  Log in
                </Button>
              </div>
            )}
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Header
