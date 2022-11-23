import { StagiaireModel } from "../models/stagiaire-model";

const stagiaires: any[] = [
    {
        id: 1,
        lastName: 'Aubert',
        firstName: 'Jean-Luc',
        birthDate: new Date(1968, 3, 30),
        gender: 'M',
        email: 'jean-luc.aubert@aelion.fr',
        phoneNumber: '06 11 11 11 11'
    },
    {
        id: 2,
        lastName: 'Bond',
        firstName: 'James',
        birthDate: new Date(1945, 5, 16),
        gender: 'M',
        email: 'james.bond@mi6.co.uk',
        phoneNumber: '00 70 07 00 70'
    },
    {
        id: 3,
        lastName: 'Connor',
        firstName: 'Sarah',
        birthDate: new Date(1979, 4, 4),
        gender: 'F',
        email: 'sarah.connor@kill.them.all.com',
        phoneNumber: '05 555 555 555'
    },
    {
        id: 4,
        lastName: 'Talut',
        firstName: 'Jean',
        birthDate: new Date(1979, 4, 4),
        gender: 'F',
        email: 'jean.talut@gmail.com',
        phoneNumber: '05 555 555 555'
    },
];

export class StagiaireService {
    private stagiaires: StagiaireModel[] = [];

    public getStagiaires(): StagiaireModel[] {
        return this.stagiaires;
    }

    public findOne(id: number): StagiaireModel {
       // Option 1 :
       for (const stagiaire of this.stagiaires) {
        if (stagiaire.id === id) {
            return stagiaire;
        }
       }
       throw new Error(`Stagiaire with ${id} was not found`);

       // Option 2 :
       const stagaire: StagiaireModel | undefined = this.stagiaires.find(
            (inStagiaire: StagiaireModel) => inStagiaire.id === id
        );
        if (stagaire !== undefined) {
            return stagaire!;
        }
        throw new Error(`Stagiaire with ${id} was not found`);
    }

    public deserialize(): void {
        stagiaires.forEach((anyStagiaire: any) => {
            const stagiaire: StagiaireModel = new StagiaireModel();
            stagiaire.id = anyStagiaire.id;
            stagiaire.lastName = anyStagiaire.lastName;
            stagiaire.firstName = anyStagiaire.firstName;
            stagiaire.birthDate = anyStagiaire.birthDate;
            stagiaire.gender = anyStagiaire.gender;
            stagiaire.email = anyStagiaire.email;
            stagiaire.phoneNumber = anyStagiaire.phoneNumber;

            // Add new stagiaire to the array
            this.stagiaires.push(stagiaire);
        })
    }
}
