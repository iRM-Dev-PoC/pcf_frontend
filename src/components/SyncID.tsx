import {
    FilterBar,
    Title,
    FilterGroupItem,
    ComboBox,
    ComboBoxItem,
} from "@ui5/webcomponents-react";
import { getAllSyncData } from "../utils/types";


type SyncIDProps = {
    syncIdDataRes: getAllSyncData[] | undefined;
};

const SyncID = ({ syncIdDataRes }: SyncIDProps) => {
    return (
        <div>
            <FilterBar
                filterContainerWidth="12rem"
                header={<Title></Title>}
                filterBarCollapsed
            >
                <FilterGroupItem label="Select Sync ID">
                    <ComboBox valueState="None">
                        {syncIdDataRes?.map((syncData: getAllSyncData) => (
                            <ComboBoxItem
                                key={syncData.ID}
                                text={syncData.SYNC_ID}
                            />
                        ))}
                    </ComboBox>
                </FilterGroupItem>
            </FilterBar>
        </div>
    );
};

export default SyncID;
