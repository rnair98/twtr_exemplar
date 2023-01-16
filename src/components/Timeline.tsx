import { RouterOutputs, api } from "../utils/api";
import { CreateTweet } from "./CreateTweet";
import Image from "next/image";

function Tweet({tweet}:{tweet: RouterOutputs["tweet"]["timeline"]["tweets"][number];}) {

    return (
        <div>
            <div>
                {tweet.author.image && (
                    <Image 
                        src={tweet.author.image}
                        alt={`${tweet.author.name} profile picture`}
                        width={48}
                        height={48}
                        className="rounded-full"
                    />
                )}
            </div>
        </div>
    )

}


export function Timeline() {
    const {data} = api.tweet.timeline.useQuery({ limit: 4, });

    return (
        <div>
            <CreateTweet />
            {JSON.stringify(data)}
            {data?.tweets.map((tweet) => {
                return <Tweet key={tweet.id} tweet={tweet} />;
            })}
        </div>
    )
}
