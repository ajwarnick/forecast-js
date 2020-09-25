import {zipcodes} from './zipcodes.mjs';
import { Ute } from "./ute.mjs";

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

    getCityAndState: function(zip){
        const removeExtraSpaces = string => string.trim().replace(/\s{2,}/g, "");
        const USPS_ID = "254KANSA7569";

        let xml = `
                <CityStateLookupRequest USERID="${USPS_ID}">
                <ZipCode ID="0">
                    <Zip5>${zip}</Zip5>
                </ZipCode>
                </CityStateLookupRequest>
            `;
        
        let sending = removeExtraSpaces(xml)
 
        
        return fetch("https://secure.shippingapis.com/ShippingAPI.dll?API=CityStateLookup&XML="+sending)
            .then(response => response.text())
            .then(str => {
                let xmlDoc = (new window.DOMParser()).parseFromString(str, "text/xml");

                let city = Ute.titleCase(xmlDoc.getElementsByTagName("City")[0].innerHTML);
                let state = xmlDoc.getElementsByTagName("State")[0].innerHTML;
                
                return {city, state};   
            })
            

    },

    timezone: function(z){
        // console.log(z);
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

    },

    getTimezoneOffset: function(tz) {
        let hereDate = new Date(Date.now());
        hereDate.setMilliseconds(0); // for nice rounding
    
        const
        hereOffsetHrs = hereDate.getTimezoneOffset() / 60 * -1,
        thereLocaleStr = hereDate.toLocaleString('en-US', {timeZone: tz}),
        thereDate = new Date(thereLocaleStr),
        diffHrs = (thereDate.getTime() - hereDate.getTime()) / 1000 / 60 / 60,
        thereOffsetHrs = hereOffsetHrs + diffHrs;
    
        // console.log(tz, thereDate, 'UTC'+(thereOffsetHrs < 0 ? '' : '+')+thereOffsetHrs);
        return thereOffsetHrs;
    }
}

export { Zip };