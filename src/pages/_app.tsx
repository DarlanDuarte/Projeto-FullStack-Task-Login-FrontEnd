import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading/Loading";
import { useRouter } from "next/router";
import { Provider } from "@/context/CreateContext";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const login = async () => {
      const token = localStorage.getItem("@tokenUser");
      try {
        if (token) {
          router.push("/");
        } else {
          router.push("/login");
        }
      } catch (e: any) {
        console.log(`Error no carregamento!`, e.message);
      }
    };

    login();
  }, []);

  useEffect(() => {
    //Só carregará a pagina quando estiver com setLoading Completo
    function handleCompleteRouter() {
      setLoading(false);
    }

    router.events.on("routeChangeComplete", handleCompleteRouter);

    return () => {
      router.events.off("routeChangeComplete", handleCompleteRouter);
    };
  }, [router]);

  return loading ? (
    <Loading />
  ) : (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}
