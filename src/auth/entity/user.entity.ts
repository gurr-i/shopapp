import { type } from "os";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"


@Entity("user") export class User {
    @PrimaryGeneratedColumn("increment")
    id!: string;
    @Column(
        {
            type: "varchar",
            nullable: true,
            unique: false
        }
    )
    username!: string;
    @Column(
        {
            type: "varchar",
            nullable: true,
            unique: true
        }
    )
    useremail!: string;
    @Column(
        {
            type: "varchar",
            nullable: true,
            unique: false
        }
    )
    userpassword!: string;

}
