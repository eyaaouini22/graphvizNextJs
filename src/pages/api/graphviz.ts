export class graphviz{
   private _id: string;
    size: number;
   type: string;
   url:string;
   name:string;
   createdAt : Date;
   constructor(id: string, size: number , type: string,  url:string,   name:string, createdAt : Date ) {
    this._id = id;
    this.size = size;
    this.type=type;
    this.name=name;
    this.url=url;
this.createdAt=createdAt;
  }
  //generate getter and setter
  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }
}