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


import React from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import { Input } from "@/components/ui/input";

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
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <MainContent userName={user.fullName || 'User'} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;



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