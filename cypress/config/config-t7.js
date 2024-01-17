// config.js - data

const testData = {

  correctUsername: 'Vitaliy123',
  correctPassword: 'Striim123',
  timeOutLoginForm: 30000,
  timeOutVault: 3000,
  newAppName: 'qqqq',

  aName: 'A_name', //Name(section) vault A_name0(empty)

  bName: 'B_name', //Name(section) vault B_name0(2 values)
  bKey1: 'B_key1',
  bValue1: 'B_value1',
  bValue1new: 'B_value1new',
  bKey2: 'B_key2',
  bValue2: 'B_value2',
  bValue2new: 'B_value2new',

  cName: 'C_name', //Name(section) vault C_name0(3 values)
  cKey1: 'C_key1',
  cValue1: 'C_value1',
  cValue1new: 'C_value1new',
  cKey2: 'C_key2',
  cValue2: 'C_value2',
  cValue2new: 'C_value2new',
  cKey3: 'C_key3',
  cValue3: 'C_value3',
  cValue3new: 'C_value3new'

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
  'https://developer.striim.com/#manage-striim/vaults',

  urlConsolePage:
  'https://developer.striim.com/#console'

}

export {testData,urlData}
