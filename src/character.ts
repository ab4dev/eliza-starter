import { Character, Clients, defaultCharacter, ModelProviderName } from '@elizaos/core';
import { eliza } from '../characters/index.ts';

export const character: Character = {
  ...defaultCharacter,
  ...eliza,
};
