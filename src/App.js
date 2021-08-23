import React, { useState, useEffect, } from 'react';
import queryString from 'query-string';
import './App.scss';
import './grid.css';
import './components/ColorBox/ColorBox.scss';
import ColorBox from './components/ColorBox/index';
import TodoList from './components/TodoList/index';
import TodoForm from './components/TodoForm/index';
import PostList from './components/PostList/index';
import Pagination from './components/Pagination/index';
import PostFiltersForm from './components/PostFiltersForm/index';
import Clock from './components/Clock/index';

function App() {
  //List todo, form todo
  const [todoList, setTodoList] = useState(
    [
      { id: 1, title: 'Doing what you like is freedom. Liking what you do is happiness.' },
      { id: 2, title: 'I find my greatest pleasure, and so my reward, in the work that precedes what the world calls success.' },
      { id: 3, title: 'The woman who can create her own job is the woman who will win fame and fortune.' },
    ]
  );

  function handleTodoList(todo) {
    // console.log(todo);
    const index = todoList.findIndex(x => x.id === todo.id);
    if(index < 0) return;
    
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  function handleTodoFormSubmit(formValues) {
    // console.log(formValues);
    const id = getNextId(todoList);
    const newTodo = {
      id: id,
      ...formValues,
    }
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  function getNextId(list) {
    const listLength = list.length;
  
    if (listLength === 0) {
      return 1;
    }
  
    return list[listLength-1].id + 1;
  };

  //PostList, Pagination, PostFiltersForm
  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });
  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
  });

  useEffect(() => {
    async function fetchPostList() {
      try {
        //npm i query-string
        const paramsString = queryString.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        // console.log({responseJSON});

        const { data, pagination } = responseJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('FAIL TO FETCH POST LIST: ', error.message);
      }
    }

    fetchPostList();
  }, [filters]);

  const handlePageChange = (newPage) => {
    // console.log('New page: ', newPage);
    setFilters({
      ...filters,
      _page: newPage,
    });
  };

  const handleFiltersChange = (newFilters) => {
    // console.log('New Filters: ', newFilters);
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm,
    });
  };

 //Clock
 const [showClock, setShowClock] = useState(true);

  return (
    <div className="App">
      <h1>Welcome to React Hooks!</h1>
      <div className="grid">
        <div className="row">
          <div className="col l-2 m-4 c-12">
            <h2>Click the box!</h2>
            <ColorBox />
          </div>

          <div className="col l-4 m-6 c-12">
            <h2>TodoList</h2>
            <TodoForm onSubmit={handleTodoFormSubmit} />
            <TodoList todos={todoList} onTodoClick={handleTodoList}/>
          </div>

          <div className="col l-4 m-6 c-12">
            <h2>Post</h2>
            <PostFiltersForm onSubmit={handleFiltersChange} />
            <PostList posts={postList} />
            <Pagination 
              pagination={pagination}
              onPageChange={handlePageChange} 
            />  
          </div>

          <div className="col l-2 m-4 c-12">
            <h2>Clock</h2>
            {showClock && <Clock />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
