import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTodo, editTodo } from "../actions/TodoActions";
import { TodoConstants } from "../constants/TodoConstants";

const AddTodo = () => {
  const todoState = useSelector((state) => state.todoList);
  const dispatch = useDispatch();
  const currentEditTodo = todoState.editingTodo;
  const isEditing = todoState.isEditing;
  const [state, setState] = useState({
    todoName: "",
  });

  useEffect(() => {
    if (Object.keys(currentEditTodo).length > 0) {
      setState({
        id: currentEditTodo.id,
        todoName: currentEditTodo.name,
      });
    }
    return () => {
       setState({ todoName: ''});
    }
  }, [currentEditTodo]);

  const handleInputChange = (e) => {
    const name = e.target.name;
    setState({
      [name]: e.target.value,
    });
  };

  const addNewTodo = async (e) => {
    e.preventDefault();
    if (state.todoName.length > 0) {
      const payload = {
        id: Math.floor(Math.random() * 100),
        name: state.todoName,
      };
      const response = await axios
        .post("http://localhost:8000/todos", payload)
        .catch((err) => console.log(err));
      if (response.data.id) {
        dispatch(addTodo(payload));
        toast.success("Todo added successfully!!", {
          autoClose: 3000,
          pauseOnHover: true,
        });
        setState({
          todoName: "",
        });
      } else {
        toast.error("Something went wrong while adding todo", {
          autoClose: 3000,
          pauseOnHover: true,
        });
      }
    } else {
      toast.warning("Todo name is required", {
        autoClose: 3000,
        pauseOnHover: true,
      });
    }
    console.log(state);
  };

  const handleEditTodo = async (e) => {
    e.preventDefault();
    const todo = { id: currentEditTodo.id, name: state.todoName };
    const response = await axios
      .put(`http://localhost:8000/todos/${todo.id}`, todo)
      .catch((err) => console.log(err));
    if (response.status === 200) {
      dispatch(editTodo(todo));
      dispatch({ type: TodoConstants.UPDATE_TODO_END });
      toast.success("Todo updated successfully!!", {
        autoClose: 3000,
        pauseOnHover: true,
      });
      setState({
        todoName: "",
      });
    } else {
      toast.error("Error while updating todo", {
        autoClose: 3000,
        pauseOnHover: true,
      });
    }
  };

  const cancelEditTodo = () => {
    setState({ todoName: "" });
    dispatch({ type: TodoConstants.UPDATE_TODO_END });
  };
  return (
    <>
      <form>
        <div className="form-row">
          <label htmlFor="todoName" className="col-form-label">
            Todo name
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control form-control-md"
              id="todoName"
              placeholder="Todo Name"
              name="todoName"
              value={state.todoName}
              onChange={(e) => handleInputChange(e)}
            />
            <div className="text-right pt-2">
              {!isEditing && (
                <button
                  className="btn btn-primary btn-sm"
                  type="submit"
                  onClick={(e) => addNewTodo(e)}
                >
                  Add
                </button>
              )}
              {isEditing && (
                <>
                  <button
                    className="btn btn-danger btn-sm mr-2"
                    type="button"
                    onClick={cancelEditTodo}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    type="submit"
                    onClick={(e) => handleEditTodo(e)}
                  >
                    Update
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default AddTodo;
