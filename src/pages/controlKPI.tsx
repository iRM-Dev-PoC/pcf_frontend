import { DynamicPage } from "@ui5/webcomponents-react"
import "@/css/dynamicPage.css";

const controlKPI = () => {
  return (
      <DynamicPage
          className="dynamicPage"
          showHideHeaderButton={false}
          headerContentPinnable={false}
      ></DynamicPage>
  );
}

export default controlKPI;
