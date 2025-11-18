import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../../models/auth.model';
import { Token } from '../../models/token.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private get apiUrl(): string {
    const config = (window as any).APP_CONFIG;
    return config?.apiUrl || 'http://localhost:9500/oauth2';
  }

  constructor(private http: HttpClient) {}

  authUser(auth: Auth): Observable<Token> {
    return this.http.post<Token>(`${this.apiUrl}/token`, auth);
  }
}
