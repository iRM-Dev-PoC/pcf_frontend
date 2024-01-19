"use client";

import React from "react";
import Image from "next/image";
import irmLogo from "@/public/irm.png";
import { MenuIcon } from "lucide-react";
import { ShellBar } from "@ui5/webcomponents-react";

const Nav = () => {
	return (
		<>
			<div>
				<button
					className="absolute top-3 left-2 z-[999]"
					onClick={() => {
						console.log("clicked");
					}}>
					<MenuIcon
						size={28}
						strokeWidth={1.5}
						color="#000"
					/>
				</button>
			</div>
			<ShellBar
				className="relative"
				logo={
					<Image
						src={irmLogo}
						alt="company logo"
						sizes="100px"
						height={120}
						width={60}
						priority
					/>
				}></ShellBar>
		</>
	);
};

export default Nav;
