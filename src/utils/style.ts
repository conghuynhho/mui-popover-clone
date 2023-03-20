import { css } from '@emotion/react'

// use for elements that contain text for screen readers, but need no visual representation
export const visuallyHidden = css`
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  width: 1px;
  overflow: hidden;
  position: absolute !important;
`

export const ellipsis = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const absoluteCenter = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const isValidCSSHex = (hex: string) => {
  // matches 6 digit characters prefixed with a '#'.
  return /^#[0-9A-F]{6}$/i.test(hex)
}

export const hexTorgba = (hex: string, alpha = 1) => {
  if (!isValidCSSHex(hex)) {
    return ''
  }
  const matches = hex.match(/\w\w/g)

  if(!matches) return ''

  const [r, g, b]: Array<number> = matches.map((h) => parseInt(h, 16))
  return `rgba(${r}, ${g}, ${b}, ${alpha || 1})`
}

export const addAlphaToHex = (hex: string, alpha = 1) => {
  // coerce values so ti is between 0 and 1.
  const _opacity = Math.round(Math.min(Math.max(alpha || 1, 0), 1) * 255)
  return hex + _opacity.toString(16).toUpperCase()
}
