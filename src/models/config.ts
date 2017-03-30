import { Processor } from './processor';
import { Filter } from './filter';
export interface Config {
    processors: Processor[];
    filters: Filter[];
}