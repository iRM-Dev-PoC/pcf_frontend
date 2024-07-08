import { AnalyticalTable, Card } from "@ui5/webcomponents-react";

const DashboardCardTable = () => {
  return (
      <Card>
          <AnalyticalTable
              columns={[
                  {
                      Header: "Name",
                      accessor: "name",
                  },
                  {
                      Header: "Age",
                      accessor: "age",
                  },
                  {
                      Header: "Friend Name",
                      accessor: "friend.name",
                  },
              ]}
              data={[
                  {
                      age: 80,
                      friend: {
                          age: 68,
                          name: "Carver Vance",
                      },
                      name: "Allen Best",
                      status: "Success",
                  },
                  {
                      age: 84,
                      friend: {
                          age: 44,
                          name: "Petra Potter",
                      },
                      name: "Janis Mcgowan",
                      status: "Information",
                  },
              ]}
              filterable
              infiniteScroll
              onLoadMore={function _a() {}}
              onTableScroll={function _a() {}}
          />
      </Card>
  );
}

export default DashboardCardTable

