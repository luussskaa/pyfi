// Generated by Xata Codegen 0.28.0. Please do not edit.
import { buildClient } from "@xata.io/client";
/** @typedef { import('./types').SchemaTables } SchemaTables */
/** @type { SchemaTables } */
const tables = [
  {
    name: "Resources",
    columns: [
      { name: "name", type: "string" },
      { name: "value", type: "float" },
    ],
  },
  {
    name: "Savings",
    columns: [
      { name: "name", type: "string" },
      { name: "value", type: "float" },
    ],
  },
  {
    name: "Expenses",
    columns: [
      { name: "name", type: "string" },
      { name: "value", type: "float" },
      { name: "details", type: "string" },
      { name: "type", type: "string" },
      { name: "paymentId", type: "string" },
    ],
  },
  { name: "Credit", columns: [] },
  {
    name: "CurrentMonth",
    columns: [
      { name: "name", type: "string" },
      { name: "month", type: "string" },
      { name: "userId", type: "string" }
    ],
  },
];
/** @type { import('@xata.io/client').ClientConstructor<{}> } */
const DatabaseClient = buildClient();
const defaultOptions = {
  databaseURL:
    "https://Lucas-Vicentine-s-workspace-9e1953.us-east-1.xata.sh/db/pyfi",
};
/** @typedef { import('./types').DatabaseSchema } DatabaseSchema */
/** @extends DatabaseClient<DatabaseSchema> */
export class XataClient extends DatabaseClient {
  constructor(options) {
    super({ ...defaultOptions, ...options }, tables);
  }
}
let instance = undefined;
/** @type { () => XataClient } */
export const getXataClient = () => {
  if (instance) return instance;
  instance = new XataClient();
  return instance;
};
