import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ServerService {
  constructor(private http: HttpClient) {}

  getUserById(id) {
    return this.http.get('http://localhost:3000/users/' + id);
  }

  getAdmins() {
    return this.http.get('http://localhost:3000/admins/');
  }

  getInstallment() {
    return this.http.get('http://localhost:3000/installment');
  }

  getAuthorization() {
    return this.http.get('http://localhost:3000/authorization/');
  }

  getPresenceById(id) {
    return this.http.get('http://localhost:3000/presence/' + id);
  }

  getUsers() {
    return this.http.get('http://localhost:3000/users');
  }

  getUsersWithAssignments() {
    return this.http.get('http://localhost:3000/assignments/');
  }

  getPresence() {
    return this.http.get('http://localhost:3000/presence');
  }

  getList() {
    return this.http.get('http://localhost:3000/list');
  }

  getCharges() {
    return this.http.get('http://localhost:3000/charges');
  }

  getChargesById(id) {
    return this.http.get('http://localhost:3000/charges/' + id);
  }

  getArchives() {
    return this.http.get('http://localhost:3000/archives');
  }

  getSemesters() {
    return this.http.get('http://localhost:3000/semesters/');
  }

  getGroups() {
    return this.http.get('http://localhost:3000/groups/');
  }

  getGroupsHeadersById(id) {
    return this.http.get('http://localhost:3000/groups/' + id);
  }

  getSemesterHeaders() {
    return this.http.get('http://localhost:3000/semesters/headers');
  }

  getSemesterDetails() {
    return this.http.get('http://localhost:3000/semesters/details');
  }

  getUsersInGroupByIdGroup(group) {
    return this.http.get('http://localhost:3000/groups/findbyidgroup/' + group);
  }


  // Stats all

  getStatCharges() {
    return this.http.get('http://localhost:3000/statistics/charges');
  }

  getStatUniversity() {
    return this.http.get('http://localhost:3000/statistics/universities');
  }

  getStatGender() {
    return this.http.get('http://localhost:3000/statistics/gender');
  }

  getStatArchivesGender() {
    return this.http.get('http://localhost:3000/statistics/archives/gender');
  }

  getStatPeople() {
    return this.http.get('http://localhost:3000/statistics/people');
  }

  // Stat by ID

  getStatPresenceAllById(id) {
    return this.http.get('http://localhost:3000/statistics/presence/all/' + id);
  }

  getStatPresencGroupByIdAndIdSemester(id, id_semester) {
    return this.http.get('http://localhost:3000/statistics/people/' + id + '/' + id_semester);
  }

  getStatPresenceById(id) {
    return this.http.get(
      'http://localhost:3000/statistics/presence/' + id
    );
  }

  // post

  postUser(id, data) {
    return this.http.post('http://localhost:3000/users/' + id, data);
  }

  postNote(note) {
    return this.http.post('http://localhost:3000/notes/' , note, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
     });
  }

  postNotes(note) {
    return this.http.post('http://localhost:3000/notes/add' , note, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
     });
  }

  deleteNote(note) {
    return this.http.post('http://localhost:3000/notes/delete', note, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
     });
  }

  updateArchive(idArray){
    return this.http.post('http://localhost:3000/archives/add' , idArray, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
     });
  }

  removeFromGroup(id, message){
    return this.http.post('http://localhost:3000/members/remove/' + id, message, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
     });
  }

  addToGroup(id_group, idArray){
    return this.http.post('http://localhost:3000/members/add/' + id_group, idArray, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
     });
  }
  unarchiveUsers (idArray){
    return this.http.post('http://localhost:3000/archives/revert/', idArray, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
     });
  }

  deleteUsers (idArray){
    return this.http.post('http://localhost:3000/users/delete/', idArray, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
     });
  }
  updateDate (message){
    return this.http.post('http://localhost:3000/semesters/change/', message, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
     });
  }

  addSemester (message){
    return this.http.post('http://localhost:3000/semesters/add/', message, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
     });
  }

  deleteSemesters (message){
    return this.http.post('http://localhost:3000/semesters/remove/', message, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
     });
  }

  deleteGroups (message){
    return this.http.post('http://localhost:3000/groups/remove/', message, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
     });
  }

  updateGroup (message){
    return this.http.post('http://localhost:3000/groups/change/', message, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
     });
  }

  addGroup (message){
    return this.http.post('http://localhost:3000/groups/add/', message, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
     });
  }

  updateInstallment (message){
    return this.http.post('http://localhost:3000/installment/change/', message, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
     });
  }

  addInstallment (message){
    return this.http.post('http://localhost:3000/installment/add/', message, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
     });
  }

  deleteInstallment(message){
    return this.http.post('http://localhost:3000/installment/remove/', message, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
     });
  }
}
