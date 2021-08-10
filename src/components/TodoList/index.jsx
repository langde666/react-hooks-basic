import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
    onTodoClick: PropTypes.func,
};

TodoList.defaultProps = {
    todos: [],
    onTodoClick: null,
}

function TodoList(props) {
    const { todos, onTodoClick } = props;

    function handleClick(todo) {
        if (onTodoClick) {
            onTodoClick(todo);
        } 
    };

    return (
        <div>
            <ul className="todo-list">
                {todos.map(todo => (
                    <li className="todo-item" key={todo.id} onClick={() => handleClick(todo)} title="click to remove">{todo.title}</li>
                    
                ))}
            </ul>   
        </div>
    );
}

export default TodoList;