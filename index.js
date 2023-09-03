import {Client, IntentsBitField} from "discord.js";
import {SlashCreator, GatewayServer, SlashCommand} from "slash-create";
import fs from "fs-extra"
import path from "path";
import creds from "./creds.json" assert {type: "json"};

const client = new Client({
    intents: [Object.keys(IntentsBitField.Flags).filter((v,i,a) => Number.isNaN(v))]
})

const slashClient = new SlashCreator({
    token: creds.token,
    client: client,
    applicationID: creds.clientId,
    publicKey: creds.publicKey
})

class Command extends SlashCommand {
    constructor(creator){
        super(creator, {
            name: 'command',
            description: "a command yes"
        })

        this.filePath = "index.js";
    }

    async run(ctx) {
        return 1;
    }
}

slashClient
 .withServer(
    new GatewayServer((handler) => client.ws.on('INTERACTION_CREATE', handler))
 ).registerCommand(Command)
 .syncCommands()

client.login(creds.token)