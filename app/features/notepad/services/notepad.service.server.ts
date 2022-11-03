import { db } from '~/db/utils/db.server';
import type { Notepad } from '../types';

export class NotepadService {
  async getById({ id }: Notepad.getNotPadByIdProps) {
    const notepad = await db.notePad.findUnique({
      where: {
        id,
      },
    });

    if (!notepad) throw Error('Notpad not found');

    notepad.content = notepad.content.trim() ? JSON.parse(notepad.content) : '';

    return notepad;
  }
  async getMany({ userId }: Notepad.getManyNotPads) {
    const notepads = await db.notePad.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
    });

    return notepads;
  }

  async create({ title, userId }: Notepad.CreateNotPad) {
    return db.notePad.create({ data: { title, content: '', userId } });
  }

  async update(data: Notepad.UpdateNotPad) {
    const notepad = await this.getById({ id: data.id });

    if (!notepad) throw Error('Notepad not found');

    return await db.notePad.update({
      data: {
        title: data.title,
        content: data.content,
      },
      where: { id: data.id },
    });
  }
}
