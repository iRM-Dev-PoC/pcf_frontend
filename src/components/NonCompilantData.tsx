import { AnalyticalTable, Card, TextAlign } from "@ui5/webcomponents-react";
import { nonCompilantTable } from "../lib/nonCompilantTable";
const NonCompilantData = () => {
    return (
        <Card>
            <h1 className="p-6 text-xl font-semibold">Non Compilant Data</h1>
            <AnalyticalTable
                columns={[
                    {
                        Header: "Sl No.",
                        accessor: "id",
                        hAlign: "center" as TextAlign,
                    },
                    {
                        Header: "Account Name",
                        accessor: "account_name",
                        hAlign: "center" as TextAlign,
                    },
                    {
                        Header: "Account Number",
                        accessor: "account_number",
                        hAlign: "center" as TextAlign,
                    },
                    {
                        Header: "Address 1",
                        accessor: "address_1",
                        hAlign: "center" as TextAlign,
                    },
                    {
                        Header: "Address 2",
                        accessor: "address_2",
                        hAlign: "center" as TextAlign,
                    },
                    {
                        Header: "Address 3",
                        accessor: "address_3",
                        hAlign: "center" as TextAlign,
                    },
                    {
                        Header: "City",
                        accessor: "city_name",
                        hAlign: "center" as TextAlign,
                    },
                    {
                        Header: "Country",
                        accessor: "country_name",
                        hAlign: "center" as TextAlign,
                    },
                    {
                        Header: "Customer Account Status",
                        accessor: "customer_account_status",
                        hAlign: "center" as TextAlign,
                    },
                    {
                        Header: "Customer Class",
                        accessor: "customer_class",
                        hAlign: "center" as TextAlign,
                    },
                    {
                        Header: "Customer ID",
                        accessor: "customer_id",
                        hAlign: "center" as TextAlign,
                    },
                    {
                        Header: "Customer Name",
                        accessor: "customer_name",
                        hAlign: "center" as TextAlign,
                    },
                    {
                        Header: "Customer No.",
                        accessor: "customer_number",
                        hAlign: "center" as TextAlign,
                    },
                    {
                        Header: "Discription",
                        accessor: "description",
                        hAlign: "center" as TextAlign,
                    },
                    {
                        Header: "Icao Code",
                        accessor: "icao_code",
                        hAlign: "center" as TextAlign,
                    },
                    {
                        Header: "Location",
                        accessor: "location",
                        hAlign: "center" as TextAlign,
                    },
                    {
                        Header: "Ou Name",
                        accessor: "ou_name",
                        hAlign: "center" as TextAlign,
                    },
                    {
                        Header: "Overall Credit Limit",
                        accessor: "overall_credit_limit",
                        hAlign: "center" as TextAlign,
                    },
                    {
                        Header: "Party ID",
                        accessor: "party_id",
                        hAlign: "center" as TextAlign,
                    },
                    {
                        Header: "Party Site Name ",
                        accessor: "party_site_name",
                        hAlign: "center" as TextAlign,
                    },
                    {
                        Header: "Party Site Number",
                        accessor: "party_site_number",
                        hAlign: "center" as TextAlign,
                    },
                    {
                        Header: "Postal code",
                        accessor: "postal_code",
                        hAlign: "center" as TextAlign,
                    },
                    {
                        Header: "Profile",
                        accessor: "profile",
                        hAlign: "center" as TextAlign,
                    },
                    {
                        Header: "Province",
                        accessor: "province",
                        hAlign: "center" as TextAlign,
                    },
                    {
                        Header: "State",
                        accessor: "state",
                        hAlign: "center" as TextAlign,
                    },
                ]}
                data={nonCompilantTable.map((item) => ({
                    id: item.id,
                    account_name: item.accountname,
                    account_number: item.accountnumber,
                    address_1: item.address1,
                    address_2: item.address2,
                    address_3: item.address3,
                    city_name: item.cityname,
                    country_name: item.countryname,
                    customer_account_status: item.customeraccountstatus,
                    customer_class: item.customerclass,
                    customer_id: item.customerid,
                    customer_name: item.customername,
                    customer_number: item.customernumber,
                    description: item.description,
                    icao_code: item.icaocode,
                    location: item.location,
                    ou_name: item.ouname,
                    overall_credit_limit: item.overallcreditlimit,
                    party_id: item.partyid,
                    party_site_name: item.partysitename,
                    party_site_number: item.partysitenumber,
                    postal_code: item.postalcode,
                    profile: item.profile,
                    province: item.province,
                    state: item.state,
                }))}
                filterable
                infiniteScroll
                alternateRowColor
            ></AnalyticalTable>
        </Card>
    );
};

export default NonCompilantData;
