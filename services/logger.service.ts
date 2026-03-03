import fs from 'node:fs'

const logsDir = './logs'
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir)
}

function getTime(): string {
    const now = new Date()
    return now.toLocaleString('he')
}

function isError(e: any): boolean {
    return e && e.stack && e.message
}

function doLog(level: string, ...args: any[]): void {
    const strs = args.map(arg =>
        (typeof arg === 'string' || isError(arg)) ? arg : JSON.stringify(arg)
    )

    let line = strs.join(' | ')
    line = `${getTime()} - ${level} - ${line}\n`
    
    console.log(line)
    fs.appendFile('./logs/backend.log', line, (err) => {
        if (err) console.log('FATAL: cannot write to log file')
    })
}

export const loggerService = {
    debug(...args: any[]) { doLog('DEBUG', ...args) },
    info(...args: any[]) { doLog('INFO', ...args) },
    warn(...args: any[]) { doLog('WARN', ...args) },
    error(...args: any[]) { doLog('ERROR', ...args) }
}