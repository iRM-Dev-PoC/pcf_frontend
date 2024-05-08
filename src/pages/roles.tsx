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
import { useRef } from "react";
import AddRoles from "../components/AddRoles";
import RoleCreationForm from "../components/RoleCreationForm";

const Roles = () => {
  const showDialog = Modals.useShowDialog();
  const closeButtonRoleref = useRef<ButtonDomRef>(null);
  return (
    <DynamicPage
      headerTitle={
        <DynamicPageTitle
          expandedContent={
            <MessageStrip>
              Information (You can see the Report Details here.)
            </MessageStrip>
          }
          header={<Title>Roles</Title>}
          actions={
            <Button
              design="Emphasized"
              tooltip="Create"
              icon="create"
              onClick={() => {
                const { close } = showDialog({
                  headerText: "Role Information",
                  children: (
                    <RoleCreationForm closeButtonref={closeButtonRoleref} />
                  ),
                  footer: (
                    <Bar
                      endContent={
                        <>
                          <Button
                            ref={closeButtonRoleref}
                            onClick={() => {
                              close();
                            }}
                            design="Negative"
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
          }
          snappedContent={
            <MessageStrip>
              Information (only visible if header content is collapsed/snapped)
            </MessageStrip>
          }
        ></DynamicPageTitle>
      }
      style={{
        borderRadius: ThemingParameters.sapButton_BorderCornerRadius,
      }}
      showHideHeaderButton={false}
      headerContentPinnable={false}
    >
      <AddRoles />
    </DynamicPage>
  );
};

export default Roles;
