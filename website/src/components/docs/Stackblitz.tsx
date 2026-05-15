const githubUrl = {
  'next-example': `https://stackblitz.com/fork/github/hyperse-io/track/tree/main/examples/next-example?title=next-example&startScript=dev&embed=1&theme=dark`,
} as const;

export const Stackblitz = (props: { id: keyof typeof githubUrl }) => {
  return (
    <iframe
      title="StackBlitz example"
      style={{
        width: '100%',
        minHeight: '500px',
        borderRadius: '8px',
      }}
      src={githubUrl[props.id]}
    />
  );
};
