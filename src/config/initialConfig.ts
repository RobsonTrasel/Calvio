import { NotificationLanguage } from '@open-wa/wa-automate'

const start = {
    licenseKey: undefined,
	blockCrashLogs: false,
	disableSpins: false,
	hostNotificationLang: NotificationLanguage.PTBR,
	logConsole: false,
	viewport: {
		width: 1024,
		height: 768,
	},
	deleteSessionDataOnLogout: false,
	popup: 3012,
	defaultViewport: null,
	sessionId: 'Calvio',
	headless: false,
	multiDevice: true,
	qrTimeout: 0,
	authTimeout: 99999999,
	restartOnCrash: false,
	useChrome: true,
	killProcessOnBrowserClose: true,
	throwErrorOnTosBlock: false,
	chromiumArgs: [
		'--no-sandbox',
		'--disable-setuid-sandbox',
		'--aggressive-cache-discard',
		'--disable-cache',
		'--disable-application-cache',
		'--disable-offline-load-stale-cache',
		'--disk-cache-size=0',
	],
}

export default start