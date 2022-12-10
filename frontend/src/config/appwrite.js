import { Client, Account } from "appwrite";

const client = new Client()
    .setEndpoint('http://localhost/v1')
    .setProject(process.env.REACT_APP_PROJECT_ID)

const account = new Account(client);

export default account