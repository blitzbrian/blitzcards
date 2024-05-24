import Check from "@/components/icons/Check";
import Mark from "@/components/icons/Mark";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Learn() {
    const [list, setList] = useState<string[]>([]);
    const [flipped, setFlipped] = useState<boolean>(false);
    const [index, setIndex] = useState<number>(0);
    const [started, setStarted] = useState<boolean>(false);
    const [numWrong, setWrong] = useState<number>(0);
    const [numRight, setRight] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const router = useRouter();

    const start = () => {
        setTotal(list.length / 2);
        setStarted(true);
    };

    const right = (e: any) => {
        if (!flipped) return;
        e.stopPropagation();
        if (!list[(index + 1) * 2]) {
            setRight(total);
            setTimeout(() => {
                router.push("/");
            }, 150);
            return;
        }
        setFlipped(false);
        setIndex(index + 1);
        setRight(numRight + 1);
    };

    const wrong = (e: any) => {
        if (!flipped) return;
        e.stopPropagation();
        console.log(list[index * 2 + 1], list[index * 2]);
        setList([...list, list[index * 2], list[index * 2 + 1]]);
        setFlipped(false);
        setIndex(index + 1);
        setWrong(numWrong + 1);
    };

    return (
        <div className="flex flex-col items-center justify-center h-[100dvh]">
            {started && (
                <>
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
                        className="transition-all duration-500 w-96 h-60 rounded-lg border bg-card text-card-foreground shadow-md [transform-style:preserve-3d] [overflow-wrap:break-word]"
                        style={{ transform: flipped ? "rotateY(180deg)" : "" }}
                        onClick={() => setFlipped(!flipped)}
                    >
                        <div
                            className="m-0 p-0 transition-none w-full h-full relative flex items-center justify-center text-center"
                            style={{
                                transform: flipped ? "rotateY(180deg)" : "",
                            }}
                        >
                            <h1
                                className="transition-all duration-500 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%]"
                                style={{ opacity: flipped ? 1 : 0 }}
                            >
                                {list[index * 2 + 1]}
                            </h1>
                            <h1
                                className="transition-all duration-500 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%]"
                                style={{ opacity: flipped ? 0 : 1 }}
                            >
                                {list[index * 2]}
                            </h1>
                            <Button
                                // alt="wrong"
                                size="icon"
                                variant="outline"
                                className="absolute bottom-3 right-3 rounded-3xl transition-all duration-400"
                                onClick={right}
                                style={{ opacity: flipped ? 1 : 0 }}
                            >
                                <Mark />
                            </Button>
                            <Button
                                // alt="right"
                                size="icon"
                                variant="outline"
                                className="absolute bottom-3 right-14 rounded-3xl transition-all duration-400"
                                onClick={wrong}
                                style={{ opacity: flipped ? 1 : 0 }}
                            >
                                <Check />
                            </Button>
                        </div>
                    </div>
                </>
            )}
            {!started && (
                <>
                    <Textarea
                        onChange={(e: any) =>
                            setList(
                                e.target.value
                                    .split("\n")
                                    .join("\t")
                                    .split("\t")
                            )
                        }
                        className="w-5/6 h-4/5 shadow-md resize-none"
                    ></Textarea>
                    <Button className="mt-4" variant="outline" onClick={start}>
                        Start
                    </Button>
                </>
            )}
        </div>
    );
}

// 350px x 200px border shadow, with translucent black border
