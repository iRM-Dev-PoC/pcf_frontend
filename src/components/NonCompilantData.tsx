import { getAllNonCompilantData } from "@/lib/types";
import { AnalyticalTable, Card, TextAlign } from "@ui5/webcomponents-react";

type NonCompilantDataProps = {
    nonCompilantDataRes: getAllNonCompilantData[] | undefined;
};

const NonCompilantData = ({ nonCompilantDataRes }: NonCompilantDataProps) => {
    if (nonCompilantDataRes === undefined) {
        return null;
    }
    console.log("data length", nonCompilantDataRes.length);
    return (
        <>
            <Card>
                <h1 className="p-6 text-xl font-semibold">
                    Non Compilant Data
                </h1>
                <AnalyticalTable
                    columns={[
                        {
                            Header: "BILLING DOCUMENT",
                            accessor: "BILLING_DOCUMENT",
                            hAlign: "center" as TextAlign,
                        },
                        {
                            Header: "BILLING INVOICE NET VALUE",
                            accessor: "BILLING_INVOICE_NET_VALUE",
                            hAlign: "center" as TextAlign,
                        },
                        {
                            Header: "SALES ORDER NET VALUE",
                            accessor: "SALES_ORDER_NET_VALUE",
                            hAlign: "center" as TextAlign,
                        },
                        {
                            Header: "PERSONNEL NUMBER",
                            accessor: "PERSONNEL_NUMBER",
                            hAlign: "center" as TextAlign,
                        },
                        {
                            Header: "CREAETD ON",
                            accessor: "CREAETD_ON",
                            hAlign: "center" as TextAlign,
                        },
                        {
                            Header: "BILLING TAX AMOUNT",
                            accessor: "BILLING_TAX_AMOUNT",
                            hAlign: "center" as TextAlign,
                        },
                        {
                            Header: "BILLING COST",
                            accessor: "BILLING_COST",
                            hAlign: "center" as TextAlign,
                        },
                        {
                            Header: "SALES PERSONNEL NUMBER",
                            accessor: "SALES_PERSONNEL_NUMBER",
                            hAlign: "center" as TextAlign,
                        },
                        {
                            Header: "SOLD TO PARTY NAME",
                            accessor: "SOLD_TO_PARTY_NAME",
                            hAlign: "center" as TextAlign,
                        },
                        {
                            Header: "ITEM DESCRIPTION",
                            accessor: "ITEM_DESCRIPTION",
                            hAlign: "center" as TextAlign,
                        },
                        {
                            Header: "PAYER DESCRIPTION",
                            accessor: "PAYER_DESCRIPTION",
                            hAlign: "center" as TextAlign,
                        },
                        {
                            Header: "SALES ORDER CREATED ON",
                            accessor: "SALES_ORDER_CREATED_ON",
                            hAlign: "center" as TextAlign,
                        },
                        {
                            Header: "BILLING CREATED ON",
                            accessor: "BILLING_CREATED_ON",
                            hAlign: "center" as TextAlign,
                        },
                        {
                            Header: "SALES DOCUMENT",
                            accessor: "SALES_DOCUMENT",
                            hAlign: "center" as TextAlign,
                        },
                    ]}
                    data={nonCompilantDataRes.map((item) => ({
                        ID: item.ID,
                        SYNC_HEADER_ID: item.SYNC_HEADER_ID,
                        CUSTOMER_ID: item.CUSTOMER_ID,
                        BILLING_DOCUMENT: item.BILLING_DOCUMENT,
                        BILLING_INVOICE_NET_VALUE:
                            item.BILLING_INVOICE_NET_VALUE,
                        SALES_ORDER_NET_VALUE: item.SALES_ORDER_NET_VALUE,
                        PERSONNEL_NUMBER: item.PERSONNEL_NUMBER,
                        EMPLOYEE_NAME: item.EMPLOYEE_NAME,
                        CREAETD_ON: item.CREAETD_ON,
                        BILLING_TAX_AMOUNT: item.BILLING_TAX_AMOUNT,
                        BILLING_COST: item.BILLING_COST,
                        SALES_PERSONNEL_NUMBER: item.SALES_PERSONNEL_NUMBER,
                        SOLD_TO_PARTY_NAME: item.SOLD_TO_PARTY_NAME,
                        ITEM_DESCRIPTION: item.ITEM_DESCRIPTION,
                        PAYER_DESCRIPTION: item.PAYER_DESCRIPTION,
                        SALES_ORDER_CREATED_ON: item.SALES_ORDER_CREATED_ON,
                        BILLING_CREATED_ON: item.BILLING_CREATED_ON,
                        SALES_DOCUMENT: item.SALES_DOCUMENT,
                    }))}
                    filterable
                    // infiniteScroll
                    alternateRowColor
                ></AnalyticalTable>
                <div className="px-3 py-2">
                    <p className="text-base">
                        Showing
                        <span className="mx-1 text-blue-500">
                            {nonCompilantDataRes?.length}
                        </span>
                        row(s)
                    </p>
                </div>
            </Card>
        </>
    );
};

export default NonCompilantData;
