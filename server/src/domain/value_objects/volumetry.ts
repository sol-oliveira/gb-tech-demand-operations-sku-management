export class VolumetryValueObject {
  
  public readonly value: number;
  public readonly unit: string;
 
  constructor(data : {value: number, unit: string}) {   
    this.value = data.value;
    this.unit = data.unit;
  }
}