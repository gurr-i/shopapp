import 'package:beauty_app/meta/views/auth/login_view.dart';
import 'package:beauty_app/meta/views/auth/signup_view.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import 'meta/views/splash_screen/splash_view.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        fontFamily: 'Montserrat',
        // primarySwatch: Colors.blue,
      ),
      home: SplashView(),
    );
  }
}
