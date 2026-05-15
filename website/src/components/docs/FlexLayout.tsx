import type { FC, ReactNode } from 'react';
import clsx from 'clsx';

export interface FlexLayoutProps {
  children: ReactNode;
  deration?: 'row' | 'column';
}

export const FlexLayout: FC<FlexLayoutProps> = ({
  children,
  deration = 'row',
}) => {
  return (
    <div
      className={clsx(
        'mb-4 flex gap-2',
        deration === 'row' ? 'flex-row items-center' : 'flex-col'
      )}
    >
      {children}
    </div>
  );
};
