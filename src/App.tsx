import { css } from '@emotion/react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import SettingOptionSelect, { OptionSelectItemProps } from './components/OptionSelect'
import viteLogo from '/vite.svg'
import './App.css'

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

      <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, debitis dicta dolore ducimus eos harum illum quidem reiciendis saepe voluptas. Accusamus adipisci beatae consequuntur cupiditate debitis dignissimos dolores ducimus eaque et ex excepturi facere ipsa ipsum itaque laudantium necessitatibus obcaecati, officia pariatur quidem ratione reiciendis sapiente sequi suscipit vel veritatis?. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid autem commodi cupiditate dignissimos ea eaque ex fuga, laboriosam, natus nemo nostrum porro quam qui quia quisquam reprehenderit sit. Ab ad amet architecto beatae culpa, cupiditate deleniti dolor dolorem est facilis in incidunt ipsum modi molestias natus necessitatibus nemo nihil pariatur perspiciatis porro quaerat quo, quod sed sequi veritatis voluptas voluptatum. Corporis cum dignissimos doloribus, eius iure maiores neque odit reiciendis. Accusantium aspernatur cumque debitis dolores dolorum ea, ex minima modi quasi quidem ratione, sapiente soluta temporibus unde vero voluptas voluptatum! Beatae est, laboriosam quo reiciendis repellat sapiente suscipit! Cumque, praesentium.  </h4>
      <SettingOptionSelect
        css={css`
         max-width: 200px;
        `}
        options={dummyOptions}
        selectedDeviceLabel="huhu"
      />

      <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus accusantium ad aliquid, asperiores, debitis exercitationem, fugit nulla obcaecati pariatur quia quo recusandae suscipit totam ut. Aut consequatur cupiditate debitis dolores esse excepturi, facilis illo ipsum mollitia nemo odit officiis perspiciatis repellendus similique sunt, ullam veritatis, voluptatem. Ad ipsum, numquam. Amet eligendi eum facere fugit harum, ipsum iure laboriosam molestias omnis porro, praesentium quas vel. A accusantium ad aperiam commodi debitis dolorem dolores ea eligendi, enim eos eveniet exercitationem explicabo facere fuga impedit ipsam ipsum itaque iusto laborum magni modi natus neque nisi nulla numquam officia provident ratione reiciendis saepe sed tempora unde vel voluptas voluptatem voluptates voluptatibus voluptatum! A accusamus asperiores assumenda atque consectetur consequatur consequuntur culpa cum distinctio dolor dolores dolorum, eaque eligendi enim error est et eum ex exercitationem expedita, explicabo facere in laborum nesciunt nostrum perspiciatis placeat porro quasi quidem quis rem repellendus sequi sint tempore veritatis voluptatem voluptatum! Animi asperiores aspernatur beatae blanditiis cum enim eos labore, maiores, neque omnis quis quo tenetur vero? Aspernatur aut doloribus libero quisquam quo tempora totam vel. Alias commodi, cumque eligendi exercitationem expedita fuga hic incidunt, itaque laudantium minus nisi provident sit totam. Aut iure necessitatibus quas recusandae repudiandae!</h4>
    </div>
  )
}

export default App
