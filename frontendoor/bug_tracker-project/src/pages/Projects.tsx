import React, { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Project } from '../types/Project';

// Mock Data replacing API for Now
const mockProjects: Project[] = [
  { id: 1, name: 'Website Redesign', description: 'Overhaul the company website for better UX', status: 'In Progress' },
  { id: 2, name: 'Mobile App Development', description: 'Create a new mobile app for our services', status: 'Planning' },
  { id: 3, name: 'Database Migration', description: 'Migrate from MySQL to PostgreSQL', status: 'Completed' },
];

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { request } = useApi();

  useEffect(() => {
    const fetchProjects = async () => {
      console.log('Fetching projects...');
    try {
      setIsLoading(true);
      setError(null);
      // console.log('Making API request...');
      // const data = await request('get', '/api/projects'); // error
      // console.log('API response:', data);
        
        // Map MongoDB _id to Project id
        // const mappedProjects = data.map((project: any) => ({
        //   id: project._id,
        //   name: project.name,
        //   description: project.description,
        //   status: 'In Progress' // Add status if it's not in the database
        // }));
        
        // setProjects(mappedProjects);
        setProjects(mockProjects)
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        setError('Failed to fetch projects. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProjects(); //error
  }, [request]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'In Progress': return 'bg-red-500';
      case 'Planning': return 'bg-yellow-500';
      case 'Completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  if (isLoading) return <p className="text-center text-lg font-medium">Loading projects...</p>;
  if (error) return <p className="text-center text-lg font-medium text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4 text-center">PROJECT OVERVIEW</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length > 0 ? (
          projects.map((project) => (
            <Card key={project.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-white-500 to-primary-500 text-black">
                <CardTitle className="text-xl from-gray-500 font-semibold">{project.name}</CardTitle>
                <CardDescription className="text-gray-700">{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <Badge 
                  variant={project.status === 'Completed' ? 'default' : "destructive"}
                  className="mb-2"
                >
                  {project.status}
                </Badge>
                <p className="text-gray-700 mt-2">{project.description}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">View Details</Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default Projects;


/**============================================================================================== */


// import React, { useEffect, useState } from 'react';
// import { useApi } from '../hooks/useApi';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';



// interface Project {
//   id: string;
//   name: string;
//   description: string;
//   createdAt: string;
//   updatedAt: string;
//   ownerId: string;
// }

// const Projects: React.FC = () => {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [debugInfo, setDebugInfo] = useState<string>('');
//   const { request } = useApi();

//   const logDebug = (message: string) => {
//     setDebugInfo(prev => (prev + '\n' + message).slice(-500)); // Keep last 2000 characters
//     console.log(message); // Also log to console for easier debugging
//   };

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         setIsLoading(true);
//         setError(null);
//         logDebug('Fetching projects...');

//         const response = await request('get', '/api/projects'); //Error detacted


//         logDebug(`Response type: ${typeof response}`);
//         logDebug(`Response preview: ${JSON.stringify(response).slice(0, 200)}...`);

//         if (typeof response === 'string' && response.trim().startsWith('<!doctype html>')) {
//           throw new Error('Received HTML instead of JSON. API endpoint might be incorrect.');
//         }

//         if (!Array.isArray(response)) {
//           throw new Error(`Unexpected response type: ${typeof response}`);
//         }

//         const mappedProjects = response.slice(0, 10).map((project: any) => ({
//           id: project._id || 'unknown',
//           name: project.name || 'Unnamed Project',
//           description: project.description || 'No description',
//           createdAt: project.createdAt || new Date().toISOString(),
//           updatedAt: project.updatedAt || new Date().toISOString(),
//           ownerId: project.ownerId || 'unknown'
//         }));

//         logDebug(`Mapped ${mappedProjects.length} projects`);
//         setProjects(mappedProjects);
//       } catch (error) {
//         const errorMessage = error instanceof Error ? error.message : String(error);
//         logDebug(`Error: ${errorMessage}`);
//         setError(`Failed to fetch projects: ${errorMessage}`);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchProjects();
//   }, [request]);

//   if (isLoading) return <p className="text-center text-lg font-medium">Loading projects...</p>;
//   if (error) return (
//     <div className="text-center">
//       <p className="text-lg font-medium text-red-500">{error}</p>
//       <p className="text-sm text-gray-500">Debug information:</p>
//       <pre className="text-left text-xs bg-gray-100 p-2 mt-2 rounded overflow-auto max-h-40">{debugInfo}</pre>
//     </div>
//   );

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-3xl font-bold mb-4 text-center">PROJECT OVERVIEW</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {projects.length > 0 ? (
//           projects.map((project) => (
//             <Card key={project.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
//                 <CardTitle className="text-xl font-semibold">{project.name}</CardTitle>
//               </CardHeader>
//               <CardContent className="p-4">
//                 <Badge className="mb-2">
//                   {new Date(project.createdAt).toLocaleDateString()}
//                 </Badge>
//                 <p className="text-gray-700 mt-2">{project.description}</p>
//               </CardContent>
//               <CardFooter>
//                 <Button className="w-full" variant="outline">View Details</Button>
//               </CardFooter>
//             </Card>
//           ))
//         ) : (
//           <p className="text-gray-500 col-span-full text-center">No projects found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Projects;



/**============================================================================================== */







// import React, { useEffect, useState } from 'react';
// import { useApi } from '../hooks/useApi';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';

// interface Project {
//   id: string;
//   name: string;
//   description: string;
//   createdAt: string;
//   updatedAt: string;
//   ownerId: string;
// }

// const Projects: React.FC = () => {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [debugInfo, setDebugInfo] = useState<string>('');
//   const { request } = useApi();

//   const logDebug = (message: string) => {
//     setDebugInfo(prev => (prev + '\n' + message).slice(-500)); // Keep last 2000 characters
//   };

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         setIsLoading(true);
//         setError(null);
//         logDebug('Fetching projects...');

//         const response = await request('get', '/api/projects');
//         logDebug(`Response type: ${typeof response}`);
//         logDebug(`Response preview: ${JSON.stringify(response).slice(0, 200)}...`);

//         if (typeof response === 'string' && response.trim().startsWith('<!doctype html>')) {
//           throw new Error('Received HTML instead of JSON. API endpoint might be incorrect.');
//         }

//         if (!Array.isArray(response)) {
//           throw new Error(`Unexpected response type: ${typeof response}`);
//         }

//         const mappedProjects = response.slice(0, 10).map((project: any) => ({
//           id: project._id || 'unknown',
//           name: project.name || 'Unnamed Project',
//           description: project.description || 'No description',
//           createdAt: project.createdAt || new Date().toISOString(),
//           updatedAt: project.updatedAt || new Date().toISOString(),
//           ownerId: project.ownerId || 'unknown'
//         }));

//         logDebug(`Mapped ${mappedProjects.length} projects`);
//         setProjects(mappedProjects);
//       } catch (error) {
//         const errorMessage = error instanceof Error ? error.message : String(error);
//         logDebug(`Error: ${errorMessage}`);
//         setError(`Failed to fetch projects: ${errorMessage}`);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchProjects();
//   }, [request]);

//   if (isLoading) return <p className="text-center text-lg font-medium">Loading projects...</p>;
//   if (error) return (
//     <div className="text-center">
//       <p className="text-lg font-medium text-red-500">{error}</p>
//       <p className="text-sm text-gray-500">Debug information:</p>
//       <pre className="text-left text-xs bg-gray-100 p-2 mt-2 rounded overflow-auto max-h-40">{debugInfo}</pre>
//     </div>
//   );

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-3xl font-bold mb-4 text-center">PROJECT OVERVIEW</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {projects.length > 0 ? (
//           projects.map((project) => (
//             <Card key={project.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
//                 <CardTitle className="text-xl font-semibold">{project.name}</CardTitle>
//               </CardHeader>
//               <CardContent className="p-4">
//                 <Badge className="mb-2">
//                   {new Date(project.createdAt).toLocaleDateString()}
//                 </Badge>
//                 <p className="text-gray-700 mt-2">{project.description}</p>
//               </CardContent>
//               <CardFooter>
//                 <Button className="w-full" variant="outline">View Details</Button>
//               </CardFooter>
//             </Card>
//           ))
//         ) : (
//           <p className="text-gray-500 col-span-full text-center">No projects found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Projects;




// import React, { useEffect, useState } from 'react';
// import { useApi } from '../hooks/useApi';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import axios from 'axios';
// import { any } from 'zod';





// interface Project {
//   id: string;
//   name: string;
//   description: string;
//   createdAt: string;
//   updatedAt: string;
//   ownerId: string;
// }

// const Projects: React.FC = () => {
//   const [projects, setProjects] = useState<Project[]>([]);
  
//   // const { api } = useApi();

  
 


 

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-3xl font-bold mb-4 text-center">PROJECT OVERVIEW</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
          
//             <Card  className="shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
//                 <CardTitle className="text-xl font-semibold">Button Off</CardTitle>
//               </CardHeader>
//               <CardContent className="p-4">
//                 <Badge className="mb-2">
//                   {new Date().getDate()}
//                 </Badge>
//                 <p className="text-gray-700 mt-2">The button is failing and freezing by clicking</p>
//               </CardContent>
//               <CardFooter>
//                 <Button className="w-full" variant="outline">View Details</Button>
//               </CardFooter>
//             </Card>
        
//           <p className="text-gray-500 col-span-full text-center">No projects found.</p>
       
//       </div>
//     </div>
//   );
// };

// export default Projects;