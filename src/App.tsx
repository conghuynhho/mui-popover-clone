import { css } from '@emotion/react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import SettingOptionSelect, { OptionSelectItemProps } from './components/OptionSelect'
import viteLogo from '/vite.svg'

// export interface OptionSelectItemProps {
//   /** The callback fired when the item is clicked. */
//   onClick?: () => void
//   /** Whether or not the item is checked. */
//   checked?: boolean
//   /** Whether or not the item is disabled. */
//   disabled?: boolean
//   /** The elements that populate the content of the item. */
//   children?: React.ReactElement<any> | React.ReactElement<any>[]
//   /** Callback to close dropdown when clicked select */
//   onClose?: () => void
// }


const dummyOptions: Array<OptionSelectItemProps> = [
  {
    children: <div>LAKJFLKDJLKJFLDKJSLFJ</div>,
    onClick: () => console.log('huhu')
  },
  {
    children: <div>haha</div>,
    onClick: () => console.log('haha')
  },
  {
    children: <div>hoho</div>,
    onClick: () => console.log('hoho')
  },
  {
    children: <div>hoho</div>,
    onClick: () => console.log('hoho')
  },
  {
    children: <div>hoho</div>,
    onClick: () => console.log('hoho')
  },
  {
    children: <div>hoho</div>,
    onClick: () => console.log('hoho')
  },
  {
    children: <div>hoho</div>,
    onClick: () => console.log('hoho')
  },
  {
    children: <div>hoho</div>,
    onClick: () => console.log('hoho')
  },
  {
    children: <div>hoho</div>,
    onClick: () => console.log('hoho')
  },
  {
    children: <div>hoho</div>,
    onClick: () => console.log('hoho')
  },
  {
    children: <div>hoho</div>,
    onClick: () => console.log('hoho')
  },
  {
    children: <div>hoho</div>,
    onClick: () => console.log('hoho')
  },
  {
    children: <div>hoho</div>,
    onClick: () => console.log('hoho')
  },
  {
    children: <div>hoho</div>,
    onClick: () => console.log('hoho')
  },
  {
    children: <div>hoho</div>,
    onClick: () => console.log('hoho')
  },
  {
    children: <div>hoho</div>,
    onClick: () => console.log('hoho')
  },

]


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <SettingOptionSelect
        css={css`
         max-width: 200px;
        `}
        options={dummyOptions}
        selectedDeviceLabel="huhu"
      />
    </div>
  )
}

export default App
