class CookieSplitter {
    static splitCookie (cookie) {
        return cookie.match(/.{1,4000}/g);
    };

    static getToken (req) {
        let keyOfCookies = Object.keys(req.cookies);
            
        let keyOfUserLokasiToken = keyOfCookies.filter((el) => {
            if (!el.includes("refresh")) {
                return el.includes("user_lokasi_token");
            }
        });

        let token = "";

        keyOfUserLokasiToken.forEach(el => {
            token += req.cookies[el];
        });

        return token;
    };

    static getRefreshToken (req) {
        let keyOfCookies = Object.keys(req.cookies);

        let keyOfUserLokasiRefreshToken = keyOfCookies.filter((el) => {
            return el.includes("user_lokasi_refresh_token");
        });

        let refreshToken = "";

        keyOfUserLokasiRefreshToken.forEach(el => {
            refreshToken += req.cookies[el];
        });

        return refreshToken;
    };

    static removeCookies (req, res) {
        let keyOfCookies = Object.keys(req.cookies);

        keyOfCookies.forEach(el => {
            res.clearCookie(el);
        });
    };

    static setTokenAndRefreshToken (res, value) {
        let arrOfSplittedCookie = this.splitCookie(value);
        arrOfSplittedCookie.forEach((el, i) => {
            res.cookie(`user_lokasi_token_${i}`, el, { httpOnly: true });
            res.cookie(`user_lokasi_token_refresh_${i}`, el, { httpOnly: true });
        });
    };

    static setEmailUsername (res, value) {
        res.cookie("email_username", value, { httpOnly: true });
    };
}

module.exports = CookieSplitter;