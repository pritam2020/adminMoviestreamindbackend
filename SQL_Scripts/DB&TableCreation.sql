create database moviestreaming;
use moviestreaming;
create table admin(UserName varchar(50) PRIMARY KEY, Password_Hash varchar(50) NOT NULL UNIQUE);
create table moviedetails(MovieID varchar(10) PRIMARY KEY,MovieName varchar(150) NOT NULL UNIQUE, MovieDescription varchar(300) NOT NULL UNIQUE);
insert into admin values ('admin','admin_pass');

ALTER TABLE moviedetails
ADD COLUMN Genre ENUM('Comedy', 'Horror', 'Sci-fi', 'Action', 'Drama', 'Romance', 'Fantasy', 'Adventure', 'Biography', 'Documentary', 'Thriller', 'Mystery', 'War', 'Award-winning') NOT NULL,
add column Language ENUM('English', 'Hindi', 'Bengali') NOT NULL;
ADD COLUMN OriginalLanguage ENUM('English', 'Hindi', 'Bengali') NOT NULL,
ADD COLUMN Directors VARCHAR(1000) NOT NULL,
ADD COLUMN Cast VARCHAR(1000),
ADD COLUMN ReleaseDate DATE,
ADD COLUMN IMDBRating FLOAT,
ADD CONSTRAINT check_IMDBRating CHECK (IMDBRating BETWEEN 0 AND 10);

alter table moviedetails modify column Genre varchar (500) NOT NULL;

