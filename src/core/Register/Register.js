const SelectUser = require('../../model/Mysq/SelectUser/SelectUser');
const InsertUser = require('../../model/Mysq/InsertUser/InsertUser');
const hashPassword = require('../../utils/bcrypt/hashPassword/hashPassword');
const token_auth_Unique = require('../../utils/tokenAuth/tokenAuth');
const InsertPromotionInviteRecord = require('../../model/Mysq/Insert/InsertPromotionInviteRecord/InsertPromotionInviteRecord');
const baux = require('../../model/Mysq/Insert/InsertPromotionInviteRecord/bau');

function formatDateFromTimestamp(timestampInSeconds) {
  const date = new Date(timestampInSeconds * 1000);
  return date.toISOString().slice(0, 19).replace('T', ' ');
}

async function Register(body, ip, timestampInSeconds, res) {
  let device_no = body.device_no;
  let username = body.username;
  let password = body.password;
  let realname = body.realname;
  let verify_code = body.verify_code;
  let code = body.code;
  let link_id = body.link_id;
  let reg_url = body.reg_url;
  let email = body.email || ''; // Email do usuário
  let phone = body.phone || ''; // Telefone do usuário
  let cpf = body.cpf || ''; // CPF do usuário
  let termsAccepted = body.termsAccepted; // Aceitação dos termos de uso

  // Validação dos termos de uso
  if (!termsAccepted) {
    return res.json({ status: false, data: "Termos de uso não aceitos." });
  }

  // Verificar se o usuário já existe pelo username
  let get_user_exist = await SelectUser(username, 'username');
  if (get_user_exist) {
    return res.json({ status: false, data: "1062" }); // Código de erro para usuário já existente
  }

  // Verificar se o CPF já existe
  let get_cpf_exist = await SelectUser(cpf, 'cpf');
  if (get_cpf_exist) {
    return res.json({ status: false, data: "CPF já existe." });
  }

  // Verificar se o e-mail já existe
  let get_email_exist = await SelectUser(email, 'email');
  if (get_email_exist) {
    return res.json({ status: false, data: "E-mail já existe." });
  }

  let get_user_afiliate_exist = await SelectUser(link_id, 'id');
  let password_encrypt = await hashPassword(password);
  let token_unique = await token_auth_Unique();

  let formattedTimestamp = formatDateFromTimestamp(timestampInSeconds);

  let data_insert_user = {
    token_auth: token_unique,
    username: username,
    reg_device: device_no,
    password: password_encrypt,
    verify_code: verify_code,
    code: code,
    link_id: link_id,
    reg_url: reg_url,
    email: email,
    phone: phone,
    cpf: cpf,
    balance: 0,
    prefix: 'f90',
    birth: '',
    realname: realname,
    zalo: '',
    tester: '',
    withdraw_pwd: 0,
    regip: ip,
    last_login_ip: formattedTimestamp,
    last_login_at: formattedTimestamp,
    source_id: 1,
    first_deposit_at: 0,
    first_deposit_amount: '0.00',
    first_bet_at: 0,
    first_bet_amount: '0.00',
    second_deposit_at: 0,
    second_deposit_amount: '0.00',
    top_uid: '4722355249852325',
    top_name: 'topga',
    parent_uid: get_user_afiliate_exist ? link_id : '',
    parent_name: get_user_afiliate_exist ? get_user_afiliate_exist.username : '',
    bankcard_total: 0,
    last_login_device: device_no,
    last_login_source: 24,
    remarks: "",
    state: 1,
    level: 0,
    lock_amount: '0.00',
    group_name: '1',
    agency_type: '391',
    address: '',
    avatar: '12',
    last_withdraw_at: '0',
    facebook: '',
    whatsapp: '',
    telegram: '',
    twitter: '',
    referer: '',
    device: '',
    fphone: '',
    total_dept_amount: '0.000',
    total_wdraw_amount: '0.000',
    link_black_list: 0,
    next: '1000.00',
    now: '0',
    rate: '0.00000',
    next_level: 1,
    rebate_amount: '',
    created_at: formattedTimestamp,
    updated_at: formattedTimestamp,
  };

  let insert_new_user = await InsertUser(data_insert_user);

  if (insert_new_user.status === 1) {
    if (get_user_afiliate_exist) {
      let data_insert_member_promotion_record = {
        owner_inviter_id: link_id,
        member_id: insert_new_user.id_insert,
        username: username,
        deposit_amount: 0,
        valid_bet_amount: 0,
        is_active: 1,
        created_at: formattedTimestamp,
      };
      await InsertPromotionInviteRecord(data_insert_member_promotion_record);
    }

    let promotion_invites = [
      { bonus_amount: 10, mem_count: 1 },
      { bonus_amount: 20, mem_count: 3 },
      { bonus_amount: 20, mem_count: 5 },
      { bonus_amount: 50, mem_count: 10 },
      { bonus_amount: 50, mem_count: 30 },
      { bonus_amount: 50, mem_count: 25 },
      { bonus_amount: 50, mem_count: 20 },
      { bonus_amount: 15, mem_count: 50 },
      { bonus_amount: 100, mem_count: 40 },
      { bonus_amount: 100, mem_count: 50 },
      { bonus_amount: 100, mem_count: 60 },
      { bonus_amount: 100, mem_count: 70 },
    ];

    for (let invite of promotion_invites) {
      let data_insert_promotion_invite = {
        owner_username: username,
        bonus_amount: invite.bonus_amount,
        mem_count: invite.mem_count,
        sort: 1,
        state: 1,
      };
      await baux(data_insert_promotion_invite);
    }

    res.set('Id', 'f90:' + data_insert_user.token_auth);
    res.json({ status: true, data: "1000" });
  } else {
    res.json({ status: false, data: "Error insert User code 40002" });
  }
}

module.exports = Register;
