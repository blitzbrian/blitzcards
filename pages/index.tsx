import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {

    return (
        <>
            <main
                className={cn(
                    "flex flex-col items-center justify-center h-[100dvh] px-4 md:px-6 min-h-screen bg-background font-sans antialiased",
                    inter.variable
                )}
            >
                <div className="max-w-4xl text-center space-y-4">
                    <h1 className="text-5xl md:text-7xl xl:text-9xl font-bold tracking-tight text-gray-900 dark:text-gray-50 mb-10">
                        blitzcards
                    </h1>
                    <p className="text-xl md:text-2xl xl:text-3xl text-gray-600 dark:text-gray-400">
                        The best way to learn words and short sentences. Boost
                        your memory and master new languages effortlessly!
                    </p>
                    <Link href="/learn">
                        <Button className="mt-4">Get Started</Button>
                    </Link>
                </div>
            </main>
        </>
    );
}