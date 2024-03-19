export interface userData {
    prenom:string,
    nom:string,
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
    utilisateurs: userData[],
    lieux: string[],
    activites: string[],
    produits: string[],
    pratiques: string[],
}
