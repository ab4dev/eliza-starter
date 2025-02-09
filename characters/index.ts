import { Character, Clients, ModelProviderName } from '@elizaos/core';
import fs from 'fs';

const elizaJSON = JSON.parse(
  fs.readFileSync('./characters/eliza.character.json', 'utf-8'),
);

export const eliza: Character = {
  ...elizaJSON,
  clients: elizaJSON.clients as Clients[],
  modelProvider: elizaJSON.modelProvider as ModelProviderName,
};