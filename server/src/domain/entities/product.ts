export class ProductEntity {
  id: string;
  name: string;
  description: string;
  brand: string;
  createdAt: Date;
  updatedAt?: Date | null;
  userCreate: string;
  userUpdate?: string | null;
 
  constructor(data: {
    id: string;
    name: string;
    description: string;
    brand: string;    
    createdAt: Date;
    updatedAt: Date | null;
    userCreate: string;
    userUpdate: string | null;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.brand = data.brand;  
    this.createdAt = data.createdAt || new Date(); 
    this.updatedAt = data.updatedAt ||  null;
    this.userCreate = data.userCreate;
    this.userUpdate = data.userUpdate || null;
  }
  
}