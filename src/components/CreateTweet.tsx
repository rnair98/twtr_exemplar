import { useState } from "react";
import { object, string } from "zod";
import { api } from "../utils/api"



export const tweetSchema = object({
    text: string({
        required_error: "Tweet text is required",
    })
        .min(10)
        .max(280),
})


export function CreateTweet(){
    const [ text, setText ] = useState('');
    const [ error, setError ] = useState('');

    const utils = api.useContext();

    const { mutateAsync } = api.tweet.create.useMutation({
        onSuccess: () => {
            setText('');
            utils.tweet.timeline.invalidate();
        }
    });


    function handleSubmit(e: { preventDefault: () => void; }){
        e.preventDefault();

        try {
            tweetSchema.parse({ text });
        } catch (e) {
            setError(e.message);
            return;
        }
        mutateAsync({ text });
    }

    return(
        <>
        {error && JSON.stringify(error)}
        <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col
            border-2 rounded-md p-4"
        >
            <textarea
                onChange={(e) => setText(e.target.value)}
                className="shadow p4 w-full"
            />
            <div className="mt-4 flex justify-end">
                <button
                    type="submit"
                    className="bg-slate-500 text-white px-4 py-2 rounded-md"
                >
                    Tweet
                </button>
            </div>
        </form>
        </>
    )
}
