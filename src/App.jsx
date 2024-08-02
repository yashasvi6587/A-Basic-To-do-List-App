import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import Footer from './Footer';

function App() {

  const [todo, setTodo]=useState("")
  const [todos, setTodos]=useState([])

  useEffect(() => {
    let todoString=localStorage.getItem("todos")
    if (todoString){
      let todos=JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  
  const savetoLS=(params) => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const handleEdit=(e,id)=>{
    let t=todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodos=todos.filter(item=>{
      return item.id!==id
    })
    setTodos(newTodos)
    savetoLS()
  }
  const handleDelete=(e,id)=>{
    let newtodos=todos.filter(item=>{
      return item.id!=id
    })
    setTodos(newtodos)
    savetoLS()
  }
  const handleAdd=()=>{
      setTodos([...todos, {id: uuidv4(), todo, isCompleted:false}])
      setTodo("")
      console.log(todos)
      savetoLS()
  }

  const handleChange=(e)=>{
    setTodo(e.target.value)
    savetoLS()
  }
  return (
    <>
    <Navbar/>
      <div className='container my-5 mx-auto w-3/4 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-400 min-h-[75vh] py-3'>
        <div className="addTodo text-center">
          <h2 className='text-lg font-bold text-center'>Add a Todo  :</h2>
          <input onChange={handleChange} value={todo} type="text" className=' rounded-lg bg-slate-300 my-2 mx-4 px-5 py-1'/>
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-purple-500 rounded-lg px-3 py-1 font-bold text-yellow-100 disabled:bg-purple-900  hover:text-teal-200 hover:bg-purple-950'>Save</button>
        </div>
        <h2 className='text-amber-950 font-bold text-center my-5 text-4xl'>Your todos</h2>
        <div className="todos">
          {todos.length===0 && <div className="my-5 mx-auto text-center text-xl font-bold ">No todos to display</div> }
          {todos.map(item=>{
          return <div key={item} className="todo flex text-center items-center justify-center">
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            <div className='buttons text-center'>
              <button onClick={(e)=>handleEdit(e,item.id)} className='bg-purple-500 rounded-lg px-3 py-1  font-bold text-yellow-100 hover:text-teal-200 hover:bg-purple-950 my-5 mx-5'>Edit</button>
              <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-purple-500 rounded-lg px-3 py-1 font-bold text-yellow-100 hover:text-teal-200 hover:bg-purple-950 text-center '>Delete</button>
            </div>
          </div>
          })}
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default App
