// import React from 'react';
// import ProjectOverview from '../components/dashboard/ProjectOverview';
// import RecentActivity from '../components/dashboard/RecentActivity';
// import TasksSummary from '../components/dashboard/TasksSummary';

// const Dashboard: React.FC = () => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         <h1>Dashboard</h1>
//       <ProjectOverview />
//       <TasksSummary />
//       <RecentActivity />
//     </div>
//   );
// };

// export default Dashboard;

//===========================================Woking=======================================
// import ProjectOverview from '../components/dashboard/ProjectOverview';
// import RecentActivity from '../components/dashboard/RecentActivity';
// import TasksSummary from '../components/dashboard/TasksSummary';
// import React from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { 
//   BarChart, 
//   Bug, 
//   CheckCircle, 
//   Clock, 
//   ListTodo, 
//   Plus, 
//   User
// } from 'lucide-react';

// const Dashboard: React.FC = () => {
//   const user = JSON.parse(localStorage.getItem('user') || '{}');

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <header className="mb-8">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center space-x-4">
//             <Avatar className="h-12 w-12">
//               <AvatarImage src={user.avatar || '/default-avatar.png'} alt={user.fullName} />
//               <AvatarFallback>{user.fullName ? user.fullName.charAt(0) : 'U'}</AvatarFallback>
//             </Avatar>
//             <div>
//               <h1 className="text-2xl font-bold">Welcome, {user.fullName}!</h1>
//               <p className="text-sm text-muted-foreground">{user.company}</p>
//             </div>
//           </div>
//           <Button>
//             <Plus className="mr-2 h-4 w-4" /> New Project
//           </Button>
//         </div>
//       </header>
// <div>
// {/* <ProjectOverview />

// <TasksSummary/>

// <RecentActivity /> */}
// </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         <ProjectOverview />
//         <TasksSummary />
//         <RecentActivity />
//       </div>
//     </div>
//   );
// };




// export default Dashboard;

//==============================================================================================

// Dashboard.tsx
// import React from 'react';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// const Dashboard: React.FC = () => {
//     const user = JSON.parse(localStorage.getItem('user') || '{}');

//     return (
//         <Card>
//             <CardHeader>
//                 <CardTitle className="text-xl">Dashboard</CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <div className="flex items-center gap-4">
//                     {/* User Avatar */}
//                     <Avatar>
//                         <AvatarImage src={user.avatar || '/default-avatar.png'} alt={user.fullName} />
//                         <AvatarFallback>{user.fullName?.charAt(0)}</AvatarFallback>
//                     </Avatar>
//                     {/* Welcome Message */}
//                     <div>
//                         <h2 className="text-2xl font-bold">Welcome, {user.fullName}!</h2>
//                         <p className="text-sm text-gray-500">{user.email}</p>
//                     </div>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// };

// export default Dashboard;


//========================Working Well====================================

import React from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import { Input } from "@/components/ui/input";
import Avatar from 'react-avatar';


const Dashboard: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');


  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-gray-800 shadow-sm p-4 flex justify-between items-center">
          <Input 
            type="search" 
            placeholder="Search" 
            className="w-1/3 bg-white"
          />
          <div className="flex text-white items-center gap-4">
            <span>14 days left in trial</span>
            
            <button className="bg-yellow-500 text-white px-4 py-2 rounded">Add billing info</button>
          </div>
          <div className="flex items-center">
          <Avatar name={user.fullName} size="60" round={true} />
          </div>
          
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <MainContent userName={user.fullName || 'User'} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

//===========================================================Let Try ================

// import React, { useState } from 'react';
// import { Menu, X, Plus, Search, CreditCard, User, CheckSquare, Briefcase, MessageSquare, Image, UserPlus } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// import Sidebar from './Sidebar';
// import MainContent from './MainContent';

// const Dashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [createMenuOpen, setCreateMenuOpen] = useState(false);

//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
//   const toggleCreateMenu = () => setCreateMenuOpen(!createMenuOpen);

//   const createMenuItems = [
//     { icon: CheckSquare, label: 'Task' },
//     { icon: Briefcase, label: 'Project' },
//     { icon: MessageSquare, label: 'Message' },
//     { icon: Image, label: 'Portfolio' },
//     { icon: UserPlus, label: 'Invite' },
//   ];

//   return (
//     <div className="flex flex-col h-screen bg-gray-900">
//       {/* Navbar */}
//       <header className="bg-gray-800 text-white shadow-md">
//         <div className="flex items-center justify-between p-2">
//           <div className="flex items-center">
//             <button onClick={toggleSidebar} className="text-white focus:outline-none focus:text-gray-300 mr-4">
//               <Menu size={24} />
//             </button>
//             {/* Create button and dropdown */}
//             <div className="relative">
//               <button onClick={toggleCreateMenu} className="flex items-center justify-center px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none">
//                 <Plus className="h-4 w-4 mr-1" />
//                 Create
//               </button>
//               {createMenuOpen && (
//                 <div className="absolute left-0 mt-2 w-48 bg-gray-700 rounded-md overflow-hidden shadow-xl z-10">
//                   {createMenuItems.map((item, index) => (
//                     <React.Fragment key={item.label}>
//                       <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-600">
//                         <item.icon className="h-4 w-4 mr-2" />
//                         {item.label}
//                       </a>
//                       {index === 3 && <hr className="border-gray-600" />}
//                     </React.Fragment>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Search bar */}
//           <div className="relative flex-grow max-w-xl mx-4">
//             <input type="text" placeholder="Search" className="w-full pl-10 pr-4 py-1 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Search className="h-4 w-4 text-gray-400" />
//             </div>
//           </div>

//           {/* Trial info and user menu */}
//           <div className="flex items-center space-x-4">
//             <span className="text-sm text-gray-400">23 days left in trial</span>
//             <button className="px-3 py-1 bg-orange-500 text-white rounded-md text-sm hover:bg-orange-600">Add billing info</button>
//             <button className="w-8 h-8 bg-gray-600 rounded-full text-white flex items-center justify-center">
//               SN
//             </button>
//           </div>
//         </div>
//       </header>

//       <div className="flex flex-1 overflow-hidden">
//         {/* Main content */}
//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 text-white">
//           <MainContent userName="Sam" />
//         </main>

//         {/* Sidebar */}
//         <div className={`bg-gray-800 text-white w-64 absolute inset-y-0 right-0 transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition duration-200 ease-in-out md:relative md:translate-x-0 z-20`}>
//           <Sidebar />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
//==============================================Lets Try 2 =========================


// import React, { useState, useEffect } from 'react';
// import { Menu, X, Plus, Search, CreditCard, User, CheckSquare, Briefcase, MessageSquare, Image, UserPlus } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// import Sidebar from './Sidebar';
// import MainContent from './MainContent';

// const Dashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [createMenuOpen, setCreateMenuOpen] = useState(false);
//   const [userName, setUserName] = useState('');

//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
//   const toggleCreateMenu = () => setCreateMenuOpen(!createMenuOpen);

//   useEffect(() => {
//     // Simulating a database fetch for the user name
//     // Replace this with your actual database call
//     const fetchUserName = async () => {
//       try {
//         // Simulate API call delay
//         await new Promise(resolve => setTimeout(resolve, 1000));
//         // Replace this with your actual user data fetch
//         setUserName('Sam Natangwe Shingenge');
//       } catch (error) {
//         console.error('Error fetching user name:', error);
//         setUserName('User');
//       }
//     };

//     fetchUserName();
//   }, []);

//   const createMenuItems = [
//     { icon: CheckSquare, label: 'Task' },
//     { icon: Briefcase, label: 'Project' },
//     { icon: MessageSquare, label: 'Message' },
//     { icon: Image, label: 'Portfolio' },
//     { icon: UserPlus, label: 'Invite' },
//   ];

//   return (
//     <div className="flex h-screen bg-gray-900">
//       {/* Sidebar */}
//       <div className={`bg-gray-800 text-white w-64 fixed inset-y-0 left-0 z-30 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}>
//         <Sidebar />
//       </div>

//       {/* Main content area */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Navbar */}
//         <header className="bg-gray-800 text-white shadow-md">
//           <div className="flex items-center justify-between p-2">
//             <div className="flex items-center">
//               <button onClick={toggleSidebar} className="text-white focus:outline-none focus:text-gray-300 md:hidden mr-4">
//                 <Menu size={24} />
//               </button>
//               {/* Create button and dropdown */}
//               <div className="relative">
//                 <button onClick={toggleCreateMenu} className="flex items-center justify-center px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none">
//                   <Plus className="h-4 w-4 mr-1" />
//                   Create
//                 </button>
//                 {createMenuOpen && (
//                   <div className="absolute left-0 mt-2 w-48 bg-gray-700 rounded-md overflow-hidden shadow-xl z-40">
//                     {createMenuItems.map((item, index) => (
//                       <React.Fragment key={item.label}>
//                         <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-600">
//                           <item.icon className="h-4 w-4 mr-2" />
//                           {item.label}
//                         </a>
//                         {index === 3 && <hr className="border-gray-600" />}
//                       </React.Fragment>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Search bar */}
//             <div className="relative flex-grow max-w-xl mx-4">
//               <input type="text" placeholder="Search" className="w-full pl-10 pr-4 py-1 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Search className="h-4 w-4 text-gray-400" />
//               </div>
//             </div>

//             {/* Trial info and user menu */}
//             <div className="flex items-center space-x-4">
//               <span className="text-sm text-gray-400">23 days left in trial</span>
//               <button className="px-3 py-1 bg-orange-500 text-white rounded-md text-sm hover:bg-orange-600">Add billing info</button>
//               <button className="w-8 h-8 bg-gray-600 rounded-full text-white flex items-center justify-center">
//                 {userName.split(' ').map(name => name[0]).join('')}
//               </button>
//             </div>
//           </div>
//         </header>

//         {/* Main content */}
//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 text-white p-4">
//           <MainContent userName={userName} />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

//======================================Try 3===============================================

// import React, { useState } from 'react';
// import Sidebar from './Sidebar';
// import MainContent from './MainContent';
// import { Input } from "@/components/ui/input";
// import Avatar from 'react-avatar';
// import { Menu, Plus, Search } from 'lucide-react';
// import { Button } from "@/components/ui/button";

// const Dashboard: React.FC = () => {
//   const user = JSON.parse(localStorage.getItem('user') || '{}');
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [createMenuOpen, setCreateMenuOpen] = useState(false);

//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
//   const toggleCreateMenu = () => setCreateMenuOpen(!createMenuOpen);

//   const createMenuItems = [
//     { icon: 'CheckSquare', label: 'Task' },
//     { icon: 'Briefcase', label: 'Project' },
//     { icon: 'MessageSquare', label: 'Message' },
//     { icon: 'Image', label: 'Portfolio' },
//     { icon: 'UserPlus', label: 'Invite' },
//   ];

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className={`bg-gray-800 text-white w-64 fixed inset-y-0 left-0 z-30 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}>
//         <Sidebar />
//       </div>
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <header className="bg-gray-800 shadow-sm p-4 flex justify-between items-center">
//           <div className="flex items-center">
//             <button onClick={toggleSidebar} className="text-white focus:outline-none focus:text-gray-300 md:hidden mr-4">
//               <Menu size={24} />
//             </button>
//             <Input 
//               type="search" 
//               placeholder="Search" 
//               className="w-64 bg-white"
//             />
//           </div>
//           <div className="relative">
//             <Button onClick={toggleCreateMenu} className="flex items-center justify-center px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none">
//               <Plus className="h-4 w-4 mr-1" />
//               Create
//             </Button>
//             {createMenuOpen && (
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-40">
//                 {createMenuItems.map((item, index) => (
//                   <React.Fragment key={item.label}>
//                     <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                       <span className="mr-2">{item.icon}</span>
//                       {item.label}
//                     </a>
//                     {index === 3 && <hr className="border-gray-200" />}
//                   </React.Fragment>
//                 ))}
//               </div>
//             )}
//           </div>
//           <div className="flex text-white items-center gap-4">
//             <span>14 days left in trial</span>
//             <button className="bg-yellow-500 text-white px-4 py-2 rounded">Add billing info</button>
//           </div>
//           <div className="flex items-center">
//             <Avatar name={user.fullName} size="60" round={true} />
//           </div>
//         </header>
//         <main className="flex-1 overflow-x-hidden overflow-y-auto">
//           <MainContent userName={user.fullName || 'User'} />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
//========================================Try 4======================

// import React, { useState, useEffect } from 'react';
// import Sidebar from './Sidebar';
// import MainContent from './MainContent';
// import { Input } from "@/components/ui/input";
// import Avatar from 'react-avatar';
// import { Menu, Plus, Search, CheckSquare, Briefcase, MessageSquare, Image, UserPlus } from 'lucide-react';
// import { Button } from "@/components/ui/button";

// const Dashboard: React.FC = () => {
//   const user = JSON.parse(localStorage.getItem('user') || '{}');
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [createMenuOpen, setCreateMenuOpen] = useState(false);

//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
//   const toggleCreateMenu = () => setCreateMenuOpen(!createMenuOpen);

//   const createMenuItems = [
//     { icon: CheckSquare, label: 'Task' },
//     { icon: Briefcase, label: 'Project' },
//     { icon: MessageSquare, label: 'Message' },
//     { icon: Image, label: 'Portfolio' },
//     { icon: UserPlus, label: 'Invite' },
//   ];

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768) {
//         setSidebarOpen(true);
//       } else {
//         setSidebarOpen(false);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize(); // Initial check

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar with overlay */}
//       <div 
//         className={`fixed inset-0 bg-gray-600 bg-opacity-75 z-20 transition-opacity duration-300 ease-in-out ${
//           sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
//         } md:hidden`}
//         onClick={toggleSidebar}
//       ></div>
//       <div 
//         className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white overflow-y-auto transition-transform duration-300 ease-in-out transform ${
//           sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         } md:relative md:translate-x-0 z-30`}
//       >
//         <Sidebar />
//       </div>

//       <div className="flex-1 flex flex-col overflow-hidden">
//         <header className="bg-gray-800 shadow-sm p-4 flex justify-between items-center">
//           <div className="flex items-center">
//             <button onClick={toggleSidebar} className="text-white focus:outline-none focus:text-gray-300 md:hidden mr-4">
//               <Menu size={24} />
//             </button>
//             <Input 
//               type="search" 
//               placeholder="Search" 
//               className="w-64 bg-white"
//             />
//           </div>
//           <div className="relative">
//             <Button onClick={toggleCreateMenu} className="flex items-center justify-center px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none">
//               <Plus className="h-4 w-4 mr-1" />
//               Create
//             </Button>
//             {createMenuOpen && (
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-40">
//                 {createMenuItems.map((item, index) => (
//                   <React.Fragment key={item.label}>
//                     <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                       <item.icon className="h-4 w-4 mr-2" />
//                       {item.label}
//                     </a>
//                     {index === 3 && <hr className="border-gray-200" />}
//                   </React.Fragment>
//                 ))}
//               </div>
//             )}
//           </div>
//           <div className="flex text-white items-center gap-4">
//             <span>14 days left in trial</span>
//             <button className="bg-yellow-500 text-white px-4 py-2 rounded">Add billing info</button>
//           </div>
//           <div className="flex items-center">
//             <Avatar name={user.fullName} size="60" round={true} />
//           </div>
//         </header>
//         <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
//           <MainContent userName={user.fullName || 'User'} />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

//===================================Try 5======================================

// import React, { useState, useEffect } from 'react';
// import Sidebar from './Sidebar';
// import MainContent from './MainContent';
// import { Input } from "@/components/ui/input";
// import Avatar from 'react-avatar';
// import { Menu, Plus, CheckSquare, Briefcase, MessageSquare, Image, UserPlus } from 'lucide-react';
// import { Button } from "@/components/ui/button";

// const Dashboard: React.FC = () => {
//   const user = JSON.parse(localStorage.getItem('user') || '{}');
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [createMenuOpen, setCreateMenuOpen] = useState(false);

//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
//   const toggleCreateMenu = () => setCreateMenuOpen(!createMenuOpen);

//   const createMenuItems = [
//     { icon: CheckSquare, label: 'Task' },
//     { icon: Briefcase, label: 'Project' },
//     { icon: MessageSquare, label: 'Message' },
//     { icon: Image, label: 'Portfolio' },
//     { icon: UserPlus, label: 'Invite' },
//   ];

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768) {
//         setSidebarOpen(true);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize(); // Initial check

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div 
//         className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white overflow-y-auto transition-transform duration-300 ease-in-out transform ${
//           sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         } md:relative md:translate-x-0`}
//       >
//         <Sidebar />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <header className="bg-gray-800 shadow-sm p-4 flex justify-between items-center">
//           <div className="flex items-center">
//             <button onClick={toggleSidebar} className="text-white focus:outline-none focus:text-gray-300 md:hidden mr-4">
//               <Menu size={24} />
//             </button>
//             <Input 
//               type="search" 
//               placeholder="Search" 
//               className="w-64 bg-white"
//             />
//           </div>
//           <div className="relative">
//             <Button onClick={toggleCreateMenu} className="flex items-center justify-center px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none">
//               <Plus className="h-4 w-4 mr-1" />
//               Create
//             </Button>
//             {createMenuOpen && (
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-40">
//                 {createMenuItems.map((item, index) => (
//                   <React.Fragment key={item.label}>
//                     <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                       <item.icon className="h-4 w-4 mr-2" />
//                       {item.label}
//                     </a>
//                     {index === 3 && <hr className="border-gray-200" />}
//                   </React.Fragment>
//                 ))}
//               </div>
//             )}
//           </div>
//           <div className="flex text-white items-center gap-4">
//             <span className="hidden sm:inline">14 days left in trial</span>
//             <button className="bg-yellow-500 text-white px-4 py-2 rounded text-sm">Add billing info</button>
//           </div>
//           <div className="flex items-center">
//             <Avatar name={user.fullName} size="40" round={true} />
//           </div>
//         </header>
//         <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
//           <MainContent userName={user.fullName || 'User'} />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

//=============================try 6================================

// import React, { useState } from 'react';
// import Sidebar from './Sidebar';
// import MainContent from './MainContent';
// import { Input } from "@/components/ui/input";
// import Avatar from 'react-avatar';
// import { Menu } from 'lucide-react';
// import { Button } from "@/components/ui/button";

// const Dashboard: React.FC = () => {
//   const user = {
//     name: "John Doe",
//     avatar: "https://source.unsplash.com/random/200x200",
//   };

//   const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar initially open

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="flex h-screen overflow-hidden">
//       {/* Sidebar */}
//       <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
//         <Sidebar />
//       </div>

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col bg-gray-100">
//         {/* Header */}
//         <header className="bg-gray-900 text-white shadow p-4 flex justify-between items-center">
//           <div className="flex items-center">
//             <Button variant="ghost" onClick={toggleSidebar} className="mr-4 md:hidden">
//               <Menu className="w-6 h-6" />
//             </Button>
//             <h1 className="text-xl font-bold">Dashboard</h1>
//           </div>
//           <div className="flex items-center">
//             <Input type="text" placeholder="Search" className="hidden md:block bg-gray-800 text-white px-4 py-2 rounded-lg" />
//             <Avatar name={user.name} size="40" round={true} className="ml-4" />
//           </div>
//         </header>

//         {/* Main Content */}
//         <main className="flex-1 overflow-y-auto p-6">
//           <MainContent userName={user.name} />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


//=============================================================

// import React, { useState } from 'react';
// import { Menu, X, Plus, Search, CreditCard, User } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// import Sidebar from './Sidebar';
// import MainContent from './MainContent';

// const Dashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [createMenuOpen, setCreateMenuOpen] = useState(false);

//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
//   const toggleCreateMenu = () => setCreateMenuOpen(!createMenuOpen);

//   const createMenuItems = [
//     { icon: 'Task', label: 'Task' },
//     { icon: 'Project', label: 'Project' },
//     { icon: 'Message', label: 'Message' },
//     { icon: 'Portfolio', label: 'Portfolio' },
//     { icon: 'Invite', label: 'Invite' },
//   ];

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-20`}>
//         <Sidebar />
//       </div>

//       {/* Main content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Navbar */}
//         <header className="bg-white shadow-md">
//           <div className="flex items-center justify-between p-4">
//             <div className="flex items-center">
//               <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none focus:text-gray-700 md:hidden">
//                 <Menu size={24} />
//               </button>
//             </div>

//             {/* Search bar */}
//             <div className="relative w-full max-w-md">
//               <input type="text" placeholder="Search" className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500" />
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Search className="h-5 w-5 text-gray-400" />
//               </div>
//             </div>

//             {/* Create button and dropdown */}
//             <div className="relative">
//               <button onClick={toggleCreateMenu} className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none">
//                 <Plus className="h-5 w-5 mr-2" />
//                 Create
//               </button>
//               {createMenuOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
//                   {createMenuItems.map((item, index) => (
//                     <React.Fragment key={item.label}>
//                       <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{item.label}</a>
//                       {index === 3 && <hr className="my-1 border-gray-200" />}
//                     </React.Fragment>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Trial info and user menu */}
//             <div className="flex items-center space-x-4">
//               <span className="text-sm text-gray-600">23 days left in trial</span>
//               <button className="px-3 py-1 bg-orange-400 text-white rounded-md text-sm">Add billing info</button>
//               <button className="w-8 h-8 bg-gray-200 rounded-full text-gray-600 flex items-center justify-center">
//                 SN
//               </button>
//             </div>
//           </div>
//         </header>

//         {/* Main content area */}
//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
//           <MainContent userName="Sam" />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;