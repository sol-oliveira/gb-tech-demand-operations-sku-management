export class PackagingValueObject {
  
  public readonly material: string;
  public readonly type: string;
 
  constructor(data : {material: string, type: string}) {   
    this.material = data.material;
    this.type = data.type;
  }
}