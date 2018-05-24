import fs from 'fs';
import path from 'path';

import MPQ from '../../lib/mpq';
import { expect, fixtures, memo } from '../spec-helper';

describe('MPQ.File', function () {
  const dummy = memo().is(function () {
    return MPQ.open(
      path.join(fixtures, 'TheDeathSheep.w3m')
    ).files.get('(listfile)');
  });

  describe('#close', function () {
    it('closes this file', function () {
      dummy().close();
    });

    it('is idempotent', function () {
      dummy().close();
      dummy().close();
    });
  });

  describe('#opened', function () {
    context('when file is open', function () {
      it('returns true', function () {
        expect(dummy().opened).to.be.true;
      });
    });

    context('when file is closed', function () {
      it('returns false', function () {
        dummy().close();
        expect(dummy().opened).to.be.false;
      });
    });
  });

  describe('#name', function () {
    it('returns file name', function () {
      expect(dummy().name).to.eq('(listfile)');
    });
  });

  describe('#size', function () {
    it('returns file size in bytes', function () {
      expect(dummy().size).to.eq(214);
    });
  });

  describe('#data', function () {
    it('returns file contents in a buffer', function () {
      const listfile = fs.readFileSync(path.join(fixtures, '(listfile)'));
      expect(dummy().data).to.deep.eq(listfile);
    });
  });
});
