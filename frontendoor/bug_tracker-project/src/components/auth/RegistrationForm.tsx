
import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, Briefcase } from 'lucide-react';
import Swal from 'sweetalert2';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import axios from 'axios'; // Import axios for making HTTP requests

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    role: '',
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (value: string) => {
    setFormData({ ...formData, role: value });
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({ ...formData, agreeTerms: checked });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords don't match.");
      return;
    }
    if (!formData.agreeTerms) {
      setErrorMessage("Please agree to the terms and conditions.");
      return;
    }
    setErrorMessage('');
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        company: formData.company,
        role: formData.role,
      });
  
      // Show success message using SweetAlert2
      Swal.fire({
        title: 'Registration Successful',
        text: response.data.message || 'You have successfully registered!',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        // Redirect to login page or clear form after successful registration
        window.location.href = '/login'; // Or use routing to navigate
      });
  
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage('Registration failed. Please try again.');
    }
  };
  

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Create Your Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                className="pl-10"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="pl-10"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                className="pl-10 pr-10"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                className="pl-10 pr-10"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company (Optional)</Label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="company"
                name="company"
                type="text"
                placeholder="Enter your company name"
                className="pl-10"
                value={formData.company}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-2">
  <Label htmlFor="role">Your Role</Label>
  <Select onValueChange={handleRoleChange} value={formData.role}>
    <SelectTrigger className="bg-zinc-800 text-zinc-400 cursor-pointer">
      <SelectValue placeholder="Select your role" />
    </SelectTrigger>
    <SelectContent className="bg-zinc-800 text-zinc-400">
      <SelectItem value="admin" className="cursor-pointer">Admin</SelectItem>
      <SelectItem value="developer" className="cursor-pointer">Developer</SelectItem>
      <SelectItem value="designer" className="cursor-pointer">Designer</SelectItem>
      <SelectItem value="product_manager" className="cursor-pointer">Product Manager</SelectItem>
      <SelectItem value="other" className="cursor-pointer">Other</SelectItem>
    </SelectContent>
  </Select>
</div>

          <div className="flex items-center space-x-2">
            <Checkbox className="bg-white" id="agreeTerms" checked={formData.agreeTerms} onCheckedChange={handleCheckboxChange} />
            <Label htmlFor="agreeTerms" className="text-sm">
              I agree to the terms and conditions
            </Label>
          </div>

          {errorMessage && (
            <Alert variant="destructive">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Button variant="link" className="p-0">
            Log in
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default RegistrationForm;
