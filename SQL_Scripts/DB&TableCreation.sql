create database moviestreaming;
use moviestreaming;
create table admin(UserName varchar(50) PRIMARY KEY, Password_Hash varchar(50) NOT NULL UNIQUE);
create table moviedetails(MovieID varchar(10) PRIMARY KEY,MovieName varchar(150) NOT NULL UNIQUE, MovieDescription varchar(300) NOT NULL UNIQUE);

line 1;
line 2;
