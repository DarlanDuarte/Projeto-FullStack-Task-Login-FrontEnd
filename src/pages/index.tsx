import Logout from "@/components/Logout/Logout";
import Table from "@/components/Table/Table";
import { NovoContext } from "@/context/CreateContext";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

export interface IDataTasks {
  id: number;
  tasks: string;
}

export default function Home() {
  const [data, setData] = useState<IDataTasks[]>([]);
  const [task, setTask] = useState("");
  const [msg, setMsg] = useState("");

  const router = useRouter();

  const { baseURL } = useContext(NovoContext);

  useEffect(() => {
    const pegandoTasks = async () => {
      try {
        const token = localStorage.getItem("@tokenUser");

        const response = await fetch(`${baseURL}/tasks`, {
          method: "GET",
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

        const dados: IDataTasks[] = await response.json();

        console.log(dados);

        setData(dados);
      } catch (e: any) {
        console.log(`Error ao tentar pegar as Tarefas`, e.message);
      }
    };

    pegandoTasks();
  }, [task]);

  async function handleNewTask(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("@tokenUser");

      const response = await fetch(`${baseURL}/tasks`, {
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
        <div
          className={`bg-[#35155D] w-8/12 h-5/6 p-10 shadow-4xl overflow-auto`}
        >
          <h1 className={`text-center text-5xl mb-6 font-bold`}>
            Lista de Tarefas
          </h1>
          <div className={`flex mb-10 `}>
            <input
              className={`w-[95%] h-10 outline-none text-black font-semibold text-xl  pl-5 rounded-md`}
              type="text"
              id={"task"}
              name={`task`}
              value={task}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTask(e.target.value)
              }
            />
            <button
              className={` ml-2 w-12   text-[1.6rem]  text-center font-bold bg-[#4477CE] rounded-sm 
                hover:bg-green-500
              `}
              onClick={(e) => handleNewTask(e)}
            >
              +
            </button>
          </div>
          <table
            className={` w-full border-collapse border-2 border-slate-200  bg-white text-black text-xl  `}
          >
            <thead>
              <tr className={`h-16`}>
                <th className={`border-2 border-slate-400`}>UserID</th>
                <th className={`border-2 border-slate-400`}>Tarefas</th>
                <th className={`border-2 border-slate-400`}>Ações</th>
              </tr>
            </thead>
            <tbody className={``}>
              {data.map((value, index) => (
                <Table
                  key={value.id}
                  id={value.id}
                  tasks={value.tasks}
                  index={index}
                  setData={setData}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
