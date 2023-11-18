import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdAddCircle } from "react-icons/io";
import { MdEdit, MdDelete } from "react-icons/md";
import { AddTodo, DeletedTodo, GetTodo, ToggleTodoCompletion, UpdateTodo } from "../Redux/action";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const Todo = () => {
  const [inputModal, setInputModal] = useState(false);
  const [cancel, setCancel] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.Todo);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  const [modal, setModal] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(null);

  const options = {
    month: "short",
    day: "numeric",
    weekday: "short",
  };
  const currentDateWithDay = new Date().toLocaleDateString(undefined, options);

  const handleField = () => {
    setInputModal(true);
  };

  const handleCancel = () => {
    setCancel(false);
    setInputModal(false);
  };

  useEffect(() => {
    dispatch(GetTodo());
  }, []);

  const handleAddTask = (e) => {
    e.preventDefault();
    dispatch(
      AddTodo({
        title: title,
        date: date,
        status: false,
      })
    ).then(() => {
      dispatch(GetTodo());
    });
  };

  const handleEdit = (id) => {
    setModal(true);
    setSelectedTodoId(id);
    const existingTodo = data.todo.find((el) => el._id === id);

    if (existingTodo) {
      setTitle(existingTodo.title || "");
      setDate(existingTodo.date || "");
    }
  };

  const handleDelete = (id) => {
    dispatch(DeletedTodo(id)).then(() => {
      dispatch(GetTodo());
    });
  };

  const handleUpdate = () => {
    if (selectedTodoId) {
      dispatch(UpdateTodo(selectedTodoId, { title, date })).then(() => {
        setModal(false);
        dispatch(GetTodo());
      });
    }
  };

  const handleToggleCompletion = (id, status) => {
    console.log("Before Toggle:", data.todo);
    dispatch(ToggleTodoCompletion(id, { status })).then(() => {
      console.log("After Toggle:", data.todo);
      dispatch(GetTodo());
    });
  };

  return (
    <div>
      <p className="flex bg-black text-white text-xl m-auto w-full h-10 items-center justify-center ">
        Todo Application
      </p>
      <div className="grid border-black">
        <div className="flex items-center gap-1 m-auto mt-4">
          <h1 className="text-red-400 text-xl font-bold">Today</h1>
          <h1 className="text-xs mt-2"> {currentDateWithDay}</h1>
        </div>
        {!cancel && !inputModal && (
          <div
            className="flex items-center rounded cursor-pointer m-auto w-1/8 p-2 border-2 hover:bg-red-700 hover:text-white mt-3"
            onClick={handleField}
          >
            <IoMdAddCircle className="cursor-pointer text-xl rounded-lg" />
            <p>Add task</p>
          </div>
        )}
        {inputModal && (
          <div>
            <form
              className="grid m-auto border-b-2 rounded p-5"
              onSubmit={handleAddTask}
            >
              <div className="">
                <label htmlFor="">Task Name : </label>
                <input
                  placeholder="task"
                  value={title}
                  onChange={(obj) => setTitle(obj.target.value)}
                  required
                  className="border-b-2 border-rose-500 p-1 outline-none"
                />
              </div>
              <div className="flex mt-5 gap-12">
                <label className="mt-2">Date : </label>

                <input
                  type="date"
                  value={date}
                  onChange={(obj) => setDate(obj.target.value)}
                  required
                  className="border-b-2 border-rose-500 cursor-pointer p-1 outline-none"
                />
              </div>
              <div className="flex items-end justify-end gap-3 pt-4 ">
                <button
                  onClick={handleCancel}
                  className="border-2 p-1 text-xs w-1/6 rounded"
                >
                  Cancel
                </button>
                <button className="border-2 p-1 text-xs bg-red-500 w-1/6 text-white rounded">
                  Add Task
                </button>
              </div>
            </form>
          </div>
        )}
        <div className="mt-5">
          {data.todo.length > 0 &&
            data.todo.map((el, index) => {
              console.log(el);
              return (
                <div key={index} className="flex items-cen border-2 mt-2 p-4">
                  <div>
                    <input
                      type="checkbox"
                      checked={el.status}
                      onChange={() =>
                        handleToggleCompletion(el._id, !el.status)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <p>{el.title}</p>
                      <p>{el.date}</p>
                    </div>
                    <div className="flex gap-3">
                      <MdEdit
                        className="cursor-pointer"
                        onClick={() => handleEdit(el._id)}
                      />
                      <MdDelete
                        className="cursor-pointer"
                        onClick={() => handleDelete(el._id)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div>
        {modal && (
          <Transition.Root show={modal} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              initialFocus={cancelButtonRef}
              onClose={() => setModal(false)}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            <ExclamationTriangleIcon
                              className="h-6 w-6 text-red-600"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <Dialog.Title
                              as="h3"
                              className="text-base font-semibold leading-6 text-gray-900"
                            >
                              Update Todo
                            </Dialog.Title>
                            <div className="mt-2">
                              <input
                                type="text"
                                placeholder="Update Task"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                              />
                              <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                          onClick={handleUpdate}
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={() => setModal(false)}
                          ref={cancelButtonRef}
                        >
                          Cancel
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        )}
      </div>
    </div>
  );
};

export default Todo;
