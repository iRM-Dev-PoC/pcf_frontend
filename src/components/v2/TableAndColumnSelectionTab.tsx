import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TabsContent } from "@/components/ui/tabs";
import { Clipboard } from "lucide-react";

type TableAndColumnSelectionTabProps = {
    tabType: string;
    tableValue: string;
    columnValue: string;
    query: string;
    setQuery: (value: string | ((prevQuery: string) => string)) => void;
    onTableChange: (value: string) => void;
    onColumnChange: (value: string) => void;
    tableSelectOptions: {
        label: string;
        value: string;
    }[];
    columnSelectOptions: {
        label: string;
        value: string;
    }[];
};

const TableAndColumnSelectionTab = ({
    tabType,
    tableValue,
    query,
    setQuery,
    columnValue,
    onTableChange,
    onColumnChange,
    tableSelectOptions,
    columnSelectOptions,
}: TableAndColumnSelectionTabProps) => {
    const handleQueryChange = () => {
        setQuery(`SELECT ${tableValue}.${columnValue}`);
    };

    const handleAddNewRow = () => {
        if (tableValue && columnValue) {
            setQuery(`SELECT ${tableValue}.${columnValue}, `);
            onTableChange("");
            onColumnChange("");
        }
    };

    return (
        <TabsContent value={tabType}>
            <Card>
                <CardHeader>
                    <CardTitle>Select</CardTitle>
                    <CardDescription className="flex justify-between">
                        <div>
                            Make changes to your account here. Click save when
                            you're done.
                        </div>
                        <div>
                            <Button variant="default" onClick={handleAddNewRow}>
                                Add column
                            </Button>
                        </div>
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="grid grid-cols-2 space-x-2">
                        <div className="space-x-1">
                            <Label htmlFor="table">Select a table</Label>
                            <Combobox
                                options={tableSelectOptions}
                                value={tableValue}
                                onChange={onTableChange}
                            />
                        </div>
                        <div className="space-x-1">
                            <Label htmlFor="column">Select a column</Label>
                            <Combobox
                                options={columnSelectOptions}
                                value={columnValue}
                                onChange={onColumnChange}
                            />
                        </div>
                    </div>
                    <div>
                        <ScrollArea className="relative h-[200px] w-full rounded-md border p-4">
                            <span className="absolute right-2 top-2">
                                <Button variant="ghost">
                                    <Clipboard className="m-0 size-4" />
                                </Button>
                            </span>
                            {query}
                        </ScrollArea>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                    <Button variant="default" onClick={handleQueryChange}>
                        Save
                    </Button>
                </CardFooter>
            </Card>
        </TabsContent>
    );
};

export default TableAndColumnSelectionTab;
