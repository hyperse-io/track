import React, { useEffect } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function DynamicCoding(): JSX.Element {
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
    <div className="container flex justify-center min-h-[500px]">
      <video
        id="track-example-video"
        controls={false}
        autoPlay
        loop
        muted
        className={clsx(styles.code_video)}
        style={{
          backgroundColor: 'transparent',
          width: '80%',
          height: 'fit-content',
        }}
      >
        <source
          src="https://github.com/hyperse-io/track/blob/feat/track/website/static/media/code.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
}
