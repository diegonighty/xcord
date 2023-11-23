'use client'

import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { Avatar } from "./avatar"
import { VscAccount } from "react-icons/vsc";
import { FiHome } from "react-icons/fi";
import { IconContext } from "react-icons";
import { IoSettingsOutline } from "react-icons/io5";



const links = [
   {name: "Inicio", href: "/", icon: FiHome},
   {name: "Perfil", href: "/pages/me", icon: VscAccount},
   {name: "Ajustes", href: "/pages/settings", icon: IoSettingsOutline},
]

export function NavBar() {
   return (
      <>
      <MainNavBar />
      <NavSideBar />
      </>
   )
}

export function NavLinks() {
   return ( 
   <>
      {links.map((link) => {
         const Icon = link.icon;

         return (
            <li key={link.name}>
               <Link href={link.href} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <IconContext.Provider value={{ className: 'w-5 h-5', style: { height: '24', width: '24' } }}>
                  <Icon/>
                </IconContext.Provider>
                <span className="ms-3">{link.name}</span>
               </Link>
            </li>
         )})
      }
   </>
   )
}

export function UserNav() {
  const {data: session} = useSession();
  if (!session) return (<></>)

  return (
    <Link href={"/pages/settings"} className="grid grid-cols-2">
      <Avatar width={32} height={32} user={session.dbUser} alt="user photo" classNames="rounded-full w-10 h-10 mx-auto"/>
      <p className="flex items-center justify-center font-bold">{session.dbUser.name}</p>
    </Link>
  )
}

export function MainNavBar() {

  return (
      <>
<nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
  <div className="px-3 py-3 lg:px-5 lg:pl-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-start rtl:justify-end">
        <Link href="/" className="flex ms-2 md:me-24">
          <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">XCord</span>
        </Link>
      </div>
      <div className="flex items-center">
          <div className="flex items-center ms-3">
            <div>
              <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                <span className="sr-only">Open user menu</span>
                <UserNav />
              </button>
            </div>
          </div>
        </div>
    </div>
  </div>
</nav>
      </>
   )
}

export function NavSideBar() {
    return (
      <>
         <aside id="default-sidebar" className="fixed top-0 left-0 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 pr-5" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
               <Link href="/home" className="flex items-center ps-2.5 mb-5">
                  <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">XCord</span>
               </Link>
               
               <ul className="space-y-2 font-medium">
                  <NavLinks />
               </ul>
            </div>
         </aside>
      </>
    )
}