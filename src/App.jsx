import { useRecoilValue, useRecoilState } from "recoil";
import { todosAtom, inputTitle, inputDesc } from "./store/atoms/todos";
import {memo} from 'react';
function App() {
  const [todos, setTodos] = useRecoilState(todosAtom);
  const [title, setTitle] = useRecoilState(inputTitle);
  const [desc, setDesc] = useRecoilState(inputDesc);
  const addTodo=function(){
    const todoNew = {
      id: Math.floor(Math.random() * 1000),
      title: title,
      desc: desc,
      completed: false,
    };
    setTodos([...todos, todoNew]);
    setTitle("");
    setDesc("");
  }
  return (
    <>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        placeholder="Enter Task"
      />
      <input
        type="text"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Add description"
      />
      <button onClick={addTodo}>Add Task</button>
      <br />
      <TodoDisplay />
    </>
  );
}

function Todo({todo}) {
  const [todos,setTodos] = useRecoilState(todosAtom)
  const todoCompleted=function(){
    let index=todos.indexOf(todo);
    let updatedTodo=todos.map((t,i)=>(i==index?{...t,completed:true}:t))
    setTodos(updatedTodo);
  }
  return (
    <div>
      <h2 style={{textDecorationLine: todo.completed? 'line-through':'none'}}>{todo.title}</h2>
      <p style={{textDecorationLine: todo.completed? 'line-through':'none'}}>{todo.desc}</p>
      <button onClick={todoCompleted}>Done</button>
      <button>Delete</button>
    </div>
  );
}

const TodoDisplay = memo(() => {
  const todo = useRecoilValue(todosAtom);
  return (
    <div>
      {todo.map((t) => (
        <Todo key={t.id} todo={t} />
      ))}
    </div>
  );
});

export default App;
