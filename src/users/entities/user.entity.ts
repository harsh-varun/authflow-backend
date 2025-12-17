import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  capitalizeName() {
    if (this.name) {
      this.name = this.name
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());
    }
  }
}
