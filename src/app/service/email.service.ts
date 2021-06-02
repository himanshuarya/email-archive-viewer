import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isDefined } from 'src/lib/util';
import { EmailArchive } from '../entities/email.entities';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  public constructor(private http: HttpClient) { }

  public async getEmailArchives(): Promise<EmailArchive[]> {
    try {
      let responseData: any = await this.http.get('assets/email.json').toPromise();
      if (isDefined(responseData.data)) {
        responseData = { content: JSON.parse(responseData.data) };
      }
      return isDefined(responseData.content) ? responseData.content : responseData;
    } catch (err) {
      return null;
    }
  }
}
