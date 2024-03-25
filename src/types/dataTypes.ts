export type userData = {
    prenom:string,
    nom:string,
}

export type genericData = {
    label: string,
}

export type outputT = {
    prenom: string,
    nom: string,
    lieu: string,
    activite: string,
    produits: string[],
    pratiques: string[],
    date_debut: string,
    duree: number
}

export type configT = {
    utilisateurs: userData[],
    lieux: string[],
    activites: string[],
    produits: string[],
    pratiques: string[],
}

export type compteurT = {
    nom: string,
    compteur: number
}

export type userSaveT = {
    lieux: compteurT[],
    activites: compteurT[],
    produits: compteurT[],
    pratiques: compteurT[]
}