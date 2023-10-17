import React, { useState } from 'react';
import {Link, NavLink} from 'react-router-dom'

function Nav() : JSX.Element{

    let Links = [
        {name:"ABOUT ME", link:"/"},
        {name:"FRIENDS", link:"/friends"}
    ]

    let [open, setOpen] = useState(false);

    return(
            <div className="shadow-md w-full fixed top-0 left-0">
                <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
                    <div className="font-bold text-2xl cursor-pointer flex items-center text-gray-800">
                        Assignment
                    </div>
                    <div onClick={()=>setOpen(!open)} className={`absolute right-8 top-6 cursor-pointer ${!open ? 'md:hidden' : 'hidden' }`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </div>
                    <div onClick={()=>setOpen(!open)} className={`absolute right-8 top-6 cursor-pointer ${!open ? 'hidden' : 'md:hidden' }`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-7 transition-all duration-500 ease-in ${open ? 'top-20' : 'top-[-490px]'}`}>
                        {
                            Links.map((link)=>(
                                <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7"><a href={link.link} className="text-gray-800 hover:text-gray-400 duration-500">{link.name}</a></li>
                            ))
                        }
                    </ul>
                </div>
            </div>
    )
}

export default Nav;;