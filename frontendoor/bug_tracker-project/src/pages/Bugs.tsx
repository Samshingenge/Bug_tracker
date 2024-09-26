import React, { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bug } from '../types/Bug';
import { any } from 'zod';


const mockBugs: Bug[] = [
  { id: 1, title: 'Login Page Crash', description: 'App crashes when entering special characters in login form', severity: 'High', status: 'Open' },
  { id: 2, title: 'Incorrect Total Calculation', description: 'Order total is incorrect when applying discount code', severity: 'Medium', status: 'In Progress' },
  { id: 3, title: 'Button Misalignment', description: 'Submit button is misaligned on mobile devices', severity: 'Low', status: 'Resolved' },
];

const Bugs: React.FC = () => {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { request } = useApi();

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Uncomment the following lines when your API is ready
        // const data = await request('get', '/api/bugs');
        // setBugs(data);
        
        // For now, we'll use mock data
        setBugs(mockBugs);
      } catch (error) {
        console.error('Failed to fetch bugs:', error);
        setError('Failed to fetch bugs. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBugs();
  }, [request]);

  if (isLoading) return <p className="text-center text-lg font-medium">Loading bugs...</p>;
  if (error) return <p className="text-center text-lg font-medium text-red-500">{error}</p>;

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4 text-center">BUG DISCOVERED</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bugs.length > 0 ? (
          bugs.map((bug) => (
            <Card key={bug.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className={`bg-gradient-to-r from-white-600 to-white-400 text-black`}>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-semibold">{bug.title}</CardTitle>
                  <Badge className={`${getSeverityColor(bug.severity)} text-black`}>
                    {bug.severity}
                  </Badge>
                </div>
                <CardDescription className={`${getSeverityColor(bug.severity)} text-white`}>
                  Status: {bug.status}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-gray-700">{bug.description}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">View Details</Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">No bugs found.</p>
        )}
      </div>
    </div>
  );
};

export default Bugs;



//BUG CREATED CODE Check where the Bug is created: 
//Ensure that when you're creating or updating bug objects, 
//the priority field is included, for example:

/*
const bug: Bug = {
  id: 1,
  title: 'Fix login issue',
  description: 'Users cannot log in with Facebook',
  status: 'open',
  priority: 'high',  // Add priority when creating or managing the bug
};
*/






// const Bugs: React.FC = () => {
//   return (
//     <div>
//       <h1>Bugs Over here</h1>
      
//     </div>
//   );
// };

// export default Bugs;
