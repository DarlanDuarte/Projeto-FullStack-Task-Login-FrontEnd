import { useRouter } from "next/router";
import React, { useState } from "react";

const Logout = () => {
  const router = useRouter();

  function handleLogout(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    localStorage.removeItem("@tokenUser");
    router.reload();
  }

  return (
    <div className={`relative`}>
      <div
        className={` absolute top-4 right-8   bg-[#8F43EE] rounded-full text-center leading-8 font-bold
          hover:bg-[#F0EB8D] duration-700 hover:text-black
          `}
      >
        <button
          onClick={(e) => handleLogout(e)}
          className={`w-full h-full px-8 text-center text-md`}
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default Logout;
