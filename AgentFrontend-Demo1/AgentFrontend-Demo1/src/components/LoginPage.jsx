import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Store user data in localStorage with better error handling
  const storeUserData = (userData) => {
    console.log("Received user data:", userData); // Debug log
    
    if (!userData) {
      console.error("No user data provided to store");
      return false;
    }
    
    try {
      // Store the entire user object
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Store specific fields (with fallbacks)
      localStorage.setItem('userName', userData.name || userData.userName || 'Name');
      localStorage.setItem('userRole', userData.role || userData.userRole || 'user');
      localStorage.setItem('userEmail', userData.email || userData.userEmail || formData.email);
      localStorage.setItem('userId', userData.id || userData.userId || userData._id || Date.now().toString());
      
      // Store authentication token (check multiple possible field names)
      const token = userData.token || userData.accessToken || userData.authToken || userData.jwt;
      if (token) {
        localStorage.setItem('authToken', token);
      }
      
      // Store login timestamp
      localStorage.setItem('loginTime', new Date().toISOString());
      
      // Verify storage worked
      console.log("Stored in localStorage:");
      console.log("- user:", localStorage.getItem('user'));
      console.log("- userRole:", localStorage.getItem('userRole'));
      console.log("- userEmail:", localStorage.getItem('userEmail'));
      console.log("- authToken:", localStorage.getItem('authToken'));
      
      return true;
    } catch (error) {
      console.error("Error storing data in localStorage:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://10.107.45.15:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      console.log("Full API Response:", data); // Debug log
      
      if (response.ok) {
        // Try different ways to access user data from the response
        const userData = data.user || data.data || data;
        
        const stored = storeUserData(userData);
        
        if (stored) {
          alert("Login successful!");
          navigate('/home'); 
        } else {
          alert("Login successful but failed to store user data locally");
          navigate('/home'); 
        }
      } else {
        alert(data.message || "Login failed.");
      }
    } catch (err) {
      console.error("Login error:", err);
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

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8">
          {/* Logo */}
          <div className="text-center">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBkZjUFFpqP-Xmchd1AoosadPWzDdB23yY-FgU6E9LJ9QYvwPIDPoUF-ivB73SfSIrwqk&usqp=CAU"
              alt="Logo"
              className="mx-auto h-12 w-auto mb-4"
            />
            <h2 className="text-3xl font-bold text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your credentials to continue
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
                  placeholder="Enter your password"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#403FF6] focus:border-[#403FF6] focus:z-10 sm:text-sm transition duration-200"
                />
              </div>
            </div>

            {/* Remember me and Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#403FF6] focus:ring-[#403FF6] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-[#403FF6] hover:text-opacity-80">
                  Forgot your password?
                </a>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-gray-900 bg-[rgb(81,242,184)] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(81,242,184)] transition duration-200"
            >
              Sign In
            </button>
          </form>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-medium text-[#403FF6] hover:text-opacity-80 transition duration-200"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
