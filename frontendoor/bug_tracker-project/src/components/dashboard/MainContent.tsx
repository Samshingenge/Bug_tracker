// import React, { useState } from 'react';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { CheckCircle, Users } from 'lucide-react';

// interface MainContentProps {
//   userName: string;
// }

// const initialCards = [
//   {
//     id: 'projects-card',
//     title: 'Projects',
//     content: (
//       <>
//         <Button variant="outline">Create Project</Button>
//         <p className="mt-4">Bug Tracker System</p>
//       </>
//     ),
//   },
//   {
//     id: 'people-card',
//     title: 'People',
//     content: (
//       <>
//         <Button variant="outline">Invite People</Button>
//         <p className="mt-4">Sam Natangwe</p>
//       </>
//     ),
//   },
// ];

// const MainContent: React.FC<MainContentProps> = ({ userName }) => {
//   const [cards, setCards] = useState(initialCards);

//   const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
//   const greeting = getGreeting();

//   function getGreeting() {
//     const hour = new Date().getHours();
//     if (hour < 12) return 'Good morning';
//     if (hour < 18) return 'Good afternoon';
//     return 'Good evening';
//   }

//   // Handle drag-and-drop logic
//   const handleOnDragEnd = (result: any) => {
//     if (!result.destination) return;
//     const items = Array.from(cards);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);
//     setCards(items);
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">Home</h1>
//       <div className="mb-6">
//         <p className="text-sm text-gray-500">{currentDate}</p>
//         <h2 className="text-4xl font-bold">{greeting}, {userName}</h2>
//       </div>

//       {/* Cards for Tasks Completed and Collaborators */}
//       <div className="flex gap-4 mb-6">
//         <Card className="flex-1">
//           <CardContent className="flex items-center p-4">
//             <CheckCircle className="mr-2" />
//             <span>1 task completed</span>
//           </CardContent>
//         </Card>
//         <Card className="flex-1">
//           <CardContent className="flex items-center p-4">
//             <Users className="mr-2" />
//             <span>0 collaborators</span>
//           </CardContent>
//         </Card>
//         <Button variant="outline">Customize</Button>
//       </div>

//       {/* Drag and Drop Context for Project and People Cards */}
//       <DragDropContext onDragEnd={handleOnDragEnd}>
//         <Droppable droppableId="droppable-cards" direction="horizontal">
//           {(provided) => (
//             <div
//               className="flex gap-4"
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//             >
//               {cards.map((card, index) => (
//                 <Draggable key={card.id} draggableId={card.id} index={index}>
//                   {(provided) => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       className="w-1/2 bg-gray-900 text-white p-6 rounded-lg shadow-lg"
//                     >
//                       <Card>
//                         <CardHeader>
//                           <CardTitle>{card.title}</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                           {card.content}
//                         </CardContent>
//                       </Card>
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>

//       {/* My Tasks Card */}
//       <Card className="mt-6">
//         <CardHeader>
//           <CardTitle className="text-xl flex items-center">
//             <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
//             My tasks
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex gap-4 mb-4">
//             <Button variant="ghost" className="flex-1">Upcoming</Button>
//             <Button variant="ghost" className="flex-1">Overdue (2)</Button>
//             <Button variant="ghost" className="flex-1">Completed</Button>
//           </div>
//           <Button variant="outline" className="w-full justify-start">
//             <span className="mr-2">+</span> Create task
//           </Button>
//         </CardContent>
//       </Card>

//       {/* Drag-and-Drop for Widgets (from your image) */}
//       <div className="mt-6 bg-gray-700 text-white p-6 rounded-lg shadow-lg">
//         <p className="text-center">Drag and drop new widgets</p>
//         <Button className="mx-auto mt-4 block" variant="outline">
//           <span className="mr-2">🎨</span> Customize
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default MainContent;



import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users } from 'lucide-react';
import { Avatar } from "../ui/avatar";
import { Label } from "../ui/label";

interface MainContentProps {
  userName: string;
}

const MainContent: React.FC<MainContentProps> = ({ userName }) => {
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  const greeting = getGreeting();

  const [components, setComponents] = useState([
    { id: 'myTasks', content: 'My Tasks' },
    { id: 'projects', content: 'Projects' },
    { id: 'people', content: 'People' },
    { id: 'dragAndDrop', content: 'Drag and Drop New Widgets' },
  ]);

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(components);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setComponents(items);
  };

  const renderComponent = (id: string) => {
    switch (id) {
      case 'myTasks':
        return (
          <Card className="w-full bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl flex items-center text-white">
                <div className="w-8 h-8 bg-gray-300  rounded-full mr-2"></div>
                My tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <Button variant="ghost" className="flex-1 text-white">Upcoming</Button>
                <Button variant="ghost" className="flex-1 text-white">Overdue (2)</Button>
                <Button variant="ghost" className="flex-1 text-white">Completed</Button>
              </div>
              <Button variant="outline" className="w-full justify-start">
                <span className="mr-2">+</span> Create task
              </Button>
            </CardContent>
          </Card>
        );
      case 'projects':
        return (
          <Card className="w-full bg-gray-800 text-white p-6 rounded-lg shadow-lg">
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-4">Projects</h2>
              <div className="flex items-center mb-4">
                <Button variant="outline" className="mr-2">+</Button>
                <Label>Create project</Label>
              </div>
              <div className="flex items-center mb-4">
                <Avatar className="mr-2" src="project-icon.png" alt="Project Icon" />
                <Label>bug tracker system</Label>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-semibold mb-2">Recommended projects</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar src="recommended-icon.png" className="mr-2" />
                    <div>
                      <Label>Bug Tracking</Label>
                      <p className="text-xs text-gray-400">Sam Natangwe Shingenge and others</p>
                    </div>
                  </div>
                  <Button variant="default" size="sm">Join</Button>
                </div>
              </div>
            </div>
          </Card>
        );
      case 'people':
        return (
          <Card className="w-full bg-gray-800 text-white p-6 rounded-lg shadow-lg">
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-4">People</h2>
              <div className="flex items-center mb-4">
                <Button variant="outline" className="mr-2">+</Button>
                <Label>Invite</Label>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-semibold mb-2">Frequent collaborators</h3>
                <div className="flex items-center">
                  <Avatar className="mr-2 bg-pink-500 text-white">SS</Avatar>
                  <Label>Sam Natangwe Shingenge</Label>
                </div>
              </div>
            </div>
          </Card>
        );
      case 'dragAndDrop':
        return (
          <div className="w-full flex items-center justify-center bg-gray-800 text-white h-64 rounded-lg shadow-md p-8">
            <div className="text-center">
              <p className="text-lg mb-4">Drag and drop new widgets</p>
              <Button variant="outline" className="bg-gray-700 text-white">
                <span className="mr-2">
                  
                  <span className="mr-2 inline-block w-4 h-4">🎨</span>
                </span>
                Customize
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Home</h1>
      <div className="mb-6">
        <p className="text-sm text-gray-500">{currentDate}</p>
        <h2 className="text-4xl font-bold">{greeting}, {userName}</h2>
      </div>

      {/* Task Overview */}
      <div className="flex gap-4 mb-6">
        <Card className="flex-1">
          <CardContent className="flex items-center p-4">
            <CheckCircle className="mr-2" />
            <span>1 task completed</span>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardContent className="flex items-center p-4">
            <Users className="mr-2" />
            <span>0 collaborators</span>
          </CardContent>
        </Card>
        <Button variant="outline">Customize</Button>
      </div>

      {/* Draggable Components */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="components">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="grid grid-cols-2 gap-6">
              {components.map((component, index) => (
                <Draggable key={component.id} draggableId={component.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`mb-6 ${component.id === 'myTasks' || component.id === 'dragAndDrop' ? 'col-span-2' : ''}`}
                    >
                      {renderComponent(component.id)}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div className="container mx-auto px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainContent;




// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { CheckCircle, Users } from 'lucide-react';
// import { Avatar} from "../ui/avatar"; 
// import { Label } from "../ui/label"; // Adjust imports based on your actual structure

// interface MainContentProps {
//   userName: string;
// }

// const MainContent: React.FC<MainContentProps> = ({ userName }) => {
//   const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
//   const greeting = getGreeting();

//   function getGreeting() {
//     const hour = new Date().getHours();
//     if (hour < 12) return 'Good morning';
//     if (hour < 18) return 'Good afternoon';
//     return 'Good evening';
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">Home</h1>
//       <div className="mb-6">
//         <p className="text-sm text-gray-500">{currentDate}</p>
//         <h2 className="text-4xl font-bold">{greeting}, {userName}</h2>
//       </div>

//       {/* Task Overview */}
//       <div className="flex gap-4 mb-6">
//         <Card className="flex-1">
//           <CardContent className="flex items-center p-4">
//             <CheckCircle className="mr-2" />
//             <span>1 task completed</span>
//           </CardContent>
//         </Card>
//         <Card className="flex-1">
//           <CardContent className="flex items-center p-4">
//             <Users className="mr-2" />
//             <span>0 collaborators</span>
//           </CardContent>
//         </Card>
//         <Button variant="outline">Customize</Button>
//       </div>

//       {/* My Tasks Card */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-xl flex items-center">
//             <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
//             My tasks
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex gap-4 mb-4">
//             <Button variant="ghost" className="flex-1">Upcoming</Button>
//             <Button variant="ghost" className="flex-1">Overdue (2)</Button>
//             <Button variant="ghost" className="flex-1">Completed</Button>
//           </div>
//           <Button variant="outline" className="w-full justify-start">
//             <span className="mr-2">+</span> Create task
//           </Button>
//         </CardContent>
//       </Card>

//       {/* Projects and People Cards */}
//       <div className="flex gap-6 py-6">
//         {/* Projects Card */}
//         <Card className="w-1/2 bg-gray-900 text-white p-6 rounded-lg shadow-lg">
//           <div className="mb-6">
//             <h2 className="text-lg font-bold mb-4">Projects</h2>
//             {/* Create Project Section */}
//             <div className="flex items-center mb-4">
//               <Button variant="outline" className="mr-2">+</Button>
//               <Label>Create project</Label>
//             </div>
//             {/* Recent Project */}
//             <div className="flex items-center mb-4">
//               <Avatar className="mr-2" src="project-icon.png" alt="Project Icon" />
//               <Label>bug tracker system</Label>
//             </div>
//             {/* Recommended Projects */}
//             <div className="mt-4">
//               <h3 className="text-sm font-semibold mb-2">Recommended projects</h3>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <Avatar src="recommended-icon.png" className="mr-2" />
//                   <div>
//                     <Label>Bug Tracking</Label>
//                     <p className="text-xs text-gray-400">Sam Natangwe Shingenge and others</p>
//                   </div>
//                 </div>
//                 <Button variant="default" size="sm">Join</Button>
//               </div>
//             </div>
//           </div>
//         </Card>

//         {/* People Card */}
//         <Card className="w-1/2 bg-gray-900 text-white p-6 rounded-lg shadow-lg">
//           <div className="mb-6">
//             <h2 className="text-lg font-bold mb-4">People</h2>
//             {/* Invite People */}
//             <div className="flex items-center mb-4">
//               <Button variant="outline" className="mr-2">+</Button>
//               <Label>Invite</Label>
//             </div>
//             {/* Frequent Collaborators */}
//             <div className="mt-4">
//               <h3 className="text-sm font-semibold mb-2">Frequent collaborators</h3>
//               <div className="flex items-center">
//                 <Avatar className="mr-2 bg-pink-500 text-white">SS</Avatar>
//                 <Label>Sam Natangwe Shingenge</Label>
//               </div>
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* Drag and Drop Widget Section */}
//       <div className="flex items-center justify-center bg-gray-800 text-white h-64 rounded-lg shadow-md p-8">
//         <div className="text-center">
//           <p className="text-lg mb-4">Drag and drop new widgets</p>
//           <Button variant="outline" className="bg-gray-700 text-white">
//             <span className="mr-2">
//               <img src="customize-icon.png" alt="Customize" className="inline-block w-4 h-4" />
//             </span>
//             Customize
//           </Button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
//         <div className="container mx-auto px-6 py-8">
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default MainContent;
