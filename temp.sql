column global_name new_value install_to
select global_name
  from global_name
;
 
spool 101_apex_inno_&install_to..log
 
PROMPT >> Installing Schema apex_inno
 
@../../100_backend/199_APEX_INNO/1000_table_ddl/_dab_1.2.0_tables.sql
@../../100_backend/199_APEX_INNO/2000_packages/_dab_1.2.0_pks.sql
@../../100_backend/199_APEX_INNO/3000_views/_dab_1.2.0.sql
@../../100_backend/199_APEX_INNO/2000_packages/_dab_1.2.0_pkb.sql
@../../100_backend/199_APEX_INNO/6000_dml/_dab_1.2.0.sql
 
PROMPT >> Finished Installation
 
spool OFF
 
exit
