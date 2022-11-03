import type { NotePad as NotePadPrismaClient } from '@prisma/client';

export namespace Notepad {
  export type getNotPadByIdProps = {
    id: string;
  };
  export type getManyNotPads = {
    userId: string;
  };

  export type NotPad = NotePadPrismaClient;
  export type NotPads = {
    data: NotPad[];
  };

  export type CreateNotPad = {
    title: string;
    userId: string;
  };
  export type UpdateNotPad = Omit<Partial<NotPad>, 'id'> & { id: string };
}
