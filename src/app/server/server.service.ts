import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ServerService {
  constructor(private http: HttpClient) {}

  getUserById() {
    return this.http.get('http://localhost:3000/users/21');
  }

  getPresenceById(id) {
    return this.http.get('http://localhost:3000/presence/' + id);
  }

  getUsers() {
    return this.http.get('http://localhost:3000/users');
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

  getChargesById() {
    return this.http.get('http://localhost:3000/charges/21');
  }

  getArchives() {
    return this.http.get('http://localhost:3000/archives');
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

  getStatPresenceMonthById(id) {
    return this.http.get(
      'http://localhost:3000/statistics/presence/month/' + id
    );
  }

  getStatPresenceSemestrById(id) {
    return this.http.get(
      'http://localhost:3000/statistics/presence/semestr/' + id
    );
  }
  getStatPresenceWeekById(id) {
    return this.http.get(
      'http://localhost:3000/statistics/presence/week/' + id
    );
  }
}
