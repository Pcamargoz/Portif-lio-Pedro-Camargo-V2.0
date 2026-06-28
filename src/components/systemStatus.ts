import type { SystemStatus } from '../content/types';

/**
 * Mapeia o status do sistema para um modificador de classe — usado pelo
 * badge no card e no modal. Cores definidas em SystemCard.css.
 */
export function statusClass(status: SystemStatus): string {
  switch (status) {
    case 'Em produção':
      return 'system-status--live';
    case 'Em desenvolvimento':
      return 'system-status--wip';
    case 'Finalizado':
      return 'system-status--done';
  }
}
