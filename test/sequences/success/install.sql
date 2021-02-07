@@sequences.sql

create table heros (
  hero_id number default on null my_first_seq.nextval
, hero_name varchar2(255 char)
);

create table antagonists (
  ant_id number default on null my_second_one.nextval
, ant_name varchar2(255 char)
);
