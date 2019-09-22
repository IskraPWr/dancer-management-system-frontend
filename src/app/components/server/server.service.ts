import { IInstallments, IArchivesDeleteDataPack, IArchivesRevertDataPack, IAdminsDeleteDataPack, ICheckAdmin, IAdministrator } from 'src/app/typings/typings';
import { DeleteComponent } from './../user-module/delete/delete.component';
import { Observable } from 'rxjs';
import { IUser, ICheckKey, ICheckPhone, ICheckEmail, ICheckLogin, ICheckLoginError, ICheckKeyError, ICheckPhoneError, ICheckEmailError, INewUserPass, INewUserLogin, INewUserKeys, IChargesUserSetData, IUsersId, IGroupChangePack, ISemesterChangeValuePack, IGroupChangeDataPack, IGroupChangeValuePack, IGroupDetails, IInstallmentChangeValuePack } from './../../typings/typings.d';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ServerService {
  constructor(private http: HttpClient) {}

  getUserById(id): Observable<IUser> {
    return this.http.get('https://lit-chamber-10871.herokuapp.com/users/' + id, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }) as Observable<IUser>;
  }

  getAdmins() {
    return this.http.get('https://lit-chamber-10871.herokuapp.com/admins/', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getInstallment() {
    return this.http.get('https://lit-chamber-10871.herokuapp.com/installment', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getAuthorization() {
    return this.http.get('https://lit-chamber-10871.herokuapp.com/authorization/', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getPresenceById(id) {
    return this.http.get('https://lit-chamber-10871.herokuapp.com/presence/' + id, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getUsers() {
    return this.http.get('https://lit-chamber-10871.herokuapp.com/users', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getUsersWithAssignments() {
    return this.http.get('https://lit-chamber-10871.herokuapp.com/assignments/', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  checkPageAdminPassword(checkAdminDataPack: ICheckAdmin) {
    return this.http.post('https://lit-chamber-10871.herokuapp.com/admins/check/', checkAdminDataPack, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  checkApplicationAdminPassword(checkAdminDataPack: ICheckAdmin) {
    return this.http.post('https://lit-chamber-10871.herokuapp.com/authorization/check/', checkAdminDataPack, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getPresence() {
    return this.http.get('https://lit-chamber-10871.herokuapp.com/presence', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getTransactionsList() {
    return this.http.get('https://lit-chamber-10871.herokuapp.com/list', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getCharges() {
    return this.http.get('https://lit-chamber-10871.herokuapp.com/charges', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getChargesById(id) {
    return this.http.get('https://lit-chamber-10871.herokuapp.com/charges/' + id, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getArchives() {
    return this.http.get('https://lit-chamber-10871.herokuapp.com/archives', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getSemesters() {
    return this.http.get('https://lit-chamber-10871.herokuapp.com/semesters/', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getGroups() {
    return this.http.get('https://lit-chamber-10871.herokuapp.com/groups/', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getGroupsHeadersById(id) {
    return this.http.get('https://lit-chamber-10871.herokuapp.com/groups/' + id, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getSemesterHeaders() {
    return this.http.get('https://lit-chamber-10871.herokuapp.com/semesters/headers', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getSemesterDetails() {
    return this.http.get('https://lit-chamber-10871.herokuapp.com/semesters/details', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getUsersInGroupByIdGroup(group) {
    return this.http.get(
      'https://lit-chamber-10871.herokuapp.com/groups/findbyidgroup/' + group,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    );
  }

  // Stats all

  getStatOfDeclaredCharges() {
    return this.http.get('https://lit-chamber-10871.herokuapp.com/statistics/charges', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getStatUniversity() {
    return this.http.get('https://lit-chamber-10871.herokuapp.com/statistics/universities', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getStatGender() {
    return this.http.get('https://lit-chamber-10871.herokuapp.com/statistics/gender', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getStatArchivesGender() {
    return this.http.get('https://lit-chamber-10871.herokuapp.com/statistics/archives/gender', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getStatPeople() {
    return this.http.get('https://lit-chamber-10871.herokuapp.com/statistics/people', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  // Stat by ID

  getStatPresenceAllById(id) {
    return this.http.get(
      'https://lit-chamber-10871.herokuapp.com/statistics/presence/all/' + id,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    );
  }

  getStatPresenceGroupByIdAndIdSemester(id, id_semester) {
    return this.http.get(
      'https://lit-chamber-10871.herokuapp.com/statistics/people/' + id + '/' + id_semester,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    );
  }

  getStatPresenceById(id) {
    return this.http.get('https://lit-chamber-10871.herokuapp.com/statistics/presence/' + id, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  // post

  updateUser(id, data) {
    return this.http.post('https://lit-chamber-10871.herokuapp.com/users/' + id, data, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  postNote(note) {
    return this.http.post('https://lit-chamber-10871.herokuapp.com/notes/', note, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  postNotes(note) {
    return this.http.post('https://lit-chamber-10871.herokuapp.com/notes/add', note, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  deleteNote(note) {
    return this.http.post('https://lit-chamber-10871.herokuapp.com/notes/delete', note, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  updateArchive(idArray : any) {
    return this.http.post('https://lit-chamber-10871.herokuapp.com/archives/add', idArray, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  removeFromGroup(removeGroupPack: IGroupChangePack) {
    return this.http.post(
      'https://lit-chamber-10871.herokuapp.com/members/remove/' + removeGroupPack.id_group,
      removeGroupPack.id_user,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    );
  }

  addToGroup(newGroupPack: IGroupChangePack) {
    return this.http.post(
      'https://lit-chamber-10871.herokuapp.com/members/add/' + newGroupPack.id_group,
      newGroupPack.id_user,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    );
  }
  unarchiveUsers(dataPack: IArchivesRevertDataPack) {
    return this.http.post('https://lit-chamber-10871.herokuapp.com/archives/revert/', dataPack, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  deleteUsers(dataPack: IArchivesDeleteDataPack) {
    return this.http.post('https://lit-chamber-10871.herokuapp.com/users/delete/', dataPack, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }
  updateSemesterDate(newData: ISemesterChangeValuePack) {
    return this.http.post('https://lit-chamber-10871.herokuapp.com/semesters/change/', newData, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  addSemester(message) {
    return this.http.post('https://lit-chamber-10871.herokuapp.com/semesters/add/', message, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  deleteSemesters(message) {
    return this.http.post('https://lit-chamber-10871.herokuapp.com/semesters/remove/', message, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  deleteGroups(dataPack: IGroupChangeDataPack) {
    return this.http.post('https://lit-chamber-10871.herokuapp.com/groups/remove/', dataPack, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  updateGroup(updateGroupInfoPack: IGroupChangeValuePack) {
    return this.http.post('https://lit-chamber-10871.herokuapp.com/groups/change/', updateGroupInfoPack, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  addGroup(newGroup: IGroupDetails) {
    return this.http.post('https://lit-chamber-10871.herokuapp.com/groups/add/', newGroup, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  updateInstallment(updateServerInfoPack: IInstallmentChangeValuePack) {
    return this.http.post(
      'https://lit-chamber-10871.herokuapp.com/installment/change/',
      updateServerInfoPack,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    );
  }

  addInstallment(newInstallments: IInstallments) {
    return this.http.post('https://lit-chamber-10871.herokuapp.com/installment/add/', newInstallments, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  deleteInstallment(message) {
    return this.http.post(
      'https://lit-chamber-10871.herokuapp.com/installment/remove/',
      message,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    );
  }
  deletePageAdmins(adminsToDelete: IAdminsDeleteDataPack) {
    return this.http.post('https://lit-chamber-10871.herokuapp.com/admins/remove/', adminsToDelete, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }
  deleteApplicationAdmins(message) {
    return this.http.post(
      'https://lit-chamber-10871.herokuapp.com/authorization/remove/',
      message,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    );
  }

  addPageAdmin(newAdmin: IAdministrator) {
    return this.http.post('https://lit-chamber-10871.herokuapp.com/admins/add/', newAdmin, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  addApplicationAdmin(newAdmin: IAdministrator) {
    return this.http.post('https://lit-chamber-10871.herokuapp.com/authorization/add/', newAdmin, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  updatePageAdmin(message) {
    return this.http.post('https://lit-chamber-10871.herokuapp.com/admins/change/', message, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }
  updateApplicationAdmin(message) {
    return this.http.post(
      'https://lit-chamber-10871.herokuapp.com/authorization/change/',
      message,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    );
  }
  generateApplicationAdminsPass(message) {
    return this.http.post(
      'https://lit-chamber-10871.herokuapp.com/authorization/generate/',
      message,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    );
  }

  generatePageAdminsPass(message) {
    return this.http.post('https://lit-chamber-10871.herokuapp.com/admins/generate/', message, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  generatePass(message) {
    return this.http.post('https://lit-chamber-10871.herokuapp.com/users/generate', message, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  login(message) {
    return this.http.post('https://lit-chamber-10871.herokuapp.com/login/', message, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  logout() {
    return this.http.get('https://lit-chamber-10871.herokuapp.com/logout/', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }



  /////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////

  // post - validators

  checkLogin(login: ICheckLogin): Observable<ICheckLoginError | null> {
    return this.http.post('https://lit-chamber-10871.herokuapp.com/users/exist/login', login, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }) as Observable<ICheckLoginError | null>;
  }

  checkEmail(email: ICheckEmail): Observable<ICheckEmailError | null>  {
    return this.http.post('https://lit-chamber-10871.herokuapp.com/users/exist/email', email, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }) as Observable<ICheckEmailError | null> ;
  }

  checkPhone(phone: ICheckPhone): Observable<ICheckPhoneError | null>  {
    return this.http.post('https://lit-chamber-10871.herokuapp.com/users/exist/phone', phone, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }) as  Observable<ICheckPhoneError | null> ;
  }

  checkKey(key: ICheckKey): Observable<ICheckKeyError | null>  {
    return this.http.post('https://lit-chamber-10871.herokuapp.com/users/exist/key', key, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }) as Observable<ICheckKeyError | null>;
  }

  // post

  addUser(newUser: IUser): Observable<null>    {
    return this.http.post('https://lit-chamber-10871.herokuapp.com/users/add', newUser, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }) as Observable<null> ;;
  }

  // put

  putUserData(newUser: IUser): Observable<null>    {
    return this.http.put('https://lit-chamber-10871.herokuapp.com/users/user', newUser, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }) as Observable<null> ;
  }

  putUserPassword(newPass: INewUserPass): Observable<null>    {
    return this.http.put('https://lit-chamber-10871.herokuapp.com/users/password', newPass, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }) as Observable<null> ;
  }

  putUserLogin(newLogin: INewUserLogin): Observable<null>    {
    return this.http.put('https://lit-chamber-10871.herokuapp.com/users/login', newLogin, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }) as Observable<null> ;
  }

  putUserKeys(newKey: INewUserKeys): Observable<null>    {
    return this.http.put('https://lit-chamber-10871.herokuapp.com/users/key', newKey, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }) as Observable<null> ;
  }

  setUserDeclaredContribution(id: number, body: IChargesUserSetData): Observable<null> {
    return this.http.put('-----' + id, body, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }) as  Observable<null>;
  }


    deleteUser(id): Observable<null> {
      return this.http.delete('https://lit-chamber-10871.herokuapp.com/users/delete/' + id, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }) as Observable<null>;
    }
}
