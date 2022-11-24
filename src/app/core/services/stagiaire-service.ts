import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StagiaireModel } from "../models/stagiaire-model";
import { environment } from "./../../../environments/environment";
import { map, take } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class StagiaireService {
    public constructor(
        private httpClient: HttpClient
    ) {}

    // CRUD methods : Create Read Update Delete
    public findAll(): Observable<StagiaireModel[]> {
        return this.httpClient.get<any[]>(
            `${environment.fakeApi}stagiaires`
        )
        .pipe(
            take(1), // Prends le premier résultat et arrête d'observer
            map((httpResponseBody: any[]) => {
                return httpResponseBody.map((anyStagiaire: any) => {
                    return this.deserialize(anyStagiaire)
                }) // Transforme un tableau en un autre tableau
            }) // Transforme un Observable (ici O<any[]>) en un autre Observable (O<StagiaireModel[]>)
        ) // pipeline
    }

    public findOne(id: number): Observable<StagiaireModel> {
       return this.httpClient.get<any>(
        `${environment.fakeApi}stagiaires/${id}`
       ).pipe(
        take(1),
        map((anyStagiaire: any) => {
            return this.deserialize(anyStagiaire);
        })
       )
    }

    public create(datas: any): void {}

    public update(datas: any): void {}

    public delete(datas: any): void {}

    public deserialize(anyStagiaire: any): StagiaireModel {
        const stagiaire: StagiaireModel = new StagiaireModel();

        stagiaire.id = anyStagiaire.id;
        stagiaire.lastName = anyStagiaire.lastName;
        stagiaire.firstName = anyStagiaire.firstName;
        stagiaire.birthDate = anyStagiaire.birthDate;
        stagiaire.gender = anyStagiaire.gender;
        stagiaire.email = anyStagiaire.email;
        stagiaire.phoneNumber = anyStagiaire.phoneNumber;

        return stagiaire;
    }
}
