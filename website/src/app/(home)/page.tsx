import type { FC } from 'react';
import type { Metadata } from 'next';
import { HomePage } from '@/components/home';

export const metadata: Metadata = {
  title: 'Hyperse Track',
  description:
    'A typed, smart, scalable, powerful data collection engine written in TypeScript.',
};

const IndexPage: FC = () => {
  return <HomePage />;
};

export default IndexPage;
