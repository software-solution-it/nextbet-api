const axios = require('axios');

async function GetGameCodeByGi(body) {
    console.log(body)
    switch (body.gi_code) {
        case '126':
            return { gamecode: "fortune-tiger", status: 1 };

        case '1695365':
            return { gamecode: "fortune-dragon", status: 1 };

        case '98':
            return { gamecode: "fortune-ox", status: 1 };

        case '1543462':
            return { gamecode: "fortune-rabbit", status: 1 };

        case '68':
            return { gamecode: "fortune-mouse", status: 1 };

        case '1682240':
            return { gamecode: "cash-mania", status: 1 };

        case '48':
            return { gamecode: "double-fortune", status: 1 };

        case '40':
            return { gamecode: "jungle-delight", status: 1 };

        case '42':
            return { gamecode: "ganesha-gold", status: 1 };

        case '69':
            return { gamecode: "bikini-paradise", status: 1 };

        case '63':
            return { gamecode: "dragon-tiger-luck", status: 1 };

        case '1738001':
            return { gamecode: "chicky-run", status: 1 };
    }

    return { gamecode: body.gi_code, status: 2 };

}

module.exports = GetGameCodeByGi;