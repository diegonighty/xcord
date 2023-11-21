'use client'

import Link from "next/link"
import { useSession } from "next-auth/react"
import { Avatar } from "./avatar"
import { VscAccount } from "react-icons/vsc";
import { FiHome } from "react-icons/fi";
import { IconContext } from "react-icons";


const links = [
   {name: "Inicio", href: "/", icon: FiHome},
   {name: "Perfil", href: "/me", icon: VscAccount}
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
    <Link href={"/pages/settings"}>
      <Avatar width={32} height={32} user={session.dbUser} alt="user photo"/>
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
        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
         </button>
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
         <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
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