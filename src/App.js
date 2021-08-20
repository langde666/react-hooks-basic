import React, { useState, useEffect, } from 'react';
import './App.scss';
import './components/ColorBox/ColorBox.scss';
import ColorBox from './components/ColorBox/index';
import TodoList from './components/TodoList/index';
import TodoForm from './components/TodoForm/index';
import PostList from './components/PostList/index';

function App() {
  const [todoList, setTodoList] = useState(
    [
      { id: 1, title: 'Doing what you like is freedom. Liking what you do is happiness.' },
      { id: 2, title: 'I find my greatest pleasure, and so my reward, in the work that precedes what the world calls success.' },
      { id: 3, title: 'The woman who can create her own job is the woman who will win fame and fortune.' },
    ]
  );

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    async function fetchPostList() {
      try {
        const requestUrl = 'http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1';
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        // console.log({responseJSON});

        const { data } = responseJSON;
        setPostList(data);
      } catch (error) {
        console.log('FAIL TO FETCH POST LIST: ', error.message);
      }
    }

    fetchPostList();
  }, [])

  function handleTodoList(todo) {
    // console.log(todo);
    const index = todoList.findIndex(x => x.id === todo.id);
    if(index < 0) return;
    
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  // function handleTodoFormSubmit(formValues) {
  //   // console.log(formValues);
  //   const id = getNextId(todoList);
  //   const newTodo = {
  //     id: id,
  //     ...formValues,
  //   }
  //   const newTodoList = [...todoList];
  //   newTodoList.push(newTodo);
  //   setTodoList(newTodoList);
  // }

  // function getNextId(list) {
  //   const listLength = list.length;
  
  //   if (listLength === 0) {
  //     return 1;
  //   }
  
  //   return list[listLength-1].id + 1;
  // };

  return (
    <div className="App">
      {/* <h1>Welcome to React Hooks!</h1>
      <ColorBox /> */}

      {/* <h1>TodoList</h1>
      <TodoForm onSubmit={handleTodoFormSubmit} />
      <TodoList todos={todoList} onTodoClick={handleTodoList}/> */}

      <PostList posts={postList} />
    </div>
  );
}

export default App;
