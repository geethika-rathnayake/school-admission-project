'use client';

import Link from "next/link";
import { Home, Inbox, Calendar, Search, Settings, User2, ChevronUp, Plus, ProjectorIcon, FileImage, FilesIcon, ChevronDown } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "./ui/sidebar";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Inbox", url: "#", icon: Inbox },
  { title: "Calendar", url: "#", icon: Calendar },
  { title: "Search", url: "#", icon: Search },
  { title: "Settings", url: "#", icon: Settings },
];

const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon" >
      <SidebarHeader className="py-4">
        <SidebarMenu>
            <SidebarMenuItem>
               <SidebarMenuButton asChild>
                    <Link href="/">
                    <Image src="/logo.svg" alt="logo" width={20} height={20}/>
                    <span>School</span>
                    </Link>
                </SidebarMenuButton> 
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator></SidebarSeparator>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.title ==="Inbox" && (
                    <SidebarMenuBadge>22</SidebarMenuBadge>
                  ) }
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
            <SidebarGroupLabel>Submissions</SidebarGroupLabel>
            <SidebarGroupAction>
                <Plus/><span className="sr-only">Submissions</span>
            </SidebarGroupAction>
            <SidebarGroupContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/#">
                                <FilesIcon/>
                                See All Submissions
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/#">
                                <Plus/>
                                Add Submission
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>

        
              {/* COLLAPSABLE */}
              <Collapsible defaultOpen className="group/collapsible">
              
        <SidebarGroup>
            <SidebarGroupLabel asChild>
            <CollapsibleTrigger>
              Collapsable Group
             <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </CollapsibleTrigger>
                 </SidebarGroupLabel>
                 <CollapsibleContent>
            <SidebarGroupContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/#">
                                <FilesIcon/>
                                See All Submissions
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/#">
                                <Plus/>
                                Add Submission
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
            </CollapsibleContent>
        </SidebarGroup>
        </Collapsible>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild >
                       <SidebarMenuButton>
                        <User2/> Jimmy <ChevronUp className="ml-auto" />
                       </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Account</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Sign out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
