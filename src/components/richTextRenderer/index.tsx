import {
  RichTextBlockRenderer,
  RichTextRenderer as BaseRichTextRenderer,
} from '@webiny/react-rich-text-renderer';
import clsx from 'clsx';

import CustomLink from '../links/CustomLink';

import { OutputBlockData } from '@/types/types';

interface RenderHeaderProps {
  style: {
    [key: string]: string;
  };
  className: string;
}

const renderHeader = (block: OutputBlockData) => {
  console.log('header', JSON.stringify(block, null, 2));
  const props: RenderHeaderProps = { style: {}, className: '' };

  if (block.data.textAlign) {
    props.style['textAlign'] = block.data.textAlign;
  }
  if (block.data.className) {
    props.className = block.data.className;
  }

  const Heading = `h${block.data.level}` as keyof JSX.IntrinsicElements;
  const id = block.data.text
    .replace(/\W/g, '-')
    .replace('--', '')
    .toLocaleLowerCase();
  return (
    <Heading
      {...props}
      className={clsx(
        props.className,
        `rte-block-heading rte-block-heading--h${block.data.level}`
      )}
      id={id}
    >
      <CustomLink href={`#${id}`}>
        <span className='icon icon-link'></span>
      </CustomLink>
      {block.data.text}
    </Heading>
  );
};

const renderers: Record<string, RichTextBlockRenderer> = {
  // Override the default renderer for "delimiter" block
  header: renderHeader,
  // Add a renderer for "youtube" block
};

export default function RichTextRenderer({
  data,
}: {
  data: OutputBlockData[];
}) {
  return <BaseRichTextRenderer data={data} renderers={renderers} />;
}
