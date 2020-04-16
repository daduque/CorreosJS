import { getMails } from './getCorreos.js';

let fichaTecnica;

const mails = async () => {
    fichaTecnica = await getMails()
    console.log(fichaTecnica);

};

mails();