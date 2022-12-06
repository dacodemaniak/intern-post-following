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

    private static readonly CONTROLLER_PATH: string = `${environment.api}trainees`;    
    // private static readonly CONTROLLER_PATH: string = `${environment.fakeApi}stagiaires`;    

    public constructor(
        private httpClient: HttpClient
    ) {}

    // CRUD methods : Create Read Update Delete
    public findAll(): Observable<StagiaireModel[]> {
        return this.httpClient.get<any[]>(
            StagiaireService.CONTROLLER_PATH
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
        `${StagiaireService.CONTROLLER_PATH}/${id}` // http://localhost:3000/stagiaires/2
       ).pipe(
        take(1), // Récupère l'objet qui vient de l'API
        map((anyStagiaire: any) => { // Transforme le any en StagiaireModel
            return this.deserialize(anyStagiaire);
        })
       )
    }

    public create(datas: any): Observable<StagiaireModel> {
        // console.log(`Values received by service : ${JSON.stringify(datas)}`);
        console.log("Values received by service:", datas);
       
        // POST the stagiaire completed
        return this.httpClient.post<StagiaireModel>(
            StagiaireService.CONTROLLER_PATH,
            // this.deserialize(datas)
            datas
        )
        .pipe(
            take(1), // Récupère l'objet qui vient de l'API
            map((anyStagiaire: any) => { // Transforme le any en StagiaireModel
                return this.deserialize(anyStagiaire);
            })
        )
        //.subscribe();
        //         return stagiaire;
        //     })
        // )
    }

    public update(datas: any): void {}

    public delete(datas: StagiaireModel): Observable<HttpResponse<any>> {
        return this.httpClient.delete<any>(
            `${StagiaireService.CONTROLLER_PATH}/${datas.id}`,
            {
                observe: 'response' // HttpResponse {status: 200 [40x, 50x], body: any}
            }
        );
    }

    public deserialize(anyStagiaire: any): StagiaireModel {
        const stagiaire: StagiaireModel = new StagiaireModel();

        stagiaire.id = anyStagiaire.id;
        stagiaire.lastname = anyStagiaire.lastname;
        stagiaire.firstname = anyStagiaire.firstname;
        stagiaire.birthdate = new Date(anyStagiaire.birthdate);
        stagiaire.gender = anyStagiaire.gender;
        stagiaire.email = anyStagiaire.email;
        stagiaire.phoneNumber = anyStagiaire.phoneNumber;

        return stagiaire;
    }
}
