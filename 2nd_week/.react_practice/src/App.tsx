import { useContext } from 'react';
import './components/todoStyle.css'
import TodoComp from './components/TodoComp'
import { CounterProvider } from './context/CounterProvider';


function App() {
  
  return (
     // CounterProvider로 count 상태와 handleIncrement/Decrement 공급
     <CounterProvider>
     <div className="todo-container">
       <h1>Todo List</h1>
       <TodoComp />
     </div>
   </CounterProvider>
  );
}

export default App;