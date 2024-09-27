import React, {useState} from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import { Input } from "@/components/ui/input";
import Avatar from 'react-avatar';
import Projects from '../../pages/Projects';
import { string } from 'prop-types';


const Dashboard: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [activeSection, setActiveSection] = useState('home');

  const handleNavigation = (section: string) => {
    setActiveSection(section);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'Home':
        return <MainContent userName={user.fullName || 'User'} />;
      case 'projects':
        return <Projects />;
      // Add case for other Sections
      default:
        return <MainContent userName={user.fullName || 'User'} />;
      
    }
  }


  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onNavigate={handleNavigation} />
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
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;




