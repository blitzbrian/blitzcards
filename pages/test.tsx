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
import { type FormEvent, useState } from "react";
import Plus from "@/components/icons/Plus";

interface PopupData {
    showing: boolean;
    correct: boolean;
    answer: string;
}

export default function Test() {
    const [list, setList] = useState<string[]>(Array(8).fill(""));
    const [index, setIndex] = useState<number>(0);
    const [started, setStarted] = useState<boolean>(false);
    const [wrong, setWrong] = useState<number>(0);
    const [right, setRight] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [value, setValue] = useState<string>("");
    const [importing, setImporting] = useState<boolean>(false);
    const [popupData, setPopupData] = useState<PopupData>({
        showing: false,
        correct: true,
        answer: "",
    });

    const router = useRouter();

    const start = () => {
        if (list.indexOf("") !== -1) {
            alert("Fill in everything");
            return;
        }
        setTotal(list.length / 2);
        setStarted(true);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        const correct = value.trim() === list[index * 2 + 1].trim();
        if (correct) {
            if (!list[(index + 1) * 2]) {
                setRight(total);
                router.push("/");
                return;
            }
            setRight(right + 1);
        } else {
            setWrong(wrong + 1);
            setList([...list, list[index * 2], list[index * 2 + 1]]);
        }
        setPopupData({
            showing: true,
            correct,
            answer: list[index * 2 + 1].trim(),
        });
        setTimeout(() => {
            setPopupData({
                showing: false,
                correct,
                answer: list[index * 2 + 1].trim(),
            });
            setIndex(index + 1);
            setValue("");
        }, 2000);
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
                    <form
                        onSubmit={submit}
                        className="relative flex flex-col items-center w-[30rem] h-60 rounded-lg border bg-card text-card-foreground shadow-md [overflow-wrap:break-word] p-5 bg-zinc-900"
                    >
                        <p className="text-xl w-full ml-3">{list[index * 2]}</p>
                        <Input
                            className="w-full bg-zinc-800 mt-auto mb-3"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        ></Input>
                        <div className="flex w-full">
                            <Button className="ml-auto mb-0">Submit</Button>
                        </div>
                        <div
                            className="transition-all duration-200 flex absolute w-[30rem] bottom-0 left-0 rounded-lg bg-zinc-800 items-center overflow-hidden"
                            style={{
                                height: popupData.showing ? "8rem" : "0",
                            }}
                        >
                            <>
                                {popupData.correct ? (
                                    <Mark className="ml-8 size-16 my-auto" />
                                ) : (
                                    <Check className="ml-8 size-16 my-auto" />
                                )}
                                <h3 className="ml-6 text-md">
                                    {popupData.answer}
                                </h3>
                            </>
                        </div>
                    </form>
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
