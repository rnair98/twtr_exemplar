import { useState } from "react";
import { object, string } from "zod";
import { api } from "../utils/api"



export const tweetSchema = object({
    text: string({
        required_error: "Tweet text is required",
    })
        .min(10)
        .max(10)
})


export function CreateTweet(){
    const [ text, setText ] = useState('');
    const [ error, setError ] = useState('');
    
    const {mutateAsync} = api.tweet.create.useMutation();
    
    async function handleSubmit(e){
        e.preventDefault();

        try {
            await tweetSchema.parse({text});
        } catch (error) {
            setError(e.message);
            return;
        }
        mutateAsync({ text })
    }

    return(
        <>
        {error && JSON.stringify(error)}
        <form onSubmit={handleSubmit}>
            <textarea onChange={() => setText(e.target.value)}>
                <div>
                    <button type="submit">Tweet</button>
                </div>
            </textarea>
        </form>
        </>
    )
}