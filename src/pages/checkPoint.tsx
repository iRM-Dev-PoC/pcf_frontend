import {
	Bar,
	Button,
	ButtonDomRef,
	DynamicPage,
	DynamicPageTitle,
	MessageStrip,
	Modals,
	Title,
} from "@ui5/webcomponents-react";
import { ThemingParameters } from "@ui5/webcomponents-react-base";
import AddCheckPoint from "../components/AddCheckPoint";
import { useRef } from "react";
import CheckPointCreationForm from "../components/CheckPointCreationForm";

const CheckPoint = () => {
	const showDialog = Modals.useShowDialog();
	const closeCheckpointBtnRef = useRef<ButtonDomRef>(null);
	return (
		<DynamicPage
			headerTitle={
				<DynamicPageTitle
					expandedContent={
						<MessageStrip>
							Information (You can see the Report Details here.)
						</MessageStrip>
					}
					header={<Title>Check-Point</Title>}
					actions={
						<Button
							design="Emphasized"
							tooltip="Create"
							icon="create"
							onClick={() => {
								const { close } = showDialog({
									headerText: "Check-Point Information",
									children: (
										<CheckPointCreationForm
											closeButtonref={closeCheckpointBtnRef}
										/>
									),
									footer: (
										<Bar
											endContent={
												<>
													<Button
														ref={closeCheckpointBtnRef}
														onClick={() => {
															close();
														}}
														design="Negative">
														Close
													</Button>
												</>
											}></Bar>
									),
								});
							}}>
							Create
						</Button>
					}
					snappedContent={
						<MessageStrip>
							Information (only visible if header content is collapsed/snapped)
						</MessageStrip>
					}></DynamicPageTitle>
			}
			style={{
				borderRadius: ThemingParameters.sapButton_BorderCornerRadius,
			}}
			showHideHeaderButton={false}
			headerContentPinnable={false}>
			<AddCheckPoint />
		</DynamicPage>
	);
};

export default CheckPoint;
