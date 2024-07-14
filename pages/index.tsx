import Image from "next/image";
import { Inter } from "next/font/google";
import AudioCard from "@/components/voice";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col gap-6 items-center justify-between p-24 ${inter.className}`}
    >
      <AudioCard />
      <AudioCard />
      <AudioCard />
    </main>
  );
}
