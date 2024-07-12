// import { Button } from "@/components/ui/button";
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";
// import { Combobox } from "@/components/ui/combobox";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// import mockTables from "@/lib/mockTables.json";

// console.log(mockTables);

// const options = mockTables.tables.map((table) => ({
//     label: table.tableName,
//     value: table.tableName,
// }));

// const ControlKPICreationForm = () => {
//     return (
//         <Tabs defaultValue="select" className="w-[900px]">
//             <TabsList className="grid w-full grid-cols-5">
//                 <TabsTrigger value="select">Select</TabsTrigger>
//                 <TabsTrigger value="from">From</TabsTrigger>
//                 <TabsTrigger value="where">Where</TabsTrigger>
//                 <TabsTrigger value="group-by">Group By</TabsTrigger>
//                 <TabsTrigger value="order-by">Order By</TabsTrigger>
//             </TabsList>

//             {/* Select columns to create the KPI */}
//             <TabsContent value="select">
//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Select</CardTitle>
//                         <CardDescription>
//                             Make changes to your account here. Click save when
//                             you're done.
//                         </CardDescription>
//                     </CardHeader>
//                     <CardContent className="space-y-2">
//                         <div className="space-y-1">
//                             <Label htmlFor="name">Name</Label>
//                             <Combobox options={options} />
//                         </div>
//                         <div className="space-y-1">
//                             <Label htmlFor="username">Username</Label>
//                             <Input id="username" defaultValue="@peduarte" />
//                         </div>
//                     </CardContent>
//                     <CardFooter>
//                         <Button>Save changes</Button>
//                     </CardFooter>
//                 </Card>
//             </TabsContent>

//             {/* Select from where to create the KPI */}
//             <TabsContent value="from">
//                 <Card>
//                     <CardHeader>
//                         <CardTitle>From</CardTitle>
//                         <CardDescription>
//                             Change your password here. After saving, you'll be
//                             logged out.
//                         </CardDescription>
//                     </CardHeader>
//                     <CardContent className="space-y-2">
//                         <div className="space-y-1">
//                             <Label htmlFor="current">Current password</Label>
//                             <Input id="current" type="password" />
//                         </div>
//                         <div className="space-y-1">
//                             <Label htmlFor="new">New password</Label>
//                             <Input id="new" type="password" />
//                         </div>
//                     </CardContent>
//                     <CardFooter>
//                         <Button>Save password</Button>
//                     </CardFooter>
//                 </Card>
//             </TabsContent>

//             {/* Where clause to create the KPI */}
//             <TabsContent value="where">
//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Where</CardTitle>
//                         <CardDescription>
//                             Change your password here. After saving, you'll be
//                             logged out.
//                         </CardDescription>
//                     </CardHeader>
//                     <CardContent className="space-y-2">
//                         <div className="space-y-1">
//                             <Label htmlFor="current">Current password</Label>
//                             <Input id="current" type="password" />
//                         </div>
//                         <div className="space-y-1">
//                             <Label htmlFor="new">New password</Label>
//                             <Input id="new" type="password" />
//                         </div>
//                     </CardContent>
//                     <CardFooter>
//                         <Button>Save password</Button>
//                     </CardFooter>
//                 </Card>
//             </TabsContent>

//             {/* Group by clause to create the KPI */}
//             <TabsContent value="group-by">
//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Group By</CardTitle>
//                         <CardDescription>
//                             Change your password here. After saving, you'll be
//                             logged out.
//                         </CardDescription>
//                     </CardHeader>
//                     <CardContent className="space-y-2">
//                         <div className="space-y-1">
//                             <Label htmlFor="current">Current password</Label>
//                             <Input id="current" type="password" />
//                         </div>
//                         <div className="space-y-1">
//                             <Label htmlFor="new">New password</Label>
//                             <Input id="new" type="password" />
//                         </div>
//                     </CardContent>
//                     <CardFooter>
//                         <Button>Save password</Button>
//                     </CardFooter>
//                 </Card>
//             </TabsContent>

//             {/* Order by clause to create the KPI */}
//             <TabsContent value="order-by">
//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Order By</CardTitle>
//                         <CardDescription>
//                             Change your password here. After saving, you'll be
//                             logged out.
//                         </CardDescription>
//                     </CardHeader>
//                     <CardContent className="space-y-2">
//                         <div className="space-y-1">
//                             <Label htmlFor="current">Current password</Label>
//                             <Input id="current" type="password" />
//                         </div>
//                         <div className="space-y-1">
//                             <Label htmlFor="new">New password</Label>
//                             <Input id="new" type="password" />
//                         </div>
//                     </CardContent>
//                     <CardFooter>
//                         <Button>Save password</Button>
//                     </CardFooter>
//                 </Card>
//             </TabsContent>
//         </Tabs>
//     );
// };

// export default ControlKPICreationForm;
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

import TableAndColumnSelectionTab from "@/components/v2/TableAndColumnSelectionTab";
import mockTables from "@/lib/mockTables.json";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import ControlCheckPointSelection from "@/components/v2/ControlCheckPointSelection";

const tableSelectOptions = mockTables.tables.map((table) => ({
    label: table.tableName,
    value: table.tableName,
}));

const columnSelectOptions = mockTables.tables.flatMap((table) =>
    table.columns.map((column) => ({
        label: column.label,
        value: column.value,
    }))
);
console.log("Columns", columnSelectOptions);
console.log("Tables", tableSelectOptions);

const ControlKPICreationForm = () => {
    const [selectedTable, setSelectedTable] = useState("");
    const [selectedColumn, setSelectedColumn] = useState("");
    const [query, setQuery] = useState("");

    return (
        <Tabs defaultValue="select" className="w-[900px]">
            {/* <DropdownMenu>
                <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu> */}
            <ControlCheckPointSelection
                tabType="select"
                tableValue={selectedTable}
                columnValue={selectedColumn}
                onTableChange={setSelectedTable}
                onColumnChange={setSelectedColumn}
                tableSelectOptions={tableSelectOptions}
                columnSelectOptions={columnSelectOptions}
                query={query}
                setQuery={setQuery}
            />
            <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="select">Select</TabsTrigger>
                <TabsTrigger value="from">From</TabsTrigger>
                <TabsTrigger value="join">Join</TabsTrigger>
                <TabsTrigger value="where">Where</TabsTrigger>
                <TabsTrigger value="group-by">Group By</TabsTrigger>
                <TabsTrigger value="order-by">Order By</TabsTrigger>
            </TabsList>

            {/* Select columns to create the KPI */}
            <TableAndColumnSelectionTab
                tabType="select"
                tableValue={selectedTable}
                columnValue={selectedColumn}
                onTableChange={setSelectedTable}
                onColumnChange={setSelectedColumn}
                tableSelectOptions={tableSelectOptions}
                columnSelectOptions={columnSelectOptions}
                query={query}
                setQuery={setQuery}
            />

            {/* Select from where to create the KPI */}
            <TabsContent value="from">
                <Card>
                    <CardHeader>
                        <CardTitle>From</CardTitle>
                        <CardDescription>
                            Change your password here. After saving, you'll be
                            logged out.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="current">Current password</Label>
                            <Input id="current" type="password" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="new">New password</Label>
                            <Input id="new" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save password</Button>
                    </CardFooter>
                </Card>
            </TabsContent>

            {/* Join clause to create the KPI */}
            <TabsContent value="join">
                <Card>
                    <CardHeader>
                        <CardTitle>Join</CardTitle>
                        <CardDescription>
                            Change your password here. After saving, you'll be
                            logged out.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="current">Current password</Label>
                            <Input id="current" type="password" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="new">New password</Label>
                            <Input id="new" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save password</Button>
                    </CardFooter>
                </Card>
            </TabsContent>

            {/* Where clause to create the KPI */}
            <TabsContent value="where">
                <Card>
                    <CardHeader>
                        <CardTitle>Where</CardTitle>
                        <CardDescription>
                            Change your password here. After saving, you'll be
                            logged out.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="current">Current password</Label>
                            <Input id="current" type="password" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="new">New password</Label>
                            <Input id="new" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save password</Button>
                    </CardFooter>
                </Card>
            </TabsContent>

            {/* Group by clause to create the KPI */}
            <TabsContent value="group-by">
                <Card>
                    <CardHeader>
                        <CardTitle>Group By</CardTitle>
                        <CardDescription>
                            Change your password here. After saving, you'll be
                            logged out.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="current">Current password</Label>
                            <Input id="current" type="password" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="new">New password</Label>
                            <Input id="new" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save password</Button>
                    </CardFooter>
                </Card>
            </TabsContent>

            {/* Order by clause to create the KPI */}
            <TabsContent value="order-by">
                <Card>
                    <CardHeader>
                        <CardTitle>Order By</CardTitle>
                        <CardDescription>
                            Change your password here. After saving, you'll be
                            logged out.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="current">Current password</Label>
                            <Input id="current" type="password" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="new">New password</Label>
                            <Input id="new" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save password</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    );
};

export default ControlKPICreationForm;
