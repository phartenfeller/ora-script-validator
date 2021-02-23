create table my_table (
  id number
);

insert into my_table
  (id)
values
  (disabled_seq.nextval)
;

insert into my_table
  (id)
values
  (undefined_seq.nextval)
;
