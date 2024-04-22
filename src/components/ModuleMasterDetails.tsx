import { useState } from "react";
import {
    List,
    StandardListItem,
    Toolbar,
    Title,
    ToolbarSpacer,
    Button,
    Avatar,
    FlexBox,
    Label,
    Text,
    ToolbarDesign,
    AvatarSize,
    FCLLayout,
    FlexibleColumnLayout,
    ButtonDesign,
    FlexBoxDirection,
    MessageBoxTypes,
    MessageBoxActions,
    Modals,
    Card,
} from "@ui5/webcomponents-react";
import { getAllModulesType } from "../utils/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "./Loading";
import axios from "axios";
import toast from "react-hot-toast";
import ModuleEditForm from "./ModuleEditForm";

const ModuleMasterDetails = () => {
    const [layout, setLayout] = useState<FCLLayout>(FCLLayout.OneColumn);
    const [isEdit, setIsEdit] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [selectedModule, setSelectedModule] = useState<getAllModulesType|undefined>(undefined);
    const [error, setError] = useState(false);
    const showDeleteConfirmation = Modals.useShowMessageBox();
    const queryClient = useQueryClient();
    
    const fetchData = async () => {
        try {
            const endPointAllModules = `${import.meta.env.VITE_BACKEND_BASE_URL}/module-master/get-all-modules`;
            const response = await fetch(endPointAllModules);
            if (!response.ok) {
                setError(true);
            }
            setError(false);
            return response.json();
        } catch (error) {
            console.error(error);
            setError(true);
        }
    };

    const { data, isFetching, isError } = useQuery({
        queryKey: ["allModulesData"],
        queryFn: fetchData,
        retry: 3,
    });
    
    const deleteModuleData = async (id: number) => {
        const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/module-master/delete-module`;
        try {
            const response = await axios.patch(endPoint, {
                data: {
                    id,
                    customer_id: 1,
                },
            });
            if (response.data?.statuscode === 400) {
                setError(true);
                throw response.data?.message;
            }
            console.log(response.data);
            
            return response.data;
        } catch (error) {
            console.error(error);
            setError(true);
            throw error;
        }
    };

    const handleDeleteModule = async (id: number) => {
        await toast.promise(deleteModuleData(id), {
            loading: "Deleting Module...",
            success: "Module deleted successfully!",
            error: (error) => `Failed to delete module: ${error.message}`,
        });
        await queryClient.invalidateQueries({ queryKey: ["allModulesData"] });
        setIsEdit(false);
        setIsFullScreen(false);
        setLayout(FCLLayout.OneColumn);
    };
 
    const moduleDataRes = data;

    const allModuleData: getAllModulesType[] = moduleDataRes?.data;

    if (isError || error) {
        return (
            <StandardListItem className="pointer-events-none">
                Something went wrong!
            </StandardListItem>
        );
    }

    if (isFetching) {
        return (
            <StandardListItem className="pointer-events-none">
                <Loading />
            </StandardListItem>
        );
    }

    if (!isFetching &&  allModuleData === undefined) {
        return (
            <StandardListItem className="pointer-events-none">
                Something went wrong!
            </StandardListItem>
        );
    }

    if (!isFetching && data?.statuscode === 500) {
        return (
            <StandardListItem className="pointer-events-none">
                Something went wrong!
            </StandardListItem>
        );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onStartColumnClick = (e: any) => {
        const moduleId = parseInt(e.detail.item.dataset.moduleId);
        const module = allModuleData.find((module) => Number(module.ID) === moduleId);
        setSelectedModule(module);
        setLayout(FCLLayout.TwoColumnsMidExpanded);
    };

    return (
        <FlexibleColumnLayout
            style={{
                height: "100%",
                width:"100%",
                marginTop: "0.5rem",
                marginBottom: "0.5rem",
            }}
            layout={layout}
            startColumn={
                <List onItemClick={onStartColumnClick}>
                 
                 {allModuleData.length === 0 && (
                        <StandardListItem className="pointer-events-none">
                            No modules found!
                        </StandardListItem>
                    )}
                
                    {allModuleData?.map((module, index) => (
                        <StandardListItem
                            description={module.MODULE_DESC}
                            data-module-id={module.ID}
                            key={`${module.ID}-${index}`}
                        >
                            {module.DISPLAY_MODULE_NAME}
                        </StandardListItem>
                    ))}
                </List>
            }
            midColumn={
                <>
                    <Toolbar design={ToolbarDesign.Solid}>
                        <Title> {selectedModule?.MODULE_NAME} </Title>
                        <ToolbarSpacer />

                       {isFullScreen ? (
                            <Button
                                icon="exit-full-screen"
                                design={ButtonDesign.Transparent}
                                onClick={() => {
                                    setIsFullScreen(!isFullScreen);
                                    setLayout(
                                        FCLLayout.TwoColumnsStartExpanded
                                    );
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
                        <Button
                            icon="delete"
                            design={ButtonDesign.Transparent}
                            onClick={() => {
                                showDeleteConfirmation({
                                    onClose(event) {
                                        if (event.detail.action === "Delete") {
                                            handleDeleteModule(
                                                selectedModule?.ID ?? 0
                                            );
                                        }
                                    },
                                    type: MessageBoxTypes.Warning,
                                    actions: [
                                        MessageBoxActions.Delete,
                                        MessageBoxActions.Cancel,
                                    ],

                                    children:
                                        "Are sure you want to delete this module?",
                                });
                            }}
                        />
                        <Button
                            icon="edit"
                            design={ButtonDesign.Transparent}
                            onClick={() => {
                                setIsEdit(!isEdit);
                            }}
                        />
                        <Button
                            icon="decline"
                            design={ButtonDesign.Transparent}
                            onClick={() => {
                                setLayout(FCLLayout.OneColumn);
                                setIsEdit(false);
                            }}
                            />
                    </Toolbar>


                    <Toolbar key={selectedModule?.ID} style={{ height: "200px" }}>
                        <Avatar
                            icon="person-placeholder"
                            size={AvatarSize.XL}
                            style={{ marginLeft: "12px" }}
                        />
                        <FlexBox
                            direction={FlexBoxDirection.Column}
                            style={{ marginLeft: "6px" }}
                        >
                            <FlexBox>
                                <Label>Name:</Label>
                                <Text style={{ marginLeft: "2px" }}>
                                    {selectedModule?.MODULE_NAME}
                                </Text>
                            </FlexBox>
                            <FlexBox>
                                <Label>Display Name:</Label>
                                <Text style={{ marginLeft: "2px" }}>
                                    {selectedModule?.DISPLAY_MODULE_NAME}
                                </Text>
                            </FlexBox>
                            <FlexBox>
                                <Label>Description:</Label>
                                <Text style={{ marginLeft: "2px" }}>
                                    {selectedModule?.MODULE_DESC}
                                </Text>
                            </FlexBox>
                        </FlexBox>
                    </Toolbar>

                    <Card>
                        {isEdit && (
                            <ModuleEditForm
                                id={selectedModule?.ID ?? 0}
                                moduleName={selectedModule?.MODULE_NAME??""}
                                moduleDescription={selectedModule?.MODULE_DESC??""}
                                displayModuleName={selectedModule?.DISPLAY_MODULE_NAME??""}
                                setIsEdit={setIsEdit}
                                setIsFullScreen={setIsFullScreen}
                                setLayout={setLayout}
                            />
                        )}
                    </Card>
                </>
            }
        />
    );
};

export default ModuleMasterDetails;

