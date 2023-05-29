/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

const Home: NextPage = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [returned, setReturned] = useState("");
  const handleSubmit = () => {
    void submit();
  };
  const submit = async () => {
    const res = await fetch(
      "http://fsa-async-await.herokuapp.com/api/workshop/parties",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          name,
          date: new Date().toISOString(),
          time: new Date().toLocaleTimeString("it-IT"),
          location,
          description,
        }),
      }
    );
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      setReturned(`Party ${data.name} created!`);
    } else {
      setReturned("Error");
    }
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Party <span className="text-[hsl(280,100%,70%)]">Logs</span> App
          </h1>
          <div className=" flex h-96 flex-col justify-around">
            <input
              className="input h-16 w-80 p-4"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="input input h-16 w-80 p-4"
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <input
              className="input input h-16 w-80 p-4"
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              className="btn input h-16 w-80 bg-white p-4 text-black"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <h3 className="text-2xl font-extrabold tracking-tight text-white sm:text-[2rem]">
              {" "}
              {returned}
            </h3>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
