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

