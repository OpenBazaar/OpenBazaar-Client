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
            "name":"(GMT -1:00 hour) Azores, Cape Verde Islands",
            "offset": -1
        },
        {
            "name":"(gmt) western europe time, london, lisbon, casablanca",
            "offset": 0
        },
        {
            "name":"(gmt +1:00 hour) brussels, copenhagen, madrid, paris",
            "offset": 1
        },
        {
            "name":"(gmt +2:00) kaliningrad, south africa",
            "offset": 2
        },
        {
            "name":"(gmt +3:00) baghdad, riyadh, moscow, st. petersburg",
            "offset": 3
        },
        {
            "name":"(gmt +3:30) tehran",
            "offset": 3.5
        },
        {
            "name":"(gmt +4:00) abu dhabi, muscat, baku, tbilisi",
            "offset": 4
        },
        {
            "name":"(gmt +4:30) kabul",
            "offset": 4.5
        },
        {
            "name":"(gmt +5:00) ekaterinburg, islamabad, karachi, tashkent",
            "offset": 5
        },
        {
            "name":"(gmt +5:30) bombay, calcutta, madras, new delhi",
            "offset": 5.5
        },
        {
            "name":"(gmt +5:45) kathmandu",
            "offset": 5.75
        },
        {
            "name":"(gmt +6:00) almaty, dhaka, colombo",
            "offset": 6
        },
        {
            "name":"(gmt +7:00) bangkok, hanoi, jakarta",
            "offset": 7
        },
        {
            "name":"(gmt +8:00) beijing, perth, singapore, hong kong",
            "offset": 8
        },
        {
            "name":"(gmt +9:00) tokyo, seoul, osaka, sapporo, yakutsk",
            "offset": 9
        },
        {
            "name":"(gmt +9:30) adelaide, darwin",
            "offset": 9.5
        },
        {
            "name":"(gmt +10:00) eastern australia, guam, vladivostok",
            "offset": 10
        },
        {
            "name":"(gmt +11:00) magadan, solomon islands, new caledonia",
            "offset": 11
        },
        {
            "name":"(gmt +12:00) auckland, wellington, fiji, kamchatka<f37>",
            "offset": 12
        }
    ]
  }
});
