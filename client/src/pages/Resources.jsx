import React from "react";
import Card from "../components/card.jsx";

const cardData = [
	{
		image:
			"https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg",
		title: "C++ Programming",
		description:
			"Master C++ with hands-on tutorials and examples. Perfect for beginners and advanced programmers.",
		buttonText: "Learn More",
		onButtonClick: () => window.open("https://www.learncpp.com/", "_blank"),
	},
	{
		image: "/images/tuf.png",
		title: "Striver's A2Z DSA Course",
		description:
			"Comprehensive DSA course and sheet by Striver (takeUforward). Perfect for mastering Data Structures & Algorithms.",
		buttonText: "Learn More",
		onButtonClick: () => window.open("https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/", "_blank"),
	},
	{
		image: "https://assets.leetcode.com/static_assets/public/webpack_bundles/images/logo-dark.e99485d9b.svg",
		title: "LeetCode Study Plans",
		description: "Learn DSA topics through curated problem sets and progress tracking.",
		buttonText: "Explore Plans",
		onButtonClick: () => window.open("https://leetcode.com/study-plan/", "_blank"),
	},
	{
		image: "/images/Harvard_CS50x-2.png",
		title: "CS50 by Harvard",
		description: "Learn computer science fundamentals, logic, and problem solving with real-world projects.",
		buttonText: "Start CS50",
		onButtonClick: () => window.open("https://cs50.harvard.edu/x/", "_blank"),
	},
	{
		image: "/images/fccs.png",
		title: "freeCodeCamp",
		description: "Learn DSA, algorithms, and full-stack development with interactive tutorials and hands-on coding challenges.",
		buttonText: "Start Learning",
		onButtonClick: () => window.open("https://www.freecodecamp.org/", "_blank"),
	},
	{
		image: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/gfg_200X200.png",
		title: "GFG Topic Practice",
		description: "Practice problems by difficulty, tag, and topic across DSA.",
		buttonText: "Practice Now",
		onButtonClick: () => window.open("https://practice.geeksforgeeks.org/explore", "_blank"),
	},
	{
		image: "/images/neetcodee.jpg",
		title: "Neetcode DSA Roadmap",
		description: "Master DSA through structured problem lists and easy-to-follow video tutorials.",
		buttonText: "Explore Neetcode",
		onButtonClick: () => window.open("https://neetcode.io/", "_blank"),
	},
	{
		image: "/images/tuf.png",
		title: "takeUforward YouTube Channel",
		description: "DSA, coding interviews, and system design explained by Striver. Video tutorials, live sessions, and more!",
		buttonText: "Watch on YouTube",
		onButtonClick: () => window.open("https://www.youtube.com/@takeUforward", "_blank"),
	},
];

const Resources = () => {
	return (
		<div className="w-full min-h-screen flex flex-col items-center py-10">
			<div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
				{cardData.map((item, idx) => (
					<Card key={idx} {...item} />
				))}
			</div>
		</div>
	);
};

export default Resources;

