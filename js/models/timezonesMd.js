var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  defaults: {
    "timezones": [
        {
            "name":"(GMT -12:00) Eniwetok, Kwajalein",
            "offset": -12
        },
        {
            "name":"(GMT -11:00) Midway Island, Samoa",
            "offset": -11
        },
        {
            "name":"(GMT -10:00) Hawaii",
            "offset": -10
        },
        {
            "name":"(GMT -9:00) Alaska",
            "offset": -9
        },
        {
            "name":"(GMT -8:00) Pacific Time (US & Canada)",
            "offset": -8
        },
        {
            "name":"(GMT -7:00) Mountain Time (US & Canada)",
            "offset": -7
        },
        {
            "name":"(GMT -6:00) Central Time (US & Canada), Mexico City",
            "offset": -6
        },
        {
            "name":"(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima",
            "offset": -5
        },
        {
            "name":"(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz",
            "offset": -4
        },
        {
            "name":"(GMT -3:30) Newfoundland",
            "offset": -3.5
        },
        {
            "name":"(GMT -3:00) Brazil, Buenos Aires, Georgetown",
            "offset": -3
        },
        {
            "name":"(GMT -2:00) Mid-Atlantic",
            "offset": -2
        },
        {
            "name":"(GMT -1:00) Azores, Cape Verde Islands",
            "offset": -1
        },
        {
            "name":"(GMT) Western Europe Time, London, Lisbon, Casablanca",
            "offset": 0
        },
        {
            "name":"(GMT +1:00) Brussels, Copenhagen, Madrid, Paris",
            "offset": 1
        },
        {
            "name":"(GMT +2:00) Kaliningrad, South Africa",
            "offset": 2
        },
        {
            "name":"(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg",
            "offset": 3
        },
        {
            "name":"(GMT +3:30) Tehran",
            "offset": 3.5
        },
        {
            "name":"(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi",
            "offset": 4
        },
        {
            "name":"(GMT +4:30) Kabul",
            "offset": 4.5
        },
        {
            "name":"(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent",
            "offset": 5
        },
        {
            "name":"(GMT +5:30) Bombay, Calcutta, Madras, New Delhi",
            "offset": 5.5
        },
        {
            "name":"(GMT +5:45) Kathmandu",
            "offset": 5.75
        },
        {
            "name":"(GMT +6:00) Almaty, Dhaka, Colombo",
            "offset": 6
        },
        {
            "name":"(GMT +7:00) Bangkok, Hanoi, Jakarta",
            "offset": 7
        },
        {
            "name":"(GMT +8:00) Beijing, Perth, Singapore, Hong Kong",
            "offset": 8
        },
        {
            "name":"(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk",
            "offset": 9
        },
        {
            "name":"(GMT +9:30) Adelaide, Darwin",
            "offset": 9.5
        },
        {
            "name":"(GMT +10:00) Eastern Australia, Guam, Vladivostok",
            "offset": 10
        },
        {
            "name":"(GMT +11:00) Magadan, Solomon Islands, New Caledonia",
            "offset": 11
        },
        {
            "name":"(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka",
            "offset": 12
        }
    ]
  }
});
