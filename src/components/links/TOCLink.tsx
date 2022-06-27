import clsx from 'clsx';
import * as React from 'react';

import UnstyledLink from '@/components/links/UnStyledLink';

type TOCLinkProps = {
  id: string;
  level: number;
  minLevel: number;
  text: string;
  activeSection: string | null;
};

export default function TOCLink({
  id,
  level,
  minLevel,
  text,
  activeSection,
}: TOCLinkProps) {
  return (
    <UnstyledLink
      href={`#${id}`}
      id={`link-${id}`}
      className={clsx(
        'pt-2',
        'font-medium hover:text-green-600 focus:outline-none dark:hover:text-green-400',
        'focus-visible:text-gray-700 dark:focus-visible:text-gray-200',
        activeSection === id
          ? 'text-gray-900 dark:text-gray-100'
          : 'text-gray-400 dark:text-gray-500'
      )}
      style={{ marginLeft: (level - minLevel) * 16, lineHeight: '22px' }}
    >
      {text}
    </UnstyledLink>
  );
}
