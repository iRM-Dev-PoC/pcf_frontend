import { useEffect, useState } from "react";
// import "../css/error.module.css";

const ErrorPage = () => {
	const [digits, setDigits] = useState([0, 0, 0]);

	useEffect(() => {
		const updateDigits = () => {
			const newDigits = [randomNum(), randomNum(), randomNum()];
			setDigits(newDigits);

			if (newDigits[0] === 5 && newDigits[1] === 0 && newDigits[2] === 0) {
				clearInterval(loop);
			}
		};

		const randomNum = () => {
			return Math.floor(Math.random() * 9) + 1;
		};

		const loop = setInterval(updateDigits, 30);

		return () => {
			clearInterval(loop);
		};
	}, []);

	return (
		<>
			<div className="error">
				<div className="container-floud">
					<div className="col-xs-12 ground-color text-center">
						<div className="container-error-404">
							<div className="clip">
								<div className="shadow">
									<span className="digit thirdDigit">{digits[2]}</span>
								</div>
							</div>
							<div className="clip">
								<div className="shadow">
									<span className="digit secondDigit">{digits[1]}</span>
								</div>
							</div>
							<div className="clip">
								<div className="shadow">
									<span className="digit firstDigit">{digits[0]}</span>
								</div>
							</div>
							<div className="msg">
								OH!<span className="triangle"></span>
							</div>
						</div>
						<h2 className="h1">Oops! Something went wrong</h2>
					</div>
				</div>
			</div>
		</>
	);
};

export default ErrorPage;
