// config.js - data

const testData = {
  correctUsername: 'Vitaliy123',
  correctPassword: 'Striim123',
  timeOutLoginForm: 30000,
  newAppName: 'qqqq',

  aName0: 'A_name0', //Name(section) vault A(empty)

  bName0: 'B_name0', //Name(section) vault B(2 values)
  bKey0: 'B_key0',
  bValue00: 'B_value00',
  bKey1: 'B_key1',
  bVault01: 'B_value01',

  cName0: 'C_name0', //Name(section) vault C(3 values)
  cKey0: 'C_key0',
  cValue00: 'C_value00',
  cKey1: 'C_key1',
  cValue01: 'C_value01',
  cKey2: 'C_key2',
  cValue02: 'C_value02',

}


const urlData = {

  urlInitial: 
  'https://developer.striim.com',

  urlLoginPage: 
  'https://developer.striim.com/',

  urlLoginPageHash: 
  'https://developer.striim.com/#', 

  urlLandingPage: 
  'https://developer.striim.com/#landing',
  
  urlCreateAppPage: 
  'https://developer.striim.com/#create-app',

  urlSlashNameAppPage:
  'https://developer.striim.com/#create-app/name-app',

  urlFlowPage:
  `https://developer.striim.com/#flow/${testData.correctUsername}.${testData.newAppName}`,

  urlVaultsPage:
  'https://developer.striim.com/#manage-striim/vaults'

}

export {testData,urlData}
