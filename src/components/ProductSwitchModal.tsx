import {
  Card,
  ProductSwitch,
  ProductSwitchItem,
} from "@ui5/webcomponents-react";

const ProductSwitchModal = () => {
  return (
    <div>
      <Card style={{ height: "25rem", width: "30rem" }}>
        <ProductSwitch className="flex items-center justify-center gap-3">
          <ProductSwitchItem
            className="gap-3"
            icon="process"
            target="_blank"
            targetSrc="/pcf/"
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
    </div>
  );
};

export default ProductSwitchModal;
