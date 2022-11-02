import type { BaseEditor, Descendant, Location } from 'slate';
import {
  Point,
  Editor,
  Element as SlateElement,
  Transforms,
  Range,
} from 'slate';
import type { HistoryEditor } from 'slate-history';
import type { ReactEditor } from 'slate-react';
import { LIST_TYPES, TEXT_ALIGN_TYPES } from '../components/BlockButton';
import isUrl from 'is-url';
import imageExtensions from 'image-extensions';

export type EditorProps = BaseEditor | ReactEditor | HistoryEditor;

export type ImageElement = {
  type: 'image';
  url: string;
  children: { text: string }[];
};

export type BulletedListElement = {
  type: 'bulleted-list';
  align?: string;
  children: Descendant[];
};

export const isMarkActive = (editor: EditorProps, format: string) => {
  const marks = Editor.marks(editor);
  //@ts-ignore
  return marks ? marks[format] === true : false;
};

export const toggleMark = (editor: EditorProps, format: string) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const isBlockActive = (
  editor: EditorProps,
  format: string,
  blockType = 'type'
) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        //@ts-ignore
        n[blockType] === format,
    })
  );

  return !!match;
};

export const toggleBlock = (editor: EditorProps, format: string) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
  );

  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      //@ts-ignore
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });

  let newProperties: Partial<SlateElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      //@ts-ignore
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      //@ts-ignore
      type: isActive ? undefined : isList ? 'list-item' : format,
    };
  }

  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const withImages = (
  editor: EditorProps & { insertData: (data: DataTransfer) => void }
) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element) => {
    //@ts-ignore
    return element.type === 'image' ? true : isVoid(element);
  };

  editor.insertData = (data) => {
    const text = data.getData('text/plain');
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split('/');

        if (mime === 'image') {
          reader.addEventListener('load', () => {
            const url = reader.result;
            if (!url) throw 'url Faild';

            insertImage(editor, url as string);
          });

          reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

const insertImage = (editor: EditorProps, url: string) => {
  const text = { text: '' };
  const image: ImageElement = { type: 'image', url, children: [text] };
  Transforms.insertNodes(editor, image);
};

const isImageUrl = (url: string) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split('.').pop();

  if (!ext) throw 'Image Faild';
  return imageExtensions.includes(ext);
};

const SHORTCUTS = {
  '*': 'list-item',
  '-': 'list-item',
  '+': 'list-item',
  '>': 'block-quote',
  '#': 'heading-one',
  '##': 'heading-two',
  '###': 'heading-three',
  '####': 'heading-four',
  '#####': 'heading-five',
  '######': 'heading-six',
};

type SlateElementWithType = Partial<SlateElement> & {
  type: string | undefined;
};

export const withShortcuts = (editor: EditorProps) => {
  const { deleteBackward, insertText } = editor;

  editor.insertText = (text) => {
    const { selection } = editor;

    if (text.endsWith(' ') && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection;
      const block = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });
      const path = block ? block[1] : [];
      const start = Editor.start(editor, path);
      const range = { anchor, focus: start };
      const beforeText = (Editor.string(editor, range) +
        text.slice(0, -1)) as keyof typeof SHORTCUTS;
      console.log(beforeText);
      const type = SHORTCUTS[beforeText];

      if (type) {
        Transforms.select(editor, range);

        if (!Range.isCollapsed(range)) {
          Transforms.delete(editor);
        }

        const newProperties: SlateElementWithType = {
          type,
        };
        Transforms.setNodes<SlateElement>(editor, newProperties, {
          match: (n) => Editor.isBlock(editor, n),
        });

        if (type === 'list-item') {
          const list: BulletedListElement = {
            type: 'bulleted-list',
            children: [],
          };
          Transforms.wrapNodes(editor, list, {
            match: (n) =>
              !Editor.isEditor(n) &&
              SlateElement.isElement(n) &&
              //@ts-ignore
              n.type === 'list-item',
          });
        }

        return;
      }
    }

    insertText(text);
  };

  editor.deleteBackward = (...args) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });
      if (match) {
        const [block, path] = match as unknown as [
          block: SlateElementWithType,
          path: Location
        ];
        const start = Editor.start(editor, path);

        if (
          !Editor.isEditor(block) &&
          SlateElement.isElement(block) &&
          block.type !== 'paragraph' &&
          Point.equals(selection.anchor, start)
        ) {
          const newProperties: SlateElementWithType = {
            type: '',
          };

          Transforms.setNodes(editor, newProperties);

          if (block.type === 'list-item') {
            Transforms.unwrapNodes(editor, {
              match: (n) =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                //@ts-ignore
                n.type === 'bulleted-list',
              split: true,
            });
          }
        }
      }
      deleteBackward(...args);
    }
  };

  return editor;
};
