import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useState, type Dispatch, type SetStateAction } from "react";

interface Props {
    setList: Dispatch<SetStateAction<string[]>>;
    setImporting: Dispatch<SetStateAction<boolean>>;
}

const Import = ({ setList, setImporting }: Props) => {
    const [text, setText] = useState<string>("");
    const [url, setUrl] = useState<string>("")

    const importFromWeb = async (e: any) => {
        e.preventDefault();
        const urlObj = new URL(url);
        let res;

        if(urlObj.host === 'quizlet.com') {
            res = await fetch('/api/quizlet?url=' + url);
        } else if (urlObj.host === 'studygo.com') {
            res = await fetch('/api/studygo?url=' + url);
        } else {
            alert('Only studygo and quizlet are supported');
            return
        }
        setText(await res.text());
    }

    return (
        <>
            <Textarea
                onChange={(e: any) => setText(e.target.value)}
                value={text}
                className="mt-10 w-5/6 h-4/5 shadow-md resize-none"
            />
            <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                    const list = text.trim().split("\n").join("\t").split("\t");
                    if (list.length % 2 === 0 && list.length >= 8) {
                        setList(list);
                        setImporting(false);
                    } else alert("Invalid input");
                }}
            >
                Import
            </Button>
            <h3 className="text-xl mt-4">Import from quizlet or studygo</h3>
            <form className="flex flex-col w-96" onSubmit={importFromWeb}>
                <Input className="mt-4" onChange={(e) => setUrl(e.target.value)}/>
                <Button className="mt-4" onClick={importFromWeb}>Import</Button>
            </form>
        </>
    );
};

export default Import;
