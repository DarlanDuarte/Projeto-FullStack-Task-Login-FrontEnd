import Image from "next/image";
import React, { useState, useEffect } from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { motion } from "framer-motion";

const Login = () => {
  const [login, setLogin] = useState<"login" | "cadastro">("cadastro");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msgError, setMsgError] = useState<string | null>(null);

  function ExibirError(msg: string, tempo: number = 5000) {
    setMsgError(msg);
    setTimeout(() => {
      setMsgError(null);
    }, tempo);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
    } catch (e: any) {
      console.log(`Algo deu Errado na Requisição`, e.message);
    }
  }

  return login === "cadastro" ? (
    <div
      className={`w-screen h-screen bg-[#0C134F] flex justify-center items-center`}
    >
      <div
        className={` flex w-8/12 h-3/5 bg-white rounded-lg shadow-3xl
        md:w-11/12
        sm:w-full
      `}
      >
        <div
          className={`flex flex-col w-7/12 h-full bg-[#5C469C] justify-center items-center rounded-lg `}
        >
          <h2 className={`text-white text-4xl font-extrabold mb-4`}>
            Seja Bem Vindo!
          </h2>
          <p className={`text-white text-lg font-bold`}>
            Acesse sua conta agora mesmo.{" "}
          </p>
          <button
            onClick={() =>
              setLogin(login === "cadastro" ? "login" : "cadastro")
            }
            className={`mt-4 w-56 h-10 rounded-3xl bg-[#1D267D] text-lg font-medium text-white
            hover:bg-[#0C134F] duration-500
          `}
          >
            Entrar
          </button>
        </div>
        <div className={`w-full flex flex-col justify-center  `}>
          <h2 className={`text-center  text-4xl font-extrabold`}>
            Crie Sua Conta
          </h2>
          <p className={`text-center font-bold text-lg`}>
            Preencha o formulário
          </p>
          <form action="" onSubmit={(e) => handleSubmit(e)}>
            <div className={` w-full mt-4 flex justify-center items-center `}>
              <label
                htmlFor="nome"
                className="relative w-3/4 shadow-4xl rounded-xl"
              >
                <BiSolidUserCircle
                  size={40}
                  color={`#fff`}
                  className={`absolute left-1  top-1`}
                />
                <input
                  type="text"
                  placeholder={`Digite seu nome`}
                  className={` w-full py-2 pl-[3.2rem] text-2xl font-medium bg-[#0C134F]
                text-white outline-none rounded-xl
              `}
                  id="nome"
                  value={nome}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNome(e.target.value)
                  }
                />
              </label>
            </div>
            <div className={` w-full mt-2 flex justify-center items-center `}>
              <label
                htmlFor="email"
                className="relative w-3/4 shadow-4xl rounded-xl"
              >
                <MdEmail
                  size={40}
                  color={`#fff`}
                  className={`absolute  left-1  top-1`}
                />
                <input
                  type="email"
                  placeholder={`Digite seu email`}
                  className={` w-full py-2 pl-[3.2rem] text-2xl font-medium bg-[#0C134F]
                text-white outline-none rounded-xl
              `}
                  id="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                />
              </label>
            </div>
            <div className={` w-full mt-2 flex justify-center items-center `}>
              <label
                htmlFor="senha"
                className="relative w-3/4 shadow-4xl rounded-xl"
              >
                <RiLock2Fill
                  size={40}
                  color={`#fff`}
                  className={`absolute left-1  top-1`}
                />
                <input
                  type="password"
                  placeholder={`Digite sua senha`}
                  className={` w-full py-2 pl-[3.2rem] text-2xl font-medium bg-[#0C134F]
                text-white outline-none rounded-xl
              `}
                  id="senha"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
              </label>
            </div>

            {msgError ? (
              <div className={`flex flex-col justify-center items-center `}>
                <div
                  className={`w-8/12 mt-2 text-xl font-bold bg-red-500 rounded-xl text-white border-2 border-red-700 text-center `}
                >
                  {msgError}
                </div>
              </div>
            ) : (
              false
            )}
            <div className={`flex justify-center items-center`}>
              <button
                className={`w-4/12 h-12  ${
                  msgError ? "mt-2" : "mt-6"
                } rounded-full text-white font-medium text-xl bg-[#1D267D]
                hover:bg-green-600 duration-700 shadow-4xl
              `}
              >
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <div
      className={`w-screen h-screen bg-[#0C134F] flex justify-center items-center `}
    >
      <div className={` flex w-8/12 h-3/5 bg-white rounded-lg shadow-3xl`}>
        <div
          className={`flex flex-col w-7/12 h-full bg-[#5C469C] justify-center items-center rounded-lg `}
        >
          <h2 className={`text-white text-4xl font-bold mb-4`}>
            Já é Cadastrado?
          </h2>
          <p className={`text-white text-lg font-medium`}>
            Faça seu cadastro agora mesmo.{" "}
          </p>
          <button
            onClick={() => setLogin(login === "login" ? "cadastro" : "login")}
            className={`mt-4 w-56 h-10 rounded-3xl bg-[#1D267D] text-lg font-medium text-white
            hover:bg-[#0C134F] duration-500
          `}
          >
            Cadastrar
          </button>
        </div>
        <div className={`w-full flex flex-col justify-center `}>
          <h2 className={`text-center  text-4xl font-extrabold`}>
            Faça Seu Login
          </h2>
          <p className={`text-center font-bold text-lg`}>
            Preencha o formulário
          </p>
          <form action="">
            <div className={` w-full mt-4 flex justify-center items-center  `}>
              <label
                htmlFor="email"
                className="relative w-3/4 shadow-4xl rounded-xl"
              >
                <MdEmail
                  size={40}
                  color={`#fff`}
                  className={`absolute left-1  top-1`}
                />
                <input
                  type="email"
                  placeholder={`Digite seu email`}
                  className={` w-full py-2 pl-[3.2rem] text-2xl font-medium bg-[#0C134F]
                text-white outline-none rounded-xl
              `}
                  id="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                />
              </label>
            </div>
            <div className={` w-full mt-2 flex justify-center items-center `}>
              <label
                htmlFor="senha"
                className="relative w-3/4 shadow-4xl rounded-xl"
              >
                <RiLock2Fill
                  size={40}
                  color={`#fff`}
                  className={`absolute left-1  top-1`}
                />
                <input
                  type="password"
                  placeholder={`Digite sua senha`}
                  className={` w-full py-2 pl-[3.2rem] text-2xl font-medium bg-[#0C134F]
                text-white outline-none rounded-xl
              `}
                  id="senha"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
              </label>
            </div>

            {msgError ? (
              <div className={`flex flex-col justify-center items-center `}>
                <div
                  className={`w-8/12 mt-2 text-xl font-bold bg-red-500 rounded-xl text-white border-2 border-red-700 text-center `}
                >
                  {msgError}
                </div>
              </div>
            ) : (
              false
            )}

            <div className={`flex justify-center items-center `}>
              <button
                className={`w-4/12 h-12 ${
                  msgError ? "mt-2" : "mt-6"
                } rounded-full text-white font-medium text-xl bg-[#1D267D]
                hover:bg-green-600 duration-700 shadow-4xl
              `}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;