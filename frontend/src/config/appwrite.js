import { Client, Account } from "appwrite";

const client = new Client()
    .setEndpoint('https://wannado.onrender.com/')
    .setProject(process.env.REACT_APP_PROJECT_ID)

const account = new Account(client);

export default account