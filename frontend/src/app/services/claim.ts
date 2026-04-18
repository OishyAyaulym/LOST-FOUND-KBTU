import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Claim,Comment } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  private apiUrl = 'http://127.0.0.1:8000/api/claims/'; 

  constructor(private http: HttpClient) {}

  createClaim(claimData: Claim): Observable<Claim> {
    return this.http.post<Claim>(this.apiUrl, claimData);
  }
}
