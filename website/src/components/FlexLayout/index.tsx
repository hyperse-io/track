import React, { FC } from 'react';
import { clsx } from 'clsx';

export interface FlexLayoutProps {
  children: React.ReactNode;
  deration?: 'row' | 'column';
}

export const FlexLayout: FC<FlexLayoutProps> = (props) => {
  const { deration = 'row' } = props;
  return (
    <div
      className={clsx(
        'flex gap-2 mb-4',
        deration === 'row' ? 'flex-row items-center' : 'flex-col'
      )}
    >
      {props.children}
    </div>
  );
};
