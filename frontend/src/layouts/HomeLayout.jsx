import React from 'react'
import { Heart, Plus, Search, ShoppingBag, User } from "lucide-react";
import { NavLink, Outlet } from 'react-router';

const HomeLayout = () => {
  return (
    <div className='h-full w-full'>
       <div className='w-full h-full px-5 py-4 border-b border-gray-300'>
        <button className='w-full flex justify-between'>
            <h1>THE DENIM ESSENTIALS | FIND YOUR FIT</h1>
            <h1><Plus /></h1>
        </button>
       </div>

       {/* nav */}
       <nav className='w-full h-full flex justify-between items-center px-5 py-2'>
        <div className='flex items-center gap-14'>
           <div>
              <img className='h-13' src="https://imgs.search.brave.com/5cVyLglN4oMuWyA2ffi2JGB5Zd5Qi3cTqCeQs_Rn3j4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzUyLzIvaG0tbG9n/by1wbmdfc2Vla2xv/Z28tNTIwODU3LnBu/Zw" alt="" />
           </div>
           <div className='flex gap-7'>
               <NavLink to="/" className={({isActive})=>isActive?"text-black font-semibold":"text-gray-500"}>
                 LADIES
               </NavLink>
               <NavLink to="/men" className={({isActive})=>isActive?"text-black font-semibold":"text-gray-500"}>
                 MEN
               </NavLink>
               <NavLink to="/kids" className={({isActive})=>isActive?"text-black font-semibold":"text-gray-500"}>
                 KIDS
               </NavLink>
               <NavLink to="/home" className={({isActive})=>isActive?"text-black font-semibold":"text-gray-500"}>
                 HOME
               </NavLink>
               <NavLink to="/beauty" className={({isActive})=>isActive?"text-black font-semibold":"text-gray-500"}>
                 BEAUTY
               </NavLink>
           </div>
        </div>
        <div className='flex gap-7 items-center mr-5'>
           <Search className='text-gray-800' size={18} />
           <User className='text-gray-800' size={18} />
           <Heart className='text-gray-800' size={18} />
           <ShoppingBag  className='text-gray-800' size={18} />
        </div>
       </nav>

       <div>
        <Outlet />
       </div>
    </div>
  )
}

export default HomeLayout
