'use strict';

var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  defaults: {
    "countries": [
      {
        "name": "Afghanistan",
        "dataName": "AFGHANISTAN",
        "currency": "Afghani",
        "code": "AFN",
        "number": "971",
        "currencyUnits": "2"
      },
      {
        "name": "Aland Islands",
        "dataName": "ALAND_ISLANDS",
        "currency": "Euro",
        "code": "EUR",
        "number": "978",
        "currencyUnits": "2"
      },
      {
        "name": "Albania",
        "dataName": "ALBANIA",
        "currency": "Lek",
        "code": "ALL",
        "number": "008",
        "currencyUnits": "2"
      },
      {
        "name": "Algeria",
        "dataName": "ALGERIA",
        "currency": "Algerian Dinar",
        "code": "DZD",
        "number": "012",
        "currencyUnits": "2"
      },
      {
        "name": "American Samoa",
        "dataName": "AMERICAN_SAMOA",
        "currency": "United States Dollar",
        "code": "USD",
        "number": "840",
        "currencyUnits": "2"
      },
      {
        "name": "Andorra",
        "dataName": "ANDORRA",
        "currency": "Euro",
        "code": "EUR",
        "number": "978",
        "currencyUnits": "2"
      },
      {
        "name": "Angola",
        "dataName": "ANGOLA",
        "currency": "Kwanza",
        "code": "AOA",
        "number": "973",
        "currencyUnits": "2"
      },
      {
        "name": "Anguilla",
        "dataName": "ANGUILLA",
        "currency": "East Caribbean Dollar",
        "code": "XCD",
        "number": "951",
        "currencyUnits": "2"
      },
      {
        "name": "Antigua and Barbuda",
        "dataName": "ANTIGUA",
        "currency": "East Caribbean Dollar",
        "code": "XCD",
        "number": "951",
        "currencyUnits": "2"
      },
      {
        "name": "Argentina",
        "dataName": "ARGENTINA",
        "currency": "Argentine Peso",
        "code": "ARS",
        "number": "032",
        "currencyUnits": "2"
      },
      {
        "name": "Armenia",
        "dataName": "ARMENIA",
        "currency": "Armenian Dram",
        "code": "AMD",
        "number": "051",
        "currencyUnits": "2"
      },
      {
        "name": "Aruba",
        "dataName": "ARUBA",
        "currency": "Aruban Florin",
        "code": "AWG",
        "number": "533",
        "currencyUnits": "2"
      },
      {
        "name": "Australia",
        "dataName": "AUSTRALIA",
        "currency": "Australian Dollar",
        "code": "AUD",
        "number": "036",
        "currencyUnits": "2"
      },
      {
        "name": "Austria",
        "dataName": "AUSTRIA",
        "currency": "Euro",
        "code": "EUR",
        "number": "978",
        "currencyUnits": "2"
      },
      {
        "name": "Azerbaijan",
        "dataName": "AZERBAIJAN",
        "currency": "Azerbaijanian Manat",
        "code": "AZN",
        "number": "944",
        "currencyUnits": "2"
      },
      {
        "name": "Bahamas (The)",
        "dataName": "BAHAMAS",
        "currency": "Bahamian Dollar",
        "code": "BSD",
        "number": "044",
        "currencyUnits": "2"
      },
      {
        "name": "Bahrain",
        "dataName": "BAHRAIN",
        "currency": "Bahraini Dinar",
        "code": "BHD",
        "number": "048",
        "currencyUnits": "3"
      },
      {
        "name": "Bangladesh",
        "dataName": "BANGLADESH",
        "currency": "Taka",
        "code": "BDT",
        "number": "050",
        "currencyUnits": "2"
      },
      {
        "name": "Barbados",
        "dataName": "BARBADOS",
        "currency": "Barbados Dollar",
        "code": "BBD",
        "number": "052",
        "currencyUnits": "2"
      },
      {
        "name": "Belarus",
        "dataName": "BELARUS",
        "currency": "Belarussian Ruble",
        "code": "BYR",
        "number": "974",
        "currencyUnits": "0"
      },
      {
        "name": "Belgium",
        "dataName": "BELGIUM",
        "currency": "Euro",
        "code": "EUR",
        "number": "978",
        "currencyUnits": "2"
      },
      {
        "name": "Belize",
        "dataName": "BELIZE",
        "currency": "Belize Dollar",
        "code": "BZD",
        "number": "084",
        "currencyUnits": "2"
      },
      {
        "name": "Benin",
        "dataName": "BENIN",
        "currency": "CFA Franc BCEAO",
        "code": "XOF",
        "number": "952",
        "currencyUnits": "0"
      },
      {
        "name": "Bermuda",
        "dataName": "BERMUDA",
        "currency": "Bermudian Dollar",
        "code": "BMD",
        "number": "060",
        "currencyUnits": "2"
      },
      {
        "name": "Bhutan",
        "dataName": "BHUTAN",
        "currency": "Ngultrum",
        "code": "BTN",
        "number": "064",
        "currencyUnits": "2"
      },
      {
        "name": "Bolivia (Plurinational State of)",
        "dataName": "BOLIVIA",
        "currency": "Boliviano",
        "code": "BOB",
        "number": "068",
        "currencyUnits": "2"
      },
      {
        "name": "Bonaire, Sint Eustatius and Saba",
        "dataName": "BONAIRE_SINT_EUSTATIUS_SABA",
        "currency": "United States Dollar",
        "code": "USD",
        "number": "840",
        "currencyUnits": "2"
      },
      {
        "name": "Bosnia and Herzegovina",
        "dataName": "BOSNIA",
        "currency": "Convertible Mark",
        "code": "BAM",
        "number": "977",
        "currencyUnits": "2"
      },
      {
        "name": "Botswana",
        "dataName": "BOTSWANA",
        "currency": "Pula",
        "code": "BWP",
        "number": "072",
        "currencyUnits": "2"
      },
      {
        "name": "Bouvet Island",
        "dataName": "BOUVET_ISLAND",
        "currency": "Norwegian Krone",
        "code": "NOK",
        "number": "578",
        "currencyUnits": "2"
      },
      {
        "name": "Brazil",
        "dataName": "BRAZIL",
        "currency": "Brazilian Real",
        "code": "BRL",
        "number": "986",
        "currencyUnits": "2"
      },
      {
        "name": "British Indian Ocean Territory (The)",
        "dataName": "BRITISH_INDIAN_OCEAN_TERRITORY",
        "currency": "United States Dollar",
        "code": "USD",
        "number": "840",
        "currencyUnits": "2"
      },
      {
        "name": "Brunei Darussalam",
        "dataName": "BRUNEI_DARUSSALAM",
        "currency": "Brunei Dollar",
        "code": "BND",
        "number": "096",
        "currencyUnits": "2"
      },
      {
        "name": "Bulgaria",
        "dataName": "BULGARIA",
        "currency": "Bulgarian Lev",
        "code": "BGN",
        "number": "975",
        "currencyUnits": "2"
      },
      {
        "name": "Burkina Faso",
        "dataName": "BURKINA_FASO",
        "currency": "CFA Franc BCEAO",
        "code": "XOF",
        "number": "952",
        "currencyUnits": "0"
      },
      {
        "name": "Burundi",
        "dataName": "BURUNDI",
        "currency": "Burundi Franc",
        "code": "BIF",
        "number": "108",
        "currencyUnits": "0"
      },
      {
        "name": "Cabo Verde",
        "dataName": "CABO_VERDE",
        "currency": "Cabo Verde Escudo",
        "code": "CVE",
        "number": "132",
        "currencyUnits": "2"
      },
      {
        "name": "Cambodia",
        "dataName": "CAMBODIA",
        "currency": "Riel",
        "code": "KHR",
        "number": "116",
        "currencyUnits": "2"
      },
      {
        "name": "Cameroon",
        "dataName": "CAMEROON",
        "currency": "CFA Franc BEAC",
        "code": "XAF",
        "number": "950",
        "currencyUnits": "0"
      },
      {
        "name": "Canada",
        "dataName": "CANADA",
        "currency": "Canadian Dollar",
        "code": "CAD",
        "number": "124",
        "currencyUnits": "2"
      },
      {
        "name": "Cayman Islands (The)",
        "dataName": "CAYMAN_ISLANDS",
        "currency": "Cayman Islands Dollar",
        "code": "KYD",
        "number": "136",
        "currencyUnits": "2"
      },
      {
        "name": "Central African Republic (The)",
        "dataName": "CENTRAL_AFRICAN_REPUBLIC",
        "currency": "CFA Franc BEAC",
        "code": "XAF",
        "number": "950",
        "currencyUnits": "0"
      },
      {
        "name": "Chad",
        "dataName": "CHAD",
        "currency": "CFA Franc BEAC",
        "code": "XAF",
        "number": "950",
        "currencyUnits": "0"
      },
      {
        "name": "Chile",
        "dataName": "CHILE",
        "currency": "Chilean Peso",
        "code": "CLP",
        "number": "152",
        "currencyUnits": "0"
      },
      {
        "name": "China",
        "dataName": "CHINA",
        "currency": "Yuan Renminbi",
        "code": "CNY",
        "number": "156",
        "currencyUnits": "2"
      },
      {
        "name": "Christmas Island",
        "dataName": "CHRISTMAS_ISLAND",
        "currency": "Australian Dollar",
        "code": "AUD",
        "number": "036",
        "currencyUnits": "2"
      },
      {
        "name": "Cocos (KEELING) Islands (The)",
        "dataName": "COCOS_ISLANDS",
        "currency": "Australian Dollar",
        "code": "AUD",
        "number": "036",
        "currencyUnits": "2"
      },
      {
        "name": "Colombia",
        "dataName": "COLOMBIA",
        "currency": "Colombian Peso",
        "code": "COP",
        "number": "170",
        "currencyUnits": "2"
      },
      {
        "name": "Comoros (The)",
        "dataName": "COMOROS",
        "currency": "Comoro Franc",
        "code": "KMF",
        "number": "174",
        "currencyUnits": "0"
      },
      {
        "name": "Congo (The Democratic Republic of the)",
        "dataName": "CONGO_REPUBLIC",
        "currency": "Congolese Franc",
        "code": "CDF",
        "number": "976",
        "currencyUnits": "2"
      },
      {
        "name": "Congo (The)",
        "dataName": "CONGO",
        "currency": "CFA Franc BEAC",
        "code": "XAF",
        "number": "950",
        "currencyUnits": "0"
      },
      {
        "name": "Cook Islands (The)",
        "dataName": "COOK_ISLANDS",
        "currency": "New Zealand Dollar",
        "code": "NZD",
        "number": "554",
        "currencyUnits": "2"
      },
      {
        "name": "Costa Rica",
        "dataName": "COSTA_RICA",
        "currency": "Costa Rican Colon",
        "code": "CRC",
        "number": "188",
        "currencyUnits": "2"
      },
      {
        "name": "Côte D'Ivoire",
        "dataName": "COTE_DIVOIRE",
        "currency": "CFA Franc BCEAO",
        "code": "XOF",
        "number": "952",
        "currencyUnits": "0"
      },
      {
        "name": "Croatia",
        "dataName": "CROATIA",
        "currency": "Kuna",
        "code": "HRK",
        "number": "191",
        "currencyUnits": "2"
      },
      {
        "name": "Cuba",
        "dataName": "CUBA",
        "currency": "Cuban Peso",
        "code": "CUP",
        "number": "192",
        "currencyUnits": "2"
      },
      {
        "name": "Curaçao",
        "dataName": "CURACAO",
        "currency": "NeTherlands Antillean Guilder",
        "code": "ANG",
        "number": "532",
        "currencyUnits": "2"
      },
      {
        "name": "Cyprus",
        "dataName": "CYPRUS",
        "currency": "Euro",
        "code": "EUR",
        "number": "978",
        "currencyUnits": "2"
      },
      {
        "name": "Czech Republic (The)",
        "dataName": "CZECH_REPUBLIC",
        "currency": "Czech Koruna",
        "code": "CZK",
        "number": "203",
        "currencyUnits": "2"
      },
      {
        "name": "Denmark",
        "dataName": "DENMARK",
        "currency": "Danish Krone",
        "code": "DKK",
        "number": "208",
        "currencyUnits": "2"
      },
      {
        "name": "Djibouti",
        "dataName": "DJIBOUTI",
        "currency": "Djibouti Franc",
        "code": "DJF",
        "number": "262",
        "currencyUnits": "0"
      },
      {
        "name": "Dominica",
        "dataName": "DOMINICA",
        "currency": "East Caribbean Dollar",
        "code": "XCD",
        "number": "951",
        "currencyUnits": "2"
      },
      {
        "name": "Dominican Republic (The)",
        "dataName": "DOMINICAN_REPUBLIC",
        "currency": "Dominican Peso",
        "code": "DOP",
        "number": "214",
        "currencyUnits": "2"
      },
      {
        "name": "Ecuador",
        "dataName": "ECUADOR",
        "currency": "United States Dollar",
        "code": "USD",
        "number": "840",
        "currencyUnits": "2"
      },
      {
        "name": "Egypt",
        "dataName": "EGYPT",
        "currency": "Egyptian Pound",
        "code": "EGP",
        "number": "818",
        "currencyUnits": "2"
      },
      {
        "name": "El Salvador",
        "dataName": "EL_SALVADOR",
        "currency": "El Salvador Colon",
        "code": "SVC",
        "number": "222",
        "currencyUnits": "2"
      },
      {
        "name": "Equatorial Guinea",
        "dataName": "EQUATORIAL_GUINEA",
        "currency": "CFA Franc BEAC",
        "code": "XAF",
        "number": "950",
        "currencyUnits": "0"
      },
      {
        "name": "Eritrea",
        "dataName": "ERITREA",
        "currency": "Nakfa",
        "code": "ERN",
        "number": "232",
        "currencyUnits": "2"
      },
      {
        "name": "Estonia",
        "dataName": "ESTONIA",
        "currency": "Euro",
        "code": "EUR",
        "number": "978",
        "currencyUnits": "2"
      },
      {
        "name": "Ethiopia",
        "dataName": "ETHIOPIA",
        "currency": "Ethiopian Birr",
        "code": "ETB",
        "number": "230",
        "currencyUnits": "2"
      },
      {
        "name": "Falkland Islands (The)",
        "dataName": "FALKLAND_ISLANDS",
        "currency": "Falkland Islands Pound",
        "code": "FKP",
        "number": "238",
        "currencyUnits": "2"
      },
      {
        "name": "Faroe Islands (The)",
        "dataName": "FAROE_ISLANDS",
        "currency": "Danish Krone",
        "code": "DKK",
        "number": "208",
        "currencyUnits": "2"
      },
      {
        "name": "Fiji",
        "dataName": "FIJI",
        "currency": "Fiji Dollar",
        "code": "FJD",
        "number": "242",
        "currencyUnits": "2"
      },
      {
        "name": "Finland",
        "dataName": "FINLAND",
        "currency": "Euro",
        "code": "EUR",
        "number": "978",
        "currencyUnits": "2"
      },
      {
        "name": "France",
        "dataName": "FRANCE",
        "currency": "Euro",
        "code": "EUR",
        "number": "978",
        "currencyUnits": "2"
      },
      {
        "name": "French Guiana",
        "dataName": "FRENCH_GUIANA",
        "currency": "Euro",
        "code": "EUR",
        "number": "978",
        "currencyUnits": "2"
      },
      {
        "name": "French Polynesia",
        "dataName": "FRENCH_POLYNESIA",
        "currency": "CFP Franc",
        "code": "XPF",
        "number": "953",
        "currencyUnits": "0"
      },
      {
        "name": "French Southern Territories (The)",
        "dataName": "FRENCH_SOUTHERN_TERRITORIES",
        "currency": "Euro",
        "code": "EUR",
        "number": "978",
        "currencyUnits": "2"
      },
      {
        "name": "Gabon",
        "dataName": "GABON",
        "currency": "CFA Franc BEAC",
        "code": "XAF",
        "number": "950",
        "currencyUnits": "0"
      },
      {
        "name": "Gambia (The)",
        "dataName": "GAMBIA",
        "currency": "Dalasi",
        "code": "GMD",
        "number": "270",
        "currencyUnits": "2"
      },
      {
        "name": "Georgia",
        "dataName": "GEORGIA",
        "currency": "Lari",
        "code": "GEL",
        "number": "981",
        "currencyUnits": "2"
      },
      {
        "name": "Germany",
        "dataName": "GERMANY",
        "currency": "Euro",
        "code": "EUR",
        "number": "978",
        "currencyUnits": "2"
      },
      {
        "name": "Ghana",
        "dataName": "GHANA",
        "currency": "Ghana Cedi",
        "code": "GHS",
        "number": "936",
        "currencyUnits": "2"
      },
      {
        "name": "Gibraltar",
        "dataName": "GIBRALTAR",
        "currency": "Gibraltar Pound",
        "code": "GIP",
        "number": "292",
        "currencyUnits": "2"
      },
      {
        "name": "Greece",
        "dataName": "GREECE",
        "currency": "Euro",
        "code": "EUR",
        "number": "978",
        "currencyUnits": "2"
      },
      {
        "name": "Greenland",
        "dataName": "GREENLAND",
        "currency": "Danish Krone",
        "code": "DKK",
        "number": "208",
        "currencyUnits": "2"
      },
      {
        "name": "Grenada",
        "dataName": "GRENADA",
        "currency": "East Caribbean Dollar",
        "code": "XCD",
        "number": "951",
        "currencyUnits": "2"
      },
      {
        "name": "Guadeloupe",
        "dataName": "GUADELOUPE",
        "currency": "Euro",
        "code": "EUR",
        "number": "978",
        "currencyUnits": "2"
      },
      {
        "name": "Guam",
        "dataName": "GUAM",
        "currency": "United States Dollar",
        "code": "USD",
        "number": "840",
        "currencyUnits": "2"
      },
      {
        "name": "Guatemala",
        "dataName": "GUATEMALA",
        "currency": "Quetzal",
        "code": "GTQ",
        "number": "320",
        "currencyUnits": "2"
      },
      {
        "name": "Guernsey",
        "dataName": "GUERNSEY",
        "currency": "Pound Sterling",
        "code": "GBP",
        "number": "826",
        "currencyUnits": "2"
      },
      {
        "name": "Guinea",
        "dataName": "GUINEA",
        "currency": "Guinea Franc",
        "code": "GNF",
        "number": "324",
        "currencyUnits": "0"
      },
      {
        "name": "Guinea-Bissau",
        "dataName": "GUINEA_BISSAU",
        "currency": "CFA Franc BCEAO",
        "code": "XOF",
        "number": "952",
        "currencyUnits": "0"
      },
      {
        "name": "Guyana",
        "dataName": "GUYANA",
        "currency": "Guyana Dollar",
        "code": "GYD",
        "number": "328",
        "currencyUnits": "2"
      },
      {
        "name": "Haiti",
        "dataName": "HAITI",
        "currency": "Gourde",
        "code": "HTG",
        "number": "332",
        "currencyUnits": "2"
      },
      {
        "name": "Heard Island and McDONALD Islands",
        "dataName": "HEARD_ISLAND",
        "currency": "Australian Dollar",
        "code": "AUD",
        "number": "036",
        "currencyUnits": "2"
      },
      {
        "name": "Holy See (The)",
        "dataName": "HOLY_SEE",
        "currency": "Euro",
        "code": "EUR",
        "number": "978",
        "currencyUnits": "2"
      },
      {
        "name": "Honduras",
        "dataName": "HONDURAS",
        "currency": "Lempira",
        "code": "HNL",
        "number": "340",
        "currencyUnits": "2"
      },
      {
        "name": "Hong Kong",
        "dataName": "HONG_KONG",
        "currency": "Hong Kong Dollar",
        "code": "HKD",
        "number": "344",
        "currencyUnits": "2"
      },
      {
        "name": "Hungary",
        "dataName": "HUNGARY",
        "currency": "Forint",
        "code": "HUF",
        "number": "348",
        "currencyUnits": "2"
      },
      {
        "name": "Iceland",
        "dataName": "ICELAND",
        "currency": "Iceland Krona",
        "code": "ISK",
        "number": "352",
        "currencyUnits": "0"
      },
      {
        "name": "India",
        "dataName": "INDIA",
        "currency": "Indian Rupee",
        "code": "INR",
        "number": "356",
        "currencyUnits": "2"
      },
      {
        "name": "Indonesia",
        "dataName": "INDONESIA",
        "currency": "Rupiah",
        "code": "IDR",
        "number": "360",
        "currencyUnits": "2"
      },
      {
        "name": "Iran (Islamic Republic of)",
        "dataName": "IRAN",
        "currency": "Iranian Rial",
        "code": "IRR",
        "number": "364",
        "currencyUnits": "2"
      },
      {
        "name": "Iraq",
        "dataName": "IRAQ",
        "currency": "Iraqi Dinar",
        "code": "IQD",
        "number": "368",
        "currencyUnits": "3"
      },
      {
        "name": "Ireland",
        "dataName": "IRELAND",
        "currency": "Euro",
        "code": "EUR",
        "number": "978",
        "currencyUnits": "2"
      },
      {
        "name": "Isle of Man",
        "dataName": "ISLE_OF_MAN",
        "currency": "Pound Sterling",
        "code": "GBP",
        "number": "826",
        "currencyUnits": "2"
      },
      {
        "name": "Israel",
        "dataName": "ISRAEL",
        "currency": "New Israeli Sheqel",
        "code": "ILS",
        "number": "376",
        "currencyUnits": "2"
      },
      {
        "name": "Italy",
        "dataName": "ITALY",
        "currency": "Euro",
        "code": "EUR",
        "number": "978",
        "currencyUnits": "2"
      },
      {
        "name": "Jamaica",
        "dataName": "JAMAICA",
        "currency": "Jamaican Dollar",
        "code": "JMD",
        "number": "388",
        "currencyUnits": "2"
      },
      {
        "name": "Japan",
        "dataName": "JAPAN",
        "currency": "Yen",
        "code": "JPY",
        "number": "392",
        "currencyUnits": "0"
      },
      {
        "name": "Jersey",
        "dataName": "JERSEY",
        "currency": "Pound Sterling",
        "code": "GBP",
        "number": "826",
        "currencyUnits": "2"
      },
      {
        "name": "Jordan",
        "dataName": "JORDAN",
        "currency": "Jordanian Dinar",
        "code": "JOD",
        "number": "400",
        "currencyUnits": "3"
      },
      {
        "name": "Kazakhstan",
        "dataName": "KAZAKHSTAN",
        "currency": "Tenge",
        "code": "KZT",
        "number": "398",
        "currencyUnits": "2"
      },
      {
        "name": "Kenya",
        "dataName": "KENYA",
        "currency": "Kenyan Shilling",
        "code": "KES",
        "number": "404",
        "currencyUnits": "2"
      },
      {
        "name": "Kiribati",
        "dataName": "KIRIBATI",
        "currency": "Australian Dollar",
        "code": "AUD",
        "number": "036",
        "currencyUnits": "2"
      },
      {
        "name": "Korea (The Democratic People's Republic of)",
        "dataName": "NORTH_KOREA",
        "currency": "North Korean Won",
        "code": "KPW",
        "number": "408",
        "currencyUnits": "2"
      },
      {
        "name": "Korea (The Republic of)",
        "dataName": "SOUTH_KOREA",
        "currency": "Won",
        "code": "KRW",
        "number": "410",
        "currencyUnits": "0"
      },
      {
        "name": "Kuwait",
        "dataName": "KUWAIT",
        "currency": "Kuwaiti Dinar",
        "code": "KWD",
        "number": "414",
        "currencyUnits": "3"
      },
      {
        "name": "Kyrgyzstan",
        "dataName": "KYRGYZSTAN",
        "currency": "Som",
        "code": "KGS",
        "number": "417",
        "currencyUnits": "2"
      },
      {
        "name": "Lao People's Democratic Republic (The)",
        "dataName": "LAO",
        "currency": "Kip",
        "code": "LAK",
        "number": "418",
        "currencyUnits": "2"
      },
      {
        "name": "Latvia",
        "dataName": "LATVIA",
        "currency": "Euro",
        "code": "EUR",
        "number": "978",
        "currencyUnits": "2"
      },
      {
        "name": "Lebanon",
        "dataName": "LEBANON",
        "currency": "Lebanese Pound",
        "code": "LBP",
        "number": "422",
        "currencyUnits": "2"
      },
      {
        "name": "Lesotho",
        "dataName": "LESOTHO",
        "currency": "Loti",
        "code": "LSL",
        "number": "426",
        "currencyUnits": "2"
      },
      {
        "name": "Liberia",
        "dataName": "LIBERIA",
        "currency": "Liberian Dollar",
        "code": "LRD",
        "number": "430",
        "currencyUnits": "2"
      },
      {
        "name": "Libya",
        "dataName": "LIBYA",
        "currency": "Libyan Dinar",
        "code": "LYD",
        "number": "434",
        "currencyUnits": "3"
      },
      {
        "name": "Liechtenstein",
        "dataName": "LIECHTENSTEIN",
        "currency": "Swiss Franc",
        "code": "CHF",
        "number": "756",
        "currencyUnits": "2"
      },
      {
        "name": "Lithuania",
        "dataName": "LITHUANIA",
        "currency": "Euro",
        "code": "EUR",
        "number": "978",
        "currencyUnits": "2"
      },
      {
        "name": "Luxembourg",
        "dataName": "LUXEMBOURG",
        "currency": "Euro",
        "code": "EUR",
        "number": "978",
        "currencyUnits": "2"
      },
      {
        "name": "Macao",
        "dataName": "MACAO",
        "currency": "Pataca",
        "code": "MOP",
        "number": "446",
        "currencyUnits": "2"
      },
      {
        "name": "Macedonia (The Former Yugoslav Republic of)",
        "dataName": "MACEDONIA",
        "currency": "Denar",
        "code": "MKD",
        "number": "807",
        "currencyUnits": "2"
      },
      {
        "name": "Madagascar",
        "dataName": "MADAGASCAR",
        "currency": "Malagasy Ariary",
        "code": "MGA",
        "number": "969",
        "currencyUnits": "2"
      },
      {
        "name": "Malawi",
        "dataName": "MALAWI",
        "currency": "Kwacha",
        "code": "MWK",
        "number": "454",
        "currencyUnits": "2"
      },
      {
        "name": "Malaysia",
        "dataName": "MALAYSIA",
        "currency": "Malaysian Ringgit",
        "code": "MYR",
        "number": "458",
        "currencyUnits": "2"
      },
      {
        "name": "Maldives",
        "dataName": "MALDIVES",
        "currency": "Rufiyaa",
        "code": "MVR",
        "number": "462",
        "currencyUnits": "2"
      },
      {
        "name": "Mali",
        "dataName": "MALI",
        "currency": "CFA Franc BCEAO",
        "code": "XOF",
        "number": "952",
        "currencyUnits": "0"
      },
      {
        "name": "Malta",
        "dataName": "MALTA",
        "currency": "Euro",
        "code": "EUR",
        "number": "978",
        "currencyUnits": "2"
      },
      {
        "name": "Marshall Islands (The)",
        "dataName": "MARSHALL_ISLANDS",
        "currency": "United States Dollar",
        "code": "USD",
        "number": "840",
        "currencyUnits": "2"
      },
      {
        "name": "Martinique",
        "dataName": "MARTINIQUE",
        "currency": "Euro",
        "code": "EUR",
        "number": "978",
        "currencyUnits": "2"
      },
      {
        "name": "Mauritania",
        "dataName": "MAURITANIA",
        "currency": "Ouguiya",
        "code": "MRO",
        "number": "478",
        "currencyUnits": "2"
      },
      {
        "name": "Mauritius",
        "dataName": "MAURITIUS",
        "currency": "Mauritius Rupee",
        "code": "MUR",
        "number": "480",
        "currencyUnits": "2"
      },
      {
        "name": "Mayotte",
        "dataName": "MAYOTTE",
        "currency": "Euro",
        "code": "EUR",
        "number": "978",
        "currencyUnits": "2"
      },
      {
        "name": "Mexico",
        "dataName": "MEXICO",
        "currency": "Mexican Peso",
        "code": "MXN",
        "number": "484",
        "currencyUnits": "2"
      },
      {
        "name": "Micronesia (Federated States of)",
        "dataName": "MICRONESIA",
        "currency": "United States Dollar",
        "code": "USD",
        "number": "840",
        "currencyUnits": "2"
      },
      {
        "name": "Moldova (The Republic of)",
        "dataName": "MOLDOVA",
        "currency": "Moldovan Leu",
        "code": "MDL",
        "number": "498",
        "currencyUnits": "2"
      },
      {
        "name": "Monaco",
        "dataName": "MONACO",
        "currency": "Euro",
        "code": "EUR",
        "number": "978",
        "currencyUnits": "2"
      },
      {
        "name": "Mongolia",
        "dataName": "MONGOLIA",
        "currency": "Tugrik",
        "code": "MNT",
        "number": "496",
        "currencyUnits": "2"
      },
      {
        "name": "Montenegro",
        "dataName": "MONTENEGRO",
        "currency": "Euro",
        "code": "EUR",
        "number": "978",
        "currencyUnits": "2"
      },
      {
        "name": "Montserrat",
        "dataName": "MONTSERRAT",
        "currency": "East Caribbean Dollar",
        "code": "XCD",
        "number": "951",
        "currencyUnits": "2"
      },
      {
        "name": "Morocco",
        "dataName": "MOROCCO",
        "currency": "Moroccan Dirham",
        "code": "MAD",
        "number": "504",
        "currencyUnits": "2"
      },
      {
        "name": "Mozambique",
        "dataName": "MOZAMBIQUE",
        "currency": "Mozambique Metical",
        "code": "MZN",
        "number": "943",
        "currencyUnits": "2"
      },
      {
        "name": "Myanmar",
        "dataName": "MYANMAR",
        "currency": "Kyat",
        "code": "MMK",
        "number": "104",
        "currencyUnits": "2"
      },
      {
        "name": "Namibia",
        "dataName": "NAMIBIA",
        "currency": "Namibia Dollar",
        "code": "NAD",
        "number": "516",
        "currencyUnits": "2"
      },
      {
        "name": "Nauru",
        "dataName": "NAURU",
        "currency": "Australian Dollar",
        "code": "AUD",
        "number": "036",
        "currencyUnits": "2"
      },
      {
        "name": "Nepal",
        "dataName": "NEPAL",
        "currency": "Nepalese Rupee",
        "code": "NPR",
        "number": "524",
        "currencyUnits": "2"
      },
      {
        "name": "Netherlands (The)",
        "dataName": "NETHERLANDS",
        "currency": "Euro",
        "code": "EUR",
        "number": "978",
        "currencyUnits": "2"
      },
      {
        "name": "New Caledonia",
        "dataName": "NEW_CALEDONIA",
        "currency": "CFP Franc",
        "code": "XPF",
        "number": "953",
        "currencyUnits": "0"
      },
      {
        "name": "New Zealand",
        "dataName": "NEW_ZEALAND",
        "currency": "New Zealand Dollar",
        "code": "NZD",
        "number": "554",
        "currencyUnits": "2"
      },
      {
        "name": "Nicaragua",
        "dataName": "NICARAGUA",
        "currency": "Cordoba Oro",
        "code": "NIO",
        "number": "558",
        "currencyUnits": "2"
      },
      {
        "name": "Niger (The)",
        "dataName": "NIGER",
        "currency": "CFA Franc BCEAO",
        "code": "XOF",
        "number": "952",
        "currencyUnits": "0"
      },
      {
        "name": "Nigeria",
        "dataName": "NIGERIA",
        "currency": "Naira",
        "code": "NGN",
        "number": "566",
        "currencyUnits": "2"
      },
      {
        "name": "Niue",
        "dataName": "NIUE",
        "currency": "New Zealand Dollar",
        "code": "NZD",
        "number": "554",
        "currencyUnits": "2"
      },
      {
        "name": "Norfolk Island",
        "dataName": "NORFOLK_ISLAND",
        "currency": "Australian Dollar",
        "code": "AUD",
        "number": "036",
        "currencyUnits": "2"
      },
      {
        "name": "Northern Mariana Islands (The)",
        "dataName": "NORTHERN_MARIANA_ISLANDS",
        "currency": "United States Dollar",
        "code": "USD",
        "number": "840",
        "currencyUnits": "2"
      },
      {
        "name": "Norway",
        "dataName": "NORWAY",
        "currency": "Norwegian Krone",
        "code": "NOK",
        "number": "578",
        "currencyUnits": "2"
      },
      {
        "name": "Oman",
        "dataName": "OMAN",
        "currency": "Rial Omani",
        "code": "OMR",
        "number": "512",
        "currencyUnits": "3"
      },
      {
        "name": "Pakistan",
        "dataName": "PAKISTAN",
        "currency": "Pakistan Rupee",
        "code": "PKR",
        "number": "586",
        "currencyUnits": "2"
      },
      {
        "name": "Palau",
        "dataName": "PALAU",
        "currency": "United States Dollar",
        "code": "USD",
        "number": "840",
        "currencyUnits": "2"
      },
      {
        "name": "PANAMA",
        "dataName": "PANAMA",
        "currency": "Balboa",
        "code": "PAB",
        "number": "590",
        "currencyUnits": "2"
      },
      {
        "name": "Papua New Guinea",
        "dataName": "PAPUA_NEW_GUINEA",
        "currency": "Kina",
        "code": "PGK",
        "number": "598",
        "currencyUnits": "2"
      },
      {
        "name": "Paraguay",
        "dataName": "PARAGUAY",
        "currency": "Guarani",
        "code": "PYG",
        "number": "600",
        "currencyUnits": "0"
      },
      {
        "name": "Peru",
        "dataName": "PERU",
        "currency": "Nuevo Sol",
        "code": "PEN",
        "number": "604",
        "currencyUnits": "2"
      },
      {
        "name": "Philippines (The)",
        "dataName": "PHILIPPINES",
        "currency": "Philippine Peso",
        "code": "PHP",
        "number": "608",
        "currencyUnits": "2"
      },
      {
        "name": "Pitcairn",
        "dataName": "PITCAIRN",
        "currency": "New Zealand Dollar",
        "code": "NZD",
        "number": "554",
        "currencyUnits": "2"
      },
      {
        "name": "Poland",
        "dataName": "POLAND",
        "currency": "Zloty",
        "code": "PLN",
        "number": "985",
        "currencyUnits": "2"
      },
      {
        "name": "Portugal",
        "dataName": "PORTUGAL",
        "currency": "Euro",
        "code": "EUR",
        "number": "978",
        "currencyUnits": "2"
      },
      {
        "name": "Puerto Rico",
        "dataName": "PUERTO_RICO",
        "currency": "United States Dollar",
        "code": "USD",
        "number": "840",
        "currencyUnits": "2"
      },
      {
        "name": "Qatar",
        "dataName": "QATAR",
        "currency": "Qatari Rial",
        "code": "QAR",
        "number": "634",
        "currencyUnits": "2"
      },
      {
        "name": "Réunion",
        "dataName": "REUNION",
        "currency": "Euro",
        "code": "EUR",
        "number": "978",
        "currencyUnits": "2"
      },
      {
        "name": "Romania",
        "dataName": "ROMANIA",
        "currency": "Romanian Leu",
        "code": "RON",
        "number": "946",
        "currencyUnits": "2"
      },
      {
        "name": "Russian Federation (The)",
        "dataName": "RUSSIA",
        "currency": "Russian Ruble",
        "code": "RUB",
        "number": "643",
        "currencyUnits": "2"
      },
      {
        "name": "Rwanda",
        "dataName": "RWANDA",
        "currency": "Rwanda Franc",
        "code": "RWF",
        "number": "646",
        "currencyUnits": "0"
      },
      {
        "name": "Saint Barthélemy",
        "dataName": "SAINT_BARTHELEMY",
        "currency": "Euro",
        "code": "EUR",
        "number": "978",
        "currencyUnits": "2"
      },
      {
        "name": "Saint Helena, Ascension and Tristan da Cunha",
        "dataName": "SAINT_HELENA",
        "currency": "Saint Helena Pound",
        "code": "SHP",
        "number": "654",
        "currencyUnits": "2"
      },
      {
        "name": "Saint Kitts and Nevis",
        "dataName": "SAINT_KITTS",
        "currency": "East Caribbean Dollar",
        "code": "XCD",
        "number": "951",
        "currencyUnits": "2"
      },
      {
        "name": "Saint Lucia",
        "dataName": "SAINT_LUCIA",
        "currency": "East Caribbean Dollar",
        "code": "XCD",
        "number": "951",
        "currencyUnits": "2"
      },
      {
        "name": "Saint Martin (French Part)",
        "dataName": "SAINT_MARTIN",
        "currency": "Euro",
        "code": "EUR",
        "number": "978",
        "currencyUnits": "2"
      },
      {
        "name": "Saint Pierre and Miquelon",
        "dataName": "SAINT_PIERRE",
        "currency": "Euro",
        "code": "EUR",
        "number": "978",
        "currencyUnits": "2"
      },
      {
        "name": "Saint Vincent and The Grenadines",
        "dataName": "SAINT_VINCENT",
        "currency": "East Caribbean Dollar",
        "code": "XCD",
        "number": "951",
        "currencyUnits": "2"
      },
      {
        "name": "Samoa",
        "dataName": "SAMOA",
        "currency": "Tala",
        "code": "WST",
        "number": "882",
        "currencyUnits": "2"
      },
      {
        "name": "San Marino",
        "dataName": "SAN_MARINO",
        "currency": "Euro",
        "code": "EUR",
        "number": "978",
        "currencyUnits": "2"
      },
      {
        "name": "Sao Tome and Principe",
        "dataName": "SAO_TOME",
        "currency": "Dobra",
        "code": "STD",
        "number": "678",
        "currencyUnits": "2"
      },
      {
        "name": "Saudi Arabia",
        "dataName": "SAUDI_ARABIA",
        "currency": "Saudi Riyal",
        "code": "SAR",
        "number": "682",
        "currencyUnits": "2"
      },
      {
        "name": "Senegal",
        "dataName": "SENEGAL",
        "currency": "CFA Franc BCEAO",
        "code": "XOF",
        "number": "952",
        "currencyUnits": "0"
      },
      {
        "name": "Serbia",
        "dataName": "SERBIA",
        "currency": "Serbian Dinar",
        "code": "RSD",
        "number": "941",
        "currencyUnits": "2"
      },
      {
        "name": "Seychelles",
        "dataName": "SEYCHELLES",
        "currency": "Seychelles Rupee",
        "code": "SCR",
        "number": "690",
        "currencyUnits": "2"
      },
      {
        "name": "Sierra Leone",
        "dataName": "SIERRA_LEONE",
        "currency": "Leone",
        "code": "SLL",
        "number": "694",
        "currencyUnits": "2"
      },
      {
        "name": "Singapore",
        "dataName": "SINGAPORE",
        "currency": "Singapore Dollar",
        "code": "SGD",
        "number": "702",
        "currencyUnits": "2"
      },
      {
        "name": "Sint Maarten (Dutch Part)",
        "dataName": "SINT_MAARTEN",
        "currency": "NeTherlands Antillean Guilder",
        "code": "ANG",
        "number": "532",
        "currencyUnits": "2"
      },
      {
        "name": "Sistema Unitario de Compensacion Regional de Pagos 'Sucre'",
        "dataName": "SUCRE",
        "currency": "Sucre",
        "code": "XSU",
        "number": "994",
        "currencyUnits": "N.A."
      },
      {
        "name": "Slovakia",
        "dataName": "SLOVAKIA",
        "currency": "Euro",
        "code": "EUR",
        "number": "978",
        "currencyUnits": "2"
      },
      {
        "name": "Slovenia",
        "dataName": "SLOVENIA",
        "currency": "Euro",
        "code": "EUR",
        "number": "978",
        "currencyUnits": "2"
      },
      {
        "name": "Solomon Islands",
        "dataName": "SOLOMON_ISLANDS",
        "currency": "Solomon Islands Dollar",
        "code": "SBD",
        "number": "090",
        "currencyUnits": "2"
      },
      {
        "name": "Somalia",
        "dataName": "SOMALIA",
        "currency": "Somali Shilling",
        "code": "SOS",
        "number": "706",
        "currencyUnits": "2"
      },
      {
        "name": "South Africa",
        "dataName": "SOUTH_AFRICA",
        "currency": "Rand",
        "code": "ZAR",
        "number": "710",
        "currencyUnits": "2"
      },
      {
        "name": "South Sudan",
        "dataName": "SOUTH_SUDAN",
        "currency": "South Sudanese Pound",
        "code": "SSP",
        "number": "728",
        "currencyUnits": "2"
      },
      {
        "name": "Spain",
        "dataName": "SPAIN",
        "currency": "Euro",
        "code": "EUR",
        "number": "978",
        "currencyUnits": "2"
      },
      {
        "name": "Sri Lanka",
        "dataName": "SRI_LANKA",
        "currency": "Sri Lanka Rupee",
        "code": "LKR",
        "number": "144",
        "currencyUnits": "2"
      },
      {
        "name": "Sudan (The)",
        "dataName": "SUDAN",
        "currency": "Sudanese Pound",
        "code": "SDG",
        "number": "938",
        "currencyUnits": "2"
      },
      {
        "name": "Suriname",
        "dataName": "SURINAME",
        "currency": "Surinam Dollar",
        "code": "SRD",
        "number": "968",
        "currencyUnits": "2"
      },
      {
        "name": "Svalbard and Jan Mayen",
        "dataName": "SVALBARD",
        "currency": "Norwegian Krone",
        "code": "NOK",
        "number": "578",
        "currencyUnits": "2"
      },
      {
        "name": "Swaziland",
        "dataName": "SWAZILAND",
        "currency": "Lilangeni",
        "code": "SZL",
        "number": "748",
        "currencyUnits": "2"
      },
      {
        "name": "Sweden",
        "dataName": "SWEDEN",
        "currency": "Swedish Krona",
        "code": "SEK",
        "number": "752",
        "currencyUnits": "2"
      },
      {
        "name": "Switzerland",
        "dataName": "SWITZERLAND",
        "currency": "Swiss Franc",
        "code": "CHF",
        "number": "756",
        "currencyUnits": "2"
      },
      {
        "name": "Syrian Arab Republic",
        "dataName": "SYRIAN_ARAB_REPUBLIC",
        "currency": "Syrian Pound",
        "code": "SYP",
        "number": "760",
        "currencyUnits": "2"
      },
      {
        "name": "Taiwan",
        "dataName": "TAIWAN",
        "currency": "New Taiwan Dollar",
        "code": "TWD",
        "number": "901",
        "currencyUnits": "2"
      },
      {
        "name": "Tajikistan",
        "dataName": "TAJIKISTAN",
        "currency": "Somoni",
        "code": "TJS",
        "number": "972",
        "currencyUnits": "2"
      },
      {
        "name": "Tanzania, United Republic of",
        "dataName": "TANZANIA",
        "currency": "Tanzanian Shilling",
        "code": "TZS",
        "number": "834",
        "currencyUnits": "2"
      },
      {
        "name": "Thailand",
        "dataName": "THAILAND",
        "currency": "Baht",
        "code": "THB",
        "number": "764",
        "currencyUnits": "2"
      },
      {
        "name": "Timor-Leste",
        "dataName": "TIMOR_LESTE",
        "currency": "United States Dollar",
        "code": "USD",
        "number": "840",
        "currencyUnits": "2"
      },
      {
        "name": "Togo",
        "dataName": "TOGO",
        "currency": "CFA Franc BCEAO",
        "code": "XOF",
        "number": "952",
        "currencyUnits": "0"
      },
      {
        "name": "Tokelau",
        "dataName": "TOKELAU",
        "currency": "New Zealand Dollar",
        "code": "NZD",
        "number": "554",
        "currencyUnits": "2"
      },
      {
        "name": "Tonga",
        "dataName": "TONGA",
        "currency": "Pa'anga",
        "code": "TOP",
        "number": "776",
        "currencyUnits": "2"
      },
      {
        "name": "Trinidad and Tobago",
        "dataName": "TRINIDAD",
        "currency": "Trinidad and Tobago Dollar",
        "code": "TTD",
        "number": "780",
        "currencyUnits": "2"
      },
      {
        "name": "Tunisia",
        "dataName": "TUNISIA",
        "currency": "Tunisian Dinar",
        "code": "TND",
        "number": "788",
        "currencyUnits": "3"
      },
      {
        "name": "Turkey",
        "dataName": "TURKEY",
        "currency": "Turkish Lira",
        "code": "TRY",
        "number": "949",
        "currencyUnits": "2"
      },
      {
        "name": "Turkmenistan",
        "dataName": "TURKMENISTAN",
        "currency": "Turkmenistan New Manat",
        "code": "TMT",
        "number": "934",
        "currencyUnits": "2"
      },
      {
        "name": "Turks and Caicos Islands (The)",
        "dataName": "TURKS_AND_CAICOS_ISLANDS",
        "currency": "United States Dollar",
        "code": "USD",
        "number": "840",
        "currencyUnits": "2"
      },
      {
        "name": "Tuvalu",
        "dataName": "TUVALU",
        "currency": "Australian Dollar",
        "code": "AUD",
        "number": "036",
        "currencyUnits": "2"
      },
      {
        "name": "Uganda",
        "dataName": "UGANDA",
        "currency": "Uganda Shilling",
        "code": "UGX",
        "number": "800",
        "currencyUnits": "0"
      },
      {
        "name": "Ukraine",
        "dataName": "UKRAINE",
        "currency": "Hryvnia",
        "code": "UAH",
        "number": "980",
        "currencyUnits": "2"
      },
      {
        "name": "United Arab Emirates (The)",
        "dataName": "UNITED_ARAB_EMIRATES",
        "currency": "UAE Dirham",
        "code": "AED",
        "number": "784",
        "currencyUnits": "2"
      },
      {
        "name": "United Kingdom of Great Britain and Northern Ireland (The)",
        "dataName": "UNITED_KINGDOM",
        "currency": "Pound Sterling",
        "code": "GBP",
        "number": "826",
        "currencyUnits": "2"
      },
      {
        "name": "United States of America (The)",
        "dataName": "UNITED_STATES",
        "currency": "United States Dollar",
        "code": "USD",
        "number": "840",
        "currencyUnits": "2"
      },
      {
        "name": "Uruguay",
        "dataName": "URUGUAY",
        "currency": "Peso Uruguayo",
        "code": "UYU",
        "number": "858",
        "currencyUnits": "2"
      },
      {
        "name": "Uzbekistan",
        "dataName": "UZBEKISTAN",
        "currency": "Uzbekistan Sum",
        "code": "UZS",
        "number": "860",
        "currencyUnits": "2"
      },
      {
        "name": "Vanuatu",
        "dataName": "VANUATU",
        "currency": "Vatu",
        "code": "VUV",
        "number": "548",
        "currencyUnits": "0"
      },
      {
        "name": "Venezuela (Bolivarian Republic Of)",
        "dataName": "VENEZUELA",
        "currency": "Bolivar",
        "code": "VEF",
        "number": "937",
        "currencyUnits": "2"
      },
      {
        "name": "VietNam",
        "dataName": "VIETNAM",
        "currency": "Dong",
        "code": "VND",
        "number": "704",
        "currencyUnits": "0"
      },
      {
        "name": "Virgin Islands (British)",
        "dataName": "VIRGIN_ISLANDS_BRITISH",
        "currency": "United States Dollar",
        "code": "USD",
        "number": "840",
        "currencyUnits": "2"
      },
      {
        "name": "Virgin Islands (U.S.)",
        "dataName": "VIRGIN_ISLANDS_US",
        "currency": "United States Dollar",
        "code": "USD",
        "number": "840",
        "currencyUnits": "2"
      },
      {
        "name": "Wallis and Futuna",
        "dataName": "WALLIS_AND_FUTUNA",
        "currency": "CFP Franc",
        "code": "XPF",
        "number": "953",
        "currencyUnits": "0"
      },
      {
        "name": "Western Sahara",
        "dataName": "WESTERN_SAHARA",
        "currency": "Moroccan Dirham",
        "code": "MAD",
        "number": "504",
        "currencyUnits": "2"
      },
      {
        "name": "Yemen",
        "dataName": "YEMEN",
        "currency": "Yemeni Rial",
        "code": "YER",
        "number": "886",
        "currencyUnits": "2"
      },
      {
        "name": "Zambia",
        "dataName": "ZAMBIA",
        "currency": "Zambian Kwacha",
        "code": "ZMW",
        "number": "967",
        "currencyUnits": "2"
      },
      {
        "name": "Zimbabwe",
        "dataName": "ZIMBABWE",
        "currency": "Zimbabwe Dollar",
        "code": "ZWL",
        "number": "932",
        "currencyUnits": "2"
      }
    ]
  }
});