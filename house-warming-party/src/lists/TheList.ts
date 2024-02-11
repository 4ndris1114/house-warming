export const capitals = [
    'Tirana',
    'Andorra la Vella',
    'Yerevan',
    'Vienna',
    'Baku',
    'Minsk',
    'Brussels',
    'Sarajevo',
    'Sofia',
    'Zagreb',
    'Nicosia',
    'Prague',
    'Copenhagen',
    'Tallinn',
    'Helsinki',
    'Paris',
    'Tbilisi',
    'Berlin',
    'Athens',
    'Budapest',
    'Reykjavik',
    'Dublin',
    'Rome',
    'Astana',
    'Pristina',
    'Riga',
    'Vaduz',
    'Vilnius',
    'Luxembourg (city)',
    'Valletta',
    'Chisinau',
    'Monaco',
    'Podgorica',
    'Amsterdam',
    'Skopje',
    'Oslo',
    'Warsaw',
    'Lisbon',
    'Bucharest',
    'Moscow',
    'San Marino',
    'Belgrade',
    'Bratislava',
    'Ljubljana',
    'Madrid',
    'Stockholm',
    'Bern',
    'Ankara',
    'Kyiv (also known as Kiev)',
    'London',
    'Vatican City'
];

export const hungarianAnthem = [
    "Isten,álddmegamagyart",
    "Jó kedvvel,bőséggel,",
    "Nyújtsfeléjevédőkart,",
    "Haküzdellenséggel;",
    "Balsorsakitrégentép,",
    "Hozzrávígesztendőt,",
    "Megbünhödtemárenép",
    "Amultatsjövendőt!"
];

export const planets = [
    'Mercury',
    'Venus',
    'Earth',
    'Mars',
    'Jupiter',
    'Saturn',
    'Uranus',
    'Neptune'
];

export const animals: string[] = [
    'Alpaca', 'Cat', 'Chimpanzee', 'Deer', 'Dog',
    'Eagle', 'Elephant', 'Flamingo', 'Giraffe',
    'Goat', 'Hen', 'Horse', 'Lion', 'Owl', 'Parrot',
    'Rabbit', 'Rhinoceros', 'Squirrel', 'Tiger'
];

export const getAnimalImageUrl = (animal: string) => {
    switch (animal) {
        case "Owl":
            return "https://images.unsplash.com/photo-1604605152447-1fcea1a333f3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        case "Flamingo":
            return "https://images.unsplash.com/photo-1532731222443-b3ef89fbc50d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YW5pbWFsJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D";
        case "Cat":
            return "https://images.unsplash.com/photo-1604967431505-b534f35c5541?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW5pbWFsJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D";
        case "Tiger":
            return "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YW5pbWFsJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D";
        case "Giraffe":
            return "https://images.unsplash.com/photo-1512636998392-acdc97b72114?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YW5pbWFsJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D";
        case "Lion":
            return "https://plus.unsplash.com/premium_photo-1669725687221-6fe12c2da6b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YW5pbWFsJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D";
        case "Dog":
            return "https://images.unsplash.com/photo-1612940960267-4549a58fb257?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YW5pbWFsJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D";
        case "Horse":
            return "https://images.unsplash.com/photo-1519614356164-43acba9cb25d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGFuaW1hbCUyMHBvcnRyYWl0fGVufDB8fDB8fHww";
        case "Deer":
            return "https://images.unsplash.com/photo-1517714948803-70e679aad1a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGFuaW1hbCUyMHBvcnRyYWl0fGVufDB8fDB8fHww";
        case "Chimpanzee":
            return "https://images.unsplash.com/photo-1590691565921-287ded4c80ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGFuaW1hbCUyMHBvcnRyYWl0fGVufDB8fDB8fHww";
        case "Rabbit":
            return "https://images.unsplash.com/photo-1529040274442-815019b0e4fc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGFuaW1hbCUyMHBvcnRyYWl0fGVufDB8fDB8fHww";
        case "Parrot":
            return "https://images.unsplash.com/photo-1511823794984-b87716139b88?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGFuaW1hbCUyMHBvcnRyYWl0fGVufDB8fDB8fHww";
        case "Elephant":
            return "https://images.unsplash.com/photo-1565030691486-9a708790064d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTR8fGFuaW1hbCUyMHBvcnRyYWl0fGVufDB8fDB8fHww";
        case "Alpaca":
            return "https://images.unsplash.com/photo-1517352551702-336dda93455e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzh8fGFuaW1hbCUyMHBvcnRyYWl0fGVufDB8fDB8fHww";
        case "Squirrel":
            return "https://images.unsplash.com/photo-1509919160358-7a6dc4c4f855?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ3fHxhbmltYWwlMjBwb3J0cmFpdHxlbnwwfHwwfHx8MA%3D%3D";
        case "Eagle":
            return "https://images.unsplash.com/photo-1517937084822-7a7dec318f30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjU2fHxhbmltYWwlMjBwb3J0cmFpdHxlbnwwfHwwfHx8MA%3D%3D";
        case "Hen":
            return "https://images.unsplash.com/photo-1511856942035-6c6146d14b90?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW5pbWFsJTIwcG9ydHJhaXQlMjBoZW58ZW58MHx8MHx8fDA%3D";
        case "Goat":
            return "https://images.unsplash.com/photo-1524609864400-829f6a124032?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YW5pbWFsJTIwcG9ydHJhaXQlMjBnb2F0fGVufDB8fDB8fHww";
        case "Rhinoceros":
            return "https://images.unsplash.com/photo-1534995890293-84afcbee574f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YW5pbWFsJTIwcG9ydHJhaXQlMjByaGlub2Nlcm9zfGVufDB8fDB8fHww";
        default:
            return "";
    }
}

// my little test password:
// Budapest9/2/2024Isten,álddmegamagyart1MercuryHangar16700a2+b2=c2|kayak|AndrasKatie