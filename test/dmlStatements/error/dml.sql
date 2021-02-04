insert into streets 
  (street_id, street_name)
values
  (1, 'Sesame Street')
;

update streets set street_id = 2
  where street_id = 1
;

delete from streets
  where street_id = 2
;

commit;
