import { PackagingValueObject } from "../value_objects/packaging.vo";

export interface IPackagingRepository {
  getAll(): Promise<PackagingValueObject[]>;
}
