import { useTheme } from '../providers/GgjThemeProvider/ThemeContext'
import React, {createRef, SyntheticEvent, useEffect, useState} from 'react'
import { css } from '@emotion/react'
import MyFakePopover from "./MyFakePopover";
import useLockedBody from "../utils/useLockBody";

interface SettingOptionSelectProps {
  options: Array<OptionSelectItemProps>
  selectedDeviceLabel: string
}

const MAX_HEIGHT = 200











function SettingOptionSelect({options, selectedDeviceLabel}: SettingOptionSelectProps) {
  const theme = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  // const [selectedOption, setSelectedOption] = useState(value)
  const [isUp, setIsUp] = useState(false)
  const [isLocked, setIsLocked] = useLockedBody(false, 'root')
  const dropdownRef = createRef<HTMLDivElement>()

  const toggling = (event: SyntheticEvent<HTMLDivElement>) => {
    setIsLocked(!isOpen)
    console.log('==========toggle===========')
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
    setIsOpen(!isOpen)
  }
  const onClose = () => {
    console.log('==========onClose===========')
    setIsLocked(false)
    setIsOpen(false)
  }

  useEffect(() => {
    setTimeout(() => {
      const clientRectObj = dropdownRef.current?.getBoundingClientRect()

      // test
      // console.log('-------------START-----------------------')
      // if(clientRectObj) {
      //   console.log('48 * options.length', 48 * options.length)
      //
      //   console.log('clientRectObj.top', clientRectObj.top)
      //   console.log('clientRectObj.bottom', clientRectObj.bottom)
      //   console.log('window.innerHeight', window.innerHeight)
      //
      //   console.log('----------------------------------')
      //
      //   console.log('(48 * options.length + clientRectObj.top)', (48 * options.length + clientRectObj.top))
      //   console.log('window.innerHeight', window.innerHeight)
      //   console.log('huhu', (48 * options.length + clientRectObj.top) - window.innerHeight)
      // }
      // console.log('-------------END-----------------------')

      // if (clientRectObj &&
      //   window.innerHeight < (48 * options.length + clientRectObj.top) &&
      //   ((48 * options.length + clientRectObj.top) - window.innerHeight > 48 * options.length)
      // ) {
      //   setIsUp(true)
      // }

      const itemHeight = 48 * options.length < MAX_HEIGHT ? 48 * options.length : MAX_HEIGHT
      if (clientRectObj && window.innerHeight - clientRectObj.bottom < itemHeight) {
        setIsUp(true)
      }

    }, 400)
  }, [isOpen, options])


  return (
    <div
      ref={dropdownRef}
      css={css` position: relative; max-width: 300px;`}
    >
      <div
        css={css`
          border-radius: 10px;
          color: ${theme.colors.jade.light};
          font-size: 14px;
          line-height: 16px;
          height: 48px;
          letter-spacing: -0.005625rem;
          padding: 14px 16px;
          transition: box-shadow 0.05s ease-in;
          display: flex;
          justify-content: space-between;
          align-items: center;
          appearance: none;
          border: 1px solid ${theme.colors.smoke.light};
          background-color: ${theme.inputs.bgd};
          cursor: pointer;
          &:focus{
            border: ${theme.inputs.focus.border};
            box-shadow: ${theme.inputs.focus.shadow};
            outline: none;
          }
        `}
        onClick={toggling}
      >
      <span css={css`
        ${theme.ggjWrapText}
      `}>
        {selectedDeviceLabel || 'Please select'}
      </span>


      </div>
      {/*{isOpen && (*/}
      {/*  <div css={css`*/}
      {/*    position: absolute;*/}
      {/*    ${isUp ? 'bottom: 100%;' : ''}*/}
      {/*    z-index: 100;*/}
      {/*    width: 100%;*/}
      {/*    animation: fadeIn 0.4s;*/}
      {/*    @keyframes fadeIn {*/}
      {/*      from {opacity: 0}*/}
      {/*      to {opacity: 1}*/}
      {/*    }*/}
      {/*  `}>*/}
      {/*    <ul css={css`*/}
      {/*      background-color: ${theme.colors.greys.white};*/}
      {/*      margin: ${theme.spacing[1]}px 0;*/}
      {/*      padding: 0;*/}
      {/*      border-radius: 4px;*/}
      {/*      box-shadow: ${theme.shadows.medium};*/}
      {/*      max-height: ${MAX_HEIGHT}px;*/}
      {/*      overflow-y: auto;*/}
      {/*    `}>*/}
      {/*    </ul>*/}
      {/*  </div>*/}
      {/*)}*/}

      <MyFakePopover
        isOpen={isOpen}
        onClose={onClose}
        anchorEl={anchorEl}
      >
        {options.map((option, index) => (
          <OptionSelectItem key={index} onClose={onClose} {...option} />
        ))}
      </MyFakePopover>
    </div>
  )
}

export interface OptionSelectItemProps {
  /** The callback fired when the item is clicked. */
  onClick?: () => void
  /** Whether or not the item is checked. */
  checked?: boolean
  /** Whether or not the item is disabled. */
  disabled?: boolean
  /** The elements that populate the content of the item. */
  children?: React.ReactElement<any> | React.ReactElement<any>[]
  /** Callback to close dropdown when clicked select */
  onClose?: () => void
}

const OptionSelectItem = ({onClick, checked, children, onClose}: OptionSelectItemProps) => {
  const theme = useTheme()
  const handleClick = () => {
    onClick && onClick()
    onClose && onClose()
  }
  return (
    <li
      onClick={handleClick}
      key={Math.random()}
      css={css`
        list-style: none;
        height: 48px;
        max-width: 300px;
        line-height: 48px;
        color: ${theme.colors.jade.light};
        font-size: 14px;
        cursor: pointer;
        //padding: 14px 16px;
        padding: 0 14px;
        ${theme.ggjWrapText}
        ${checked
                ? 'background-color: ' + theme.colors.primary.main + ';'
                : ''
        }
        &:hover,
        &:focus {
          background-color: ${theme.colors.primary.main, 0.1};
        }
      `}
    >
      {children}
    </li>
  )
}

export default SettingOptionSelect
