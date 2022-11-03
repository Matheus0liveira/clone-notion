import { Link } from '@remix-run/react';
import type { Notepad } from '../types';
import { Form } from 'remix-forms';
import { createNotPadSchema } from '~/features/notepad';

export type ListNotPadsPageProps = {
  data: Notepad.NotPads['data'];
};

export function ListNotPadsPage({ data }: ListNotPadsPageProps) {
  return (
    <div className='h-screen w-screen p-4'>
      <h1 className='font-bold text-4xl mb-8'>Pads List</h1>

      <Form schema={createNotPadSchema} method='post' action='/notepad/new'>
        {({ Button, register }) => (
          <>
            <label className='flex flex-col mb-2' htmlFor='create-new-pad'>
              <strong className='text-zinc-400'> Create new NotePad</strong>
            </label>
            <div className='flex gap-x-2 mb-8'>
              <input
                type='text'
                id='create-new-pad'
                placeholder='Type title here'
                className='max-w-lg p-2 rounded-md bg-zinc-700'
                {...register('title')}
              />

              <Button className='bg-zinc-800 py-2 px-4 rounded-md hover:bg-zinc-700 transition-colors'>
                Criar
              </Button>
            </div>
          </>
        )}
      </Form>

      <hr className='mb-8' />

      <div className='flex gap-8 flex-wrap'>
        {data.map((note) => (
          <Link key={note.id} to={note.id}>
            <div className='p-4 bg-zinc-800 rounded-md font-bold transition-colors hover:bg-zinc-700 max-w-lg'>
              <p className='mb-4'>{note.title}</p>
              <span className='text-base font-normal text-zinc-500'>
                {formatDate(note.updatedAt)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const formatDate = (date: Date) =>
  new Date(date).toLocaleDateString('pt-BR', { formatMatcher: 'best fit' });
