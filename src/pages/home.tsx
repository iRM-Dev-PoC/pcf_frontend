import {
  DynamicPage,
  DynamicPageHeader,
  DynamicPageTitle,
  DatePicker,
  FCLLayout,
  FlexibleColumnLayout,
  List,
  StandardListItem,
  ToolbarDesign,
  Toolbar,
  ToolbarSpacer,
  Title,
  Button,
  ButtonDesign,
  Avatar,
  AvatarSize,
  FlexBox,
  FlexBoxDirection,
  Label,
  Text,
} from "@ui5/webcomponents-react";
import RiskCard from "../components/RiskCard";
import cardData from "../lib/cardData";
import { ThemingParameters } from "@ui5/webcomponents-react-base";
import FilterBarComponent from "../components/FilterBarComponent";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { User } from "../utils/types";
import { userData } from "../lib/userList";

const Home = () => {
  const [layout, setLayout] = useState<FCLLayout>(FCLLayout.OneColumn);
  const [selectedUser, setSelectedUser] = useState<User>(userData[0]);
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onStartColumnClick = (e: any) => {
    const userId = parseInt(e.detail.item.dataset.userId);
    setSelectedUser(userData.find((user) => user.id === userId)!);
    setLayout(FCLLayout.TwoColumnsMidExpanded);
  };

  const handleCardClick = () => {
    navigate("/pcf/dashboard");
  };

  return (
    <DynamicPage
      headerContent={
        <DynamicPageHeader>
          <FilterBarComponent />
        </DynamicPageHeader>
      }
      headerTitle={
        <DynamicPageTitle
          actions={
            <>
              <DatePicker
                onChange={function _a() {}}
                onInput={function _a() {}}
                onValueStateChange={function _a() {}}
                primaryCalendarType="Gregorian"
                valueState="None"
                placeholder="Start Date"
              />
              <DatePicker
                onChange={function _a() {}}
                onInput={function _a() {}}
                onValueStateChange={function _a() {}}
                primaryCalendarType="Gregorian"
                valueState="None"
                placeholder="End Date"
              />
            </>
          }
        ></DynamicPageTitle>
      }
      style={{
        borderRadius: ThemingParameters.sapButton_BorderCornerRadius,
      }}
      showHideHeaderButton={false}
      headerContentPinnable={false}
    >
      {cardData.map((card, index) => (
        <RiskCard
          key={index}
          header={card.header}
          icon={card.icon}
          risk={card.risk}
          description={card.description}
          onClick={handleCardClick}
        />
      ))}

      <FlexibleColumnLayout
        style={{ height: "100%", marginTop: "0.5rem", marginBottom: "0.5rem" }}
        layout={layout}
        startColumn={
          <List headerText="Users" onItemClick={onStartColumnClick}>
            {userData.map((user) => (
              <StandardListItem
                description={user.email}
                data-user-id={user.id}
                key={user.id}
              >
                {user.name}
              </StandardListItem>
            ))}
          </List>
        }
        midColumn={
          <>
            <Toolbar design={ToolbarDesign.Solid}>
              <Title>{selectedUser.name}</Title>
              <ToolbarSpacer />
              <Button
                icon="decline"
                design={ButtonDesign.Transparent}
                onClick={() => {
                  setLayout(FCLLayout.OneColumn);
                }}
              />
            </Toolbar>
            <Toolbar style={{ height: "200px" }}>
              <Avatar
                icon="person-placeholder"
                size={AvatarSize.XL}
                style={{ marginLeft: "12px" }}
              />
              <FlexBox
                direction={FlexBoxDirection.Column}
                style={{ marginLeft: "6px" }}
              >
                <FlexBox>
                  <Label>Name:</Label>
                  <Text style={{ marginLeft: "2px" }}>{selectedUser.name}</Text>
                </FlexBox>
                <FlexBox>
                  <Label>Email:</Label>
                  <Text style={{ marginLeft: "2px" }}>
                    {selectedUser.email}
                  </Text>
                </FlexBox>
                <FlexBox>
                  <Label>User Type:</Label>
                  <Text style={{ marginLeft: "2px" }}>{selectedUser.role}</Text>
                </FlexBox>
              </FlexBox>
            </Toolbar>

            <List headerText="Permissions" growing="Scroll">
              {Object.entries(selectedUser.permissions).map(([key, value]) => (
                <StandardListItem key={key}>
                  {key}: {value.toString()}
                </StandardListItem>
              ))}
            </List>
          </>
        }
      />
    </DynamicPage>
  );
};
export default Home;
