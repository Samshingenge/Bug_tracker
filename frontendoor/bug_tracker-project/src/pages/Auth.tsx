// import React, { useState } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import LoginForm from '../components/auth/LoginForm';
// import RegistrationForm from '../components/auth/RegistrationForm';


// const Auth: React.FC = () => {
//   const [activeTab, setActiveTab] = useState('login');

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <Card className="w-[400px]">
//         <CardHeader>
//           <CardTitle>Welcome to Bug Tracker</CardTitle>
//           <CardDescription>Manage your projects and track bugs efficiently.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Tabs value={activeTab} onValueChange={setActiveTab}>
//             <TabsList className="grid w-full grid-cols-2">
//               <TabsTrigger value="login">Login</TabsTrigger>
//               <TabsTrigger value="register">Register</TabsTrigger>
//             </TabsList>
//             <TabsContent value="login">
//               <LoginForm />
//             </TabsContent>
//             <TabsContent value="register">
//               <RegistrationForm />
//             </TabsContent>
//           </Tabs>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Auth;


//===================================Particles===========================================

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from '../components/auth/LoginForm';
import RegistrationForm from '../components/auth/RegistrationForm';
import MovingParticlesBackground from '../components/common/MovingParticlesBackground';

const Auth: React.FC = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="relative flex items-center justify-center min-h-screen  bg-gray-100">
      <div className="absolute inset-0 z-0">
         <MovingParticlesBackground />
      </div>
      <Card className="relative z-10 w-[400px] bg-gradient-to-br from-zinc-800 to-zinc-900 border-4 border-zinc-700 hover:border-zinc-600 transition-colors">
        <CardHeader>
          <CardTitle className="text-zinc-400">Welcome to Bug Tracker</CardTitle>
          <CardDescription>Manage your projects and track bugs efficiently.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger className="bg-zinc-600 text-zinc-300" value="login">Login</TabsTrigger>
              <TabsTrigger className="bg-zinc-700 text-zinc-300" value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent className="text-zinc-400" value="login">
              <LoginForm className="text-zinc-400"/>
            </TabsContent>
            <TabsContent className="text-zinc-400" value="register">
              <RegistrationForm className="text-zinc-400"/>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;