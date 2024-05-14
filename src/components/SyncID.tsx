import { Dispatch, SetStateAction } from "react";
import { getAllSyncData } from "../utils/types";

type SyncIDProps = {
    syncIdDataRes: getAllSyncData[] | undefined;
    setSelectedSyncID: Dispatch<SetStateAction<string | undefined>>;
};

const SyncID = ({ syncIdDataRes, setSelectedSyncID }: SyncIDProps) => {
    return (
        <div>
                <select
                    onChange={(e) => {
                        setSelectedSyncID(e.target.value);
                    }}
                >
                    <option value="">Select Sync ID</option>
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



