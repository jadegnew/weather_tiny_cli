import chalk from "chalk";
import dedent from "dedent-js";

export const printError = (error) => {
    console.log(`${chalk.bgRed("ERROR")} ${error}`);
};

export const printSuccess = (msg) => {
    console.log(`${chalk.bgGreen("SUCCESS")} ${msg}`);
};

export const printHelp = () => {
    console.log(
        dedent(`${chalk.bgCyan(" HELP ")}
				Without params  -> get weather forecast
				-s [CITY]       -> set city for weather forecast
				-h              -> get help
				-t [API_KEY]    -> set token
				`)
    );
};

export const printWeather = (res) => {
    console.log(
        dedent(`${chalk.bgYellow(" WEATHER ")} in ${res.name}
				Description: ${res.weather[0].description}
				Temperature: ${res.main.temp}
				Feels like: ${res.main.feels_like}
				Humidity: ${res.main.humidity}%
				Wind speed: ${res.wind.speed} m/s.
				`)
    );
};
