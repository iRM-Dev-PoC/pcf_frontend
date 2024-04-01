import {
  Bar,
  Button,
  DynamicPage,
  DynamicPageTitle,
  Form,
  FormItem,
  Input,
  MessageStrip,
  Modals,
  Title,
} from "@ui5/webcomponents-react";
import { ThemingParameters } from "@ui5/webcomponents-react-base";
import AddUsers from "../components/AddUsers";

const Users = () => {
  const showDialog = Modals.useShowDialog();
  return (
    <DynamicPage
      headerTitle={
        <DynamicPageTitle
          expandedContent={
            <MessageStrip>
              Information (You can see the Report Details here.)
            </MessageStrip>
          }
          header={<Title>Users</Title>}
          actions={
            <Button
              design="Emphasized"
              tooltip="Create"
              icon="create"
              onClick={() => {
                const { close } = showDialog({
                  headerText: "User Information",
                  children: (
                    <Form
                      style={{
                        alignItems: "center",
                      }}
                    >
                      <FormItem label="Name">
                        <Input type="Text" />
                      </FormItem>
                      <FormItem label="Email">
                        <Input type="Text" />
                      </FormItem>
                    </Form>
                  ),
                  footer: (
                    <Bar
                      endContent={
                        <>
                          <Button design="Emphasized">Create</Button>
                          <Button onClick={() => close()} design="Negative">
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
      <AddUsers />
    </DynamicPage>
  );
};

export default Users;
