export class VolumetryValueObject {
  public readonly value: number;
  public readonly unit: string;
  public readonly volumetryUniqueKey: string;

  constructor(data: {
    value: number;
    unit: string;
    volumetryUniqueKey: string;
  }) {
    this.value = data.value;
    this.unit = data.unit;
    this.volumetryUniqueKey = data.volumetryUniqueKey;
  }
}
