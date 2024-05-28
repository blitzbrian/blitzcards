import dynamic from "next/dynamic";

const Check = dynamic(() => import("@/components/icons/Check"));
const Mark = dynamic(() => import("@/components/icons/Mark"));
const Progress = dynamic(
    async () => (await import("@/components/ui/progress")).Progress
);
const Import = dynamic(() => import("@/components/import"));

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Plus from "@/components/icons/Plus";

export default function Flashcards() {
    const [list, setList] = useState<string[]>(Array(8).fill(""));
    const [state, setState] = useState<string>("normal");
    const [index, setIndex] = useState<number>(0);
    const [started, setStarted] = useState<boolean>(false);
    const [numWrong, setWrong] = useState<number>(0);
    const [numRight, setRight] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [importing, setImporting] = useState<boolean>(false);

    const router = useRouter();

    const start = () => {
        if (list.indexOf("") !== -1) {
            alert("Fill in everything");
            return;
        }
        setTotal(list.length / 2);
        setStarted(true);
    };

    const right = (e: any) => {
        if (state === "normal") return;
        e.stopPropagation();
        if (!list[(index + 1) * 2]) {
            setRight(total);
            setList([...list, "🎉", "🎉"]);
            setIndex(index + 1);
            router.prefetch("/");
            setTimeout(() => {
                router.push("/");
            }, 1000);
            return;
        }
        setState("gotonormal");
        setTimeout(() => {
            setState("normal");
            setIndex(index + 1);
        }, 250);
        setRight(numRight + 1);
    };

    const wrong = (e: any) => {
        if (state === "normal") return;
        e.stopPropagation();
        console.log(list[index * 2 + 1], list[index * 2]);
        setList([...list, list[index * 2], list[index * 2 + 1]]);
        setState("gotonormal");
        setTimeout(() => {
            setState("normal");
            setIndex(index + 1);
        }, 250);
        setWrong(numWrong + 1);
    };

    const flip = () => {
        if (state === "normal") {
            setState("gotoflipped");
            setTimeout(() => {
                setState("flipped");
            }, 250);
        } else if (state === "flipped") {
            setState("gotonormal");
            setTimeout(() => {
                setState("normal");
            }, 250);
        }
    };

    const newItem = () => {
        setList([...list, "", ""]);
    };

    return (
        <>
            {started && (
                <div className="flex flex-col items-center justify-center h-[100dvh]">
                    <Progress
                        className="absolute top-5 w-[90%]"
                        value={(numRight / total) * 100}
                    />
                    <div className="flex space-x-4 absolute bottom-3 right-3">
                        <Mark />
                        <b>{numRight}</b>
                    </div>
                    <div className="flex space-x-4 absolute bottom-3 right-20">
                        <Check />
                        <b>{numWrong}</b>
                    </div>
                    <div
                        className="transition-all duration-500 w-96 h-60 rounded-lg border text-card-foreground shadow-md [transform-style:preserve-3d] [overflow-wrap:break-word] bg-zinc-900"
                        style={{
                            transform: (() => {
                                if (state === "normal") return "rotateY(0deg)";
                                if (state === "flipped")
                                    return "rotateY(180deg)";
                                else return "rotateY(90deg)";
                            })(),
                        }}
                        onClick={flip}
                    >
                        <div
                            className="m-0 p-0 transition-none w-full h-full relative flex items-center justify-center text-center"
                            style={{
                                transform:
                                    state === "flipped" ||
                                    state === "gotonormal"
                                        ? "rotateY(180deg)"
                                        : "",
                            }}
                        >
                            {(state === "normal" ||
                                state === "gotoflipped") && (
                                <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%]">
                                    {list[index * 2].trim()}
                                </h1>
                            )}
                            {(state === "flipped" ||
                                state === "gotonormal") && (
                                <>
                                    <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%]">
                                        {list[index * 2 + 1].trim()}
                                    </h1>
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="absolute bottom-3 right-3 rounded-3xl"
                                        onClick={right}
                                        style={{
                                            opacity:
                                                state === "flipped" ||
                                                state === "gotonormal"
                                                    ? 1
                                                    : 0,
                                        }}
                                    >
                                        <Mark />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="absolute bottom-3 right-14 rounded-3xl"
                                        onClick={wrong}
                                        style={{
                                            opacity:
                                                state === "flipped" ||
                                                state === "gotonormal"
                                                    ? 1
                                                    : 0,
                                        }}
                                    >
                                        <Check />
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {!started && (
                <div className="flex flex-col items-center h-[100dvh]">
                    {!importing && (
                        <>
                            <div className="w-full text-center mt-10">
                                {list.map((_, i) => (
                                    <>
                                        <Input
                                            className="mt-4 mx-7 w-[40%] inline"
                                            value={list[i]}
                                            onChange={(e) => {
                                                setList(
                                                    list.map((text, j) => {
                                                        if (i === j)
                                                            return e.target
                                                                .value;
                                                        return text;
                                                    })
                                                );
                                            }}
                                        ></Input>
                                    </>
                                ))}
                            </div>
                            <Button
                                size="icon"
                                variant="outline"
                                className="mt-4 rounded-3xl"
                                onClick={newItem}
                            >
                                <Plus />
                            </Button>
                            <Button
                                variant="outline"
                                className="mt-4"
                                onClick={start}
                            >
                                Start
                            </Button>
                            <Button
                                variant="outline"
                                className="mt-4"
                                onClick={() => {
                                    setImporting(true);
                                }}
                            >
                                Import
                            </Button>
                        </>
                    )}

                    {importing && (
                        <Import setList={setList} setImporting={setImporting} />
                    )}
                </div>
            )}
        </>
    );
}
