import { CacheManager, Character, DbCacheAdapter, IDatabaseCacheAdapter } from '@elizaos/core';

export function initializeDbCache(character: Character, db: IDatabaseCacheAdapter): CacheManager {
  return new CacheManager(new DbCacheAdapter(db, character.id));
}
