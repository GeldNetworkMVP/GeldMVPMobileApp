import { BaseWeather } from "./base-weather.model";

export type PreparedWeather = BaseWeather & {
    last_updated_as_date: Date
}