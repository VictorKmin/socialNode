To create database run code in console
```bash
create schema if not exists social;


create table if not exists sex
(
    id    int auto_increment
        primary key,
    label varchar(20) not null
);

create table if not exists user
(
    id       int auto_increment
        primary key,
    name     varchar(45) not null,
    surname  varchar(55) not null,
    email    varchar(50) not null,
    password varchar(60) not null,
    sex_id   int         null,
    constraint user_email_uindex
        unique (email),
    constraint user_sex_id_fk
        foreign key (sex_id) references sex (id)
            on update cascade on delete set null
);

INSERT INTO sex(label) VALUE ('Male');
INSERT INTO sex(label) VALUE ('Female');
INSERT INTO sex(label) VALUE ('Unknown');
INSERT INTO sex(label) VALUE ('Other');

INSERT INTO user(name, surname, email, password, sex_id) VALUE ('Dima', 'Petrov', 'dimasik@mail.ru', '12345', 1);
INSERT INTO user(name, surname, email, password, sex_id) VALUE ('Irinka', 'Markiv', 'irisha@mail.ru', '1111', 2);
INSERT INTO user(name, surname, email, password, sex_id) VALUE ('Karisha', 'Dudaeva', 'kery@mail.ru', '1', 2);
INSERT INTO user(name, surname, email, password, sex_id) VALUE ('Donguan', 'Ispanev', 'donny@mail.ru', '1', 4);
INSERT INTO user(name, surname, email, password, sex_id) VALUE ('Little', 'Jimmy', 'bigboy@mail.ru', '1', 3);
INSERT INTO user(name, surname, email, password, sex_id) VALUE ('Tema', 'Kitav', 'artemka@mail.ru', '1', 1);

```
