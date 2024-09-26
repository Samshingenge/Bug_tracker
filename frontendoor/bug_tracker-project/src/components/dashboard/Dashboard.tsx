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