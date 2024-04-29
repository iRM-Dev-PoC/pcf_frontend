import { BusyIndicator } from "@ui5/webcomponents-react";

const Loading = () => {
    return (
        <div className="absolute left-1/2 top-1/2 z-[99999999999999999]">
            <BusyIndicator active />
        </div>
    );
};

export default Loading;
