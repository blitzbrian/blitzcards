import dynamic from "next/dynamic";

const Check = dynamic(() => import("@/components/icons/Check"));
const Mark = dynamic(() => import("@/components/icons/Mark"));
const Progress = dynamic(
    async () => (await import("@/components/ui/progress")).Progress
);

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/router";
import { useState } from "react";
import Plus from "@/components/icons/Plus";
import Import from "@/components/import";

export default function Multiplechoice() {
    const [list, setList] = useState<string[]>(Array(8).fill(""));
    const [index, setIndex] = useState<number>(0);
    const [started, setStarted] = useState<boolean>(false);
    const [wrong, setWrong] = useState<number>(0);
    const [right, setRight] = useState<number>(0);
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

    const newItem = () => {
        setList([...list, "", ""]);
    };

    const click = (item: string) => {
        if (item === list[index * 2 + 1]) {
            if (!list[(index + 1) * 2]) {
                setRight(total);
                setList(Array(list.length + 2).fill("🎉"));
                setIndex(index + 1);
                router.prefetch("/");
                setTimeout(() => {
                    router.push("/");
                }, 1000);
                return;
            }
            setRight(right + 1);
            setIndex(index + 1);
        } else {
            setWrong(wrong + 1);
            setIndex(index + 1);
            setList([...list, list[index * 2], list[index * 2 + 1]]);
        }
    };

    const getShuffledArr = (arr: any[]) => {
        const newArr = arr.slice();
        for (let i = newArr.length - 1; i > 0; i--) {
            const rand = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
        }
        return newArr;
    };

    const getRandomItems = (array: string[], anwser: string) => {
        const filtered = array.filter(function (_, i) {
            return i % 2 === 1;
        });
        const index = filtered.indexOf(anwser);
        if (index > -1) {
            filtered.splice(index, 1);
        } else {
            console.log("Aah!");
        }
        const shuffled = getShuffledArr(filtered);
        const sliced = shuffled.slice(0, 3);
        return getShuffledArr([...sliced, anwser]);
    };

    return (
        <>
            {started && (
                <div className="flex flex-col items-center justify-center h-[100dvh]">
                    <Progress
                        className="absolute top-5 w-[90%]"
                        value={(right / total) * 100}
                    />
                    <div className="flex space-x-4 absolute bottom-3 right-3">
                        <Mark />
                        <b>{right}</b>
                    </div>
                    <div className="flex space-x-4 absolute bottom-3 right-20">
                        <Check />
                        <b>{wrong}</b>
                    </div>
                    <div className="relative w-96 h-60 rounded-lg border bg-card text-card-foreground shadow-md [overflow-wrap:break-word] flex flex-col items-center px-7 text-center">
                        <h1 className="text-xl w-full mt-3 mb-1">
                            {list[index * 2]}
                        </h1>
                        {getRandomItems(list, list[index * 2 + 1]).map(
                            (item) => (
                                <>
                                    <Button
                                        onClick={() => click(item)}
                                        className="w-full mt-1 bg-zinc-800"
                                        variant="outline"
                                    >
                                        {item}
                                    </Button>
                                </>
                            )
                        )}
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
