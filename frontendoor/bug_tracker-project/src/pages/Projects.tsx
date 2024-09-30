
import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';  // Adjust this path as needed
import { PlusCircle, X, Upload, ChevronDown, UserPlus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthContext } from '../contexts/AuthContext';  // Adjust this path as needed
import axios from 'axios';
import Avatar from 'react-avatar';
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu, 
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

      
      interface Project {
        _id: string;
        name: string;
        description: string;
        createdAt: string;
        updatedAt: string;
        ownerId: string;
        members?: string[];
        user: User; // Now user is an object, not just an ID
      }
      
      interface InviteDialogProps {
        isOpen: boolean;
        onClose: () => void;
        onInvite: (email: string) => void;
      }
      
      const InviteDialog: React.FC<InviteDialogProps> = ({ isOpen, onClose, onInvite }) => {
        const [email, setEmail] = useState('');
      
        const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          onInvite(email);
          setEmail('');
          onClose();
        };
      
        return (
          <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-zinc-800 text-zinc-300">
              <DialogHeader>
                <DialogTitle>Invite Team Member</DialogTitle>
                <DialogDescription>
                  Enter the email address of the person you'd like to invite to this project.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <Input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mb-4"
                />
                <Button type="submit">Send Invitation</Button>
              </form>
            </DialogContent>
          </Dialog>
        );
      };
      
      const ProjectCard: React.FC<{ project: Project; user: any }> = ({ project, user }) => {
        const [isExpanded, setIsExpanded] = useState(false);
        const [selectedBrowser, setSelectedBrowser] = useState<string | null>(null);
        const [taskStatus, setTaskStatus] = useState('Intake');
        const [screenshot, setScreenshot] = useState<string | null>(null);
        const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
        const [members, setMembers] = useState<string[]>(project.members || []);
      
        const browsers = ['Chrome', 'Safari', 'Firefox'];
        const statuses = ['Intake', 'In Progress', 'Complete'];
      
        const statusColors = {
          'Intake': 'bg-blue-500 hover:bg-blue-600',
          'In Progress': 'bg-yellow-500 hover:bg-yellow-600',
          'Complete': 'bg-green-500 hover:bg-green-600'
        };
      
        const handleBrowserSelect = (browser: string) => {
          setSelectedBrowser(browser);
        };
      
        const handleStatusChange = (status: string) => {
          setTaskStatus(status);
        };
      
        const handleScreenshotUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
          const file = event.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setScreenshot(reader.result as string);
            };
            reader.readAsDataURL(file);
          }
        };
      
        const handleInvite = async (email: string) => {
          try {
            // Here you would typically make an API call to invite the user
            // For now, we'll just update the local state
            console.log(`Inviting ${email} to project ${project.name}`);
            setMembers(prevMembers => [...prevMembers, email]);
          } catch (error) {
            console.error("Error inviting user:", error);
          }
        };
      
        return (
          <Card className="bg-gradient-to-br from-zinc-800 to-zinc-700 border border-zinc-700 hover:border-zinc-600 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 text-white">
              <CardTitle className="text-lg font-bold">{project.name}</CardTitle>
              <div className="flex items-center space-x-2">
                <Avatar name={project.user.fullName} size="40" round="20px" />
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsInviteDialogOpen(true)}
                  className="bg-transparent border-dashed border-gray-500 text-gray-300"
                >
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="text-white">
              <p className="mb-2">{project.description}</p>
              <div className="flex items-center space-x-2 mb-2">
                <Badge className={`${statusColors[taskStatus as keyof typeof statusColors]} text-white`}>
                  {taskStatus}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="bg-zinc-700 text-white" variant="outline" size="sm">
                      Change Status <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-zinc-700 text-white">
                    {statuses.map((status) => (
                      <DropdownMenuItem  key={status} onSelect={() => handleStatusChange(status)}>
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-2 ${statusColors[status as keyof typeof statusColors]}`}></div>
                          {status}
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Button
              
                variant="outline"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="mb-2 bg-zinc-700 text-white"
              >
                {isExpanded ? 'Hide Details' : 'Show Details'}
              </Button>
              {isExpanded && (
                <div className="mt-4 space-y-4">
                  <div>
                    <Label htmlFor="browser-select">Select Browser:</Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full bg-zinc-700 text-white">
                          {selectedBrowser || 'Select Browser'}
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full bg-zinc-700 text-white">
                        {browsers.map((browser) => (
                          <DropdownMenuItem key={browser} onSelect={() => handleBrowserSelect(browser)}>
                            {browser}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div>
                    <Label htmlFor="screenshot-upload">Upload Screenshot (Optional):</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="screenshot-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleScreenshotUpload}
                        className="hidden"
                      />
                      <Button className="bg-zinc-700 text-white" variant="outline" onClick={() => document.getElementById('screenshot-upload')?.click()}>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </Button>
                      {screenshot && (
                        <Button className="bg-zinc-700 text-white" variant="outline" onClick={() => setScreenshot(null)}>
                          <X className="mr-2 h-4 w-4" />
                          Remove
                        </Button>
                      )}
                    </div>
                    {screenshot && (
                      <img src={screenshot} alt="Screenshot" className="mt-2 max-w-full h-auto rounded" />
                    )}
                  </div>
                </div>
              )}
              <p className="text-sm text-gray-400 mt-2">
                Created: {new Date(project.createdAt).toLocaleDateString()}
              </p>
              <div className="mt-2">
                <Label>Team Members:</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {members.map((member, index) => (
                    <Avatar key={index} name={member} size="30" round="15px" />
                  ))}
                </div>
              </div>
              </CardContent>
      <InviteDialog 
        isOpen={isInviteDialogOpen}
        onClose={() => setIsInviteDialogOpen(false)}
        onInvite={handleInvite}
      />
    </Card>
  );
};
      
      const Projects: React.FC = () => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const [projects, setProjects] = useState<Project[]>([]);
        const [newProject, setNewProject] = useState({ name: '', description: '' });
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState('');
        const authContext = useContext(AuthContext);

      
        useEffect(() => {
          if (authContext?.user) {
            fetchProjects();
          }
        }, [authContext?.user]);
      
        const fetchProjects = async () => {
          try {
            setIsLoading(true);
            const response = await api.get<Project[]>('http://localhost:5000/api/projects');
            setProjects(response.data);
            setError('');
          } catch (err) {
            setError('Failed to fetch projects');
            console.error('Error fetching projects:', err);
          } finally {
            setIsLoading(false);
          }
        };
      
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          const { name, value } = e.target;
          setNewProject(prev => ({ ...prev, [name]: value }));
        };
      
        const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          try {
            if (!authContext?.user) {
              throw new Error('User not authenticated');
            }
            
            const response = await api.post<Project>('http://localhost:5000/api/projects', newProject);
            
            setProjects(prev => [...prev, response.data]);
            setNewProject({ name: '', description: '' });
            setError('');
          } catch (err) {
            setError('Failed to create project');
            console.error('Error creating project:', err);
          }
        };
      
        if (isLoading) return <div>Loading...</div>;
        if (error) return <div>Error: {error}</div>;
      
        return (
          <div className="container mx-auto p-4 bg-gradient-to-br from-zinc-800 to-zinc-700 border border-zinc-700 hover:border-zinc-600 transition-colors">
            <h1 className="text-2xl font-bold mb-4 text-white">Projects</h1>
            
            <form onSubmit={handleSubmit} className="mb-8 ">
              <Card className="bg-gradient-to-br from-zinc-800 to-zinc-800 border border-zinc-700 hover:border-zinc-600 transition-colors">
                <CardHeader>
                  <CardTitle className='text-white'>Create New Project</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    type="text"
                    name="name"
                    value={newProject.name}
                    onChange={handleInputChange}
                    placeholder="Project Name"
                    className="mb-2 text-white"
                  />
                  <Textarea
                    name="description"
                    value={newProject.description}
                    onChange={handleInputChange}
                    placeholder="Project Description"
                    className="mb-2 bg-gradient-to-br from-zinc-800 to-zinc-700 border border-zinc-700 hover:border-zinc-600 transition-colors text-white"
                  />
                  <Button type="submit">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Project
                  </Button>
                </CardContent>
              </Card>
            </form>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map(project => (
                <ProjectCard key={project._id} project={project} user={user} />
              ))}
            </div>
          </div>
        );
      };
      
      export default Projects;






//===================================Project Fetch

// import React, { useState, useEffect, useContext } from 'react';
// import api from '../services/api';
// import { PlusCircle, Eye } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { AuthContext } from '../contexts/AuthContext';
// import { AvatarFallback } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import Swal from 'sweetalert2';
// import Avatar from 'react-avatar'

// interface User {
//   _id: string;
//   fullName: string;
//   email: string;
//   company: string;
//   role: string;
// }

// interface Project {
//   _id: string;
//   name: string;
//   description: string;
//   status: string;
//   createdAt: string;
//   updatedAt: string;
//   user: User;  // Now user is an object, not just an ID
// }

// const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
//   const handleViewDetails = () => {
//     Swal.fire({
//       title: 'Project Details',
//       html: `
//         <div class="text-left text-zinc-200">
//           <p><strong class="text-zinc-100">Name:</strong> ${project.name}</p>
//           <p><strong class="text-zinc-100">Description:</strong> ${project.description}</p>
//           <p><strong class="text-zinc-100">Status:</strong> ${project.status}</p>
//           <p><strong class="text-zinc-100">Created At:</strong> ${new Date(project.createdAt).toLocaleString()}</p>
//           <p><strong class="text-zinc-100">Updated At:</strong> ${new Date(project.updatedAt).toLocaleString()}</p>
//           <hr class="my-2 border-zinc-700">
//           <p><strong class="text-zinc-100">Owner:</strong> ${project.user.fullName}</p>
//           <p><strong class="text-zinc-100">Email:</strong> ${project.user.email}</p>
//           <p><strong class="text-zinc-100">Company:</strong> ${project.user.company}</p>
//           <p><strong class="text-zinc-100">Role:</strong> ${project.user.role}</p>
//         </div>
//       `,
//       icon: 'info',
//       confirmButtonText: 'Close',
//       customClass: {
//         popup: 'bg-zinc-900 border border-zinc-800',
//         title: 'text-zinc-100',
//         htmlContainer: 'text-zinc-200',
//         confirmButton: 'bg-zinc-700 hover:bg-zinc-600 text-zinc-100',
//       },
//       background: '#18181b',
//       buttonsStyling: false,
//     });
//   };

//   return (
//     <Card className="bg-zinc-900 border-zinc-800">
//       <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
//         <CardTitle className="text-sm font-medium text-zinc-200">
//           {project.name}
//         </CardTitle>
//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={handleViewDetails}
//           className="h-8 w-8 bg-zinc-800 rounded-full"
//         >
//           <Eye className="h-4 w-4 text-zinc-400" />
//         </Button>
//       </CardHeader>
//       <CardContent>
//         <div className="flex items-center space-x-4 text-sm text-zinc-400">
//           {/* <Avatar className="h-8 w-8">
//             <AvatarFallback>{project.user.fullName.charAt(0)}</AvatarFallback>
//           </Avatar> */}
//           <Avatar name={project.user.fullName} size='40' round={true} />
//           <div className="flex-1 flex justify-between">
//             <span>{project.user.fullName}</span>
//             <span>{new Date(project.createdAt).toLocaleDateString()}</span>
//           </div>
//         </div>
//         <p className="mt-4 text-sm text-zinc-400">{project.description}</p>
//         <div className="flex items-center space-x-2 text-xs text-zinc-400 mt-4">
//           <Badge variant="outline" className="bg-transparent border-zinc-700 text-zinc-400 hover:bg-zinc-800">
//             {project.status}
//           </Badge>
//           <Badge variant="outline" className="bg-transparent border-zinc-700 text-zinc-400 hover:bg-zinc-800">
//             {project.user.company}
//           </Badge>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// const Projects: React.FC = () => {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [newProject, setNewProject] = useState({ name: '', description: '' });
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState('');
//   const authContext = useContext(AuthContext);

//   useEffect(() => {
//     if (authContext?.user) {
//       fetchProjects();
//     }
//   }, [authContext?.user]);

//   const fetchProjects = async () => {
//     try {
//       setIsLoading(true);
//       const response = await api.get<Project[]>('http://localhost:5000/api/projects');
//       setProjects(response.data);
//       setError('');
//     } catch (err) {
//       setError('Failed to fetch projects');
//       console.error('Error fetching projects:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setNewProject(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       if (!authContext?.user) {
//         throw new Error('User not authenticated');
//       }
      
//       const response = await api.post<Project>('/api/projects', newProject);
      
//       setProjects(prev => [...prev, response.data]);
//       setNewProject({ name: '', description: '' });
//       setError('');
//     } catch (err) {
//       setError('Failed to create project');
//       console.error('Error creating project:', err);
//     }
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="container mx-auto p-4 bg-gradient-to-br from-zinc-800 to-zinc-700 border border-zinc-700 hover:border-zinc-600 transition-colors">
//       <h1 className="text-2xl font-bold mb-4 text-white">Projects</h1>
      
//       <form onSubmit={handleSubmit} className="mb-8">
//         <Card className="bg-gradient-to-br from-zinc-800 to-zinc-800 border border-zinc-700 hover:border-zinc-600 transition-colors">
//           <CardHeader>
//             <CardTitle className='text-white'>Create New Project</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Input
//               type="text"
//               name="name"
//               value={newProject.name}
//               onChange={handleInputChange}
//               placeholder="Project Name"
//               className="mb-2 text-white"
//             />
//             <Textarea
//               name="description"
//               value={newProject.description}
//               onChange={handleInputChange}
//               placeholder="Project Description"
//               className="mb-2 bg-gradient-to-br from-zinc-800 to-zinc-700 border border-zinc-700 hover:border-zinc-600 transition-colors text-white"
//             />
//             <Button type="submit">
//               <PlusCircle className="mr-2 h-4 w-4" />
//               Create Project
//             </Button>
//           </CardContent>
//         </Card>
//       </form>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {projects.map(project => (
//           <ProjectCard key={project._id} project={project} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Projects;