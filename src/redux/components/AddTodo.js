import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addTodo, editTodo } from "../actions/TodoActions";

const AddTodo = (props) => {
  const { isEditing, updateTodo } = props;
  const dispatch = useDispatch();
  const [state, setState] = useState({
    todoName: "",
  });

  useEffect(() => {
    if (Object.keys(updateTodo).length > 0) {
      setState({
        id: updateTodo.id,
        todoName: updateTodo.name,
      });
    }
  }, [updateTodo]);

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
    const todo = { id: updateTodo.id, name: state.todoName };
    const response = await axios
      .put(`http://localhost:8000/todos/${todo.id}`, todo)
      .catch((err) => console.log(err));
    if (response.status === 200) {
      dispatch(editTodo(todo));
      toast.success("Todo updated successfully!!", {
        autoClose: 3000,
        pauseOnHover: true,
      });
      setState({
        todoName: "",
      });
      props.onIsEditingChange(false);
    } else {
      toast.error("Error while updating todo", {
        autoClose: 3000,
        pauseOnHover: true,
      });
    }
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
                <button
                  className="btn btn-primary btn-sm"
                  type="submit"
                  onClick={(e) => handleEditTodo(e)}
                >
                  Update
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default AddTodo;
