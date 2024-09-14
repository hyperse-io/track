import React, { FC } from 'react';
import clsx from 'clsx';

export const BaseNpmUrl = 'https://registry.hyperse.net/package/';

export const NpmLinkMap = {
  common: '@hyperse-hub/track-plugin-common',
  google: '@hyperse-hub/track-plugin-google',
  facebook: '@hyperse-hub/track-plugin-facebook',
  klaviyo: '@hyperse-hub/track-plugin-klaviyo',
};

export interface NpmLinkProps {
  name: keyof typeof NpmLinkMap;
  className?: React.CSSProperties;
  noMarginBottom?: boolean;
}

export const NpmLink: FC<NpmLinkProps> = (props) => {
  const url = NpmLinkMap[props.name];
  return (
    <a
      href={`${BaseNpmUrl}${url}`}
      target="_blank"
      className={clsx(
        'bg-[#ebedf0] dark:bg-[#232323] flex flex-row items-center justify-center w-fit px-2 py-0.5 gap-2 border rounded-md no-underline hover:no-underline',
        props.className,
        props.noMarginBottom ? '' : 'mb-4'
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="540"
        height="210"
        viewBox="0 0 18 7"
        className="w-[24px] h-[12px]"
      >
        <path
          fill="#888"
          d="M0 0h18v6H9v1H5V6H0zm1 5h2V2h1v3h1V1H1zm5-4v5h2V5h2V1zm2 1h1v2H8zm3-1v4h2V2h1v3h1V2h1v3h1V1z"
        ></path>
        <path
          fill="#FFF"
          d="M1 5h2V2h1v3h1V1H1zM6 1v5h2V5h2V1zm3 3H8V2h1zM11 1v4h2V2h1v3h1V2h1v3h1V1z"
        ></path>
      </svg>
      <span className="text-[75%] font-[700]">{NpmLinkMap[props.name]}</span>
    </a>
  );
};
