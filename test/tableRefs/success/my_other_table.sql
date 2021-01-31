create table (
  this_id number,
  that_id number,
  constraint my_fk
    foreign key (that_id) 
    references test (my_id)
);
