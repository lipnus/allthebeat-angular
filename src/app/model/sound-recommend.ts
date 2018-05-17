
export class SoundRecommend{

  result:string;
  recommend_pk:number;
  youtube:string;
  bpm:number;
  genre1:string;
  genre2:string;
  mood1:string;
  mood2:string;
  mood3:string;

  rec_count:number;
  bpm_sum:number;
  rank_genre1:string;
  rank_genre2:string;
  rank_mood1:string;
  rank_mood2:string;

  constructor(){
    this.result="";
    this.recommend_pk=0;
    this.bpm=0;
    this.genre1="";
    this.genre2="";
    this.mood1="";
    this.mood2="";
    this.mood3="";

    this.rec_count=0;
    this.bpm=0;
    this.rank_genre1="";
    this.rank_genre2="";
    this.rank_mood1="";
    this.rank_mood2="";
  }

}
