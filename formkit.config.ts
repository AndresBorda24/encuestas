import { es } from '@formkit/i18n'
import { defaultConfig } from '@formkit/vue'
import { rootClasses } from './formkit.theme.ts'
import { createMultiStepPlugin } from '@formkit/addons'
import '@formkit/addons/css/multistep'

export default defaultConfig({
    locales: { es },
    locale: 'es',
    config: {
        rootClasses
    },
    plugins: [createMultiStepPlugin()],
})
