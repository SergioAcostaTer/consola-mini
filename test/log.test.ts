import { log } from '../src/log';
import assert from 'assert';

console.log('Manual log test:');
log.info('Info message');
log.warn('Warning message', { id: 123 });
log.error('Error occurred', { reason: 'Timeout' });
log.debug('Debugging', { flag: true });

assert.ok(typeof log.info === 'function');
assert.ok(typeof log.warn === 'function');
assert.ok(typeof log.error === 'function');
assert.ok(typeof log.debug === 'function');

console.log('✅ All log methods exist.');
