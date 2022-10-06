import {Message} from '@open-wa/wa-automate'
import { Args, Module } from '../registerModule';

class Ping extends Module {
    constructor(){
        super();

        this.registerPublicMethod({
            name: 'default',
            method: this.pong.bind(this)
        });
    }

    pong(_: Args, requester: Message){
        this.zaplify?.replyAuthor("PONG CARAIO", requester);
    }
}

export default Ping