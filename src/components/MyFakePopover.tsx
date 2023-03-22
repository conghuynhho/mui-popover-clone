import {useTheme} from "../providers/GgjThemeProvider/ThemeContext";
import {css} from "@emotion/react";
import {useCallback, useEffect, useRef} from "react";
import debounce from "../utils";
import ownerWindow from "../utils/ownerWindow";
import useClickOutside from "../utils/useClickOutside";
import * as React from "react";

const MAX_HEIGHT = 200
const marginThreshold = 16


interface MyFakePopoverProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  anchorEl: Element | null
  anchorOrigin?: {
    vertical: 'top' | 'center' | 'bottom' | number
    horizontal: 'left' | 'center' | 'right' | number
  }
  transformOrigin?: {
    horizontal: number | 'left' | 'center' | 'right';
    vertical: number | 'top' | 'center' | 'bottom';
  }
}


export function getOffsetTop(rect: any, vertical: any) {
  let offset = 0;

  if (typeof vertical === 'number') {
    offset = vertical;
  } else if (vertical === 'center') {
    offset = rect.height / 2;
  } else if (vertical === 'bottom') {
    offset = rect.height;
  }

  return offset;
}

function getOffsetLeft(rect: any, horizontal: any) {
  let offset = 0;

  if (typeof horizontal === 'number') {
    offset = horizontal;
  } else if (horizontal === 'center') {
    offset = rect.width / 2;
  } else if (horizontal === 'right') {
    offset = rect.width;
  }

  return offset;
}


function getTransformOriginValue(transformOrigin: any) {
  return [transformOrigin.horizontal, transformOrigin.vertical]
    .map((n) => (typeof n === 'number' ? `${n}px` : n))
    .join(' ');
}

// function resolveAnchorEl(anchorEl: HTMLElement) {
//   return typeof anchorEl === 'function' ? anchorEl() : anchorEl;
// }


function MyFakePopover(props: MyFakePopoverProps) {
  const {
    isOpen,
    onClose,
    children,
    anchorEl,
    anchorOrigin = {
      vertical: 'bottom',
      horizontal: 'left',
    },
    transformOrigin = {
      vertical: 'top',
      horizontal: 'left',
    },
  } = props
  const theme = useTheme()
  const popoverRef = useRef<HTMLDivElement>(null)
  useClickOutside(popoverRef, () => {
    onClose()
  })

  const getAnchorOffset = useCallback(() => {
    // @ts-ignore
    const anchorRect = anchorEl.getBoundingClientRect()

    return {
      top: anchorRect.top + getOffsetTop(anchorRect, anchorOrigin.vertical),
      left: anchorRect.left + getOffsetLeft(anchorRect, anchorOrigin.horizontal),
    }
  }, [anchorEl, anchorOrigin.horizontal, anchorOrigin.vertical])

  const getTransformOrigin = useCallback((elementRect: {width:number, height: number}) => {
    return {
      vertical: getOffsetTop(elementRect, transformOrigin.vertical),
      horizontal: getOffsetLeft(elementRect, transformOrigin.horizontal),
    }
  }, [transformOrigin.horizontal, transformOrigin.vertical])


  const getPositioningStyle = useCallback((element: HTMLDivElement) => {

    const elementRect = {
      width: element.offsetWidth,
      height: element.offsetHeight,
    }


    // Get the transform origin point on the element itself
    const elementTransformOrigin = getTransformOrigin(elementRect)


    const anchorOffset = getAnchorOffset();

    // Calculate element positioning

    let top = anchorOffset.top - elementTransformOrigin.vertical
    console.log("-> top", top);
    let left = anchorOffset.left - elementTransformOrigin.horizontal
    console.log("-> left", left);

    const bottom = top + elementRect.height
    console.log("-> bottom", bottom);
    const right = left + elementRect.width
    console.log("-> right", right);

    // @ts-ignore
    const containerWindow = ownerWindow(anchorEl)
    console.log("-> containerWindow", containerWindow);

    // Window thresholds taking required margin into account

    const heightThreshold = containerWindow.innerHeight - marginThreshold
    console.log("-> heightThreshold", heightThreshold);
    const widthThreshold = containerWindow.innerWidth - marginThreshold
    console.log("-> widthThreshold", widthThreshold);

    // Check if the vertical axis needs shifting

    if (top < marginThreshold) {
      const diff = top - marginThreshold
      top -= diff
      elementTransformOrigin.vertical += diff
    } else if (bottom > heightThreshold) {
      const diff = bottom - heightThreshold
      top -= diff
      elementTransformOrigin.vertical += diff
    }

    // Check if the horizontal axis needs shifting
    if(left < marginThreshold) {
      const diff = left - marginThreshold
      left -= diff
      elementTransformOrigin.horizontal += diff
    } else if (right > widthThreshold) {
      const diff = right - widthThreshold
      left -= diff
      elementTransformOrigin.horizontal += diff
    }

    return {
      top: `${Math.round(top)}px`,
      left: `${Math.round(left)}px`,
      transformOrigin: getTransformOriginValue(elementTransformOrigin),
    }

  }, [anchorEl, getAnchorOffset, getTransformOrigin])

  const setPopoverPosition = useCallback(() => {
    const element = popoverRef.current

    if (!element || !anchorEl) {
      return
    }

    // const position =


    const positioningStyle = getPositioningStyle(element)
    console.log("-> positioningStyle", positioningStyle);

    element.style.top = positioningStyle.top
    element.style.left = positioningStyle.left
    // element.style.transformOrigin = positioningStyle.transformOrigin
    // element.style.transform = 'scale(2)'
    // element.style.transform = 'none'


  }, [anchorEl])


  useEffect(() => {
    if (isOpen) {
      setPopoverPosition()
    }
  })

  useEffect(() => {
    if(!isOpen) {
      return
    }
    const handleResize = debounce(() => {
      setPopoverPosition()
    }, 100)
    window.addEventListener('resize', handleResize)
    return () => {
      handleResize.clear()
      window.removeEventListener('resize', handleResize)
    }
  }, [isOpen, setPopoverPosition])


  return (
    <>
      {isOpen && (
        <div
          role="presentation"
          css={css` position: fixed; z-index: 1300; inset: 0;`}
        >
          <div
            ref={popoverRef}
            css={css`
          position: absolute;
          z-index: 100;
          width: 100%;
          animation: fadeIn 0.4s;
          @keyframes fadeIn {
            from {opacity: 0}
            to {opacity: 1}
          }
        `}>
            <ul css={css`
            background-color: ${theme.colors.greys.white};
            margin: ${theme.spacing[1]}px 0;
            padding: 0;
            border-radius: 4px;
            box-shadow: ${theme.shadows.medium};
            max-height: ${MAX_HEIGHT}px;
            overflow-y: auto;
            overflow-x: hidden;
          `}>
              {children}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default MyFakePopover;
