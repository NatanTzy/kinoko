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
import { spawn } from "child_process"
import path from "path"
import { fileURLToPath } from "url"
import { watchFile, unwatchFile } from "fs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
let childProcess = null

function start(file) {
    if (childProcess) {
        console.log("Restarting due to file changes...")
        childProcess.kill()
        childProcess = null
    }

    const scriptPath = path.join(__dirname, file)
    const args = [scriptPath, "d=Datenow", ...process.argv.slice(2)]

    childProcess = spawn(process.argv[0], args, { stdio: ["inherit", "inherit", "inherit", "ipc"] })

    childProcess.on("message", data => {
        if (data === "reset") {
            console.log("Reset command received, restarting process...")
            start(file)
        } else if (data === "uptime") {
            childProcess.send(process.uptime())
        }
    })

    childProcess.on("exit", code => {
        if (code !== 0) {
            console.log(`Process exited with code ${code}. Watching for changes...`)
            watchFile(scriptPath, (curr, prev) => {
                if (curr.mtime !== prev.mtime) {
                    console.log(`File ${file} changed. Restarting...`)
                    unwatchFile(scriptPath)
                    start(file)
                }
            })
        } else {
            console.log("Process exited successfully. Unwatching file.")
            unwatchFile(scriptPath)
            childProcess = null
        }
    })
}

start("client.js")
