import Logout from "@/components/Logout/Logout";
import Table from "@/components/Table/Table";
import React, { useEffect, useState } from "react";

interface IDataTasks {
  id: number;
  tasks: string;
}

export default function Home() {
  const [data, setData] = useState<IDataTasks[]>([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    const pegandoTasks = async () => {
      try {
        const token = localStorage.getItem("@tokenUser");

        const response = await fetch(`http://localhost:8080/tasks`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const error = await response.json();
          console.log(error);
          return;
        }

        const dados: IDataTasks[] = await response.json();

        console.log(dados);

        setData(dados);
      } catch (e: any) {
        console.log(`Error ao tentar pegar as Tarefas`, e.message);
      }
    };

    pegandoTasks();
  }, []);

  async function handleNewTask() {
    try {
      const token = localStorage.getItem("@tokenUser");

      const response = await fetch(`http://localhost:8080/tasks`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: task }),
      });

      console.log(response);

      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        return;
      }

      const resp = await response.json();
      console.log(resp);
      setTask("");
    } catch (e: any) {
      console.log(`Error ao tentar Criar tarefa`, e.message);
    }
  }

  return (
    <main className={`bg-[#4477CE] w-screen h-screen `}>
      <Logout />
      <div
        className={`flex flex-col justify-center items-center w-screen h-screen`}
      >
        <div className={`bg-[#35155D] w-8/12 h-1/2 p-10`}>
          <div className={`flex mb-20 h-10`}>
            <input
              className={`w-[95%] h-10 outline-none text-black font-semibold text-xl  pl-5`}
              type="text"
              id={"task"}
              name={`task`}
              value={task}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTask(e.target.value)
              }
            />
            <button
              className={` ml-2 w-12 h-10 text-2xl  text-center font-bold bg-[#4477CE]`}
              onClick={() => handleNewTask()}
            >
              +
            </button>
          </div>
          <table
            className={` w-full border-collapse border-2 border-slate-200 bg-white text-black text-xl shadow-3xl shadow-gray-600`}
          >
            <thead>
              <tr className={``}>
                <th className={`border-2 border-slate-400`}>UserID</th>
                <th className={`border-2 border-slate-400`}>Tarefas</th>
                <th className={`border-2 border-slate-400`}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {data.map((value, index) => (
                <Table key={index} id={value.id} tasks={value.tasks} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
