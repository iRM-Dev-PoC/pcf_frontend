"use client";

import React, { useState } from "react";
import Image from "next/image";
import irmLogo from "@/public/irm.png";
import { MenuIcon, X } from "lucide-react";
import { ShellBar } from "@ui5/webcomponents-react";
import SideNav from "./SideNav";

const Nav = () => {
	const [showSideNav, setShowSideNav] = useState(true);

	const handleMenuClick = () => {
		setShowSideNav(!showSideNav);
	};

	return (
		<>
			<div className="border border-gray-350 m-3 rounded-lg overflow-hidden">
				<div>
					<button
						className="absolute top-6 left-4 z-[999] transition-all duration-400 ease-in"
						onClick={() => {
							handleMenuClick();
						}}>
						{showSideNav ? (
							<MenuIcon
								size={32}
								strokeWidth={1.5}
								color="#000"
								className="bg-transparent hover:bg-gray-200 transition-all duration-400 ease-in rounded-md md:ml-4"
							/>
						) : (
							<X
								size={32}
								strokeWidth={1.5}
								color="#000"
								className="bg-transparent hover:bg-gray-200 transition-all duration-400 ease-in rounded-md md:ml-4"
							/>
						)}
					</button>
				</div>
				<ShellBar
					className="sticky top-0"
					logo={
						<Image
							src={irmLogo}
							alt="company logo"
							sizes="300px"
							height={120}
							width={80}
							priority
							className="h-auto w-auto md:w-24 md:h-24"
						/>
					}></ShellBar>
			</div>
			<SideNav showSideNav={showSideNav} />
		</>
	);
};

export default Nav;
