// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Home, Briefcase, Bug, ChevronLeft, Mail, ListTodo } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// const Sidebar: React.FC<{ isOpen: boolean, toggleSidebar: () => void }> = ({ isOpen, toggleSidebar }) => {
//   return (
//     <div
//       className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
//         isOpen ? 'translate-x-0' : '-translate-x-full'
//       } md:relative md:translate-x-0 transition duration-200 ease-in-out`}
//     >
      

    

//       {/* Navigation Links */}
//       <nav className="space-y-3 mt-4">
//         <Button asChild variant="ghost" className="w-full justify-start">
//           <Link to="/" className="flex items-center space-x-2">
//             <Home className="h-5 w-5" />
//             <span>Home</span>
//           </Link>
//         </Button>
//         <Button asChild variant="ghost" className="w-full justify-start">
//           <Link to="/Home" className="flex items-center space-x-2">
//             <ListTodo className="h-5 w-5" />
//             <span>My task</span>
//           </Link>
//         </Button>
//         <Button asChild variant="ghost" className="w-full justify-start">
//           <Link to="/email" className="flex items-center space-x-2">
//             <Mail className="h-5 w-5" />
//             <span>Inbox</span>
//           </Link>
//         </Button>
//         <Button asChild variant="ghost" className="w-full justify-start">
//           <Link to="/projects" className="flex items-center space-x-2">
//             <Briefcase className="h-5 w-5" />
//             <span>Projects</span>
//           </Link>
//         </Button>
//         <Button asChild variant="ghost" className="w-full justify-start">
//           <Link to="/bugs" className="flex items-center space-x-2">
//             <Bug className="h-5 w-5" />
//             <span>Bugs</span>
//           </Link>
//         </Button>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar




import React from 'react';
import { Home, CheckSquare, Inbox, BarChart2, Folder, Users, Briefcase, Mail } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: Home, label: 'Home' },
    { icon: CheckSquare, label: 'My tasks' },
    { icon: Inbox, label: 'Inbox' },
    { icon: BarChart2, label: 'Insights' },
    { icon: Folder, label: 'Projects' },
    { icon: Users, label: 'Team' },
    { icon: Briefcase, label: 'My workspace' },
  ];

  return (
    <div className="bg-gray-800 text-white h-screen w-64 flex flex-col">
      <div className="p-4">
        <Button variant="outline" className="w-full justify-start bg-red-600">
          <span className="mr-2">+</span> Create
        </Button>
      </div>
      <nav className="flex-1">
        {menuItems.map((item, index) => (
          <Button key={index} variant="ghost" className="w-full justify-start text-white">
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </nav>
      <div className="p-4">
        <Button variant="ghost" className="w-full justify-start text-white">
          <Mail className="mr-2 h-4 w-4" />
          Invite teammates
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;