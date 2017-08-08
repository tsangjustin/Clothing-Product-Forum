const request = require('request');

/**
 * Function checks that a string given is string with some number of
 * characters
 *
 * @params  {string} str string value to check for validity
 * @return  true if the string is valid; otherwise, return false
 */
function isValidString(str) {
	if ((str === undefined) || (typeof(str) !== "string") || (str.length <= 0)) {
		return false;
	}
	return true;
}

let user = exports = module.exports = {
    retrieveClothingInfo: (clothing_url) => {
        return new Promise((accept, reject) => {
            if (!isValidString(clothing_url)) {
                return reject("No clothing_url provided");
            }
            const options = {
                headers: {'user-agent': 'node.js'}
            }
            request(clothing_url, options, function (error, response, body) {
                if (error || !response || response.statusCode !== 200) {
                    console.log(body);
                    return reject("Invalid clothing_url");
                }
                const price = body.match(/\$([\d.]+)/);
                const image = body.match(/<meta[\S ]+og:image[\S ]+content="(\S+)"/);
                
                accept({
                    price: price && parseFloat(price[1]),
                    image: image && image[1],
                });
            });
        });
    }
}