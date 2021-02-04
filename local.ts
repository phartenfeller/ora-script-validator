import main from './src/main';
import Loglevel from './src/types/Loglevel';

//main('./db_objects/install_lct.sql', Loglevel.debug);
main('./test/tableRefs/error/install.sql', Loglevel.debug);
