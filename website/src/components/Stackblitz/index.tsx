import React from 'react';

const GithubUrl = {
  'next-example': `https://stackblitz.com/fork/github/hyperse-io/track/tree/main/examples/next-example?title=next-example&startScript=dev&embed=1&theme=dark`,
};

export default function Stackblitz(props: { id: keyof typeof GithubUrl }) {
  return (
    <iframe
      style={{
        width: '100%',
        minHeight: '500px',
        borderRadius: '8px',
      }}
      src={GithubUrl[props.id]}
    />
  );
}
