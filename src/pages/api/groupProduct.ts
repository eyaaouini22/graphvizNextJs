import { productOffer } from "./productOffer";

 export class groupProduct{

    private _gId:string;
    private _productImage:string;
     private _offers:productOffer[];

    constructor(gId:string, productImage:string,offers:productOffer[] ){
    this._gId=gId;
    this._productImage=productImage;
    this._offers=offers;
    }
     get gId(): string {
        return this._gId;
      }
    
      set gId(value: string) {
        this._gId = value;
      }
      get productImage(): string {
        return this._productImage;
      }
    
      set productImage(value: string) {
        this._productImage= value;
      } 
   
      set offers(value: productOffer[]) {
        this._offers = value;
      }
      get offers(): productOffer[]{
        return this._offers;
      }
    }