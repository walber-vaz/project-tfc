import { ID } from '.';

export interface ICrudModelCreator<T> {
  create(data: Partial<T>): Promise<T>,
}

export interface ICrudModelReader<T> {
  findAll(): Promise<T[]>,
  findById(id: ID): Promise<T | null>,
}

export interface ICrudModelUpdater<T> {
  update(id: ID, data: Partial<T>): Promise<T | null>,
}

export interface ICrudModelDeleter {
  delete(id: ID): Promise<number>,
}

export interface ICrudModel<T>
  extends
  ICrudModelCreator<T>,
  ICrudModelReader<T>,
  ICrudModelUpdater<T>,
  ICrudModelDeleter { }
