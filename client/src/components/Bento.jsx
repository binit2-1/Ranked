import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

// Dummy data
const currentUser = { id: 47, name: "You", rank: 47, elo: 1600 };
const leaderboard = [
	{ id: 1, name: "Zoro", rank: 1, elo: 2100 },
	{ id: 2, name: "Luffy", rank: 2, elo: 2050 },
	{ id: 3, name: "Sanji", rank: 3, elo: 2030 },
	{ id: 100, name: "Koby", rank: 100, elo: 1490 },
	currentUser,
];
const recentMatches = Array.from({ length: 20 }).map((_, i) => ({
	opponent: ["Saitama", "Naruto", "Goku", "Ichigo"][i % 4],
	result: i % 2 === 0 ? "W" : "L",
	verdict: ["AC", "WA", "TLE"][i % 3],
	eloChange: i % 2 === 0 ? "+20" : "-15",
}));

export const RevealBento = () => {
	const top3 = leaderboard.slice(0, 3);
	const userInTop3 = top3.some((u) => u.id === currentUser.id);
	let extraEntry = null;
	if (!userInTop3) {
		extraEntry = leaderboard.find((u) => u.id === currentUser.id);
	} else {
		extraEntry = leaderboard.find((u) => u.rank === 100);
	}

	return (
		<div className="min-h-screen bg-[#101010] px-4 py-12 text-zinc-50">
			<motion.div
				initial="initial"
				animate="animate"
				transition={{ staggerChildren: 0.05 }}
				className="mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4"
			>
				<Block className="col-span-12 row-span-2 md:col-span-6" />
				<Block className="col-span-6 bg-[#27272A] md:col-span-3" />
				<Block className="col-span-6 bg-[#27272A] md:col-span-3" />
				<Block className="col-span-12 md:col-span-6" />
				<Block className="col-span-12 md:col-span-6" />
			</motion.div>
		</div>
	);
};

const Block = ({ className, ...rest }) => (
	<motion.div
		variants={{
			initial: { scale: 0.5, y: 50, opacity: 0 },
			animate: { scale: 1, y: 0, opacity: 1 },
		}}
		transition={{ type: "spring", mass: 3, stiffness: 400, damping: 50 }}
		className={twMerge(
			"col-span-4 rounded-lg border border-zinc-700 bg-zinc-800 p-6",
			className
		)}
		{...rest}
	/>
);
