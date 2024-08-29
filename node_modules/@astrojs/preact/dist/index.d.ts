import { type PreactPluginOptions as VitePreactPluginOptions } from '@preact/preset-vite';
import type { AstroIntegration } from 'astro';
export type Options = Pick<VitePreactPluginOptions, 'include' | 'exclude'> & {
    compat?: boolean;
};
export default function ({ include, exclude, compat }?: Options): AstroIntegration;
