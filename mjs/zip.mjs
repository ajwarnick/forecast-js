import {zipcodes} from './zipcodes.mjs';

const Zip = {
    zipTest: function(v) {

        let test_zip = v.replace(/\D/g, '');
        let regex = /(^\d{5}$)|(^\d{5}-\d{4}$)/g;
        let found = test_zip.match(regex);

        if (found) {
            if (found[0] !== window.zip) {
                return found[0];
                
            }
        }
    },

    myzip: function(v){
        console.log(v);
        // this.zipTest();
    },

    timezone: function(z){
        let TIMEZONE_MAP = Object.freeze ({
            0: "America/New_York",
            1: "America/Chicago",
            2: "America/Denver",
            3: "America/Los_Angeles",
            4: "America/Kentucky/Louisville",
            5: "America/Indiana/Indianapolis",
            6: "America/Detroit",
            7: "America/Boise",
            8: "America/Phoenix",
            9: "America/Anchorage",
            10: "Pacific/Honolulu",
            11: "America/Indiana/Knox",
            12: "America/Indiana/Winamac",
            13: "America/Indiana/Vevay",
            14: "America/Indiana/Marengo",
            15: "America/Indiana/Vincennes",
            16: "America/Indiana/Tell_City",
            17: "America/Indiana/Petersburg",
            18: "America/Menominee",
            19: "America/Shiprock",
            20: "America/Nome",
            21: "America/Juneau",
            22: "America/Kentucky/Monticello",
            23: "America/North_Dakota/Center",
            24: "America/Yakutat"
        });

        if ( zipcodes.hasOwnProperty( z ) ) {
            var timezone_index = zipcodes[ z ];
            if ( TIMEZONE_MAP.hasOwnProperty( timezone_index )) {
                return TIMEZONE_MAP[ timezone_index ];
            }
        }
        return null;

    }
}

export { Zip };