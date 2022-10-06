import {
    create,
    Client, 
    Message
} from '@open-wa/wa-automate'
import dotEnv from 'dotenv'
import DebugServer from './src/debug'
import { filterProperty } from './src/helper/objectManipulation'
import parse from './src/lib/parser'
import ModulesWrapper from './src/modules/registerModule'
import Zaplify from './src/modules/zaplify/index';




dotEnv.config({
    path: '.env'
})

const start = async (client: Client) => {
	console.log('[SERVER] Servidor iniciado!');
	const zaplify = new Zaplify(client);
	ModulesWrapper.Zaplify.registerZaplify(zaplify);

	const handleMsg = async (msg: string, messageObject: Message) => {
		const parsingResult = parse(msg.toLowerCase() || 'null');

		if (!parsingResult.isError) {
			console.log(msg);
			const { command, method } = parsingResult.result;
			const module = ModulesWrapper.Zaplify.getModule(command);
			const messageData = filterProperty(parsingResult.result, "args");

			if (!module) return;

			module.setRequester();
			try {
				module.callMethod(method, {
					...messageData,
					...parsingResult.result.args
				}, messageObject);
			} catch (e) {
				console.warn(e);
			}
		}
	};

	client.onAnyMessage(message => {
		try {
			zaplify.setMessageObject(message);
			handleMsg(message.caption || message.body, message).catch(
				e => console.warn(e)
			);
		} catch (e) {
			console.warn(e);
		}
	});
};

const DEBUG_PORT = 4000
DebugServer.listen(DEBUG_PORT, () => {
	console.log(`[SERVER]: Listening on port ${DEBUG_PORT}`);
});
