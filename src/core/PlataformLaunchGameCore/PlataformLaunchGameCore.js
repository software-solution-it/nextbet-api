const SelectTokenUser = require("../../model/Mysq/SelectTokenUser/SelectTokenUser");
const SelectGamesAgregationKeys = require("../../model/Mysq/Select/SelectGamesAgregationKeys/SelectGamesAgregationKeys");
const GetLauncherGame = require("../../utils/axios/GetLauncherGame/GetLauncherGame");
const GetLauncherGamePlayFivers = require("../../utils/axios/GetLauncherGame/GetLauncherGameFiver");
const GetGameCodeByGi = require("../../utils/axios/GetGameCodeByGi/GetGameCodeByGi");
const CreateUserAPI = require("../../utils/axios/CreateUserAPI/CreateUserAPI");
const SelectGamesAgregationKeysFiver = require("../../model/Mysq/Select/SelectGamesAgregationKeys/SelectGamesAgregationKeysFiver");
const knex = require('../../utils/knex/config');
const axios = require("axios");
const SelectGamesAgregationKeysPlayFivers = require("../../model/Mysq/Select/SelectGamesAgregationKeys/SelectGamesAgregationKeysFiver");
const SelectGamesAgregationKeysPg12 = require("../../model/Mysq/Select/SelectGamesAgregationKeys/SelectGamesAgregationKeysPg12");
const SelectGamesAgregationKeysPg16 = require("../../model/Mysq/Select/SelectGamesAgregationKeys/SelectGamesAgregationKeysPg16");
const SelectGamesAgregationKeysPragmatic = require("../../model/Mysq/Select/SelectGamesAgregationKeys/SelectGamesAgregationKeysPragmatic");
const SelectGamesAgregationKeysBlackbox = require("../../model/Mysq/Select/SelectGamesAgregationKeys/SelectGamesAgregationKeysBlackbox");

async function launcherGameInfluencer(username, gicode, balance) {
  let Select_Games_Agregation_Keys = await SelectGamesAgregationKeys();

  const url = Select_Games_Agregation_Keys.launcher_url_demo;

  const data = {
    method: "game_launch",
    secretKey: Select_Games_Agregation_Keys.agent_secret_demo,
    agentToken: Select_Games_Agregation_Keys.agent_token_demo,
    user_code: username,
    user_balance: balance,
    game_code: gicode,
  };

  try {
    const response = await axios.post(url, data);
    console.log("Resposta:", response.data);
    return response.data.launch_url;
  } catch (error) {
    console.error("Erro:", error);
  }
}

async function PlataformLaunchGameCore(token, body, res) {
  let select_user_token = await SelectTokenUser(token);

  if (select_user_token) {
    let Select_Games_Agregation_Keys = await SelectGamesAgregationKeys();
    let AgregationKeysPlayFivers = await SelectGamesAgregationKeysPlayFivers();
    let AgregationKeysPg12 = await SelectGamesAgregationKeysPg12();
    let AgregationKeysPg16 = await SelectGamesAgregationKeysPg16();
    let AgregationKeysPragmatic = await SelectGamesAgregationKeysPragmatic();
    let AgregationKeysBlackbox = await SelectGamesAgregationKeysBlackbox();

    let data_Get_gi = {
      agent_code: Select_Games_Agregation_Keys.agentCode,
      agent_token: Select_Games_Agregation_Keys.agentToken,
      gi_code: body.code,
    };

    let get_gi = await GetGameCodeByGi(data_Get_gi);
    let distribution = (await knex.table('list_games').where('game_id', body.code).first()).distribution;

    let api = await knex.table('games_aggregation_keys');
    console.log(distribution)

    let data_send_launch = {};
    switch (distribution) {

      case 'blackbox':
        const agent_token = AgregationKeysBlackbox.agent_token; // Obter do banco de dados
        const agent_secret_key = AgregationKeysBlackbox.agent_secret_key; // Obter do banco de dados
        const encodedToken = Buffer.from(`${agent_token}:${agent_secret_key}`).toString('base64');

        try {
          const authResponse = await axios.post('https://gator.drakon.casino/api/v1/auth/authentication', null, {
            headers: {
              'Authorization': `Bearer ${encodedToken}`
            }
          });

          if (authResponse.status === 200) {
            const access_token = authResponse.data.access_token;

            const apiUri = 'https://gator.drakon.casino/api/v1';
            const gameLaunchResponse = await axios.get(`${apiUri}/games/game_launch`, {
              headers: {
                'Authorization': `Bearer ${access_token}`
              },
              params: {
                'agent_code': AgregationKeysBlackbox.agent_code,
                'agent_token': AgregationKeysBlackbox.agent_secret_key, 
                'game_id': body.code, 
                'type': 'CHARGED',
                'lang': 'pt_BR',
                'user_id': select_user_token.user_id, 
                'user_name': select_user_token.username,
              }
            });

            if (gameLaunchResponse.status === 200 && gameLaunchResponse.data.status) {
              const game_url = gameLaunchResponse.data.game_url;
              res.json({
                status: true,
                data: game_url
              });
            } else {
              res.json({ status: false, data: "Erro ao lançar o jogo" });
            }
          } else {
            res.json({ status: false, data: "Falha na autenticação" });
          }
        } catch (error) {
          console.error("Erro:", error);
          res.json({ status: false, data: "Error code 4921" });
        }
        break;

      case 'pg12':
        data_send_launch = {
          secretKey: api[0]['agentSecretKey'],
          agentToken: api[0]['agentToken'],
          provider_code: "PGSOFT",
          game_code: get_gi.gamecode,
          user_code: select_user_token.username,
          user_balance: select_user_token.balance,
        };

        let get_launcher_url = await GetLauncherGame(
          AgregationKeysPg12.launcher_url,
          data_send_launch
        );

        if (
          get_launcher_url.status === 0 &&
          get_launcher_url.msg === "Invalid User"
        ) {
          let data_user_create = {
            agent_code: AgregationKeysPg12.agentCode,
            agent_token: AgregationKeysPg12.agentToken,
            user_code: select_user_token.username,
          };

          let create_user = await CreateUserAPI(
            AgregationKeysPg12.launcher_url,
            data_user_create
          );

          if (create_user.status === 1) {
            let get_launcher_url = await GetLauncherGame(
              AgregationKeysPg12.launcher_url,
              data_send_launch
            );

            let data_laucher = {
              status: true,
              data: get_launcher_url.launch_url,
            };

            res.json(data_laucher);
          } else {
            res.json({ status: false, data: "Error code 4921" });
          }
        } else if (get_launcher_url.status === 1) {
          let data_laucher = {
            status: true,
            data: get_launcher_url.launch_url,
          };

          res.json(data_laucher);
        }
        break;
      case 'pg16':
        data_send_launch = {
          secretKey: api[1]['agentSecretKey'],
          agentToken: api[1]['agentToken'],
          user_code: select_user_token.username,
          game_code: get_gi.gamecode,
          provider_code: "PGSOFT",
          user_balance: select_user_token.balance,
        };

        let get_launcher_url_pg16 = await GetLauncherGame(
          AgregationKeysPg16.launcher_url,
          data_send_launch
        );

        if (
          get_launcher_url_pg16.status === 0 &&
          get_launcher_url_pg16.msg === "Invalid User"
        ) {
          let data_user_create = {
            agent_code: AgregationKeysPg16.agentCode,
            agent_token: AgregationKeysPg16.agentToken,
            user_code: select_user_token.username,
          };

          let create_user = await CreateUserAPI(
            AgregationKeysPg16.launcher_url,
            data_user_create
          );

          if (create_user.status === 1) {
            let get_launcher_url_pg16 = await GetLauncherGame(
              AgregationKeysPg16.launcher_url,
              data_send_launch
            );

            let data_laucher = {
              status: true,
              data: get_launcher_url_pg16.launch_url,
            };

            res.json(data_laucher);
          } else {
            res.json({ status: false, data: "Error code 4921" });
          }
        } else if (get_launcher_url_pg16.status === 1) {
          let data_laucher = {
            status: true,
            data: get_launcher_url_pg16.launch_url,
          };

          res.json(data_laucher);
        }
        break;
      case 'pragmatic':
        data_send_launch = {
          "method": "game_launch",
          "agent_code": api[2]['agentCode'],
          "agent_token": api[2]['agentToken'],
          "user_code": select_user_token.username,
          "provider_code": "PRAGMATIC",
          "game_code": body.code,
          "lang": "pt"
        };

        let get_launcher_url_pragmatic = await GetLauncherGame(
          AgregationKeysPragmatic.launcher_url,
          data_send_launch
        );

        if (get_launcher_url_pragmatic === 1000) {
          res.json({ status: false, data: "Error code 4921" });

        }
        if (
          get_launcher_url_pragmatic.status === 0 ||
          get_launcher_url_pragmatic.msg === "Invalid User"
        ) {

          res.json({ status: false, data: "Error code 4921" });

        } else if (get_launcher_url_pragmatic.status === 1) {
          let data_laucher = {
            status: true,
            data: get_launcher_url_pragmatic.launch_url,
          };

          res.json(data_laucher);
        }
        break;
      case 'playfiver':
        data_send_launch = {
          secretKey: api[3]['agentSecretKey'],
          agentToken: api[3]['agentToken'],
          user_code: select_user_token.username,
          game_code: get_gi.gamecode,
          provider_code: "PGSOFT",
          user_balance: select_user_token.balance,
          lang: "pt"
        };
        let get_launcher_url_playfiver = await GetLauncherGamePlayFivers(
          AgregationKeysPlayFivers.launcher_url,
          data_send_launch
        );
    console.log(get_launcher_url_playfiver)
        if (get_launcher_url_playfiver === 1000) {
          res.json({ status: false, data: "Error code 4921" });

        }
        if (
          get_launcher_url_playfiver.status === 0 ||
          get_launcher_url_playfiver.msg === "Invalid User"
        ) {

          res.json({ status: false, data: "Error code 4921" });

        } else if (get_launcher_url_playfiver.status === 1) {
          let data_laucher = {
            status: true,
            data: get_launcher_url_playfiver.launch_url,
          };

          res.json(data_laucher);
        }
        break;
      default:
        res.json({
          status: false,
          data: "Não autenticado por favor faça login novamente.",
        });
        break;
    }
  }
}

module.exports = PlataformLaunchGameCore;
