import { RouterInputs, RouterOutputs, api } from "../utils/api";
import { useEffect, useState } from "react";
import { CreateTweet } from "./CreateTweet";
import Image from "next/image";
import { AiFillHeart } from "react-icons/ai";
import {
	InfiniteData,
	QueryClient,
	useQueryClient,
} from "@tanstack/react-query";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
	relativeTime: {
		future: "in %s",
		past: "%s ago",
		s: "1m",
		m: "1m",
		mm: "%dm",
		h: "1h",
		hh: "%dh",
		d: "1d",
		dd: "%dh",
		M: "1M",
		MM: "%dM",
		y: "1y",
		yy: "%dy",
	},
});

function useScrollPosition() {
	const [scrollPosition, setScrollPosition] = useState(0);

	function handleScroll(){
		const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
		const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
		const scrolled = (winScroll / height) * 100;
		setScrollPosition(scrolled);
	}
	useEffect(() => {
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	})
	return scrollPosition;
}

function Tweet({
	tweet,
}: {
	tweet: RouterOutputs["tweet"]["timeline"]["tweets"][number];
}) {
	return (
		<div className="mb-4 border-b-2 border-gray-500">
			<div className="flex p-2">
				{tweet.author.image && (
					<Image
						src={tweet.author.image}
						alt={`${tweet.author.name} profile picture`}
						width={48}
						height={48}
						className="rounded-full"
					/>
				)}
				<div className="ml-2">
					<div className="flex align-center">
						<p className="font-bold">{tweet.author.name}</p>
						<p className="text-sm text-gray-400">
							{" "}
							- {dayjs(tweet.createdAt).fromNow()}
						</p>
					</div>
					<div>{tweet.text}</div>
				</div>
			</div>
		</div>
	);
}

export function Timeline() {
	const scrollPosition = useScrollPosition();
	const { data, hasNextPage, fetchNextPage, isFetching } =
		api.tweet.timeline.useInfiniteQuery(
			{
				limit: 10,
			},
			{
				getNextPageParam: (lastPage) => lastPage.nextCursor,
			},
		);

	const tweets = data?.pages.flatMap((page) => page.tweets) ?? [];
	useEffect(() => {
		if (scrollPosition > 90 && hasNextPage && !isFetching) {
			fetchNextPage();
		}
	}, [scrollPosition,hasNextPage,isFetching,fetchNextPage]);


	return (
		<div>
			<CreateTweet />
			<div className="border-l-2 border-r-2 border-t-2 border-gray-500">
				{tweets.map((tweet) => {
					return <Tweet key={tweet.id} tweet={tweet} />;
				})}
				{!hasNextPage && <p>No more items to load</p>}
			</div>
		</div>
	);
}
