import { Button, ButtonDesign, FCLLayout } from "@ui5/webcomponents-react";
import type { Dispatch, SetStateAction } from "react";

type DashboardToolbarProps = {
    isFullScreen: boolean;
    setLayout: Dispatch<SetStateAction<FCLLayout>>;
    setIsFullScreen: Dispatch<SetStateAction<boolean>>;
};

const DashboardToolbar = ({
    isFullScreen,
    setLayout,
    setIsFullScreen,
}: DashboardToolbarProps) => {
    return (
        <>
            <Button
                icon="decline"
                design={ButtonDesign.Transparent}
                onClick={() => {
                    setLayout(FCLLayout.OneColumn);
                }}
            />

            {isFullScreen ? (
                <Button
                    icon="exit-full-screen"
                    design={ButtonDesign.Transparent}
                    onClick={() => {
                        setIsFullScreen(!isFullScreen);
                        setLayout(FCLLayout.TwoColumnsMidExpanded);
                    }}
                />
            ) : (
                <Button
                    icon="full-screen"
                    design={ButtonDesign.Transparent}
                    onClick={() => {
                        setIsFullScreen(!isFullScreen);
                        setLayout(FCLLayout.MidColumnFullScreen);
                    }}
                />
            )}
        </>
    );
};

export default DashboardToolbar;
