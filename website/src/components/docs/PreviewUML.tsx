import Image from 'next/image';
import { SITE_BASE_PATH } from '@/config/site';

export const PreviewUML = () => {
  return (
    <div className="rounded bg-[#66757f1a]">
      <Image
        alt="Track architecture diagram"
        src={`${SITE_BASE_PATH}/img/uml-dark.png`}
        width={1200}
        height={800}
        className="hidden w-full dark:block"
      />
      <Image
        alt="Track architecture diagram"
        src={`${SITE_BASE_PATH}/img/uml-light.png`}
        width={1200}
        height={800}
        className="block w-full dark:hidden"
      />
    </div>
  );
};
