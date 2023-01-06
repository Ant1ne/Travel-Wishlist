export type Country = {
    name: {
        common: string,
        official: string,
    };
    currencies: {
        name: string,
        symbol: string
    };
    capital: string[];
    region: string;
    languages: object;
    flag: string;
    maps: {
        googleMaps: string
    };
    population: number;
    flags: {
        png: string,
        svg: string
    };
    wish: boolean

};