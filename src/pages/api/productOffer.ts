import { groupingKey } from "./groupingKey";

export class productOffer{

private _productId:string;
private _productName:string;
private _brandName:string;
private _storeName:string; 
private _productUrl:string;
  private _groupingKeys:groupingKey[];
constructor(productId:string, productName:string,brandName:string,storeName:string , groupingKeys:groupingKey[] ,url:string){

this._productId=productId;
this._productName=productName;
this._brandName=brandName;
this._storeName=storeName;
this._groupingKeys=groupingKeys;
this._productUrl=url;
}
 get productId(): string {
    return this._productId;
  }

  set productId(value: string) {
    this._productId = value;
  }
  get productName(): string {
    return this._productName;
  }

  set productName(value: string) {
    this._productName = value;
  } 
 
  set brandName(value: string) {
    this._brandName = value;
  } 
  get brandName(): string {
    return this._brandName;
  }

  set storeName(value: string) {
    this._storeName = value;
  }
  get storeName(): string {
    return this._storeName;
  }
  set groupingKeys(value: groupingKey[]) {
    this._groupingKeys = value;
  }
  get groupingKeys(): groupingKey []{
    return this._groupingKeys;
  }
  set productUrl(value: string) {
    this._productUrl= value;
  }
  get productUrl(): string{
    return this._productUrl;
  }
}