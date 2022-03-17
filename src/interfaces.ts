export interface IWilder {
    _id: string;
    name: string;
    city: string;
    skills: { title: string, votes: number }[];
}