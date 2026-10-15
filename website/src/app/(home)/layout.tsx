import type { FC, ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/app/layout.config';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return <HomeLayout {...baseOptions}>{children}</HomeLayout>;
};

export default Layout;
