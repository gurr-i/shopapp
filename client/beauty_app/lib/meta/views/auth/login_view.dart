import 'package:beauty_app/app/shared/colours.dart';
import 'package:beauty_app/app/shared/dimensions.dart';
import 'package:beauty_app/meta/views/auth/signup_view.dart';
import 'package:eva_icons_flutter/eva_icons_flutter.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:page_transition/page_transition.dart';

class LoginView extends StatelessWidget {
  LoginView({Key? key}) : super(key: key);

  //Controller
  // final nameController = TextEditingController();
  final emailController = TextEditingController();
  final passwordController = TextEditingController();



  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      backgroundColor: darkColor,
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            vSizedBox3,
            vSizedBox2,
            Container(
              // color: Colors.red,
              child: Row(
                children: [
                  IconButton(
                      icon: const Icon(EvaIcons.arrowIosBackOutline,
                      color: whiteColor),

                      onPressed: (){}

                      ),
                ],
              ),
            ),
            vSizedBox4,
            Container(
              // color: Colors.white,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  Text(
                    "Let's Sign in",
                    style: TextStyle(
                      fontSize: 40,
                      fontWeight: FontWeight.w900,
                      color: whiteColor
                    ),
                  ),
                  Text(
                    "Welcome Back!",
                    style: TextStyle(
                      fontSize: 30,
                      fontWeight: FontWeight.w500,
                      color: whiteColor
                    ),
                  ),
                  Text(
                    "You have been missed!",
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w500,
                      color: whiteColor
                    ),
                  )




                ],
              ),
            ),
            vSizedBox3,
            vSizedBox1,
            Container(
              child: Column(
                children: [
                  //To give vertical spacing we uses custom vsizebox

                  // vSizedBox1,
                  // stylishTextField("Name", nameController),
                  vSizedBox1,
                  stylishTextField("Email", emailController),
                  vSizedBox1,
                  stylishTextField("Password", passwordController),

                ],
              ),
            ),

            vSizedBox4,
            Container(
              child:  Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                  RichText(
                    text: TextSpan(
                    children: <TextSpan>[



                      const TextSpan(
                        text: "Don't have an account?",
                        style: TextStyle(
                        // fontSize: 20,
                        fontWeight: FontWeight.w700,
                        fontFamily: "Montserrat",
                        color: textColor
                        ),
                      ),



                      TextSpan(
                        text: "Sign Up",

                        recognizer: TapGestureRecognizer()
                        ..onTap = (){
                        Navigator.pushReplacement(
                          context,
                          PageTransition(

                            child: SignupView(),

                            type: PageTransitionType.rightToLeft)
                            );
                          },

                        style: const TextStyle(
                        // fontSize: 20,
                        fontWeight: FontWeight.bold,
                        fontFamily: "Montserrat",
                        color: textColor
                        ),
                      )



                    ]
                  )
                  ),

                  vSizedBox2,
                  Container(
                    width: 300.0,
                    height: 50.0,
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(1),
                      borderRadius: BorderRadius.circular(18.0),
                    ),

                    child: const Center(
                      child: Text(
                        "Log In",
                        style: TextStyle(
                          fontSize: 17.5,
                          fontWeight: FontWeight.w900,
                          fontFamily: "Montserrat",
                          color: textColor
                        ),


                      ),
                    ),
                  )


                ],
                ),
              ),
            )



          ],
        ),
      ),
    );
  }


  stylishTextField( String text, TextEditingController textEditingController )
  {
    return TextField(
      controller: textEditingController,
      style: const TextStyle(
        color: whiteColor,
        fontSize: 18.0,
      ),
      decoration: InputDecoration(
        suffixIcon: IconButton(onPressed: (){},
          // icon: const Icon(EvaIcons.arrowIosBackOutline),
        icon: const Icon(EvaIcons.backspace, color: textColor),
        ),
        filled: true,
        hintText: text,
        hintStyle: const TextStyle(color: textColor,fontSize: 14.1 ),
        fillColor: bgColor,

        border: const OutlineInputBorder(
          borderSide: BorderSide.none,
          borderRadius: BorderRadius.all(Radius.circular(15.0))
        )
      )
    );
  }
}
