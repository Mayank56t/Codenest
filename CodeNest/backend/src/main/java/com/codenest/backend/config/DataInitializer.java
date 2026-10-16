package com.codenest.backend.config;

import com.codenest.backend.model.Lesson;
import com.codenest.backend.model.Quiz;
import com.codenest.backend.repository.LessonRepository;
import com.codenest.backend.repository.QuizRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initializeData(
            LessonRepository lessonRepository,
            QuizRepository quizRepository) {

        return args -> {

            // =========================================================
            // LESSONS
            // =========================================================

            if (lessonRepository.count() == 0) {

                lessonRepository.save(new Lesson(
                        1,
                        "Introduction to Java",
                        "Beginner",
                        "Learn what Java is, its features, JVM, JDK, JRE and your first Java program.",
                        "https://www.youtube.com/watch?v=grEKMHGYyns"
                ));

                lessonRepository.save(new Lesson(
                        2,
                        "Java Variables and Data Types",
                        "Beginner",
                        "Learn about variables, primitive data types and how data is stored in Java.",
                        "https://www.youtube.com/watch?v=8cm1x4bC610"
                ));

                lessonRepository.save(new Lesson(
                        3,
                        "Operators in Java",
                        "Beginner",
                        "Learn arithmetic, relational, logical and assignment operators in Java.",
                        "https://www.youtube.com/watch?v=Rx_j3FJ1wWQ"
                ));

                lessonRepository.save(new Lesson(
                        4,
                        "Conditional Statements",
                        "Beginner",
                        "Learn how if, else if, else and switch statements control program execution.",
                        "https://www.youtube.com/watch?v=9k9dGqg3Y4Y"
                ));

                lessonRepository.save(new Lesson(
                        5,
                        "Loops in Java",
                        "Beginner",
                        "Learn for, while and do-while loops in Java.",
                        "https://www.youtube.com/watch?v=7J4LxT2Yp9Q"
                ));

                lessonRepository.save(new Lesson(
                        6,
                        "Object Oriented Programming",
                        "Intermediate",
                        "Understand classes, objects, encapsulation, inheritance and polymorphism.",
                        "https://www.youtube.com/watch?v=6T_HgnjoYwM"
                ));

                System.out.println("6 lessons inserted successfully.");
            }


            // =========================================================
            // LESSON 1 QUIZZES
            // =========================================================

            if (quizRepository.findByLessonId(1).isEmpty()) {

                quizRepository.save(new Quiz(
                        1,
                        "What type of programming language is Java?",
                        "Object-oriented",
                        "Assembly language",
                        "Machine language",
                        "Markup language",
                        "A"
                ));

                quizRepository.save(new Quiz(
                        1,
                        "What does JVM stand for?",
                        "Java Variable Machine",
                        "Java Virtual Machine",
                        "Java Verified Machine",
                        "Java Visual Machine",
                        "B"
                ));

                quizRepository.save(new Quiz(
                        1,
                        "Which component is used to develop Java applications?",
                        "JRE",
                        "JVM",
                        "JDK",
                        "JAR",
                        "C"
                ));

                quizRepository.save(new Quiz(
                        1,
                        "Which method is the entry point of a Java application?",
                        "start()",
                        "run()",
                        "main()",
                        "execute()",
                        "C"
                ));

                quizRepository.save(new Quiz(
                        1,
                        "Which statement prints text in Java?",
                        "System.out.println()",
                        "Console.write()",
                        "print.text()",
                        "System.printText()",
                        "A"
                ));

                System.out.println("Lesson 1 quizzes inserted.");
            }


            // =========================================================
            // LESSON 2 QUIZZES
            // =========================================================

            if (quizRepository.findByLessonId(2).isEmpty()) {

                quizRepository.save(new Quiz(
                        2,
                        "Which keyword is used to declare a variable that cannot be changed?",
                        "static",
                        "final",
                        "constant",
                        "fixed",
                        "B"
                ));

                quizRepository.save(new Quiz(
                        2,
                        "Which data type stores whole numbers?",
                        "double",
                        "boolean",
                        "int",
                        "char",
                        "C"
                ));

                quizRepository.save(new Quiz(
                        2,
                        "Which data type stores true or false?",
                        "boolean",
                        "String",
                        "int",
                        "float",
                        "A"
                ));

                quizRepository.save(new Quiz(
                        2,
                        "Which data type stores a single character?",
                        "String",
                        "char",
                        "character",
                        "text",
                        "B"
                ));

                quizRepository.save(new Quiz(
                        2,
                        "Which is a valid Java variable declaration?",
                        "int age;",
                        "age int;",
                        "integer age;",
                        "variable age int;",
                        "A"
                ));

                System.out.println("Lesson 2 quizzes inserted.");
            }


            // =========================================================
            // LESSON 3 QUIZZES
            // =========================================================

            if (quizRepository.findByLessonId(3).isEmpty()) {

                quizRepository.save(new Quiz(
                        3,
                        "Which operator is used for addition?",
                        "+",
                        "-",
                        "*",
                        "/",
                        "A"
                ));

                quizRepository.save(new Quiz(
                        3,
                        "Which operator checks equality?",
                        "=",
                        "==",
                        "!=",
                        "<=",
                        "B"
                ));

                quizRepository.save(new Quiz(
                        3,
                        "Which operator means logical AND?",
                        "||",
                        "!",
                        "&&",
                        "&",
                        "C"
                ));

                quizRepository.save(new Quiz(
                        3,
                        "What is the result of 10 % 3?",
                        "0",
                        "1",
                        "2",
                        "3",
                        "B"
                ));

                quizRepository.save(new Quiz(
                        3,
                        "Which operator is used for assignment?",
                        "==",
                        "=",
                        "!=",
                        "=>",
                        "B"
                ));

                System.out.println("Lesson 3 quizzes inserted.");
            }


            // =========================================================
            // LESSON 4 QUIZZES
            // =========================================================

            if (quizRepository.findByLessonId(4).isEmpty()) {

                quizRepository.save(new Quiz(
                        4,
                        "Which keyword is used to test a condition?",
                        "if",
                        "check",
                        "condition",
                        "when",
                        "A"
                ));

                quizRepository.save(new Quiz(
                        4,
                        "Which keyword is used when the if condition is false?",
                        "otherwise",
                        "else",
                        "default",
                        "false",
                        "B"
                ));

                quizRepository.save(new Quiz(
                        4,
                        "Which statement can test multiple fixed values?",
                        "loop",
                        "switch",
                        "repeat",
                        "caseOnly",
                        "B"
                ));

                quizRepository.save(new Quiz(
                        4,
                        "Which keyword is commonly used inside a switch statement?",
                        "option",
                        "case",
                        "select",
                        "value",
                        "B"
                ));

                quizRepository.save(new Quiz(
                        4,
                        "Which keyword stops a switch case from continuing?",
                        "stop",
                        "exit",
                        "break",
                        "returnCase",
                        "C"
                ));

                System.out.println("Lesson 4 quizzes inserted.");
            }


            // =========================================================
            // LESSON 5 QUIZZES
            // =========================================================

            if (quizRepository.findByLessonId(5).isEmpty()) {

                quizRepository.save(new Quiz(
                        5,
                        "Which loop is commonly used when the number of iterations is known?",
                        "for",
                        "while",
                        "do-while",
                        "switch",
                        "A"
                ));

                quizRepository.save(new Quiz(
                        5,
                        "Which loop always executes at least once?",
                        "for",
                        "while",
                        "do-while",
                        "if",
                        "C"
                ));

                quizRepository.save(new Quiz(
                        5,
                        "Which keyword exits a loop immediately?",
                        "stop",
                        "break",
                        "exitLoop",
                        "end",
                        "B"
                ));

                quizRepository.save(new Quiz(
                        5,
                        "Which keyword skips the current loop iteration?",
                        "skip",
                        "continue",
                        "next",
                        "pass",
                        "B"
                ));

                quizRepository.save(new Quiz(
                        5,
                        "Which loop checks its condition before execution?",
                        "while",
                        "do-while",
                        "switch",
                        "case",
                        "A"
                ));

                System.out.println("Lesson 5 quizzes inserted.");
            }


            // =========================================================
            // LESSON 6 QUIZZES
            // =========================================================

            if (quizRepository.findByLessonId(6).isEmpty()) {

                quizRepository.save(new Quiz(
                        6,
                        "What is a class in Java?",
                        "A blueprint for objects",
                        "A variable",
                        "A loop",
                        "A package only",
                        "A"
                ));

                quizRepository.save(new Quiz(
                        6,
                        "What is an object?",
                        "A method",
                        "An instance of a class",
                        "A package",
                        "A keyword",
                        "B"
                ));

                quizRepository.save(new Quiz(
                        6,
                        "Which concept hides internal implementation details?",
                        "Inheritance",
                        "Polymorphism",
                        "Encapsulation",
                        "Compilation",
                        "C"
                ));

                quizRepository.save(new Quiz(
                        6,
                        "Which concept allows a class to inherit another class?",
                        "Inheritance",
                        "Encapsulation",
                        "Abstraction",
                        "Compilation",
                        "A"
                ));

                quizRepository.save(new Quiz(
                        6,
                        "Which concept allows one interface to have multiple implementations?",
                        "Inheritance",
                        "Polymorphism",
                        "Compilation",
                        "Iteration",
                        "B"
                ));

                System.out.println("Lesson 6 quizzes inserted.");
            }


            System.out.println("==========================================");
            System.out.println("CODE NEST DATA INITIALIZATION COMPLETE");
            System.out.println("==========================================");
        };
    }
}