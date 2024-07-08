import { getAllSyncData } from "@/types";
import { Dispatch, SetStateAction } from "react";

type SyncIDProps = {
    syncIdDataRes: getAllSyncData[] | undefined;
    setSelectedSyncID: Dispatch<SetStateAction<string | undefined>>;
};

const SyncID = ({ syncIdDataRes, setSelectedSyncID }: SyncIDProps) => {
    return (
        <div>
            <select
                className="m-2 rounded-sm p-2"
                onChange={(e) => {
                    setSelectedSyncID(e.target.value);
                }}
            >
                <option className="m-2 rounded-sm p-2">Select Sync ID</option>
                {syncIdDataRes?.map((syncData: getAllSyncData) => (
                    <option key={syncData.ID} value={syncData.ID}>
                        {syncData.SYNC_ID}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SyncID;
