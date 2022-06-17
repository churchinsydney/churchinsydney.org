import clsx from 'clsx';
import * as React from 'react';

type AccentType = React.ComponentPropsWithoutRef<'span'>;

export default function Accent({ children, className }: AccentType) {
  return (
    <span
      className={clsx(
        className,
        'transition-colors',
        'via-primary-300/40 to-primary-400 text-primary-300'
      )}
    >
      {children}
    </span>
  );
}
