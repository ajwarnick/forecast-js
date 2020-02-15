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
    }
}

export { Zip };