import main from '.';
import Loglevel from './src/types/Loglevel';

main('./db_objects/install_lct.sql', Loglevel.debug);
