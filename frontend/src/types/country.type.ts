
export type TCountry = {
    countryCode:string,
    name:string
}

export type TCountryInfo = {
    commonName:string,
    officialName:string,
    countryCode:string,
    region:string,
    borders:TCountryInfo[] | null,
    population:{
        year:number,
        value:number
    },
    flagURI:string
}