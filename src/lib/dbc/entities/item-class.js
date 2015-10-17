import r from 'restructure';
import Entity from '../entity';
import LocalizedStringRef from '../localized-string-ref';

export default Entity({
  id: r.uint32le,
  subClassID: r.uint32le,
  isWeapon: new r.Boolean(r.uint32le),
  name: LocalizedStringRef
});
