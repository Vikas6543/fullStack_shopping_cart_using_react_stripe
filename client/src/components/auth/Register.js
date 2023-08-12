import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await Axios.post('https://react-cart-stripe.onrender.com/user/register', {
        name,
        email,
        password,
      });
      setLoading(false);
      navigate('/login');
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className='w-8/12 md:w-4/12 mx-auto mt-12'>
      <form onSubmit={submitHandler} className='border shadow-xl p-8'>
        <p className='text-center font-semibold pb-6 text-2xl'>Register</p>
        <div>
          <div className='mb-3'>
            <input
              type='text'
              className='w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring focus:ring-gray-200'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <input
              type='email'
              autoComplete='email'
              className='w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring focus:ring-gray-200'
              placeholder='Email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='relative'>
            <label htmlFor='password' className='sr-only'>
              Password
            </label>
            <input
              type='password'
              className='w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring focus:ring-gray-200'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <p className='text-red-500 text-sm pt-1 font-semibold'>{error}</p>
          )}
        </div>

        <div className='mt-3 text-sm text-gray-500 font-semibold'>
          <Link to='/login'>Already have an account?</Link>
        </div>

        <div className='mt-4'>
          <button
            type='submit'
            className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800  focus:outline-none'
          >
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
