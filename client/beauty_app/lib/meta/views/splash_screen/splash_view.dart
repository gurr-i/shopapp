import 'dart:async';
import 'dart:ui';

import 'package:beauty_app/app/shared/colours.dart';
import 'package:beauty_app/meta/views/auth/signup_view.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:page_transition/page_transition.dart';

class SplashView extends StatefulWidget {
  const SplashView({Key? key}) : super(key: key);

  @override
  _SplashViewState createState() => _SplashViewState();
}

class _SplashViewState extends State<SplashView> {
  @override

  //Navigation from one splash screen to next Screen
  void initState()
  {
    Timer(
        Duration(seconds: 2),
        ()=> Navigator.pushReplacement(context, PageTransition(child: SignupView(), type: PageTransitionType.rightToLeft)),
    );
    super.initState();
  }


  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: darkColor,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: const [
            Text(
              'Beautify',
              style: TextStyle(
                fontSize: 45,
                fontWeight: FontWeight.bold,
                color: whiteColor
              ),
            )
          ],
        ),
      ),
    );
  }
}
