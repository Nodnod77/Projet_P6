export interface dataTypes {
    name:string,
    surname:string,
}

export interface genericData {
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
    utilisateurs: {prenom: string, nom: string}[],
    lieux: string[],
    activites: string[],
    produits: string[],
    pratiques: string[],
}
