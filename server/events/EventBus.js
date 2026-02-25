import { EventEmitter } from "events";


class EventBus extends EventEmitter{
    emit(event , payload){
        console.log(`[EVENT] ${event} triggered..`)
        super.emit(event , payload);
    }
}

const eventBus = new EventBus();    //instance
export {eventBus};