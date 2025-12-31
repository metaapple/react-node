import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [count, setCount] = useState(0)
  //count는 변수
  //setCount는 count값을 변경하는 함수(반드시!!!!)
  //count = 0
  //useState(0)은 count의 초기값을 0으로 설정
  //useState를 사용하는 이유는 변수의 값을 변경할 때 리렌더링을 유발하기 때문이다.
  //count 상태값이 변경될 때마다 자동으로 랜더링이 된다.
  //그 부분만 자동으로 reload(refresh, 자동갱신)된다.

  // 여기서 핸들러 함수를 정의
  const handleClick = () => {
    console.log('클릭되었습니다.')
    setCount(count + 1)   // 또는 더 안전하게: setCount(prev => prev + 1)
  }

  return (
    <>
      <div>
        {/* <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a> */}
        <img src="/assets/img/image.png" alt="React logo" width='300' height='300' />
      </div>
      <h1>Vite + React</h1>
      <div className="card">
      <span style={{color: 'blue'}}>화살표 함수 사용("=>") </span>
        <button style={{color: 'red', backgroundColor: 'yellow'}} onClick={() => {
        /*
          count + 1 은 count 값에 1을 더한 값을 반환
          setCount(count + 1)은 count 값을 변경하는 함수
          count 값이 변경될 때마다 자동으로 랜더링이 된다.
          */

          console.log('클릭되었습니다.');
          setCount(count + 1) //setCount(count++)은 안됨.!!
        }}>
          
          count is {count}
          </button>
          <hr color="red"/> 
          <span style={{color: 'blue'}}>외부 함수 연결(handleClick) </span>
          <button class="btn btn-danger"  onClick={handleClick}>count is {count}</button>
      </div>
    </>
  )
}

export default App
