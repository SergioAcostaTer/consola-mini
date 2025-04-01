import { consola } from '../src/log';
import assert from 'assert';

console.log('Manual consola test:');
consola.info('Info message');
consola.warn('Warning message', { id: 123 });
consola.error('Error occurred', { reason: 'Timeout' });
consola.debug('Debugging', { flag: true });

assert.ok(typeof consola.info === 'function');
assert.ok(typeof consola.warn === 'function');
assert.ok(typeof consola.error === 'function');
assert.ok(typeof consola.debug === 'function');

console.log('✅ All consola methods exist.');
