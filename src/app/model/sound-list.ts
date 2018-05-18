import { SoundListDetail } from '../model/sound-list-detail';

export class SoundData{
  login:number;
  recommend:number;
  sound_recommend_list: SoundListDetail[];
  sound_list: SoundListDetail[];

  constructor(){
    this.sound_recommend_list = [];
    this.sound_list = [];
  }

}
