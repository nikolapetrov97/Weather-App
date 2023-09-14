export interface Location {
  key?: string;
  country?: string;
  region?: string;
  city?: string;
}

export interface FavoritePlace {
  location?: Location;
  weather: DailyForecast;
}

export interface LocationResponse {
  Version: number;
  Key: string;
  Type: string;
  Rank: number;
  LocalizedName: string;
  Country: {
    ID: string;
    LocalizedName: string;
  };
  AdministrativeArea: {
    ID: string;
    LocalizedName: string;
  };
}

export interface ForecastResponse {
  Headline: {
    EffectiveDate: string;
    EffectiveEpochDate: number;
    Severity: number;
    Text: string;
    Category: string;
    EndDate: string;
    EndEpochDate: number;
    MobileLink: string;
    Link: string;
  };
  DailyForecasts: DailyForecast[];
}

export interface DailyForecast {
  Date: string;
  EpochDate: number;
  Sun: {
    Rise: string;
    EpochRise: number;
    Set: string;
    EpochSet: number;
  };
  Moon: {
    Rise: string;
    EpochRise: number;
    Set: string;
    EpochSet: number;
    Phase: string;
    Age: number;
  };
  Temperature: {
    Minimum: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
    Maximum: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
  };
  RealFeelTemperature: {
    Minimum: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
    Maximum: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
  };
  RealFeelTemperatureShade: {
    Minimum: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
    Maximum: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
  };
  HoursOfSun: number;
  DegreeDaySummary: {
    Heating: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
    Cooling: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
  };
  AirAndPollen: {
    Name: string;
    Value: number;
    Category: string;
    CategoryValue: number;
    Type: string;
  }[];
  Day: {
    Icon: number;
    IconPhrase: string;
    LocalSource: {
      Id: number;
      Name: string;
      WeatherCode: string;
    };
    HasPrecipitation: boolean;
    PrecipitationType: string;
    PrecipitationIntensity: string;
    ShortPhrase: string;
    LongPhrase: string;
    PrecipitationProbability: number;
    ThunderstormProbability: number;
    RainProbability: number;
    SnowProbability: number;
    IceProbability: number;
    Wind: {
      Speed: {
        Value: number;
        Unit: string;
        UnitType: number;
      };
      Direction: {
        Degrees: number;
        Localized: string;
        English: string;
      };
    };
    WindGust: {
      Speed: {
        Value: number;
        Unit: string;
        UnitType: number;
      };
    };
    TotalLiquid: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
    Rain: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
    Snow: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
    Ice: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
    HoursOfPrecipitation: number;
    HoursOfRain: number;
    CloudCover: number;
    Evapotranspiration: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
    SolarIrradiance: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
  };
  Night: {
    Icon: number;
    IconPhrase: string;
    LocalSource: {
      Id: number;
      Name: string;
      WeatherCode: string;
    };
    HasPrecipitation: boolean;
    PrecipitationType: string;
    PrecipitationIntensity: string;
    ShortPhrase: string;
    LongPhrase: string;
    PrecipitationProbability: number;
    ThunderstormProbability: number;
    RainProbability: number;
    SnowProbability: number;
    IceProbability: number;
    Wind: {
      Speed: object;
      Direction: object;
    };
    WindGust: {
      Speed: object;
    };
    TotalLiquid: object;
    Rain: object;
    Snow: object;
    Ice: object;
    HoursOfPrecipitation: number;
    HoursOfRain: number;
    CloudCover: number;
    Evapotranspiration: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
    SolarIrradiance: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
  };
  Sources: string;
  MobileLink: string;
  Link: string;
}
