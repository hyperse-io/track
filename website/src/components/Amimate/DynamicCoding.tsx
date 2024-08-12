import React, { useEffect, useRef } from 'react';

export default function DynamicCoding(): JSX.Element {
  const preRef = useRef<HTMLPreElement>(null);

  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }
  }, [mounted]);

  return (
    <section className="w-[800px] h-[400px] bg-slate-700 rounded p-4">
      <div className="h-full flex flex-row">
        <pre
          ref={preRef}
          className="w-full h-full bg-transparent overscroll-none"
        >
          <div className="col-md-8 col-12">
            <code data-language="ts" className="language-typescript">
              <div>coding</div>
            </code>
          </div>
        </pre>
      </div>
    </section>
  );
}
