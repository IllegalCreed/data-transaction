export function pxToRem(px: number, baseFontSize: number = 16): string {
  return `${px / baseFontSize}rem`
}

export function remToPx(rem: number, baseFontSize: number = 16): number {
  return rem * baseFontSize
}
