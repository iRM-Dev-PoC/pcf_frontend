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
  TextArea,
  Title,
} from "@ui5/webcomponents-react";
import { ThemingParameters } from "@ui5/webcomponents-react-base";
import SubModuleDetails from "../components/SubModuleDetails";

const SubModules = () => {
  const showDialog = Modals.useShowDialog();
  return (
      <DynamicPage
          headerTitle={
              <DynamicPageTitle
                  expandedContent={
                      <MessageStrip>
                          Information (You can see the Sub-Module Details here.)
                      </MessageStrip>
                  }
                  header={<Title>Sub-Module</Title>}
                  actions={
                      <Button
                          design="Emphasized"
                          tooltip="Create"
                          icon="create"
                          onClick={() => {
                              const { close } = showDialog({
                                  headerText: "Added Role Information",
                                  children: (
                                      <Form
                                          style={{
                                              alignItems: "center",
                                          }}
                                      >
                                          <FormItem label="Name">
                                              <Input
                                                  type="Text"
                                                  placeholder="Role Name"
                                              />
                                          </FormItem>
                                          <FormItem label="Role Description">
                                              <TextArea />
                                          </FormItem>
                                      </Form>
                                  ),
                                  footer: (
                                      <Bar
                                          endContent={
                                              <>
                                                  <Button design="Emphasized">
                                                      Create
                                                  </Button>
                                                  <Button
                                                      onClick={() => close()}
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
                          Information (only visible if header content is
                          collapsed/snapped)
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
          <SubModuleDetails/>
      </DynamicPage>
  );
};

export default SubModules;