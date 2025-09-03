import { VolumetryValueObject } from "../value_objects/volumetry.vo";

export interface IVolumetryRepository {
  getAll(): Promise<VolumetryValueObject[]>;
}
