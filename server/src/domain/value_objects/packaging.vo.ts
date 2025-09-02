export class PackagingValueObject {
  public readonly material: string;
  public readonly type: string;
  public readonly packagingUniqueKey: string;

  constructor(data: {
    material: string;
    type: string;
    packagingUniqueKey: string;
  }) {
    this.material = data.material;
    this.type = data.type;
    this.packagingUniqueKey = data.packagingUniqueKey;
  }
}
