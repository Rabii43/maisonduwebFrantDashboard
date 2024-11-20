import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: Socket;

  constructor() {
    const websocketUrl = 'wss://ws.coinapi.io/v1/';
    this.socket = io(websocketUrl, {
      transports: ['websocket'],
      query: {
        api_key: 'B39295E9-1234-4E47-8425-E5B205D4304C',
      }
    });
  }

  listen(eventName: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  //close the connection
  disconnect() {
    this.socket.disconnect();
  }
}
