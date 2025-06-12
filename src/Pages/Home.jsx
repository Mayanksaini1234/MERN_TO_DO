import React, { useContext, useEffect, useState } from "react";
import { ToDoContext } from "../context/ToDOContext";
import { useNavigate } from "react-router-dom";
import { server } from "../main.jsx";
import { toast } from "sonner";
import axios from "axios";
import {
  Loader,
  Plus,
  CheckCircle2,
  Sparkles,
  Pencil,
  Trash2,
  Clock,
  CheckCircle,
} from "lucide-react";

const Home = () => {
  const { isAuthenticated, user, autoloading } = useContext(ToDoContext);
  const navigate = useNavigate();

  const [data, setData] = useState({ title: "", discription: "" });
  const [loader, setLoader] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (autoloading) return;
    if (!isAuthenticated) return navigate("/login");
  }, [isAuthenticated]);

  useEffect(() => {
    axios
      .get(`${server}/api/task/tasks`, {
        withCredentials: true,
      })
      .then((res) => {
        setTaskList(res.data.Task);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const dataHandler = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    setLoader(true);
    e.preventDefault();
    const { title, discription } = data;
    try {
      const { data } = await axios.post(
        `${server}/api/task/tasks`,
        {
          title,
          discription,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (data) {
        toast.success("Task is added!");
        setData({ title: "", discription: "" });
        setLoader(false);
        setRefresh((prev) => !prev);
      }
    } catch (error) {
      setLoader(false);
      toast.error("Task is not added and there is an error");
      console.log(error);
    }
  };

  const checkHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/api/task/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (data) {
        setRefresh((prev) => !prev);
        toast.success("Task is Updated");
      }
    } catch (error) {
      console.log(error);
      toast.error("Task is not Updated!");
    }
  };

  const deleteTask = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/api/task/${id}`, {
        withCredentials: true,
      });
      if (data) {
        setRefresh((prev) => !prev);
        toast.success("Task is deleted!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Task is not deleted ,there is an error!");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] relative overflow-hidden">
      {/* Premium Background Design */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(45deg, #fbbf24 1px, transparent 1px),
              linear-gradient(-45deg, #fbbf24 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        ></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(251,191,36,0.1),transparent_50%)]"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm mb-4 hover:shadow-md transition-all duration-300">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              My Tasks
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Organize your day, achieve your goals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Task Input Form */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-yellow-100 hover:shadow-2xl transition-all duration-300">
              <form onSubmit={submitHandler} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Task Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    onChange={dataHandler}
                    value={data.title}
                    required
                    className="w-full px-4 py-3 bg-white/50 border border-yellow-100 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200 shadow-sm hover:shadow-md"
                    placeholder="Enter task title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Task Description
                  </label>
                  <textarea
                    name="discription"
                    onChange={dataHandler}
                    value={data.discription}
                    required
                    className="w-full px-4 py-3 bg-white/50 border border-yellow-100 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200 min-h-[120px] resize-none shadow-sm hover:shadow-md"
                    placeholder="Enter task description"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 text-white font-medium py-3 px-6 rounded-xl hover:from-yellow-500 hover:via-yellow-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] transform disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loader}
                >
                  {loader ? (
                    <Loader className="animate-spin w-5 h-5" />
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Add Task
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Task List */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-yellow-100 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-yellow-500" />
                Task List
              </h2>
              <div className="space-y-4">
                {!taskList || taskList.length === 0 ? (
                  <div className="text-center text-gray-500 py-12">
                    <div className="bg-yellow-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-yellow-500" />
                    </div>
                    <p className="text-lg">No tasks yet</p>
                    <p className="text-sm text-gray-400">
                      Add your first task to get started!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {taskList.map((task) => (
                      <div
                        key={task._id}
                        className="group bg-white/50 hover:bg-white/80 border border-yellow-100 rounded-xl p-4 transition-all duration-300 hover:shadow-md"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors duration-200">
                              {task.title}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              {task.discription}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 ml-4">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                name="isCompleted"
                                onChange={() => checkHandler(task._id)}
                                checked={task.isCompleted}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                            </label>
                            <button
                              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
                              onClick={() => deleteTask(task._id)}
                              title="Delete task"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-yellow-100 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>
                              Created {new Date(task.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <span className={`text-xs px-3 py-1 rounded-full flex items-center gap-1 ${
                            task.isCompleted 
                              ? "bg-green-100 text-green-800" 
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            <CheckCircle className="w-3 h-3" />
                            {task.isCompleted ? "Completed" : "Pending"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
