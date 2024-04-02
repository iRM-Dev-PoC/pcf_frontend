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
                        targetSrc="/"
                        titleText="Process Control Flow"
                        onClick={() => {
                            localStorage.setItem(
                                "product",
                                "Process Control Flow"
                            );
                        }}
                    />
                    <ProductSwitchItem
                        className="gap-3"
                        icon="activity-individual"
                        titleText="SoD"
                        target="_blank"
                        onClick={() => {
                            localStorage.setItem("product", "SoD");
                        }}
                        targetSrc="/sod/"
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
