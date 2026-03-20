import './App.css'
import TodoItem from './components/TodoItem'

function App() {

  return (
    <>
      <TodoItem
        task="Task Name"
        date="01-01-2000"
        completed={false}
        onToggle={() => console.log("toggle")}
        onDelete={() => console.log("delete")}
      />
    </>
  )
}

export default App
