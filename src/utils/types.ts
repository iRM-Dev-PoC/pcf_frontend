import { Dispatch, SetStateAction } from "react";

type SidebarContextType = {
    isSidebarCollapsed: boolean;
    setSidebarCollapsed: Dispatch<SetStateAction<boolean>>;
};

type PathContextType = string;

type CurrentURLType = string;

type getAllUserData = {
    ID: number;
    USER_NAME: string;
    USER_EMAIL: string;
    USER_EMP_ID: string;
    PASSWORD: string;
    CUSTOMER_ID: string;
    IS_ACTIVE: string;
    CREATED_ON: string;
    CREATED_BY: string;
    CHANGED_ON: string | null;
    CHANGED_BY: string | null;
    ROLE_ID: string;
    ROLE_NAME: string;
};

type getAllRoleData = {
    ID: number;
    ROLE_NAME: string;
    ROLE_DESC: string;
    CUSTOMER_ID: number;
    ROLE_PERMISSION: string;
    IS_ACTIVE: string;
    CREATED_BY: number;
    CREATED_ON: string;
    CHANGED_ON: string | null;
    CHANGED_BY: string | null;
};

type ProductSwitchType = {
    isSwitchProduct: boolean;
    setIsSwitchProduct: Dispatch<SetStateAction<boolean>>;
};

type User = {
    id: number;
    fName: string;
    lName: string;
    email: string;
    role: string;
    permissions: Permission;
};

type Permission = {
    controlAttribute: boolean;
    controlFamily: boolean;
    controlLogic: boolean;
    dashboard: boolean;
    dataLoad: boolean;
    report: boolean;
    roles: boolean;
    typeOfcontrol: boolean;
};

type SignInProps = {
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    setIsForgotPassword: (isForgotPassword: boolean) => void;
};

type SignInFormData = {
    username: string;
    password: string;
};

type logInFuncProps = {
    loginValues: { username: string; password: string };
    setError: (error: string | null) => void;
    setLoading: (loading: boolean) => void;
};

type webComponentsReactProps = {
    showOverlay: boolean;
};

type SimulationDetailsDataType = {
    id: string;
    control_attribute_name: string;
    report_name: string;
    sync_at: string;
    synced_by: string;
    is_simulated: boolean;
    simulate_at: string;
    simulated_by: string;
};

type ChartDataItem = {
    name: string;
    users: number;
};

type LineChartDataItem = {
    name: string;
    sessions: number;
    users: number;
    volume: number;
};

type ResetPasswordFormData = {
    password: string;
    repeatPassword: string;
};

type resetPasswordFuncProps = {
    resetPasswordValues: { password: string; repeatPassword: string };
    setError: (error: string | null) => void;
    setLoading: (loading: boolean) => void;
};

type OtpInputProps = {
    otp: string;
};

type EmailInputProps = {
    email: string;
};

type uploadFileType = {
    data: FormData;
};

type checkUser = {
    Username: string;
};

type logInData = {
    CustId: number;
    Username: string;
    Password: string;
};

type SoDData = {
    Level: string;
    sod_risk_id: string;
    sod_rule: string;
    business_process: string;
    sod_risk_rating: string;
    org_level: string;
    org_value: string;
    can_do_users: string;
    diddo_users: string;
    breach_count: string;
    breach_value: string;
    local_currency: string;
    raw_json: string;
};

type levels = {
    Level: string;
};

type ERP = {
    ERP: string;
};

type CanDovsDidDoDataApiResponse = {
    diddoData: SoDData[];
    erps: ERP[];
    levels: levels[];
};

type transactionDetailsTypes = {
    USERS: string;
    Vendor: string;
    Customer_Invoice_Number: string;
    Clearing_document: string;
    Clearing_Date: string;
    Document_type: string;
    Invoice_Creation_Date: string;
    Posting_Key: string;
    Invoice_Posting_Date: string;
    Company_Code: string;
    Line_item: string;
    Valuated_amount: number;
    Amount_in_local_currency: number;
    Local_Currency: string;
    Net_due_date: string;
    Fiscal_Year: string;
    Account_Type: string;
    Document_currency: string;
    GL_Account: string;
};

type UserRole = {
    users: string;
    roles: string;
    sync_id: number;
};

type MstObjItem = {
    High: {
        rules: number;
        SOD_RISK_RATING: string;
        TYPE_OF_VIOLATION: string;
        POLICY_ID: string;
        sync_id: number;
    };
    Medium: {
        rules: number;
        SOD_RISK_RATING: string;
        TYPE_OF_VIOLATION: string;
        POLICY_ID: string;
        sync_id: number;
    };
    Sensitive: {
        rules: number;
        SOD_RISK_RATING: string;
        TYPE_OF_VIOLATION: string;
        POLICY_ID: string;
        sync_id: number;
    };
};

type ExObjItem = {
    sod_name: string;
    user_name: string;
    role_name: string;
    instances: string;
    risk_rating: string;
    sync_id: string;
};

type ExDataItem = {
    BUSINESS_PROCESS: string;
    count: string;
    sync_id: string;
};

type RoleConflictsItem = {
    [key: string]: {
        type_of_role_conflict: string;
        COUNT: string;
        sync_id: string;
    };
};

type TotalActiveUsersItem = {
    USER_DISPLAY_NAME: number;
};

type EmployeesUsersItem = {
    USER_DISPLAY_NAME: number;
};

type OtherUsersItem = {
    USER_DISPLAY_NAME: number;
};

type CompanyCodesItem = {
    bu_name: number;
};

type TotalUsersItem = {
    users: number;
    sync_id: string;
};

type NonDialogUsersItem = {
    users: number;
    sync_id: string;
};

type DialogUsersItem = {
    users: number;
    sync_id: string;
};

type TotalRolesItem = {
    roles: number;
    sync_id: string;
};

type DrillItem = {
    IRM_BI_SYNC_ID: number;
    table: string;
    last_sync_id: number;
    mst_last_sync_id: number;
    projectID: number;
};

type ApiResponse = {
    userRole: UserRole[];
    mstObj: {
        [key: number]: MstObjItem;
    };
    exobj: {
        [key: number]: {
            [key: string]: ExObjItem;
        };
    };
    exdata: {
        [key: number]: ExDataItem[];
    };
    role_conflicts: {
        [key: number]: RoleConflictsItem;
    };
    totalActiveUsers: TotalActiveUsersItem[];
    employessUsers: EmployeesUsersItem[];
    otherUsers: OtherUsersItem[];
    companyCodes: CompanyCodesItem[];
    totalusers: TotalUsersItem[];
    nonDialogUsers: NonDialogUsersItem[];
    dialogUsers: DialogUsersItem[];
    totalRoles: TotalRolesItem[];
    erp: string;
    drill: DrillItem;
};

type candoDataType = {
    BUSINESS_PROCESS: string;
    sod_name: string;
    risk_description: string;
    SOD_RISK_RATING: string;
    can_do_users: string;
    role_name: string;
    xx_row_id: string;
    conflict_type: string;
};

type canDoDetailsDataApiResponse = {
    BUSINESS_PROCESS: string;
    risk_level: string;
    sod_name: string;
    user_display: string;
    function_name: string;
    role_name: string;
    role_conflict_type: string;
    transaction_code: string;
    incident_path: string;
    function_name2: string;
    conflicting_role_leg2: string;
    transaction_code2: string;
    conflict_type: string;
    org_level: string;
    org_value: string;
};

type CanDoSummaryDataApiResponse = {
    CanDoSummaryDataApiResponse: candoDataType[];
};

type dataCardType = {
    id: number;
    header: string;
    icon: string;
    risk: string;
    description: string;
};

type getAllModulesType = {
    ID: number;
    MODULE_NAME: string;
    DISPLAY_MODULE_NAME: string;
    MODULE_DESC: string;
    PARENT_MODULE_ID: number;
    IS_ACTIVE: string;
    CREATED_ON: string;
    CREATED_BY: number;
    CHANGED_ON: string | null;
    CHANGED_BY: string | null;
    CUSTOMER_ID: number;
};

type getAllSubModulesType = {
    ID: number;
    SUBMODULE_NAME: string;
    DISPLAY_SUBMODULE_NAME: string;
    SUBMODULE_DESC: string;
    PARENT_MODULE_ID: number;
    IS_ACTIVE: string;
    CREATED_ON: string;
    CREATED_BY: string;
    CHANGED_ON: string | null;
    CHANGED_BY: string | null;
    CUSTOMER_ID: number;
};
type getAllCardDataType = {
    ID: number;
    CHECK_POINT_NAME: string;
    CHECK_POINT_DESC: string;
    CONTROL_ID: number;
    CUSTOMER_ID: number;
    IS_ACTIVE: string;
    CREATED_ON: string;
    CREATED_BY: number;
    CHANGED_ON: string | null;
    CHANGED_BY: string | null;
    RISK_SCORE: number;
};

type getAllCheckPointData = {
    ID: number;
    CHECK_POINT_NAME: string;
    CHECK_POINT_DESC: string;
    CONTROL_ID: number;
    CUSTOMER_ID: number;
    IS_ACTIVE: string;
    CREATED_ON: string;
    CREATED_BY: number;
    CHANGED_ON: string | null;
    CHANGED_BY: number | null;
};

type getAllModuleType = {
    ID: number;
    REPORT_PATH: string;
    REPORT_NAME: string;
    REPORT_DESTINATION: string;
    CUSTOMER_ID: number;
    IS_ACTIVE: string;
    CREATED_BY: string;
    CREATED_ON: string;
    CHANGED_ON: string;
    CHANGED_BY: string;
};

type reportDataType = {
    ID: number;
    REPORT_NAME: string;
};

type checkPointDatType = {
    ID: number;
    CHECK_POINT_NAME: string;
};

type getReportCheckPointMappingType = {
    ID: number;
    REPORT_ID: number;
    CHECK_POINT_ID: number;
    CUSTOMER_ID: number;
    IS_ACTIVE: string;
    CREATED_BY: number;
    CREATED_ON: string;
    CHANGED_ON: string | null;
    CHANGED_BY: string | null;
    reportdata: reportDataType | null;
    checkpointdata: checkPointDatType | null;
};

export type {
    SignInProps,
    CurrentURLType,
    SignInFormData,
    logInFuncProps,
    User,
    Permission,
    PathContextType,
    SidebarContextType,
    webComponentsReactProps,
    SimulationDetailsDataType,
    ChartDataItem,
    LineChartDataItem,
    ResetPasswordFormData,
    resetPasswordFuncProps,
    OtpInputProps,
    EmailInputProps,
    uploadFileType,
    ProductSwitchType,
    ApiResponse,
    SoDData,
    CanDoSummaryDataApiResponse,
    CanDovsDidDoDataApiResponse,
    CompanyCodesItem,
    DialogUsersItem,
    DrillItem,
    EmployeesUsersItem,
    ExDataItem,
    ExObjItem,
    MstObjItem,
    NonDialogUsersItem,
    OtherUsersItem,
    RoleConflictsItem,
    TotalActiveUsersItem,
    TotalRolesItem,
    TotalUsersItem,
    UserRole,
    levels,
    canDoDetailsDataApiResponse,
    transactionDetailsTypes,
    checkUser,
    logInData,
    candoDataType,
    ERP,
    dataCardType,
    getAllUserData,
    getAllRoleData,
    getAllModulesType,
    getAllSubModulesType,
    getAllCardDataType,
    getAllCheckPointData,
    getAllModuleType,
    getReportCheckPointMappingType,
    reportDataType,
    checkPointDatType,
};
