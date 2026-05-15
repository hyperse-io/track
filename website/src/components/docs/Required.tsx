import type { FC } from 'react';

export interface RequiredProps {
  required?: boolean;
}

export const Required: FC<RequiredProps> = ({ required = false }) => {
  if (!required) {
    return (
      <span className="rounded-md border bg-gray-400 px-2 py-1 text-[75%] font-bold text-white">
        Optional
      </span>
    );
  }
  return (
    <span className="rounded-md border bg-orange-500 px-2 py-1 text-[75%] font-bold text-gray-50">
      required
    </span>
  );
};
