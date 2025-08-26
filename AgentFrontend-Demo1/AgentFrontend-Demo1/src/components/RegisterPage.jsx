import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    name:'',
    password: '',
    confirmPassword: '',
    role: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
  
    try {
      const response = await fetch("http://10.107.45.15:8080/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        alert("Registration successful!");
        navigate('/')
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (err) {
      alert("An error occurred: " + err.message);
    }
  };
  

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img 
          src="https://media.licdn.com/dms/image/v2/D4D10AQGu-Fdaj_EcmA/videocover-high/videocover-high/0/1726581608267?e=2147483647&v=beta&t=jQkTxbXfOgum6xEoR65phiBGueYd1LSJNC5P0qhuseQ"
          alt="ADK UI Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8">
          {/* Logo */}
          <div className="text-center">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBkZjUFFpqP-Xmchd1AoosadPWzDdB23yY-FgU6E9LJ9QYvwPIDPoUF-ivB73SfSIrwqk&usqp=CAU"
              alt="Logo"
              className="mx-auto h-12 w-auto mb-4"
            />
            <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Join the future of AI-powered testing
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#403FF6] focus:border-[#403FF6] focus:z-10 sm:text-sm transition duration-200"
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="name"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#403FF6] focus:border-[#403FF6] focus:z-10 sm:text-sm transition duration-200"
                />
              </div>
              

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#403FF6] focus:border-[#403FF6] focus:z-10 sm:text-sm transition duration-200"
                />
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#403FF6] focus:border-[#403FF6] focus:z-10 sm:text-sm transition duration-200"
                />
              </div>

              {/* Role Selection */}
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Your Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#403FF6] focus:border-[#403FF6] focus:z-10 sm:text-sm transition duration-200 bg-white"
                >
                  <option value="">Choose a role</option>
                  <option value="Gen-Ai-Test-Engineer">Gen AI Test Engineer</option>
                  <option value="Gen-Ai-Test-Lead">Gen AI Test Lead</option>
                </select>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-gray-900 bg-[rgb(81,242,184)] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(81,242,184)] transition duration-200"
            >
              Register
            </button>

            {/* Terms and Conditions */}
            <p className="text-xs text-center text-gray-600">
              By registering, you agree to our{' '}
              <a href="#" className="text-[#403FF6] hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-[#403FF6] hover:underline">
                Privacy Policy
              </a>
            </p>
          </form>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/"
                className="font-medium text-[#403FF6] hover:text-opacity-80 transition duration-200"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage