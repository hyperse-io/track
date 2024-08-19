import React from 'react';

export default function Stackblitz(props: { id: string }) {
  return (
    <iframe
      style={{
        width: '100%',
        minHeight: '500px',
        borderRadius: '8px',
      }}
      src={`https://stackblitz.com/edit/${props.id}?embed=1&theme=dark`}
    />
  );
}
