export interface IUser {
  department: string;
  email: string;
  index: string;
  name: string;
  phone: string;
  status?: boolean;
  surname: string;
  university: string;
  year: number;
  id_user?: number;
  login?: string;
  password?: string;
  declaration?: number;
  key1?: string;
  key2?: string;
  join_date?: string;
  gender?: number;
  notes?: INote[];
  id?: number;
  assignments?: IAssignments[];
  assignmentsPack: string[];
}

export interface IAssignments {
  group_name: string;
  semester_name: string;
  id: string;
}

export interface IUserDaysStat {
  day: string;
  data: number;
}

export type IFormType = "user" | "login" | "password" | "keys";

export interface ICheckLogin {
  login: string;
}

export interface ICheckEmail {
  email: string;
}

export interface ICheckPhone {
  phone: string;
}

export interface ICheckKey {
  key: string;
}

export interface ICheckLoginError {
  loginExist: boolean;
}

export interface ICheckEmailError {
  emailExist: boolean;
}

export interface ICheckPhoneError {
  phoneExist: boolean;
}

export interface ICheckKeyError {
  keyExist: boolean;
}

export interface INewUserPass {
  id_user: number;
  opass: string;
  pass: string;
  pass2?: string;
}

export interface INewUserLogin {
  id_user: number;
  ologin: string;
  login: string;
  login2?: string;
}


export interface INewUserKeys {
  id_user: number;
  key1: string;
  key2: string;
}

export interface IUserPresence {
  week: string;
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
  sun: string;
}

export interface IUserListPresence {
  id: number;
  name: string;
  surname: string;
  mon: string[];
  tue: string[];
  wed: string[];
  thu: string[];
  fri: string[];
  sat: string[];
  sun: string[];
  notes: INote[];
}

export interface  IUsersPresence {
  data: IUserListPresence[];
  week: string;
}

export interface ISelectOptions {
  value: string;
  viewValue: string;
}

export interface IPresenceStat {
  lastMonth: IPresence[];
  allSemestersGroups: IPresenceSemesterData[];
  allVisits: IPresence[];
}

export interface IPresence {
  name: string;
  data: number;
}

export interface ISemesterDataPack {
  data: number[][];
  labels: string[][];
}

export interface IChargesUserData {
  charges: IChargesUser;
  semester: ISemester;
  dues: string[];
  selectedCharges: number;
}

export interface IChargesUser {
  charges_1: number;
  charges_2: number;
  charges_3: number;
  declaration: number;
  entryFee: number;
}

export interface ISemester {
  date_1: string;
  date_2: string;
  date_3: string;
  end: string;
  id_semester?: number;
  name: string;
  start: string;
  isActiveInput?: boolean[];
}

export interface IChargesUserSetData {
  charges: string;
}

export interface INote {
  name: string;
}

export interface INewNote {
  id_user: number | number[];
  note: string;
}

export interface IGroupChangePack {
  id_user: number | number[];
  id_group: number;
}

export interface IUsersId {
  ids: number[];
}

export interface IGenderData {
  gender: string;
  value: number;
}

export interface IUniversityData {
  name: string;
  value: number;
}

//////////////////////////////////////////

export interface IPresenceStat2 {
  general: IPresenceGeneralData;
  days: IPresenceSemesterData[];
  groups: IPresenceSemesterData[];
  weekToWeek: IGenderStat[];
}

export interface IPresenceGeneralData {
  week: IWeekPresenceStat;
  month: IWeekPresenceStat;
  semester: IWeekPresenceStat;
  all: IWeekPresenceStat;
}

export interface IWeekPresenceStat {
  mon: IGenderStat;
  tue: IGenderStat;
  wed: IGenderStat;
  thu: IGenderStat;
  fri: IGenderStat;
  sat: IGenderStat;
  sun: IGenderStat;
}

export interface IGenderStat {
  man: number;
  woman: number;
  date?: string;
  week?: string;
}

export interface IPresenceSemesterData {
  name: string;
  id_semester?: number;
  data: IPresence[] | IPresenceDaysData[] | IPresenceGroupsData[];
}

export interface IPresenceDaysData {
  week: string;
  days: IWeekPresenceStat;
}

export interface IPresenceGroupsData {
 name: string;
 groupData: IPresenceGroupDetails[];
}

export interface IPresenceGroupDetails {
  week: string;
  day: string;
  man: number;
  woman: number;
}


export type TChartData = 'week-presence' | 'semester-presence-data' | 'gender-stat';

export interface IPresenceGroupDetails {
  name: string;
  man: number;
  woman: number;
}

//////////////////////////////////

export interface IPresenceChartsConfig {
  general: IPresenceGeneralChartConfig;
  days: ISemestersChartConfig[];
  groups: ISemestersChartConfig[];
  weekToWeek: IChartConfig;
}

export interface IPresenceGeneralChartConfig {
  week: IChartConfig;
  month: IChartConfig;
  semester: IChartConfig;
  all: IChartConfig;
}

export interface ISemestersChartConfig {
  id_semester: number;
  name: string;
  data: IChartConfig[]
}

export interface IChartConfig {
  data: number[][];
  dataLabel: string[];
  labels: string[];
  title: string;
  type: string;
}

export interface ISemesterName {
  id_semester: number;
  name: string;
}

export interface ISemesterDetails {
  id_semester: number;
  name: string;
  start: string;
  end: string;
}

export interface IGroupName {
  id: number;
  name: string;
}

export interface IGroupMember {
  gender: number;
  id: number;
  name: string;
  surname: string;
  notes: INote[];
  presences: IGroupMemberPresence[]
}

export interface IGroupMemberPresence {
  date: string;
  value: string;
}

export interface IDeclaredCharges {
  name: string;
  value: number;
}

export interface IStatModalPresenceGroup {
  id_user: number;
  id_semester: number;
  name: string;
  surname: string;
}

export interface IChargesData {
  id_semester: number;
  name: string;
  data: IChargesDataDetails[];
}

export interface IChargesDataDetails {
  id: number;
  name: string;
  surname: string;
  declaration: number;
  entryFee: string;
  payment1: string;
  payment2: string;
  payment3: string;
  sum: number;
  notes: INote[];
}

export interface ITransactionsListData {
  id: number;
  id_transaction: number;
  name: string;
  email: string;
  product: string;
  date: string;
  price: string;
  quantity: number;
  sum: string;
}


export interface ISemesterChangeValuePack {
  id: number;
  field: string;
  value: string;
}

export interface IInstallmentChangeValuePack {
  id: number;
  field: string;
  value: string;
}

export interface ICheckAdmin {
  id: number;
  password: string;
}

export interface IAdminsChangeValuePack {
  id: number;
  field: string;
  value: string;
  password?: string;
}

export interface IGroupChangeValuePack {
  id: number;
  field: string;
  value: string;
}

export interface ISemesterChangeDataPack {
  ids: number[];
}

export interface IInstallmentChangeDataPack {
  ids: number[];
}

export interface IGroupChangeDataPack {
  ids: number[];
}

export interface IAdminsDeleteDataPack {
  ids: number[];
}

export interface IArchivesRevertDataPack {
  ids: number[];
}

export interface IArchivesDeleteDataPack {
  ids: number[];
}

export interface ISemesterHeader {
  id_semester: number;
  name: string;
}

export interface IConfirmationType {
  confirmationType: TConfirmationType;
}

export type TConfirmationType = 'page-admin-delete' | 'application-admin-delete' | 'user-delete' | 'semester-delete' | 'group-delete' | 'intallment-delete';

export interface IGroupPack {
  id_semester: number;
  name: string;
  groups: IGroupDetails[];
}

export interface IGroupDetails {
  id?: number;
  name: string;
  day: string;
  start: Date;
  end: Date;
  id_semester?: number;
  isActiveInput?: boolean[];
}

export interface IInstallmentsPack {
  type0: IInstallmentsPackDetails;
  type1: IInstallmentsPackDetails;
}

export interface IInstallmentsPackDetails {
  name: string;
  data: IInstallments[];
}

export interface IInstallments {
  id?: number;
  name: string;
  installment_1: number;
  installment_2: number;
  installment_3: number;
  type?: number;
  sum?: number;
  isActiveInput?: boolean[];
}

export interface IAdministrator {
  id: number;
  name: string;
  surname: string;
  email: string;
  login: string;
  password: string;
  isActiveInput?: boolean[];
}

export type TAdminConfirmation = "page"

export interface IAdminConfirmation {
  type: TAdminConfirmation;
  id: number;
}

export type TLoginPerson = "user" | "admin" | "appAdmin";

export interface ILoginTokenFromServer {
  token?: string;
  id?: number;
  role: TLoginPerson;
}
