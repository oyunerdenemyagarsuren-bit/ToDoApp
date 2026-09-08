import { useState } from "react";
import { Trash2 } from "lucide-react";

const FILTERS = ["All", "Active", "Completed"];

let nextId = 1;

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [draft, setDraft] = useState("");
  const [filter, setFilter] = useState("All");

  function addTask() {
    const text = draft.trim();
    if (!text) return;
    setTasks((prev) => [...prev, { id: nextId++, text, completed: false }]);
    setDraft("");
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function clearCompleted() {
    setTasks((prev) => prev.filter((t) => !t.completed));
  }

  const visibleTasks = tasks.filter((t) => {
    if (filter === "Active") return !t.completed;
    if (filter === "Completed") return t.completed;
    return true;
  });

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-lg font-semibold text-gray-900 text-center mb-4">
          To-Do list
        </h1>

        <div className="flex gap-2 mb-3">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Add a new task..."
            className="flex-1 min-w-0 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-400"
          />
          <button
            onClick={addTask}
            className="shrink-0 rounded-md bg-blue-600 text-white text-sm font-medium px-4 py-2 hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {visibleTasks.length === 0 ? (
          <p className="text-center text-sm text-gray-400 py-6">
            {tasks.length === 0
              ? "No tasks yet. Add one above!"
              : "Nothing here for this filter."}
          </p>
        ) : (
          <ul className="mb-2">
            {visibleTasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center gap-2 py-2 border-b border-gray-100 last:border-b-0"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="w-4 h-4 shrink-0 accent-blue-600"
                />
                <span
                  className={`flex-1 min-w-0 text-sm truncate ${
                    task.completed ? "line-through text-gray-400" : "text-gray-800"
                  }`}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  aria-label={`Delete ${task.text}`}
                  className="shrink-0 text-xs font-medium text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}

        {tasks.length > 0 && (
          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
            <span>
              {completedCount} of {tasks.length} tasks completed
            </span>
            <button
              onClick={clearCompleted}
              disabled={completedCount === 0}
              className={`font-medium ${
                completedCount === 0
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-red-500 hover:text-red-600"
              }`}
            >
              Clear completed
            </button>
          </div>
        )}

        <p className="text-center text-[11px] text-gray-400 mt-4">
          Powered by{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Pinecone academy
          </a>
        </p>
      </div>
    </div>
  );
}
