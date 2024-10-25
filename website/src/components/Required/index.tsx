import type { FC } from 'react';
import React from 'react';

export interface RequiredProps {
  required?: boolean;
}

export const Required: FC<RequiredProps> = (props) => {
  const { required = false } = props;
  if (!required) {
    return (
      <span className="border rounded-md px-2 py-1 bg-gray-400 text-[75%] font-[700] text-white">
        Optional
      </span>
    );
  }
  return (
    <span className="border rounded-md px-2 py-1 bg-orange-500 text-[75%] font-[700] text-gray-50">
      required
    </span>
  );
};
