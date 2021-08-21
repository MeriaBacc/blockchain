
export class Post{
    id:string = "";
    content :string = "";
    sentiment!: {
        label: string;
        score: string;
    };
    class!: {
        label: string;
        score: string;
    };
    comments!: any[];
  source: string = "";
    constructor(){

    }

}