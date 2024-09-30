// =import React, { useState } from 'react';
// import { Home, CheckSquare, Inbox, BarChart2, Folder, Users, Briefcase, Mail, ChevronDown, PlusCircle, MessageSquare, FileText, User } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// interface SidebarProps{
//   onNavigate: (section: string) => void;
// }


// const Sidebar: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const menuItems = [
//     { icon: Home, label: 'Home', href: '/' },
//     { icon: CheckSquare, label: 'My tasks', href: '/tasks' },
//     { icon: Inbox, label: 'Inbox', href: '/inbox' },
//     { icon: BarChart2, label: 'Insights', href: '/insights' },
//     { icon: Folder, label: 'Projects', href: '/projects' },
//     { icon: Users, label: 'Team', href: '/team' },
//     { icon: Briefcase, label: 'My workspace', href: '/workspace' },
//   ];

//   const dropdownItems = [
//     { icon: PlusCircle, label: 'Task', href: '/create/task' },
//     { icon: FileText, label: 'Project', href: '/create/newProject' },
//     { icon: MessageSquare, label: 'Message', href: '/create/message' },
//     { icon: Briefcase, label: 'Portfolio', href: '/create/portfolio' },
//     { icon: User, label: 'Invite', href: '/invite' },
//   ];

//   return (
//     <div className="bg-gray-800 text-white h-screen w-64 flex flex-col">
//       <div className="p-4">
//         <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline" className="w-full justify-between bg-red-600 text-white">
//               <span className="flex items-center">
//                 <PlusCircle className="mr-2 h-4 w-4" /> Create
//               </span>
//               <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent className="w-56 bg-gray-700">
//             {dropdownItems.map((item, index) => (
//               <DropdownMenuItem key={index} className="text-white hover:bg-gray-600">
//                 <a href={item.href} className="flex items-center w-full">
//                   <item.icon className="mr-2 h-4 w-4" />
//                   <span>{item.label}</span>
//                 </a>
//               </DropdownMenuItem>
//             ))}
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//       <nav className="flex-1">
//         {menuItems.map((item, index) => (
//           <a key={index} href={item.href} className="block">
//             <Button variant="ghost" className="w-full justify-start text-white">
//               <item.icon className="mr-2 h-4 w-4" />
//               {item.label}
//             </Button>
//           </a>
//         ))}
//       </nav>
//       <div className="p-4">
//         <a href="/invite" className="block">
//           <Button variant="ghost" className="w-full justify-start text-white">
//             <Mail className="mr-2 h-4 w-4" />
//             Invite teammates
//           </Button>
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;



import React, { useState } from 'react';
import { Home, CheckSquare, Inbox, BarChart2, Folder, Users, Briefcase, Mail, ChevronDown, PlusCircle, MessageSquare, FileText, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SidebarProps {
  onNavigate: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Home', section: 'home' },
    { icon: CheckSquare, label: 'My tasks', section: 'tasks' },
    { icon: Inbox, label: 'Inbox', section: 'inbox' },
    { icon: BarChart2, label: 'Insights', section: 'insights' },
    { icon: Folder, label: 'Projects', section: 'projects' },
    { icon: Users, label: 'Team', section: 'team' },
    { icon: Briefcase, label: 'My workspace', section: 'workspace' },
  ];

  const dropdownItems = [
    { icon: PlusCircle, label: 'Task', section: 'create-task' },
    { icon: FileText, label: 'Project', section: 'create-project' },
    { icon: MessageSquare, label: 'Message', section: 'create-message' },
    { icon: Briefcase, label: 'Portfolio', section: 'create-portfolio' },
    { icon: User, label: 'Invite', section: 'invite' },
  ];

  const handleNavigation = (section: string) => {
    onNavigate(section);
    setIsOpen(false);
  };

  return (
    <div className="bg-gradient-to-br from-zinc-800 to-zinc-800 border-zinc-700 hover:border-zinc-600 transition-colors text-white h-screen w-64 flex flex-col">
      <div className="p-4">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between bg-red-600 text-white">
              <span className="flex items-center">
                <PlusCircle className="mr-2 h-4 w-4" /> Create
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-zinc  -700">
            {dropdownItems.map((item, index) => (
              <DropdownMenuItem key={index} className="text-white hover:bg-gray-600" onSelect={() => handleNavigation(item.section)}>
                <div className="flex items-center w-full">
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.label}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <nav className="flex-1">
        {menuItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-start text-white"
            onClick={() => handleNavigation(item.section)}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </nav>
      <div className="p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-white"
          onClick={() => handleNavigation('invite')}
        >
          <Mail className="mr-2 h-4 w-4" />
          Invite teammates
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;