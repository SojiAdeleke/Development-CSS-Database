interface Contact {
    name: string;
    email: string;
}

interface TLFiller {
    tls: Contact[];
    responsibilityName: string;
}

const seminarFiller: TLFiller = {
    tls: [
        {
            name: "Jeremiah",
            email: "jcsamuel@umd.edu",
        }
    ],
    responsibilityName: "Seminar",
}

const frontDeskFiller: TLFiller = {
    tls: [
        {
            name: "Revelin",
            email: "rthomps8@umd.edu",
        },
    ],
    responsibilityName: "Front Desk",
}

const studySessionFiller: TLFiller = {
    tls: [
        {
            name: "Aaron",
            email: "awrigh13@terpmail.umd.edu",
        },
        {
            name: "Andrew",
            email: "ayerom21@terpmail.umd.edu",
        },
        {
            name: "Jairo",
            email: "jhuaylin@terpmail.umd.edu",
        },
        {
            name: "Nene",
            email: "nnarhmen@terpmail.umd.edu",
        },
    ],
    responsibilityName: "Study Session",
};

const presidentInfo: Contact = {
    name: "Matteo Patzy",
    email: "mpatzy@terpmail.umd.edu",
};

const vicePresidentInfo: Contact = {
    name: "Revelin Thompson",
    email: "rthomps8@umd.edu",
};

const gaInfo: string[] = [
    "mlong128@umd.edu",
    "marcm97@umd.edu",
    "joya@umd.edu"
];

const databaseAdmin: string[] = [
    "aolarinde@gmail.com",
    "iduncan@terpmail.umd.edu",
    "mtshumba@terpmail.umd.edu"
]
