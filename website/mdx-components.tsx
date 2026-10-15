import { Popup, PopupContent, PopupTrigger } from 'fumadocs-twoslash/ui';
import { AutoTypeTable } from 'fumadocs-typescript/ui';
import { Callout } from 'fumadocs-ui/components/callout';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { FlexLayout } from '@/components/docs/FlexLayout';
import { NpmLink } from '@/components/docs/NpmLink';
import { OverviewPage } from '@/components/docs/OverviewPage';
import { Platform } from '@/components/docs/Platform';
import { PreviewUML } from '@/components/docs/PreviewUML';
import { Property } from '@/components/docs/Property';
import { Required } from '@/components/docs/Required';
import { Stackblitz } from '@/components/docs/Stackblitz';
import { generator } from '@/lib/generator';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Steps,
    Step,
    Tabs,
    Tab,
    Callout,
    Card,
    Cards,
    Popup,
    PopupContent,
    PopupTrigger,
    AutoTypeTable: (props: Record<string, unknown>) => (
      <AutoTypeTable {...props} generator={generator} />
    ),
    // Track-specific documentation helpers.
    NpmLink,
    OverviewPage,
    PreviewUML,
    Property,
    Required,
    Stackblitz,
    FlexLayout,
    Platform,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
