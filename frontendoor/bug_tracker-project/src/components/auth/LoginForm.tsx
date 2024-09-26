// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
// import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';

// const LoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//    const navigate = useNavigate(); // Hook for navigation

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
    
//     // Log the form input values for debugging
//     console.log('Attempting login with:', { email, password });

//     if (!email || !password) {
//       setErrorMessage('Please enter both email and password.');
//       console.log('Error: Missing email or password');
//       return;
//     }

//     try {
//       // Log before making the API request
//       console.log('Sending login request to backend...');

//       // Send login request to the backend
//       const response = await axios.post('http://localhost:5000/api/auth/login', {   //error found when send
//         email,
//         password,
//       });

//       // Log the response from the server
//       console.log('Login response:', response);

//       // Assuming the response contains a token
//       const token = response.data.token;
//       localStorage.setItem('token', token);

//       // Handle success response
//       setSuccessMessage('Login successful!');
//       setErrorMessage('');

//       // Log success and token
//       console.log('Login successful! Token:', token);

//       // Redirect to the dashboard
//       navigate('/dashboard');
//     } catch (error) {
//       // Log error details
//       console.error('Login error:', error);

//       // Handle error response
//       setErrorMessage('Login failed. Please check your credentials.');
//       setSuccessMessage('');
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//     console.log('Toggled password visibility:', showPassword ? 'Hidden' : 'Shown');
//   };

//   return (
//     <Card className="w-full max-w-md mx-auto">
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold text-center">Login to Your Account</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit}>
//           <div className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="Enter your email"
//                   className="pl-10"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                 <Input
//                   id="password"
//                   type={showPassword ? 'text' : 'password'}
//                   placeholder="Enter your password"
//                   className="pl-10 pr-10"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={togglePasswordVisibility}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//             </div>
//             {errorMessage && (
//               <Alert variant="destructive">
//                 <AlertDescription>{errorMessage}</AlertDescription>
//               </Alert>
//             )}
//             {successMessage && (
//               <Alert variant="success">
//                 <AlertDescription>{successMessage}</AlertDescription>
//               </Alert>
//             )}
//             <Button type="submit" className="w-full">
//               Log In
//             </Button>
//           </div>
//         </form>
//       </CardContent>
//       <CardFooter className="flex justify-between">
//         <Button variant="link">Forgot Password?</Button>
//         <Button variant="link">Sign Up</Button>
//       </CardFooter>
//     </Card>
//   );
// };

// export default LoginForm;


// LoginForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email || !password) {
            setErrorMessage('Please enter both email and password.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/dashboard');
        } catch (error) {
            setErrorMessage('Invalid credentials. Please try again.');
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {errorMessage && (
                        <Alert variant="destructive">
                            <AlertDescription>{errorMessage}</AlertDescription>
                        </Alert>
                    )}
                    <Button type="submit" className="w-full">
                        Log In
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default LoginForm;
