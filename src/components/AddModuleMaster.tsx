import ErrorComponent from "@/components/ErrorComponent";
import Loading from "@/components/Loading";
import ModuleCreationForm from "@/components/ModuleCreationForm";
import ModuleEditForm from "@/components/ModuleEditForm";
import NoDataComponent from "@/components/NoDataComponent";
import { getAllModulesType } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
    Avatar,
    AvatarSize,
    Bar,
    Button,
    ButtonDesign,
    ButtonDomRef,
    Card,
    FCLLayout,
    FlexBox,
    FlexBoxDirection,
    FlexibleColumnLayout,
    Label,
    List,
    MessageBoxActions,
    MessageBoxTypes,
    Modals,
    StandardListItem,
    Text,
    Title,
    Toolbar,
    ToolbarDesign,
    ToolbarSpacer,
} from "@ui5/webcomponents-react";
import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const AddModuleMaster = () => {
    const [layout, setLayout] = useState<FCLLayout>(FCLLayout.OneColumn);
    const [isEdit, setIsEdit] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [selectedModule, setSelectedModule] = useState<
        getAllModulesType | undefined
    >(undefined);
    const [error, setError] = useState(false);
    const showDeleteConfirmation = Modals.useShowMessageBox();
    const queryClient = useQueryClient();

    const showDialog = Modals.useShowDialog();
    const closeButtonRoleref = useRef<ButtonDomRef>(null);

    const getAllModuleData = async () => {
        try {
            const endPointAllModules = `${import.meta.env.VITE_BACKEND_BASE_URL}/module-master/get-all-modules`;
            const response = await axios.get(endPointAllModules);
            if (response.data.statuscode !== 200) {
                setError(true);
            }
            setError(false);
            return response.data;
        } catch (error) {
            console.error(error);
            setError(true);
        }
    };

    const { data, isFetching, isError } = useQuery({
        queryKey: ["allModulesData"],
        queryFn: getAllModuleData,
        retry: 3,
    });

    const deleteModuleData = async (id: number) => {
        const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/module-master/delete-module`;
        try {
            const data = {
                id,
                customer_id: 1,
            };
            const response = await axios.patch(endPoint, data);
            if (response.data?.statuscode !== 200) {
                setError(true);
                throw response.data?.message;
            }

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
        return <ErrorComponent />;
    }

    if (isFetching) {
        return <Loading />;
    }

    if (!isFetching && allModuleData === undefined) {
        return <ErrorComponent />;
    }

    if (!isFetching && data?.statuscode !== 200) {
        return <ErrorComponent />;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onStartColumnClick = (e: any) => {
        const moduleId = parseInt(e.detail.item.dataset.moduleId);
        const module = allModuleData.find(
            (module) => Number(module.ID) === moduleId
        );
        setSelectedModule(module);
        setLayout(FCLLayout.TwoColumnsMidExpanded);
    };

    return (
        <>
            {!isFetching && allModuleData.length === 0 ? (
                <NoDataComponent />
            ) : (
                <FlexibleColumnLayout
                    className="rounded-md"
                    layout={layout}
                    startColumn={
                        <>
                            <Bar
                                className="mb-2 block h-16 rounded-md"
                                design="Header"
                                endContent={
                                    <div>
                                        <Button
                                            design="Emphasized"
                                            tooltip="Create"
                                            icon="create"
                                            onClick={() => {
                                                const { close } = showDialog({
                                                    headerText:
                                                        "Added Module Information",
                                                    children: (
                                                        <>
                                                            <ModuleCreationForm
                                                                closeButtonref={
                                                                    closeButtonRoleref
                                                                }
                                                            />
                                                        </>
                                                    ),
                                                    footer: (
                                                        <Bar
                                                            endContent={
                                                                <>
                                                                    <Button
                                                                        onClick={() =>
                                                                            close()
                                                                        }
                                                                        design="Negative"
                                                                        ref={
                                                                            closeButtonRoleref
                                                                        }
                                                                    >
                                                                        Close
                                                                    </Button>
                                                                </>
                                                            }
                                                        ></Bar>
                                                    ),
                                                });
                                            }}
                                        >
                                            Create
                                        </Button>
                                    </div>
                                }
                                startContent={
                                    <Title className="m-3 block text-2xl font-bold">
                                        Module-Master
                                    </Title>
                                }
                            ></Bar>
                            <List onItemClick={onStartColumnClick}>
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
                        </>
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
                                            setLayout(
                                                FCLLayout.MidColumnFullScreen
                                            );
                                        }}
                                    />
                                )}
                                <Button
                                    icon="delete"
                                    design={ButtonDesign.Transparent}
                                    onClick={() => {
                                        showDeleteConfirmation({
                                            onClose(event) {
                                                if (
                                                    event.detail.action ===
                                                    "Delete"
                                                ) {
                                                    handleDeleteModule(
                                                        selectedModule
                                                            ? selectedModule.ID
                                                            : 0
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

                            <Toolbar
                                key={selectedModule?.ID}
                                style={{ height: "150px" }}
                            >
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
                                            {
                                                selectedModule?.DISPLAY_MODULE_NAME
                                            }
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
                                        id={
                                            selectedModule
                                                ? selectedModule.ID
                                                : 0
                                        }
                                        moduleName={
                                            selectedModule
                                                ? selectedModule.MODULE_NAME
                                                : ""
                                        }
                                        moduleDescription={
                                            selectedModule
                                                ? selectedModule.MODULE_DESC
                                                : ""
                                        }
                                        displayModuleName={
                                            selectedModule
                                                ? selectedModule.DISPLAY_MODULE_NAME
                                                : ""
                                        }
                                        setIsEdit={setIsEdit}
                                        setIsFullScreen={setIsFullScreen}
                                        setLayout={setLayout}
                                    />
                                )}
                            </Card>
                        </>
                    }
                />
            )}
        </>
    );
};

export default AddModuleMaster;
