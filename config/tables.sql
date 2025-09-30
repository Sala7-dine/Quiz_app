-- create database quiz_app;
-- use quiz_app;

create table users
(
    id    int auto_increment primary key,
    name  varchar(255) not null,
    email varchar(255) not null,
    password varchar(255) not null
);

create table themes
(
    id          int auto_increment
        primary key,
    titre       varchar(100)                        not null,
    description text                                null,
    created_at  timestamp default CURRENT_TIMESTAMP null,
    updated_at  timestamp default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP
);

create table games
(
    id              int auto_increment
        primary key,
    pseudo          varchar(100)                        not null,
    theme_id        int                                 not null,
    score           int       default 0                 not null,
    total_questions int       default 0                 not null,
    time_spent      int       default 0                 null,
    answers         json                                null,
    created_at      timestamp default CURRENT_TIMESTAMP null,
    constraint games_ibfk_1
        foreign key (theme_id) references themes (id)
            on delete cascade
);

create index idx_games_created_at
    on games (created_at);

create index idx_games_pseudo
    on games (pseudo);

create index idx_games_score
    on games (score);

create index idx_games_theme
    on games (theme_id);

create table questions
(
    id             int auto_increment primary key,
    theme_id       int                                   not null,
    type           varchar(50) default 'qcm'             null,
    question       text                                  not null,
    options        json                                  not null,
    correct_answer json                                  not null,
    explanation    text                                  null,
    multi_question tinyint(1)  default 0                 null,
    created_at     timestamp   default CURRENT_TIMESTAMP null,
    updated_at     timestamp   default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP,
    constraint questions_ibfk_1
        foreign key (theme_id) references themes (id)
            on delete cascade
);

create index idx_questions_theme
    on questions (theme_id);



