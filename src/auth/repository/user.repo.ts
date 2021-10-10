import { Entity, EntityRepository, Repository } from "typeorm"
import { User } from "../entity/user.entity";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as EmailValidator from "email-validator";
import bcrypt from "bcrypt"
import { error } from "console";

@EntityRepository(User) export class UserRepository extends Repository<User>
{

    ///////Getting User data
    async fetchUser(req: any, res: Response) {
        //Barror Token
        const Btoken = req.headers["authorization"]
        if (typeof Btoken !== undefined) {
            req.token = Btoken;
            jwt.verify(
                req.token,
                "mykey",
                //call back
                async (error: any, authData: any) => {
                    if (error) {
                        res.send(error);
                    }
                    else {
                        let data = await this.createQueryBuilder("user")
                            .select()
                            // .where("username = :query", { query: username })
                            .getMany();
                        res.send(data);

                    }
                }
            );
        }


        const { useremail } = req.body;



        /*
        try {

            //1. Traditional Method
            // let data = await this.find();
            // res.send(data);



            //2. -------CreateQueryBuilder-------
            // let data = await this.createQueryBuilder("user").getMany();
            // res.send(data);


            //3.
            let data = await this.createQueryBuilder("user")
                .select()
                // .where("username = :query", { query: username })
                .getMany();
            res.send(data);
        } catch (error) {
            res.send(error);

        }
        */

    }



    //-----------------------------------Sign UP in Method-----------------------------------
    //////creating a new User With encrypting User Passwords
    async signUp(req: Request, res: Response) {

        const { username, useremail, userpassword } = req.body;

        try {
            //validating user email is valid or not
            let validate = EmailValidator.validate(useremail)
            if (!validate) {
                //if invalid email
                res.status(500).json({
                    error: "Invalid email",
                })
            }

            else {
                //checking user email exists in our data base ore not
                let emailExist =
                    (await this.createQueryBuilder("user")
                        .where("user.useremail = :query", { query: useremail })
                        .getCount()) > 0;

                if (emailExist) {
                    res.send({
                        data: "Email is already taken."
                    });
                }
                else {
                    //if user email doesn't exists in our database
                    const salt = await bcrypt.genSalt(10)
                    //Decrypting User passsword
                    await bcrypt.hash(userpassword, salt, async (error, data) => {
                        if (error) {
                            res.send(error);
                        }
                        else {
                            //creating new user and assigning data
                            let user = new User();
                            user.username = username;
                            user.userpassword = data;
                            user.useremail = useremail;

                            //saving user under repository
                            await this.save(user);

                            //Sending Json web token to user to login
                            let userId = this.createQueryBuilder("user")
                                .select("user.id")
                                .where("user.useremail = :query", { query: useremail })
                                .getOne();
                            var token = jwt.sign({ id: userId }, "mykey", {
                                expiresIn: 86400,
                            })

                            //sending token to server
                            res.send({
                                authentication: true,
                                token: token,
                            })
                        }
                    });
                }
            }
        }
        catch (error) {
            res.send(error);
        };
    }
    // async signUp(req: Request, res: Response) {


    //     const { username, useremail, userpassword } = req.body;


    //     try {
    //         let user = new User();
    //         user.username = username;
    //         user.useremail = useremail;
    //         user.userpassword = userpassword;

    //         let userData = await this.save(user);

    //         //New variable
    //         //New method TO fetching only user id
    //         let userId = await this.createQueryBuilder("user").select("user.id").where(
    //             "user.useremail = :query", { query: useremail })
    //             .getOne();



    //         //-------------------------------JSON WEB TOKAN------------------------------- 
    //         var token = await jwt.sign({ id: userId }, "mykey", {
    //             expiresIn: 86400 // NUmbers of seconds in a Day
    //         });


    //         // console.log(userId);
    //         console.log(token);


    //         return res.send({
    //             authentication: true,
    //             token: token,
    //         });

    //         // return res.send(userId);
    //         // return res.send(userData);
    //     }
    //     catch (error) {
    //         res.send(error);
    //     };
    // }

    /////Delete User

    ////////Updating User
    // async updateUser(req: Request, res: Response) {


    //     const { username, useremail, userpassword, id } = req.body;


    //     try {
    //         let data = await this.createQueryBuilder("user")
    //             .update(User)
    //             .set(
    //                 {
    //                     // username: username,
    //                     // useremail: useremail,
    //                     userpassword: userpassword,
    //                 }
    //             )
    //             .where("username = :username", { username: username })
    //             // .where("id = :id", { id: id })
    //             .execute()
    //         return res.send(data);
    //     }
    //     catch (error) {
    //         console.log(error);
    //         res.send(error);
    //     };
    // }



    //-----------------------------------Logging in Method-----------------------------------
    async login(req: Request, res: Response) {
        const { useremail, userpassword } = req.body;

        //Cheking validation of password using EMAIL VALIDATOR
        let validate = await EmailValidator.validate(useremail);
        if (!validate) {
            res.json(
                {
                    error: "User not Found!",

                }
            );
        }
        else {
            let findUserFromDB = await this.createQueryBuilder("user")
                .select("user.userpassword")
                .where("user.useremail = :query", { query: useremail })
                .getOne();

            let userId = this.createQueryBuilder("user")
                .select("user.id")
                .where("user.useremail = :query", { query: useremail })
                .getOne();

            //compareing user password with --

            await bcrypt.compare(
                userpassword,
                findUserFromDB?.userpassword as string,
                (error, result) => {
                    if (error) {
                        res.send(error);
                    }
                    if (!result) return res.send("Authenitication error");
                    if (result) {
                        var token = jwt.sign({ id: userId }, "mykey", {
                            expiresIn: 86400,
                        });

                        res.send({
                            authenitication: true,
                            token: token,
                        });
                    }
                }
            )
        }
    }
}