// config.js - data

const testData = {
  correctUsername: 'Vitaliy123',
  correctPassword: 'Striim123',
  timeOutLoginForm: 30000,
  newAppName: 'qqqq',
  vaultName: 'Vaultname123',
  vaultKey: 'Vaultkey123',
  vaultValue: 'Vaultvalue123'
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
