import {InjectableRxStompConfig} from '@stomp/ng2-stompjs';
import { environment } from 'src/environments/environment';

export const rxStompConfig: InjectableRxStompConfig = {
    brokerURL: `ws://${environment.host}/la-negru-websocket/websocket`,
    heartbeatIncoming: 0,
    heartbeatOutgoing: 20000,
    reconnectDelay: 200,
    connectHeaders: {},
    debug: (msg: string): void => {
        console.log(new Date(), msg);
    }
};
