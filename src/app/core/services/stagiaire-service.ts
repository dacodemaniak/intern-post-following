import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StagiaireModel } from "../models/stagiaire-model";
import { environment } from "./../../../environments/environment";
import { map, switchMap, take } from 'rxjs/operators';
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
        `${environment.fakeApi}stagiaires/${id}` // http://localhost:3000/stagiaires/2
       ).pipe(
        take(1), // Récupère l'objet qui vient de l'API
        map((anyStagiaire: any) => { // Transforme le any en StagiaireModel
            return this.deserialize(anyStagiaire);
        })
       )
    }

    public create(datas: any): Observable<StagiaireModel> {
        console.log(`Values received by service : ${JSON.stringify(datas)}`);
        /**
         * {
         *  lastName: "...",
         *  firstName: "...",
         *  gender: "...",
         *  birthDate: "...",
         *  phoneNumber: "...",
         *  email: "..."
         * }
         */
        // Get the next id before to send to backend
        return this.findAll()
        .pipe(
            take(1),
            map((stagiaires: StagiaireModel[]) => {
                // Compute nextId
                let nextId = 1;
                if (stagiaires.length) {
                    nextId = stagiaires.sort((s1: StagiaireModel, s2: StagiaireModel) => s2.id - s1.id)[0].id + 1
                }
                datas.id = nextId;
                const stagiaire: StagiaireModel = this.deserialize(datas);
                // POST the stagiaire completed
                this.httpClient.post<StagiaireModel>(
                    `${environment.fakeApi}stagiaires`,
                    datas
                ).subscribe();
                return stagiaire;
            })
        )
    }

    public update(datas: any): void {}

    public delete(datas: StagiaireModel): Observable<HttpResponse<any>> {
        return this.httpClient.delete<any>(
            `${environment.fakeApi}stagiaires/${datas.id}`,
            {
                observe: 'response' // HttpResponse {status: 200 [40x, 50x], body: any}
            }
        );
    }

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
