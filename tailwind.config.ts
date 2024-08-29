import { skeleton } from '@skeletonlabs/tw-plugin';
import type { Config } from 'tailwindcss';
import {join} from 'path'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}', join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
  darkMode: 'selector',
  theme: {
    extend: {},
  },
  plugins: [
    skeleton({themes:{preset:[{name:"skeleton", enhancements:true}]}})
  ],
} satisfies Config;

