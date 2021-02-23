import { isActive } from '../config/activeRules';
import { addSeqRefError, seqExists } from '../state';
import IndexType from '../types/IndexType';

interface seqExistanceValidatorParams {
  seq: string | undefined;
  match: string;
  callingFile: string;
}

const seqExistanceValidator = ({
  seq,
  match,
  callingFile,
}: seqExistanceValidatorParams): void => {
  if (!isActive(IndexType.SeqNextval)) return;
  const exists = seqExists(seq);

  if (!exists) {
    addSeqRefError(
      `Sequence referenced in "${callingFile}" does not exist yet: ${seq}. Statement: "${match}"`
    );
  }
};

export default seqExistanceValidator;
