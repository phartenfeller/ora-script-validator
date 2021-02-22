create table my_table (
  id number
);

insert into my_table
  (id)
values
  (non_existent_seq.nextval)
;
