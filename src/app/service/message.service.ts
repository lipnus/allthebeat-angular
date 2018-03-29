import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MessageService {
    private subject = new Subject<any>();
    private musicInfo = new Subject<any>();

    sendMessage(message: string) {
        this.subject.next({ text: message });
    }

    clearMessage() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

    sendMusicInfo(soundPk:number, soundName:string, beatmakerNickname:string, soundPath:string){
      this.musicInfo.next({
        sound_pk:soundPk,
        sound_name:soundName,
        beatmaker_nickname:beatmakerNickname,
        sound_path: soundPath
      });
    }

    getMusicInfo(): Observable<any> {
        return this.musicInfo.asObservable();
    }
}
