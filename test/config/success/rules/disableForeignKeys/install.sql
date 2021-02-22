create table my_table (
  id number not null
);

alter table my_table (
  add constraint my_fk
    foreign key (id)
    references not_existing_table (my_col)
);
