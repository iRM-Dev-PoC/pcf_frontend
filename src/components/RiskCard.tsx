import { Card, CardHeader, Icon } from "@ui5/webcomponents-react";
import { createUseStyles } from "react-jss";
import { ThemingParameters } from "@ui5/webcomponents-react-base";

type RiskCardProps = {
	header: string;
	icon: string;
	risk: string;
	desciption: string;
};

const styles = {
	container: {
		fontFamily: ThemingParameters.sapFontFamily,
	},
};

const useStyles = createUseStyles(styles);

const getRiskColor = (risk: number): string => {
	if (risk >= 0 && risk <= 30) {
		return "bg-green-500";
	} else if (risk > 30 && risk <= 70) {
		return "bg-yellow-500";
	} else if (risk > 70 && risk <= 100) {
		return "bg-red-500";
	}
	return "";
};

const RiskCard = ({ header, icon, risk, desciption }: RiskCardProps) => {
	const classes = useStyles();
	return (
		<Card
			className={`hover:shadow-xl transition-all rounded-[0.5rem] cursor-pointer ${classes.container}`}
			header={
				<CardHeader
					avatar={<Icon name={icon} />}
					titleText={header}
				/>
			}
			style={{
				width: "30rem",
				padding: "0",
				position: "relative",
				borderRadius: "0.5rem",
				marginInline: "1.12rem",
				marginBlock: "1rem",
			}}>
			<span
				className={`rounded-md font-bold absolute text-white p-[8px] top-5 right-9 ${getRiskColor(
					Number(risk)
				)}`}>
				Risk : {risk}
			</span>

			<div className="p-3 text-center">
				<p className="">{desciption}</p>
			</div>
		</Card>
	);
};

export default RiskCard;
