const SelectTokenUser = require("../../model/Mysq/SelectTokenUser/SelectTokenUser");
const SelectGamesAgregationKeysPragmatic = require("../../model/Mysq/Select/SelectGamesAgregationKeys/SelectGamesAgregationKeysPragmatic");
const GetLauncherGame = require("../../utils/axios/GetLauncherGame/GetLauncherGame");
const GetGameCodeByGi = require("../../utils/axios/GetGameCodeByGi/GetGameCodeByGi");
const CreateUserAPI = require("../../utils/axios/CreateUserAPI/CreateUserAPI");
const axios = require("axios");

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

  // console.log(data);

  try {
    const response = await axios.post(url, data);
    console.log("Resposta:", response.data);
    return response.data.launch_url;
  } catch (error) {
    console.error("Erro:", error);
  }
}

async function PlataformLaunchGameCorePragmatic(token, body, res) {
  let select_user_token = await SelectTokenUser(token);

  console.log(body)
  if (select_user_token) {
    let Select_Games_Agregation_Keys = await SelectGamesAgregationKeysPragmatic();

    let data_Get_gi = {
      agent_code: Select_Games_Agregation_Keys.agentCode,
      agent_token: Select_Games_Agregation_Keys.agentToken,
      gi_code: body.code,
    };

    let get_gi = await GetGameCodeByGi(data_Get_gi);


    if (get_gi.status === 1) {
      let data_send_launch = {
        method: "game_launch",
        agent_code: Select_Games_Agregation_Keys.agentCode,
        agent_token: Select_Games_Agregation_Keys.agentToken,
        provider_code: "PGSOFT",
        game_code: get_gi.gamecode,
        user_code: select_user_token.username,
        lang: "pt",
      };

      let get_launcher_url = await GetLauncherGame(
        Select_Games_Agregation_Keys.launcher_url,
        data_send_launch
      );

      if (
        get_launcher_url.status === 0 &&
        get_launcher_url.msg === "INVALID_USER"
      ) {
        let data_user_create = {
          agent_code: Select_Games_Agregation_Keys.agentCode,
          agent_token: Select_Games_Agregation_Keys.agentToken,
          user_code: select_user_token.username,
        };

        let create_user = await CreateUserAPI(
          Select_Games_Agregation_Keys.launcher_url,
          data_user_create
        );

        if (create_user.status === 1) {
          let get_launcher_url = await GetLauncherGame(
            Select_Games_Agregation_Keys.launcher_url,
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
    } else {
      res.json({ status: false, data: "Error get gi." });
    }
  }
}

module.exports = PlataformLaunchGameCorePragmatic;
