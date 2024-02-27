import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class APIquotesService {
  private api_url = 'https://api.quotable.io';

  constructor(private http: HttpClient) { }

  getTagQuotes(){
    const tagsUrl = this.api_url + '/tags';
    return this.http.get(tagsUrl)
  }

  getQuotesByTags(tag:string | null, pageNumber: number){
    const byTagsUrl = this.api_url + `/quotes/?tags=${tag}&page=${pageNumber}`;
    return this.http.get(byTagsUrl);
  }
}
