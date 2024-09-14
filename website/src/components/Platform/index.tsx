import React, { FC } from 'react';

export interface PlatformProps {
  children?: React.ReactNode;
}

export const Platform: FC<PlatformProps> = (props) => {
  return (
    <span
      className="text-[75%] font-[700] text-gray-50 mr-1 cursor-pointer"
      onClick={() => {
        alert(
          `The current field is only valid for ${props.children}, other platforms will automatically eliminate or reduce to additional parameters`
        );
      }}
    >
      <span className="px-2 py-1 bg-[#5a5a5a] rounded-l-md">Platform</span>
      <span className="bg-[#6ec044] rounded-r-md px-2 py-1 relative">
        <span className="pr-[14px]">{props.children}</span>
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 1024 1024"
          height="16px"
          width="16px"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-[3px] right-1"
        >
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
          <path d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0 1 30.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1 0 80 0 40 40 0 1 0-80 0z"></path>
        </svg>
      </span>
    </span>
  );
};
