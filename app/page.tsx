"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
// import Image from "next/image";
import Reloader from "@/app/components/reloader";
import Header from "@/app/components/header";

interface Track {
  id: number;
  name: string;
  cover: string;
  artist: string;
  // Add other properties as needed
}

export default function Home() {
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    axios.get("https://backend.radiofront.hackhub.cc/tracks").then((response) => {
      setTracks(response.data);
    });
  }, []);

  if (!tracks.length) {
    return <Reloader />;
  }

  return (
    <>
      <Header />
      <section className="bg-white dark:bg-gray-900">
        <div className="container flex flex-col px-6 py-4 mx-auto space-y-6 h-max">
          {/* <h1 className="pt-6 w-48 h-2 mx-auto text-3xl font-semibold text-gray-800 dark:text-white lg:text-2xl mb-2.5 pb-5">
            Live
          </h1> */}
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
            {tracks.map((track) => (
              <div className="w-full" key={track.id}>
                <Link href={`/stream/${track.id}`}>
                  {/* <div className="w-full "> */}
                  <img
                    src={track.cover}
                    className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"
                  />
                  <h1 className="text-2xl font-semibold text-gray-800 dark:text-white lg:text-1xl mb-2.5">
                    {track.name}
                  </h1>
                  <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700">{track.artist}</p>
                  {/* </div> */}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* </div> */}
    </>
  );
}
