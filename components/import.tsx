import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { useState, type Dispatch, type SetStateAction } from "react";

interface Props {
    setList: Dispatch<SetStateAction<string[]>>;
    setImporting: Dispatch<SetStateAction<boolean>>;
}

const Import = ({ setList, setImporting }: Props) => {
    const [text, setText] = useState<string>("");

    return (
        <>
            <Textarea
                onChange={(e: any) => setText(e.target.value)}
                className="mt-10 w-5/6 h-4/5 shadow-md resize-none"
            />
                <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                        const list = text.trim().split("\n").join("\t").split("\t");
                        if(list.length % 2 === 0 && list.length >= 8) {
                            setList(list);
                            setImporting(false);
                        } else alert('Invalid input');
                    }}
                >
                    Import
                </Button>
        </>
    );
};

export default Import;
