import configProd from './prod'
import configDev from './dev'

export const config = process.env.NODE_ENV === 'production' ? configProd : configDev