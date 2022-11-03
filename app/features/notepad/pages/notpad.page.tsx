import { useCallback, useMemo, useRef } from 'react';

import { Editable, withReact, Slate } from 'slate-react';

import isHotkey from 'is-hotkey';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Element, Toolbar } from '../components';

import { toggleMark, withImages, withShortcuts } from '../utils';
import { MiniToolbar } from '../components/MiniToolbar';

import type { Descendant } from 'slate';
import type { MouseEvent, ChangeEventHandler } from 'react';
import type { RenderElementProps, RenderLeafProps } from 'slate-react';
import type { ElementProps } from '../components';
import { Leaf } from '../components/Leaf';
import { debounce } from 'lodash';
import { NotepadService } from '../services';
import { useParams, useSubmit } from '@remix-run/react';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

export type NotPadPageProps = {
  initialValue: string;
  title: string;
};

export function NotPadPage({ initialValue, title }: NotPadPageProps) {
  const submit = useSubmit();

  const miniToolbarRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();

  const defaultInitialValue = initialValue || [
    {
      children: [
        {
          text: '',
        },
      ],
    },
  ];

  const editor = useMemo(
    () => withShortcuts(withImages(withHistory(withReact(createEditor())))),
    []
  );

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );
  const renderElement = useCallback(
    (props: ElementProps) => <Element {...props} />,
    []
  ) as unknown as (props: RenderElementProps) => JSX.Element;

  function getSelectionText(ev: MouseEvent) {
    var activeEl = document.activeElement;

    const selection = window.getSelection();

    if (!miniToolbarRef.current || !activeEl || !selection) return;

    if (!selection.toString().length) return hideMiniToolBar();

    const viewportSize = document.documentElement.clientWidth;

    const MINITOOLBAR_WIDTH = 304;

    const marginToRight =
      viewportSize - MINITOOLBAR_WIDTH < ev.clientX
        ? viewportSize - (MINITOOLBAR_WIDTH + 10)
        : ev.clientX - MINITOOLBAR_WIDTH / 2;

    const clientX =
      ev.clientX < 149
        ? 0
        : ev.clientX > 738
        ? marginToRight
        : ev.clientX - MINITOOLBAR_WIDTH / 2;

    showMiniToolBar(clientX, ev.clientY - 80);
  }

  const showMiniToolBar = useCallback((clientX: number, clientY: number) => {
    if (!miniToolbarRef.current) return;

    miniToolbarRef.current.style.opacity = '1';
    miniToolbarRef.current.style.pointerEvents = 'all';
    miniToolbarRef.current.style.top = `${clientY}px`;
    miniToolbarRef.current.style.left = `${clientX}px`;
  }, []);

  const hideMiniToolBar = useCallback(() => {
    if (!miniToolbarRef.current) return;

    miniToolbarRef.current.style.opacity = '0';
    miniToolbarRef.current.style.pointerEvents = 'none';
  }, []);

  const changeTitle = debounce<ChangeEventHandler<HTMLInputElement>>(
    async ({ target }) => {
      submit(
        { title: target.value },
        {
          method: 'patch',
          action: `/notepad/${id!}/update`,
          replace: false,
        }
      );
    },
    2000
  );
  const changeContent = debounce(async (content: string) => {
    submit(
      { content },
      {
        method: 'patch',
        action: `/notepad/${id!}/update`,
        replace: false,
      }
    );
  }, 2000);

  return (
    <Slate
      //@ts-ignore
      editor={editor}
      value={defaultInitialValue as unknown as Descendant[]}
      onChange={(value) => {
        const isAstChange = editor.operations.some(
          (op) => 'set_selection' !== op.type
        );
        if (isAstChange) changeContent(JSON.stringify(value));
      }}
    >
      <Toolbar />
      <input
        type='text'
        name='title'
        defaultValue={title}
        onChange={changeTitle}
        placeholder='Type your title here ...'
        className=' w-full m-4 bg-transparent outline-none p-4 text-2xl font-bold rounded-md transition-colors'
      />

      <div className='px-4 rounded-md h-5/6 '>
        <MiniToolbar
          ref={miniToolbarRef}
          className='opacity-0 pointer-events-none absolute flex flex-wrap transition-all'
        />
        <Editable
          className='h-full'
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          // decorate={decorate as any}
          placeholder='Enter some rich text…'
          spellCheck
          autoFocus
          onMouseUp={getSelectionText}
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event as any)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey as keyof typeof HOTKEYS];
                toggleMark(editor, mark);
              }
            }
          }}
          renderPlaceholder={({ children, attributes }) => (
            <div {...attributes}>
              <pre>{children}</pre>
            </div>
          )}
        />
      </div>
    </Slate>
  );
}
