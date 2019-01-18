import {InjectableRxStompConfig} from '@stomp/ng2-stompjs';

export const rxStompConfig: InjectableRxStompConfig = {
    brokerURL: 'ws://localhost:8080/la-negru-websocket/websocket',
    heartbeatIncoming: 0,
    heartbeatOutgoing: 20000,
    reconnectDelay: 200,
    connectHeaders: {},
    debug: (msg: string): void => {
        console.log(new Date(), msg);
    }
};
