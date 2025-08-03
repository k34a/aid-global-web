import React from "react";
import Head from "@/components/recurring-donation/head";
import Questions from "@/components/recurring-donation/questions";
import Coins from "@/components/recurring-donation/coins";
import Managing from "@/components/recurring-donation/managing";
import Supporting from "@/components/recurring-donation/supporting";
import Gamification from "@/components/recurring-donation/gamification";
import Project from "@/components/recurring-donation/project";
import Transactions from "@/components/recurring-donation/transactions";
import Account from "@/components/recurring-donation/Account";
import Payments from "@/components/recurring-donation/payments";
function Onerupeefaq() {
	return (
		<div className="bg-amber-50">
			<Head />
			<Questions />
			<Coins />
			<Managing />
			<Supporting />
			<Gamification />
			<Project />
			<Transactions />
			<Account />
			<Payments />
		</div>
	);
}

export default Onerupeefaq;
