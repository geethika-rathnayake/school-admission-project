"use client";

import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Link, LogOut, Moon, Settings, User } from "lucide-react"
import { Avatar } from "./ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { SidebarTrigger, useSidebar } from "./ui/sidebar"
import { useState } from "react"

const Navbar = () => {
    const {toggleSidebar}= useSidebar()
    return (
        <nav className="p-4 flex items-center justify-between">
            {/* LEFT */}
            <SidebarTrigger/>
            {/*<Button variant="outline" onClick={toggleSidebar}>Custom Button</Button>*/}
            {/* RIGHT */}
            <div className="flex items-center gap-4">
                 <Link href="/">Dashboard</Link>
                  <Moon/>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger> 
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={10}>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <User className="h-[1.2rem] w-[1.2rem mr-2"/>
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Settings className="h-[1.2rem] w-[1.2rem mr-2"/>
                        Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive">
                        <LogOut className="h-[1.2rem] w-[1.2rem mr-2"/>
                        LogOut
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

            </div>   
        </nav>
    )
}

export default Navbar