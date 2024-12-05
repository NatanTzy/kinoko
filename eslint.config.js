/*
 * Creator: Zaenishi
 * WhatsApp: +62 831-8822-9366
 * Instagram: @zaenishi
 * Twitter: @zaenishi
 * GitHub: zaenishi
 *
 * Jangan sungkan untuk menghubungi saya jika ada masalah pada script ini!
*/

import globals from "globals"
import pluginJs from "@eslint/js"

export default [
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    files: ["**/*.js"],
    ignores: ["node_modules/**"],
    rules: {
      "no-unused-vars": "warn"
    }
  },
  pluginJs.configs.recommended,
]
