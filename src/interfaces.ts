export interface ISkill {
    title: string;
    votes: number;
}

export interface IWilder {
    _id: string;
    name: string;
    city: string;
    skills: ISkill[];
}

