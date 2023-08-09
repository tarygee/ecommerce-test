/* eslint-disable prettier/prettier */
import { ProductEntity } from 'src/products/entities/product.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Timestamp,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
  } from 'typeorm';
  
  @Entity({ name: 'categories' })
  export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;
    @CreateDateColumn()
    createdAt: Timestamp;
    @UpdateDateColumn()
    updateAt: Timestamp;
  
    @ManyToOne(() => UserEntity, (user)=>user.categories) addedBy: UserEntity;

    @OneToMany(() => ProductEntity, (prod)=>prod.category) 
    products: ProductEntity[];
  }
  