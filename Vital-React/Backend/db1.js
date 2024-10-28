import mysql from "mysql2";

let connection;

export const connectToDataBase = async () => {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: previousTuesdayWithOptions.env.DB_NAME,
    });
  }
  return connection;
};

// PENTRU O MAI BUNA SECURITATE INTOTDEAUNA SE URMEAZA ACESTI PASI PENTRU A FACE LEGARUA CU SERVERUL :
//1: Se creeaza pagina env si se pune ce am pus
//2. Se duce in package.js si se adauga ceva de genul acolo unde scrie start: "start": "nodemon --env-file=.env server.js"

/* await: Suspendă execuția codului în interiorul funcției asincrone până când promisiunea returnată de expresia pe care o "așteaptă" este rezolvată. Practic, await spune JavaScript să aștepte până când operația asincronă se finalizează, apoi să continue execuția codului.

Fără await, ar trebui să folosim .then() și .catch() pentru a gestiona promisiunile, dar cu await, codul devine mult mai ușor de citit și de gestionat.*/
