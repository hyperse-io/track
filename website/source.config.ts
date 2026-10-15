import { rehypeCodeDefaultOptions } from 'fumadocs-core/mdx-plugins';
import { remarkNpm } from 'fumadocs-core/mdx-plugins/remark-npm';
import { remarkSteps } from 'fumadocs-core/mdx-plugins/remark-steps';
import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { transformerTwoslash } from 'fumadocs-twoslash';

export const docs = defineDocs({
  dir: 'content/docs',
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkSteps, remarkNpm],
    rehypeCodeOptions: {
      ...rehypeCodeDefaultOptions,
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        transformerTwoslash({
          throws: false,
          twoslashOptions: {
            handbookOptions: {
              // These docs contain illustrative snippets that intentionally omit
              // required context (undefined placeholders, partial classes), so
              // diagnostics are suppressed rather than rendered as squiggles.
              noErrors: true,
              noErrorValidation: true,
            },
          },
          onTwoslashError: (error, code, lang) => {
            console.warn(
              `\n[twoslash] ${lang} FAILED:\n${String(
                (error as Error)?.message ?? error
              ).slice(0, 600)}\n`
            );
            return undefined;
          },
        }),
      ],
    },
  },
});
