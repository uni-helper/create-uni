import type { SVGProps } from 'preact/compat'

export function Demo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32" {...props}>
      <path fill="#888888" d="M20 2v12l10-6z"></path>
      <path fill="#888888" d="M28 14v8H4V6h10V4H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8v4H8v2h16v-2h-4v-4h8a2 2 0 0 0 2-2v-8zM18 28h-4v-4h4z"></path>
    </svg>
  )
}
