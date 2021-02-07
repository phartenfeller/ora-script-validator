import { addSeqRefError, seqExists } from '../state';

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
  const exists = seqExists(seq);

  if (!exists) {
    addSeqRefError(
      `Sequence referenced in "${callingFile}" does not exist yet: ${seq}. Statement: "${match}"`
    );
  }
};

export default seqExistanceValidator;
