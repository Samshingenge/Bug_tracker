import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import Projects from '../../pages/Projects';
import { Input } from "@/components/ui/input";
import Avatar from 'react-avatar';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, UserPlus, Settings, LogOut } from 'lucide-react';
import { AuthContext } from '../../contexts/AuthContext'; // Adjust the import path as needed

// Assume this function exists

interface User {
   // Optional, in case the user doesn't always have an avatar
  fullName?: string;
  
}



//Inside your AuthContext provider, ensure you pass `user` and `logout` properly.

const Dashboard: React.FC = ({}) => {
    // Typing the use
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [activeSection, setActiveSection] = React.useState('home');
  // Renaming user to authUser

  
  
  


  if (!auth) {
    throw new Error("AuthContext not available");
  }

  const { user, logout} = auth;

 

  const handleNavigation = (section: string) => {
    setActiveSection(section);
  };

  const handleLogout = async () => {
    logout();
    navigate('/login');
  };

 

  const renderContent = () => {
    // if (!user) {
    //   return <div>User data not available</div>;
    // }
    switch (activeSection) {
      case 'Home':
        return <MainContent userName={(user as User)?.fullName ?? 'User'}  />;
      case 'projects':
        return <Projects />;
      default:
        return <MainContent userName={(user as User)?.fullName ?? 'User'}  />;
    }
  }


  if (!user) {
    navigate('/login');
    return null;
  }


  return (
    <div className="flex h-screen bg-zinc-900 border border-zinc-700 hover:border-zinc-600 transition-colors">
      <Sidebar onNavigate={handleNavigation} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-zinc-800 shadow-sm p-4 flex justify-between items-center">
          <Input type="search" placeholder="Search" className="w-1/3 bg-white" />
          <div className="flex items-center gap-4">
            <span className="text-white">13 days left in trial</span>
            <Button className='bg-yellow-700'  variant="ghost">Add billing info</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 h-8 w-8 rounded-full">
                  <Avatar 
                    // name={user.fullName}
                    name={(user as User)?.fullName ?? 'User'} 
                    size="32" 
                    round={true} 
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gradient-to-br from-zinc-800 to-zinc-900 border-zinc-700 hover:border-zinc-600 transition-colors text-white" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">My workspace</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className='border-zinc-500'/>
                <DropdownMenuItem>
                  My workspace
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Plus className="mr-2 h-4 w-4 border-zinc-800" />
                  <span>New workspace</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>Invite to Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className='border-zinc-500'/>
                <DropdownMenuItem>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Plus className="mr-2 h-4 w-4" />
                  <span>Add another account</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className='border-zinc-500'/>
                <DropdownMenuItem onSelect={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );  
};

export default Dashboard;





//===================================Multiple Users============================

// import React from 'react';
// import { useAuth } from '../contexts/AuthContext';

// const Dashboard: React.FC = () => {
//   const { userRole, logout } = useAuth();

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <p>Welcome, {userRole} user!</p>
//       <button onClick={logout}>Logout</button>
//     </div>
//   );
// };

// export default Dashboard;