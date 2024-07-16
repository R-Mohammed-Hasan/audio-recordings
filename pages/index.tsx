import Image from "next/image";
import { Inter } from "next/font/google";
import AudioCard from "@/components/voice";

const inter = Inter({ subsets: ["latin"] });

const audioFiles = [
  { url: "/audio.mp3", id: "audio1" },
  { url: "/audio.mp3", id: "audio2" },
  { url: "/audio.mp3", id: "audio3" },
];

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col gap-6 items-center justify-between p-24 ${inter.className}`}
    >
      {audioFiles.map((audio) => (
        <AudioCard key={audio.id} audioUrl={audio.url} id={audio.id} />
      ))}
    </main>
  );
}
