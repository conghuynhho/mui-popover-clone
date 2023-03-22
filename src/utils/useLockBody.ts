import { useEffect, useState } from 'react'
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

type UseLockedBodyOutput = [boolean, (locked: boolean) => void]

  function getScrollbarWidth() {
    // Create a div element
    const div = document.createElement('div');
    // Set its width to be larger than the viewport
    div.style.width = '100px';
    div.style.height = '100px';
    div.style.overflow = 'scroll';
    div.style.position = 'absolute';
    div.style.top = '-9999px';
    // Add it to the document
    document.body.appendChild(div);
    // Calculate the scrollbar width
    const scrollbarWidth = div.offsetWidth - div.clientWidth;
    // Remove the div from the document
    document.body.removeChild(div);
    // Return the scrollbar width
    return scrollbarWidth;
  }
function useLockedBody(
  initialLocked = false,
  rootId = '___gatsby', // Default to `___gatsby` to not introduce breaking change
): UseLockedBodyOutput {
  const [locked, setLocked] = useState(initialLocked)

  // Do the side effect before render
  useIsomorphicLayoutEffect(() => {
    if (!locked) {
      return
    }

    // Save initial body style
    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight

    // Lock body scroll
    document.body.style.overflow = 'hidden'

    // Get the scrollBar width
    // const root = document.getElementById(rootId) // or root
    // const scrollBarWidth = root ? root.offsetWidth - root.clientWidth : 0
    // // const scrollBarWidth = root ? root.offsetWidth - root.scrollWidth : 0
    // console.log("-> root", root);
    // console.log("-> scrollBarWidth", scrollBarWidth);
    const scrollBarWidth = getScrollbarWidth();

    // Avoid width reflow
    if (scrollBarWidth) {
      document.body.style.paddingRight = `${scrollBarWidth}px`
    }

    return () => {
      document.body.style.overflow = originalOverflow

      if (scrollBarWidth) {
        document.body.style.paddingRight = originalPaddingRight
      }
    }
  }, [locked])

  // Update state if initialValue changes
  useEffect(() => {
    if (locked !== initialLocked) {
      setLocked(initialLocked)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLocked])

  return [locked, setLocked]
}

export default useLockedBody
