import configFile from '../../config.json';
import dataFile from '../../data.json';

export type ConfigFile = typeof configFile;

export type DataFile = typeof dataFile;

type Options = {
    name: string;
    value: number;
}

export type Field = {
    id: number;
    name: string;
    type: string;
    options?: undefined | Options[];
}