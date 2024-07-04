import React from 'react';

const SignIn: React.FC = () => {
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Thực hiện đăng nhập (tạm thời cho phép truy cập)
    window.location.href = "/dashboard";
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSignIn} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-6">Sign In</h2>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input type="email" className="w-full p-2 border border-gray-300 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input type="password" className="w-full p-2 border border-gray-300 rounded" required />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
