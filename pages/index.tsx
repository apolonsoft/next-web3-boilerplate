import { verifyMessage } from "@ethersproject/wallet";
import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Link from "next/link";
import Account from "../components/Account";
import ETHBalance from "../components/ETHBalance";
import useEagerConnect from "../hooks/useEagerConnect";
import usePersonalSign from "../hooks/usePersonalSign";
import useGet0xTokens from "../hooks/useGet0xTokens";
import { useState, useEffect } from "react";

export default function Home() {
  const [tokens,setTokens] = useState([]);

  const { account, library } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  const sign = usePersonalSign();

  const {allTokens} = useGet0xTokens(tokens);

  const handleSign = async () => {
    const msg = "Next Web3 Boilerplate Rules";

    const sig = await sign(msg);

    console.log(sig);

    console.log("isValid", verifyMessage(msg, sig) === account);
  };

  const isConnected = typeof account === "string" && !!library;

  useEffect(() => {
    if(allTokens.length > 0){
      setTokens(allTokens);
    }
  },[])

  return (
    <div>
      <Head>
        <title>Next Web3 Boilerplate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <nav>
          <Link href="/">
            <a>Next Web3 Boilerplate</a>
          </Link>

          <Account triedToEagerConnect={triedToEagerConnect} />
        </nav>
      </header>

      <main>
        <h1>
          Welcome to{" "}
          <a href="https://github.com/mirshko/next-web3-boilerplate">
            Next Web3 Boilerplate
          </a>
        </h1>

        {isConnected && (
          <section>
            <ETHBalance />
            <button onClick={handleSign}>Personal Sign</button>
          </section>
        )}

        {
          tokens.map( token => {
            return <p>
              {token.symbol}
            </p>
          })
        }
      </main>

      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
        }

        main {
          text-align: center;
        }
      `}</style>

      <style jsx global>{`
        body {
          margin: 0;
        }

        html {
          font-family: sans-serif, Apple Color Emoji, Segoe UI Emoji,
            Segoe UI Symbol, Noto Color Emoji;
          line-height: 1.5;
        }

        *,
        *::after,
        *::before {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
