import { log } from './log';

log.info('User created');
log.warn('Low disk space');
log.error('Failed to connect', { service: 'Postgres', retry: true });
log.debug('Incoming request', { headers: { auth: '*****' } });
