import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users } from 'lucide-react';
import { Label } from "../ui/label";
import Avatar from 'react-avatar';

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

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(components);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setComponents(items);
    console.log(result.source, result.destination);
  };

  const renderComponent = (id: string) => {
    switch (id) {
      case 'myTasks':
        return (
          <Card className="w-full bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl flex items-center text-white">
                <Avatar githubHandle="sitebase" size="60" round={true} />
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
                <Button variant="outline" className="mr-2 bg-gray-700 text-white">+</Button>
                <Label>Create project</Label>
              </div>
              <div className="flex items-center mb-4">
                <Avatar githubHandle="" size="60" round="20px" />
                <Label>bug tracker system</Label>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-semibold mb-2">Recommended projects</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar name={userName} size="60" round="20px" />
                    <div>
                      <Label>Bug Tracking</Label>
                      <p className="text-xs text-gray-400">{userName} others</p>
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
                <Button variant="outline" className="mr-2 bg-gray-700 text-white">+</Button>
                <Label>Invite</Label>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-semibold mb-2">Frequent collaborators</h3>
                <div className="flex items-center">
                  <Avatar name={userName} size="60" round={true} />
                  <Label>{userName}</Label>
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
      <div className="flex gap-4 mb-6 ">
        <Card className="flex-1 bg-gray-800">
          <CardContent className="flex items-center text-white p-4">
            <CheckCircle className="mr-2" />
            <span>1 task completed</span>
          </CardContent>
        </Card>
        <Card className="flex-1 bg-gray-800">
          <CardContent className="flex items-center text-white p-4">
            <Users className="mr-2" />
            <span>0 collaborators</span>
          </CardContent>
        </Card>
        <Button variant="outline" className="bg-gray-800 text-white">Customize</Button>
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
