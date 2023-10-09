import { useRouter } from "next/router";
import React, { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { PiTrashFill } from "react-icons/pi";

interface ITable {
  id: number;
  tasks: string;
  index: number;
}

const Table: React.FC<ITable> = ({ id, tasks, index }) => {
  const [editando, setEditando] = useState(false);
  const [task, setTask] = useState(tasks);

  const router = useRouter();
  const par: boolean = index % 2 === 0;

  async function DeletandoTask(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    try {
      const token = localStorage.getItem("@tokenUser");

      const response = await fetch(`http://localhost:8080/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        return;
      }

      const data = await response.json();
      console.log(data);
      router.reload();
    } catch (e: any) {
      console.log(`Error na tentativa de delete`, e.message);
    }
  }

  async function handleEditTask() {
    setEditando(!editando);
  }

  async function handleUpdateTask() {
    try {
      const token = localStorage.getItem("@tokenUser");

      const response = await fetch(`http://localhost:8080/tasks/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tasks: task }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        return;
      }

      const data = await response.json();
      handleEditTask();
      router.reload();
      console.log(data);
    } catch (e: any) {
      console.log(`Error Na tentativa de edição!`);
    }
  }

  return (
    <tr
      className={` ${
        par ? "bg-slate-200" : "bg-white"
      }   border-2 border-slate-400 h-16`}
    >
      <td className={` border-2`}> {id} </td>
      <td className={` border-2`}>
        {editando ? (
          <input
            type="text"
            name="editTask"
            value={task}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTask(e.target.value)
            }
            className={`border-2 border-black py-1 px-4`}
          />
        ) : (
          tasks
        )}
      </td>
      <td className={` border-2`}>
        <button onClick={editando ? handleUpdateTask : handleEditTask}>
          {editando ? (
            <MdModeEdit
              size={30}
              className={`bg-green-500  rounded-sm`}
              color={"white"}
            />
          ) : (
            <MdModeEdit
              size={30}
              className={`bg-[#FF9B50]  rounded-sm`}
              color={"white"}
            />
          )}
        </button>
        <button onClick={(e) => DeletandoTask(e)}>
          <PiTrashFill
            size={30}
            className={`ml-2 bg-red-600 rounded-sm`}
            color={"white"}
          />
        </button>
      </td>
    </tr>
  );
};

export default Table;
