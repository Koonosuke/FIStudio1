FROM amazoncorretto:17-alpine-jdk

WORKDIR /app

COPY target/samplelogin-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]