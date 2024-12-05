/*
 * Creator: Zaenishi
 * WhatsApp: +62 831-8822-9366
 * Instagram: @zaenishi
 * Twitter: @zaenishi
 * GitHub: zaenishi
 *
 * Jangan sungkan untuk menghubungi saya jika ada masalah pada script ini!
*/

const schema = async (m, sock, db) => {
    const isNumber = x => typeof x === "number" && !isNaN(x)
    const isBoolean = x => typeof x === "boolean" && Boolean(x)
    db.users = db.users || {}
    db.groups = db.groups || {}

    let user = db.users[m.sender]
    if (typeof user !== "object") db.users[m.sender] = {}
    if (user) {
        if (!m.sender.endsWith("@s.whatsapp.net")) return
        if (!("name" in user)) user.name = m.pushName + ` ` + `(Pengguna Gratis)`
    } else {
        db.users[m.sender] = {
            name: m.pushName
        }
    }

    if (m.isGroup) {
        let group = db.groups[m.from]
        if (typeof group !== "object") db.groups[m.from] = {}
        if (group) {
            if (!m.from.endsWith("@g.us")) return
            if (!("name" in group)) group.name = await sock.getName(m.from)
            if (!isNumber(group.lastChat)) group.lastChat = new Date() * 1
        } else {
            db.groups[m.from] = {
                name: await sock.getName(m.from),
                lastChat: new Date() * 1,
            }
        }
    }

    let setting = db.setting
    if (setting) {
        if (!("firstchat" in setting)) setting.firstchat = true
        if (!("readstory" in setting)) setting.readstory = true
        if (!("reactstory" in setting)) setting.reactstory = false
        if (!("autoread" in setting)) setting.autoread = false
        if (!("self" in setting)) setting.self = false
        if (!("debug" in setting)) setting.debug = false
        if (!("number" in setting)) setting.number = ""
        if (!("owner" in setting)) setting.owner = db.setting.owner
        if (!("lang" in setting)) setting.lang = "id"
    } else {
        db.setting = {
            firstchat: true,
            readstory: true,
            reactstory: false,
            autoread: false,
            self: false,
            debug: false,
            number: "",
            owner: db.setting.owner,
            lang: "id",
        }
    }
}

export default { schema }