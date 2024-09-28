// import React, {useState} from 'react';
// import Sidebar from './Sidebar';
// import MainContent from './MainContent';
// import { Input } from "@/components/ui/input";
// import Avatar from 'react-avatar';
// import Projects from '../../pages/Projects';
// import { string } from 'prop-types';


// const Dashboard: React.FC = () => {
//   const user = JSON.parse(localStorage.getItem('user') || '{}');
//   const [activeSection, setActiveSection] = useState('home');

//   const handleNavigation = (section: string) => {
//     setActiveSection(section);
//   };

//   const renderContent = () => {
//     switch (activeSection) {
//       case 'Home':
//         return <MainContent userName={user.fullName || 'User'} />;
//       case 'projects':
//         return <Projects />;
//       // Add case for other Sections
//       default:
//         return <MainContent userName={user.fullName || 'User'} />;
      
//     }
//   }


//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar onNavigate={handleNavigation} />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <header className="bg-gray-800 shadow-sm p-4 flex justify-between items-center">
//           <Input 
//             type="search" 
//             placeholder="Search" 
//             className="w-1/3 bg-white"
//           />
//           <div className="flex text-white items-center gap-4">
//             <span>14 days left in trial</span>
            
//             <button className="bg-yellow-500 text-white px-4 py-2 rounded">Add billing info</button>
//           </div>
//           <div className="flex items-center">
//           <Avatar name={user.fullName} size="60" round={true} />
//           </div>
          
//         </header>
//         <main className="flex-1 overflow-x-hidden overflow-y-auto">
//           {renderContent()}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




// import React, { useState } from 'react';
// import Sidebar from './Sidebar';
// import MainContent from './MainContent';
// import { Input } from "@/components/ui/input";
// import Avatar from 'react-avatar';
// import Projects from '../../pages/Projects';
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator
// } from "@/components/ui/dropdown-menu";

// const Dashboard: React.FC = () => {
//   const user = JSON.parse(localStorage.getItem('user') || '{}');
//   const [activeSection, setActiveSection] = useState('home');

//   const handleNavigation = (section: string) => {
//     setActiveSection(section);
//   };

//   const renderContent = () => {
//     switch (activeSection) {
//       case 'Home':
//         return <MainContent userName={user.fullName || 'User'} />;
//       case 'projects':
//         return <Projects />;
//       // Add case for other Sections
//       default:
//         return <MainContent userName={user.fullName || 'User'} />;
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar onNavigate={handleNavigation} />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <header className="bg-gray-800 shadow-sm p-4 flex justify-between items-center">
//           {/* Search Input */}
//           <Input 
//             type="search" 
//             placeholder="Search" 
//             className="w-1/3 bg-white"
//           />
//           {/* Trial and Billing Info */}
//           <div className="flex text-white items-center gap-4">
//             <span>14 days left in trial</span>
//             <button className="bg-yellow-500 text-white px-4 py-2 rounded">
//               Add billing info
//             </button>
//           </div>
          
//           {/* Avatar and Dropdown */}
//           <div className="relative flex items-center">
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <div className="flex items-center cursor-pointer">
//                   <Avatar name={user.fullName} size="40" round={true} />
//                   <span className="ml-2">{user.fullName}</span>
//                 </div>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="w-56 bg-white shadow-lg">
//                 <DropdownMenuLabel>{user.fullName}</DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>My Workspace</DropdownMenuItem>
//                 <DropdownMenuItem>New Workspace</DropdownMenuItem>
//                 <DropdownMenuItem>Invite to Asana</DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>Profile</DropdownMenuItem>
//                 <DropdownMenuItem>Settings</DropdownMenuItem>
//                 <DropdownMenuItem>Log out</DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </header>
        
//         <main className="flex-1 overflow-x-hidden overflow-y-auto">
//           {renderContent()}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useContext, useEffect, useState  } from 'react';
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
import { ChevronDown, Plus, UserPlus, Settings, LogOut } from 'lucide-react';
import { AuthContext } from '../../contexts/AuthContext'; // Adjust the import path as needed

interface User {
  fullName: string;
  email: string;
  avatarUrl?: string; // Optional, in case the user doesn't always have an avatar
}

//Inside your AuthContext provider, ensure you pass `user` and `logout` properly.

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [activeSection, setActiveSection] = React.useState('home');



  // useEffect(() => {
  //   if (auth?.user) {
  //     setIsLoading(false);
  //   } else {
  //     // If there's no user data, redirect to login
  //     navigate('/login');
  //   }
  // }, [auth?.user, navigate]);

  if (!auth) {
    throw new Error("AuthContext not available");
  }

  const { user, logout , loading} = auth;

 

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
        return <MainContent userName={user.fullName} />;
      case 'projects':
        return <Projects />;
      default:
        return <MainContent userName={user.fullName} />;
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
            <Button className='bg-yellow-800'  variant="warning">Add billing info</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 h-8 w-8 rounded-full">
                  <Avatar 
                    name={user?.fullName || 'User'} 
                    size="32" 
                    round={true} 
                    src={user?.avatarUrl}
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
                  <span>Invite to Asana</span>
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



// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Sidebar from './Sidebar';
// import MainContent from './MainContent';
// import Projects from '../../pages/Projects';
// import { Input } from "@/components/ui/input";
// import Avatar from 'react-avatar';
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { ChevronDown, Plus, UserPlus, Settings, LogOut } from 'lucide-react';
// import { AuthContext } from '../../contexts/AuthContext'; // Adjust the import path as needed

// const Dashboard: React.FC = () => {
//   const navigate = useNavigate();
//   const auth = useContext(AuthContext);
//   const [activeSection, setActiveSection] = React.useState('home');

//   if (!auth) {
//     throw new Error("AuthContext not available");
//   }

//   const { user, logout, loading } = auth;

//   const handleNavigation = (section: string) => {
//     setActiveSection(section);
//   };

//   const handleLogout = async () => {
//     logout();
//     navigate('/login');
//   };

//   const renderContent = () => {
//     switch (activeSection) {
//       case 'Home':
//         return <MainContent userName={user?.name || 'User'} />;
//       case 'projects':
//         return <Projects />;
//       default:
//         return <MainContent userName={user?.name || 'User'} />;
//     }
//   }

//   if (loading) {
//     return <div>Loading...</div>; // Or a more sophisticated loading component
//   }

//   if (!user) {
//     navigate('/login');
//     return null;
//   }

//   return (
//     <div className="flex h-screen bg-zinc-900 border border-zinc-700 hover:border-zinc-600 transition-colors">
//       <Sidebar onNavigate={handleNavigation} />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <header className="bg-zinc-800 shadow-sm p-4 flex justify-between items-center">
//           <Input type="search" placeholder="Search" className="w-1/3 bg-white" />
//           <div className="flex items-center gap-4">
//             <span className="text-white">13 days left in trial</span>
//             <Button className='bg-yellow-800'  variant="warning">Add billing info</Button>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" className="p-0 h-8 w-8 rounded-full">
//                   <Avatar 
//                     name={user.name} 
//                     size="32" 
//                     round={true} 
//                   />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="w-56 bg-gradient-to-br from-zinc-800 to-zinc-900 border-zinc-700 hover:border-zinc-600 transition-colors text-white" align="end" forceMount>
//                 <DropdownMenuLabel className="font-normal">
//                   <div className="flex flex-col space-y-1">
//                     <p className="text-sm font-medium leading-none">My workspace</p>
//                     <p className="text-xs leading-none text-muted-foreground">
//                       {user.email}
//                     </p>
//                   </div>
//                 </DropdownMenuLabel>
//                 <DropdownMenuSeparator className='border-zinc-500'/>
//                 {/* ... other menu items ... */}
//                 <DropdownMenuItem onSelect={handleLogout}>
//                   <LogOut className="mr-2 h-4 w-4" />
//                   <span>Log out</span>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </header>
//         <main className="flex-1 overflow-x-hidden overflow-y-auto">
//           {renderContent()}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;