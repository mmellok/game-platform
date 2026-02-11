import React from "react";
import Auth from "@/components/auth/Auth";
import Intro from "@/components/intro/Intro";
import Main from "@/components/main/Main";
import Rating from "@/components/rating/Rating";
import {authContent, introContent, mainContent, ratingContent} from "@/constants/copyright";

export const components = {
	intro: () => <Intro {...introContent}/>,
	auth: () => <Auth {...authContent}/>,
	main: () => <Main {...mainContent}/>,
	rating: () => <Rating {...ratingContent}/>,
}