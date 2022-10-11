import { Client, Message, MessageTypes } from '@open-wa/wa-automate';
import Mocked from '../debug/mock';
import { MockedMessageObject } from '../debug/mock/models'
import Zaplify from './zaplify';

export interface Args {
	command: string;
	method: string;
	fullString: string;
	immediate?: string;
}

type PublicMethod = {
	name: string;
	method: (args: Args, requester: Message) => any;
};
type ModuleAddresser = {
	name: string;
	module: Module;
};

export class Module {
	publicMethods: PublicMethod[];
	zaplify: Zaplify | Mocked | null;
	requester: Message | MockedMessageObject | undefined;

	constructor() {
		this.publicMethods = [];
		this.zaplify = null;
		this.requester = undefined;
	}

	callMethod(methodName: string, args: Args, requester: Message): Promise<any> {
		const choosenMethod = this.publicMethods.filter(
			method => method.name === methodName
		)[0];
		if (!choosenMethod) {
			if (methodName !== 'default') {
				return this.callMethod('default', args, requester);
			}
		}
		return choosenMethod.method(args, requester);
	}

	makePublic(name: string, method: (args: Args) => any) {
		this.registerPublicMethod({
			name,
			method: args => method.bind(this)(args),
		});
	}

	registerPublicMethod(method: PublicMethod) {
		this.publicMethods.push(method);
	}

	removePublicMethod(methodName: string) {
		this.publicMethods = this.publicMethods.filter(m => m.name !== methodName);
	}

	setRequester() {
		const message = this.zaplify?.messageObject;
		if (message?.type && message?.type !== MessageTypes.BUTTONS_RESPONSE) {
			this.requester = message;
		}
	}
}

class ModulesWrapper {
	modules: ModuleAddresser[];
	static Zaplify: any;

	constructor() {
		this.modules = [];
	}

	registerModule(moduleName: string, module: Module) {
		this.modules.push({
			name: moduleName,
			module,
		});
	}

	getModule(moduleName: string) {
		const moduleAddress = this.modules.filter(module => module.name === moduleName);
		return moduleAddress[0]?.module;
	}

	registerZaplify(zaplify: Zaplify) {
		this.modules.forEach(module => {
			module.module.zaplify = zaplify;
		});
	}

	registerMockedZaplify(mockedZaplify: Mocked) {
		this.modules.forEach(module => {
			module.module.zaplify = mockedZaplify;
		});
	}
}

export default ModulesWrapper;