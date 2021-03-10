export interface Audits {
    username: string,
    image: string,
    notes: string,
    tags: string[],
    date: string,
}

export const getAudits = (user: string): Audits[] => {
    return [
        {
            username: user,
            image: "https://miro.medium.com/max/700/1*VqkKTiFqZn40oSxpo42w6A.jpeg",
            notes: "Tenant hasn't turned their stove off in 2 days",
            tags: ['fire hazard', 'energy efficiency'],
            date: "31/03/21",
        },
        {
            username: user,
            image: "https://miro.medium.com/max/700/1*VqkKTiFqZn40oSxpo42w6A.jpeg",
            notes: "Tenant has bad food",
            tags: ['food quality', 'disappointment is immeasurable', 'day is ruined'],
            date: "02/02/21",
        },
        {
            username: user,
            image: "https://miro.medium.com/max/700/1*VqkKTiFqZn40oSxpo42w6A.jpeg",
            notes: "Tenant needs to solve cockroach infestation",
            tags: ['infestation', 'pest control'],
            date: "14/02/21",
        },
        {
            username: user,
            image: "https://miro.medium.com/max/700/1*VqkKTiFqZn40oSxpo42w6A.jpeg",
            notes: "Tenant hasn't paid fees",
            tags: ['contract', 'monetary', 'payment'],
            date: "04/01/20",
        },
    ];
};
