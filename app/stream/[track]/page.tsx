"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Reloader from "@/app/components/reloader";
import Link from "next/link";
import Header from "@/app/components/header";

interface Track {
  id: string;
  name: string;
  cover: string;
  source: string;
  url: string;
  artist: string;
  // Add other properties as needed
}

export default function TrackPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Get the 'id' from the query string
  console.log("The Id is", id);

  const [track, setTrack] = useState<Track | null>(null); // Specify the type as Track or null

  useEffect(() => {
    const fetchTrack = async () => {
      const response = await axios.get(`http://localhost:3000/tracks/${id}`);
      setTrack(response.data);
    };

    fetchTrack();
  }, [id]);

  if (!track) {
    return <Reloader />;
  }

  return (
    <>
      <Header />
      <section className="bg-white dark:bg-gray-900">
        <div className="container flex flex-col px-6 py-4 mx-auto space-y-6 h-screen">
          {/* <div className="grid xl:mt-12 xl:grid-cols-4">
          <div className="w-full">
            <img
              src={track.cover}
              alt={track.name}
              className="w-full max-h-full bg-gray-300 rounded-lg dark:bg-gray-600"
            />

            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white lg:text-1xl mb-2.5">
              {track.name}
            </h1>
            <audio controls autoPlay>
              <source src={track.source} />
            </audio>
          </div>
        </div> */}
          <section className="bg-white dark:bg-gray-900">
            <div className="container flex flex-col items-center px-4 py-12 mx-auto xl:flex-row">
              <div className="flex justify-center xl:w-1/2 pt-40">
                <img
                  className="h-80 w-80 sm:w-[28rem] sm:h-[28rem] flex-shrink-0 object-cover rounded-full"
                  src={track.cover}
                  alt={track.name}
                />
              </div>
              <div className="flex flex-col items-center mt-6 xl:items-start xl:w-1/2 xl:mt-0">
                <h2 className="text-2xl font-semibold tracking-tight text-gray-800 xl:text-3xl dark:text-white pb-2.5">
                  {track.name}
                </h2>
                <h2 className="text-1xl font-bold tracking-tight text-gray-800 xl:text-1xl dark:text-white pb-10">
                  {track.artist}
                </h2>
                <audio controls autoPlay>
                  <source src={track.source} />
                </audio>
                <div className="mt-6 sm:-mx-2">
                  <a
                    href={track.url}
                    target="_blank"
                    className="inline-flex items-center justify-center w-full px-4 text-sm py-2.5 overflow-hidden text-blue-500 border border-blue-500 rounded-lg md:mt-0 md:w-auto md:mx-2 dark:border-blue-400 dark:text-blue-400 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                      />
                    </svg>

                    <span className="mx-2">Open Website</span>
                  </a>
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center w-full px-4 text-sm py-2.5 mt-4 overflow-hidden text-white transition-colors duration-300 bg-blue-600 rounded-lg shadow sm:w-auto sm:mx-2 sm:mt-0 hover:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>

                    <span className="mx-2">Back to Homepage</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
