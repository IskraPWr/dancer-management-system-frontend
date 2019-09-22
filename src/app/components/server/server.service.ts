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
    return this.http.get('http://localhost:3000/users/' + id, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }) as Observable<IUser>;
  }

  getAdmins() {
    return this.http.get('http://localhost:3000/admins/', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getInstallment() {
    return this.http.get('http://localhost:3000/installment', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getAuthorization() {
    return this.http.get('http://localhost:3000/authorization/', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getPresenceById(id) {
    return this.http.get('http://localhost:3000/presence/' + id, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getUsers() {
    return this.http.get('http://localhost:3000/users', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getUsersWithAssignments() {
    return this.http.get('http://localhost:3000/assignments/', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  checkPageAdminPassword(checkAdminDataPack: ICheckAdmin) {
    return this.http.post('http://localhost:3000/admins/check/', checkAdminDataPack, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  checkApplicationAdminPassword(checkAdminDataPack: ICheckAdmin) {
    return this.http.post('http://localhost:3000/authorization/check/', checkAdminDataPack, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getPresence() {
    return this.http.get('http://localhost:3000/presence', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getTransactionsList() {
    return this.http.get('http://localhost:3000/list', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getCharges() {
    return this.http.get('http://localhost:3000/charges', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getChargesById(id) {
    return this.http.get('http://localhost:3000/charges/' + id, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getArchives() {
    return this.http.get('http://localhost:3000/archives', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getSemesters() {
    return this.http.get('http://localhost:3000/semesters/', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getGroups() {
    return this.http.get('http://localhost:3000/groups/', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getGroupsHeadersById(id) {
    return this.http.get('http://localhost:3000/groups/' + id, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getSemesterHeaders() {
    return this.http.get('http://localhost:3000/semesters/headers', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getSemesterDetails() {
    return this.http.get('http://localhost:3000/semesters/details', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getUsersInGroupByIdGroup(group) {
    return this.http.get(
      'http://localhost:3000/groups/findbyidgroup/' + group,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    );
  }

  // Stats all

  getStatOfDeclaredCharges() {
    return this.http.get('http://localhost:3000/statistics/charges', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getStatUniversity() {
    return this.http.get('http://localhost:3000/statistics/universities', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getStatGender() {
    return this.http.get('http://localhost:3000/statistics/gender', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getStatArchivesGender() {
    return this.http.get('http://localhost:3000/statistics/archives/gender', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  getStatPeople() {
    return this.http.get('http://localhost:3000/statistics/people', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  // Stat by ID

  getStatPresenceAllById(id) {
    return this.http.get(
      'http://localhost:3000/statistics/presence/all/' + id,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    );
  }

  getStatPresenceGroupByIdAndIdSemester(id, id_semester) {
    return this.http.get(
      'http://localhost:3000/statistics/people/' + id + '/' + id_semester,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    );
  }

  getStatPresenceById(id) {
    return this.http.get('http://localhost:3000/statistics/presence/' + id, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  // post

  updateUser(id, data) {
    return this.http.post('http://localhost:3000/users/' + id, data, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  postNote(note) {
    return this.http.post('http://localhost:3000/notes/', note, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  postNotes(note) {
    return this.http.post('http://localhost:3000/notes/add', note, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  deleteNote(note) {
    return this.http.post('http://localhost:3000/notes/delete', note, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  updateArchive(idArray : any) {
    return this.http.post('http://localhost:3000/archives/add', idArray, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  removeFromGroup(removeGroupPack: IGroupChangePack) {
    return this.http.post(
      'http://localhost:3000/members/remove/' + removeGroupPack.id_group,
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
      'http://localhost:3000/members/add/' + newGroupPack.id_group,
      newGroupPack.id_user,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    );
  }
  unarchiveUsers(dataPack: IArchivesRevertDataPack) {
    return this.http.post('http://localhost:3000/archives/revert/', dataPack, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  deleteUsers(dataPack: IArchivesDeleteDataPack) {
    return this.http.post('http://localhost:3000/users/delete/', dataPack, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }
  updateSemesterDate(newData: ISemesterChangeValuePack) {
    return this.http.post('http://localhost:3000/semesters/change/', newData, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  addSemester(message) {
    return this.http.post('http://localhost:3000/semesters/add/', message, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  deleteSemesters(message) {
    return this.http.post('http://localhost:3000/semesters/remove/', message, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  deleteGroups(dataPack: IGroupChangeDataPack) {
    return this.http.post('http://localhost:3000/groups/remove/', dataPack, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  updateGroup(updateGroupInfoPack: IGroupChangeValuePack) {
    return this.http.post('http://localhost:3000/groups/change/', updateGroupInfoPack, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  addGroup(newGroup: IGroupDetails) {
    return this.http.post('http://localhost:3000/groups/add/', newGroup, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  updateInstallment(updateServerInfoPack: IInstallmentChangeValuePack) {
    return this.http.post(
      'http://localhost:3000/installment/change/',
      updateServerInfoPack,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    );
  }

  addInstallment(newInstallments: IInstallments) {
    return this.http.post('http://localhost:3000/installment/add/', newInstallments, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  deleteInstallment(message) {
    return this.http.post(
      'http://localhost:3000/installment/remove/',
      message,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    );
  }
  deletePageAdmins(adminsToDelete: IAdminsDeleteDataPack) {
    return this.http.post('http://localhost:3000/admins/remove/', adminsToDelete, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }
  deleteApplicationAdmins(message) {
    return this.http.post(
      'http://localhost:3000/authorization/remove/',
      message,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    );
  }

  addPageAdmin(newAdmin: IAdministrator) {
    return this.http.post('http://localhost:3000/admins/add/', newAdmin, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  addApplicationAdmin(newAdmin: IAdministrator) {
    return this.http.post('http://localhost:3000/authorization/add/', newAdmin, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  updatePageAdmin(message) {
    return this.http.post('http://localhost:3000/admins/change/', message, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }
  updateApplicationAdmin(message) {
    return this.http.post(
      'http://localhost:3000/authorization/change/',
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
      'http://localhost:3000/authorization/generate/',
      message,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    );
  }

  generatePageAdminsPass(message) {
    return this.http.post('http://localhost:3000/admins/generate/', message, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  generatePass(message) {
    return this.http.post('http://localhost:3000/users/generate', message, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  login(message) {
    return this.http.post('http://localhost:3000/login/', message, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  logout() {
    return this.http.get('http://localhost:3000/logout/', {
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
    return this.http.post('http://localhost:3000/users/exist/login', login, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }) as Observable<ICheckLoginError | null>;
  }

  checkEmail(email: ICheckEmail): Observable<ICheckEmailError | null>  {
    return this.http.post('http://localhost:3000/users/exist/email', email, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }) as Observable<ICheckEmailError | null> ;
  }

  checkPhone(phone: ICheckPhone): Observable<ICheckPhoneError | null>  {
    return this.http.post('http://localhost:3000/users/exist/phone', phone, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }) as  Observable<ICheckPhoneError | null> ;
  }

  checkKey(key: ICheckKey): Observable<ICheckKeyError | null>  {
    return this.http.post('http://localhost:3000/users/exist/key', key, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }) as Observable<ICheckKeyError | null>;
  }

  // post

  addUser(newUser: IUser): Observable<null>    {
    return this.http.post('http://localhost:3000/users/add', newUser, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }) as Observable<null> ;;
  }

  // put

  putUserData(newUser: IUser): Observable<null>    {
    return this.http.put('http://localhost:3000/users/user', newUser, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }) as Observable<null> ;
  }

  putUserPassword(newPass: INewUserPass): Observable<null>    {
    return this.http.put('http://localhost:3000/users/password', newPass, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }) as Observable<null> ;
  }

  putUserLogin(newLogin: INewUserLogin): Observable<null>    {
    return this.http.put('http://localhost:3000/users/login', newLogin, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }) as Observable<null> ;
  }

  putUserKeys(newKey: INewUserKeys): Observable<null>    {
    return this.http.put('http://localhost:3000/users/key', newKey, {
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
      return this.http.delete('http://localhost:3000/users/delete/' + id, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }) as Observable<null>;
    }
}
