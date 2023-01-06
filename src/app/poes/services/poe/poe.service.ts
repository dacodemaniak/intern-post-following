import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { PoeDeserializer } from 'src/app/core/helpers/poe-deserializer';
import { ICrud } from 'src/app/core/interfaces/i-crud';
import { Poe } from 'src/app/core/models/poe';
import { ApiPoeType } from 'src/app/core/types/api-poe-type';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PoeService implements ICrud<Poe> {

  private static readonly _CONTROLLER_PATH: string = `${environment.api}poes`;

  constructor(
    private _httpClient: HttpClient
  ) { }

  findAll(): Observable<Poe[]> {
    return this._httpClient.get<any>(
      PoeService._CONTROLLER_PATH
    )
    .pipe(
      take(1),
      map((fromApiPoes: ApiPoeType[]) => {
        return fromApiPoes.map((fromApiPoe: ApiPoeType) => {
          const poe: Poe = new Poe();
          poe.id = fromApiPoe.id;
          poe.title = fromApiPoe.title;
          poe.beginDate = new Date(fromApiPoe.beginDate);
          poe.endDate = new Date(fromApiPoe.endDate);
          poe.poeType = fromApiPoe.poeType;
          return poe;

        })
      })
    )
  }
  findOne(id: number): Observable<Poe> {
    return this._httpClient.get<ApiPoeType>(
      `${PoeService._CONTROLLER_PATH}/${id}`,
      {
        observe: 'response'
      }
    ).pipe(
      take(1),
      map((response: HttpResponse<ApiPoeType>) => {
        return new PoeDeserializer().deserialize(response.body);
      })
    )
  }
  create(datas: any): Observable<HttpResponse<any>> {
    throw new Error('Method not implemented.');
  }
  update(datas: Poe): void {
    throw new Error('Method not implemented.');
  }
  delete(datas: Poe): void {
    throw new Error('Method not implemented.');
  }

}
