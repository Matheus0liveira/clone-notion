import type { Component } from '~/types/Component';
import { TextField } from '../components';
import { Form } from 'remix-forms';
import { createUserSchema } from '../schemas';
import { Link, useTransition } from '@remix-run/react';

export const CreatePage: Component = () => {
  const transition = useTransition();
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <Form
        schema={createUserSchema}
        method='post'
        className='w-full max-w-md bg-white border rounded-sm text-slate-600 p-4'
      >
        {({ Errors, Button, register, formState: { errors } }) => (
          <>
            <h1 className='font-bold mb-4 text-xl'>Create your account</h1>
            <TextField
              label='Name'
              type='name'
              errorMessage={errors.name?.message}
              {...register('name')}
            />
            <TextField
              label='Email'
              type='email'
              errorMessage={errors.email?.message}
              {...register('email')}
            />
            <TextField
              label='Password'
              type='password'
              errorMessage={errors.password?.message}
              {...register('password')}
            />

            <Errors className='text-red-400 font-medium' />

            <Link to='/login'>
              <p className='text-indigo-500 font-medium'>Login</p>
            </Link>

            <Button
              type='submit'
              className='w-full mt-8 p-4 bg-indigo-600 text-white rounded-sm hover:bg-indigo-800 transition-all uppercase'
            >
              {transition.state === 'submitting' ? 'Loading' : 'Confirm'}
            </Button>
          </>
        )}
      </Form>
    </div>
  );
};
