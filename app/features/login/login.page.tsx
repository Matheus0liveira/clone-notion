import type { Component } from '~/types/Component';
import { TextField } from './components';
import { Form } from 'remix-forms';
import { loginSchema } from './schemas/login.schema';

export const LoginPage: Component = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <Form
        schema={loginSchema}
        action='/login'
        method='post'
        className='w-full max-w-md bg-white border rounded-sm text-slate-600 p-4'
      >
        {({
          Errors,
          Button,
          register,
          formState: { errors, isSubmitting },
        }) => (
          <>
            <h1 className='font-bold mb-4 text-xl'>Login</h1>
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
            <Button
              type='submit'
              className='w-full mt-8 p-4 bg-indigo-600 text-white rounded-sm hover:bg-indigo-800 transition-all uppercase'
            >
              {isSubmitting ? 'Loading' : 'Confirm'}
            </Button>
          </>
        )}
      </Form>
    </div>
  );
};
