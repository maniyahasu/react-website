import React, { useEffect, useState } from "react";
import Container from "../../components/shared/Container";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTodos, deleteTodo } from "../actions/TodoActions";
import axios from "axios";
import Loader from "../../components/shared/Loader";
import AddTodo from "./AddTodo";
import { toast } from 'react-toastify';

const Todo = () => {
  const todoList = useSelector((state) => state.todoList.todos);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTodoData, setEditTodoData] = useState({});
  const dispatch = useDispatch();

  const fetchTodoList = async () => {
    setIsLoading(true);
    const todos = await axios
      .get("http://localhost:8000/todos")
      .catch((error) => {
        console.log("Error while fetching todos", error);
      });
    dispatch(fetchAllTodos(todos.data));
    setIsLoading(false);
  };

  const handleDeleteTodo = async (id) => {
    setIsLoading(true);
    const response = await axios
      .delete(`http://localhost:8000/todos/${id}`)
      .catch((err) => console.log(err));
    if (response.status === 200) {
      dispatch(deleteTodo(id));
      toast.success("Todo deleted successfully!!", {
        autoClose: 3000,
        pauseOnHover: true,
      });
    } else {
      toast.error("Error while deleting todo", {
        autoClose: 3000,
        pauseOnHover: true,
      });
    }
    setIsLoading(false);
  };

  const getEditedTodo = (id) => {
    const editedTodo = todoList.filter((todo) => todo.id === id) || [];
    setEditTodoData(editedTodo[0]);
    setIsEditing(true);
  };

  useEffect(() => {
    fetchTodoList();
  }, []);

  const toggleIsEditing = (flag) => {
    setIsEditing(flag);
  };

  //   console.log("todo list from redux", todoList);

  return (
    <Container>
      <div className="row py-3">
        <div className="col-md-12 d-flex">
          <div className="pr-2">
            <NavLink to="/">
              <i className="fas fa-arrow-left"></i>
            </NavLink>
          </div>
          {/* <div>Todo List</div> */}
        </div>
      </div>
      <div className="row">
        <div className="col-md-5 todo-list-group">
          <div className="h6">Todo List</div>
          <ul className="list-group">
            {todoList.length > 0 &&
              todoList.map((todo) => (
                <li
                  key={todo.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {todo.name}
                  <div>
                    <span
                      className="fa fa-edit cursor-pointer"
                      onClick={() => getEditedTodo(todo.id)}
                    ></span>
                    <span
                      className="fa fa-times cursor-pointer pl-2"
                      onClick={() => handleDeleteTodo(todo.id)}
                    ></span>
                  </div>
                </li>
              ))}
            {todoList.length === 0 && isLoading && <Loader height="20vh" />}
            {todoList.length === 0 && !isLoading && <div>No todo found</div>}
          </ul>
        </div>
        <div className="col-md-5">
          <div className="h6">{isEditing ? "Edit" : "Add"} Todo</div>
          <AddTodo
            isEditing={isEditing}
            updateTodo={editTodoData}
            onIsEditingChange={(e) => toggleIsEditing(e)}
          />
        </div>
      </div>
    </Container>
  );
};
export default Todo;
