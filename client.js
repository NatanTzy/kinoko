/*
 * Creator: Zaenishi
 * WhatsApp: +62 831-8822-9366
 * Instagram: @zaenishi
 * Twitter: @zaenishi
 * GitHub: zaenishi
 *
 * Jangan sungkan untuk menghubungi saya jika ada masalah pada script ini!
*/


/* module external */
import pino from "pino"
import fs from "node:fs"
import { Boom } from "@hapi/boom"
import * as baileys from "baileys"
import session from "session"
import readline from "readline"
import path from "path"
import axios from "axios"
import util from "util"
import { pathToFileURL } from "url"
import { createRequire } from "module"
const require = createRequire(import.meta.url)
import cmd from './system/cmd.js';

/* module internal */
const { Client, msg } = await import(`./system/serialize.js?${Date.now()}`)
import * as dbprov from "./system/db/provider.js"
import color from "./system/color.js"
import Color from "./system/color.js"
import setting from "./setting.js"
import sch from "./system/db/schema.js"
import * as func from "./system/function.js"
const { default: CommandHandler } = await import(`./system/cmd.js?${Date.now()}`)
const logger = pino({ timestamp: () => `,"time":"${new Date().toJSON()}"` })
logger.level = 'fatal'

let state, saveCreds, clearAll
if (setting.typedb === "mongo") {
    ({ state, saveCreds, clearAll } = await session.useMongoAuthState(setting.db.mongo))
} else {
    ({ state, saveCreds } = await baileys.useMultiFileAuthState("./.session"));
}

const mydb = /json/i.test(setting.typedb)
    ? new dbprov.Local()
    : /mongo/i.test(setting.typedb)
        ? new dbprov.MongoDB(setting.db.mongo, 'db_bot')
        : process.exit(1)

let db = await mydb.read()
if (!db || Object.keys(db).length === 0) {
    db = {
        users: {},
        groups: {},
        setting: {},
        contacts: {},
        groupMetadata: {}
    }
    await mydb.write(db)
    console.log(color.green("Database initialized!"))
} else {
    console.log(color.yellow("Database loaded."))
}
let phone = db?.setting?.number

async function connectWA() {
    process.on("uncaughtException", error => {
        console.error("Uncaught Exception:", error.message)
    })
    async function getPhoneNumber() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        return new Promise((resolve) => {
            rl.question('[+] WhatsApp: ', async (number) => {
                db.setting.number = number.replace(/[^0-9]/g, '')
                db.setting.owner = setting.owner
                await mydb.write(db)
                rl.close()
                resolve(number.replace(/[^0-9]/g, ''))
            })
        })
    }
    const { version, isLatest } = await baileys.fetchLatestBaileysVersion()

    if (!phone) {
        phone = await getPhoneNumber()
    }

    console.log(color.cyan(`[+] Request Pairing: ${phone}`))

    const sock = Client(db, {
        version,
        logger,
        auth: {
            creds: state.creds,
            keys: baileys.makeCacheableSignalKeyStore(state.keys, logger)
        },
        mobile: false,
        printQRInTerminal: true,
        browser: baileys.Browsers.ubuntu("Chrome"),
        markOnlineOnConnect: false,
        generateHighQualityLinkPreview: true,
        syncFullHistory: false,
        retryRequestDelayMs: 10,
        transactionOpts: { maxCommitRetries: 10, delayBetweenTriesMs: 10 },
        maxMsgRetryCount: 15,
        appStateMacVerification: {
            patch: true,
            snapshot: true
        },
    })

    if (!sock.authState.creds.registered) {
        setTimeout(async () => {
            const code = (await sock.requestPairingCode(phone))
                ?.match(/.{1,4}/g)
                ?.join("-") || ""
            console.log(`Your Pairing Code: `, color.green(code))
        }, 3000)
    }

    sock.ev.on("connection.update", async update => {
        const { lastDisconnect, connection, receivedPendingNotifications } = update

        if (receivedPendingNotifications && !sock.authState.creds?.myAppStateKeyId) {
            sock.ev.flush()
        }
        if (connection) {
            console.log(color.yellow(`[+] Connection Status : ${connection}`))
        }
        if (connection === 'close') {
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode
            // console.log('reason: ', reason)
            //console.log('dis ', baileys.DisconnectReason)

            switch (reason) {
                case 408:
                    console.log(color.red('[+] Connection timed out. restarting...'))
                    await connectWA()
                    break
                case 503:
                    console.log(color.red('[+] Unavailable service. restarting...'))
                    await connectWA()
                    break
                case 428:
                    console.log(color.cyan('[+] Connection closed, restarting...'))
                    await connectWA()
                    break
                case 515:
                    console.log(color.cyan('[+] Need to restart, restarting...'))
                    await connectWA()
                    break

                case 401:
                    try {
                        console.log(color.cyan('[+] Session Logged Out.. Recreate session...'))
                        if (setting.typedb === "mongo") {
                            await clearAll()
                        } else {
                            fs.rmSync('.session', { recursive: true, force: true })
                        }
                        console.log(color.green('[+] Session removed!!'))
                        process.send('reset')
                    } catch {
                        console.log(color.cyan('[+] Session not found!!'))
                    }
                    break

                case 403:
                    console.log(color.red(`[+] Your WhatsApp Has Been Baned :D`))
                    if (setting.typedb === "mongo") {
                        await clearAll()
                    } else {
                        fs.rmSync('.session', { recursive: true, force: true })
                    }
                    process.send('reset')
                    break

                case 405:
                    try {
                        console.log(color.cyan('[+] Session Not Logged In.. Recreate session...'))
                        if (setting.typedb === "mongo") {
                            await clearAll()
                        } else {
                            fs.rmSync('.session', { recursive: true, force: true })
                        }
                        console.log(color.green('[+] Session removed!!'))
                        process.send('reset')
                    } catch {
                        console.log(color.cyan('[+] Session not found!!'))
                    }
                    break
                default:

            }
        }
        if (connection === "open") {
            const conn = await func.loads('@func/services.js')
            conn(db, func, Color, util)
    
            if (!fs.existsSync("./temp")) {
                fs.mkdirSync("./temp")
                console.log(color.cyan('[+] Folder "temp" successfully created.'))
            }
            await mydb.write(db)
        }
    })

    sock.ev.on("creds.update", saveCreds)

    sock.ev.on("messages.upsert", async ({ type, messages }) => {
        if (type === "notify" && messages.length) {
            let m = messages[0]
            if (m.message) {
                m.message = m.message?.ephemeralMessage
                    ? m.message.ephemeralMessage.message
                    : m.message
                const mes = await msg(sock, m, db)
                const mek = await func.loads('@func/mek.js')
                mek(mes, sock, db, func, util, process, Color, axios)
                sch.schema(mes, sock, db)
                await cmd(mes, sock, db, func, color, util)
            }
        }
    })

    sock.ev.on("contacts.update", update => {
        for (const contact of update) {
            const id = baileys.jidNormalizedUser(contact.id)
            if (db.contacts) {
                db.contacts[id] = {
                    ...(db.contacts[id] || {}),
                    ...(contact || {})
                }
            }
        }
    })

    sock.ev.on("contacts.upsert", update => {
        for (const contact of update) {
            const id = baileys.jidNormalizedUser(contact.id)
            if (db.contacts) {
                db.contacts[id] = { ...(contact || {}), isContact: true }
            }
        }
    })

    sock.ev.on("groups.update", updates => {
        for (const update of updates) {
            const id = update.id
            if (db.groupMetadata[id]) {
                console.log(color.green('[+] Group Metadata Updated!!'))
                db.groupMetadata[id] = {
                    ...(db.groupMetadata[id] || {}),
                    ...(update || {})
                }
            }
        }
    })

    sock.ev.on("group-participants.update", ({ id, participants, action }) => {
        const metadata = db.groupMetadata[id]
        if (metadata) {
            switch (action) {
                case "add":
                case "revoked_membership_requests":
                    metadata.participants.push(
                        ...participants.map(id => ({
                            id: baileys.jidNormalizedUser(id),
                            admin: null
                        }))
                    )
                    break
                case "demote":
                case "promote":
                    for (const participant of metadata.participants) {
                        const id = baileys.jidNormalizedUser(participant.id)
                        if (participants.includes(id)) {
                            console.log(`${color.green(`[ ${action} ]`)} ${id.split("@")[0]} in group ${color.cyan(metadata.subject)}`)
                            participant.admin =
                                action === "promote" ? "admin" : null
                        }
                    }
                    break
                case "remove":
                    metadata.participants = metadata.participants.filter(
                        p => !participants.includes(baileys.jidNormalizedUser(p.id))
                    )
                    break
            }
        }
    })

    // interval save db
    setInterval(async () => {
        await mydb.write(db)
    }, 3000)
}

connectWA()