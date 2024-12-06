import { Client } from '@line/bot-sdk';
import { lineConfig } from './line-config';

export const lineClient = new Client(lineConfig);