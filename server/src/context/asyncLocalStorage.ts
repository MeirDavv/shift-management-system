import { AsyncLocalStorage } from "async_hooks";

const asyncLocalStorage = new AsyncLocalStorage<{organization_id:number}>();

export default asyncLocalStorage;