import { definePrettierConfig } from '@hyperse/eslint-config-hyperse';

export default definePrettierConfig({
  /**
   * Path to the CSS stylesheet used by Tailwind CSS (v4+)
   */
  tailwindStylesheet: './src/app/globals.css',
  /**
   * List of custom function and tag names that contain classes.
   */
  tailwindFunctions: ['tw', 'tv', 'clsx', 'twMerge', 'extendVariants'],
  /**
   * List of custom attributes that contain classes.
   */
  tailwindAttributes: ['className', 'classNames'],
});
