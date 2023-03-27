#!/usr/bin/env node
import { getArgs } from "./helpers/args.helper.js";
import { getWeather } from "./services/api.service.js";
import {
    printHelp,
    printSuccess,
    printError,
    printWeather,
} from "./services/log.service.js";
import {
    getKeyValue,
    saveKeyValue,
    TOKEN_DICTIONARY,
} from "./services/storage.service.js";

const saveToken = async (token) => {
    if (!token.length) {
        printError("Token is not provided!");
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess("Token saved!");
    } catch (error) {
        printError(error);
    }
};

const saveCity = async (city) => {
    if (!city.length) {
        printError("City is not provided!");
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess("City saved!");
    } catch (error) {
        printError(error);
    }
};

const getForecast = async () => {
    try {
        const weather = await getWeather(
            await getKeyValue(TOKEN_DICTIONARY.city)
        );
        printWeather(weather);
    } catch (error) {
        if (error.response.status == 404) {
            printError("Wrong city name.");
        } else if (error.response.status == 401) {
            printError("Wrong token.");
        } else {
            printError(e.message);
        }
    }
};

const bootstrap = () => {
    const args = getArgs(process.argv);
    if (args.h) {
        return printHelp();
    }
    if (args.s) {
        return saveCity(args.s);
    }
    if (args.t) {
        return saveToken(args.t);
    }
    return getForecast();
};

bootstrap();
