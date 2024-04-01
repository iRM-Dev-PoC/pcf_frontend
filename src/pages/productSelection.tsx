import {
  ProductSwitch,
  ProductSwitchItem,
  DynamicPage,
  DynamicPageTitle,
  MessageStrip,
  Title,
  Card,
} from "@ui5/webcomponents-react";
import { ThemingParameters } from "@ui5/webcomponents-react-base";
import { useCurrentURL } from "../hooks/useCurrntURL";

const ProductSelection = () => {
  const currentUrl = useCurrentURL();

  return (
    <DynamicPage
      headerTitle={
        <DynamicPageTitle
          expandedContent={
            <MessageStrip>
              Information (You can see the type of controls you have here.)
            </MessageStrip>
          }
          header={<Title>Select a product</Title>}
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
      <Card>
        <ProductSwitch className="flex items-center justify-center gap-3">
          <ProductSwitchItem
            className="gap-3"
            icon="process"
            target="_blank"
            targetSrc={`${currentUrl}/home/`}
            titleText="Process Control Flow"
          />
          <ProductSwitchItem
            className="gap-3"
            icon="home"
            titleText="SoD"
            target="_blank"
            targetSrc="#"
          />
          <ProductSwitchItem
            className="gap-3"
            icon="business-objects-experience"
            subtitleText="Analytical Cloud"
            titleText="Analytical Cloud"
          />
          <ProductSwitchItem
            className="gap-3"
            icon="contacts"
            subtitleText="Ariba"
            titleText="Catalog"
          />
          <ProductSwitchItem
            className="gap-3"
            icon="flight"
            subtitleText="Concur"
            titleText="Travel & Expense"
          />
        </ProductSwitch>
      </Card>
    </DynamicPage>
  );
};

export default ProductSelection;
