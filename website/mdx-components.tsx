import {
  Bleed,
  Callout,
  Cards,
  Collapse,
  FileTree,
  Image,
  Steps,
  Tabs,
} from 'nextra/components';
import type { MDXComponents } from 'nextra/mdx-components';
import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs';
import { FlexLayout } from '@/components/docs/FlexLayout';
import { NpmLink } from '@/components/docs/NpmLink';
import { Platform } from '@/components/docs/Platform';
import { PreviewUML } from '@/components/docs/PreviewUML';
import { Property } from '@/components/docs/Property';
import { Required } from '@/components/docs/Required';
import { Stackblitz } from '@/components/docs/Stackblitz';

const docsComponents = getDocsMDXComponents();

export const useMDXComponents = (components?: Readonly<MDXComponents>) => ({
  ...docsComponents,
  ...components,
  Cards,
  Callout,
  Collapse,
  FileTree,
  Steps,
  Tabs,
  Bleed,
  NpmLink,
  PreviewUML,
  Property,
  Required,
  Stackblitz,
  FlexLayout,
  Platform,
});
