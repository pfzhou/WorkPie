//全局的app对象实例
declare var workpieApp: angular.IModule;

interface appConfig{
  dataPath: string;
  dbFolder: string;
  docFolder: string;
  prjFolder: string;
  constructor(configFile: string);
}

//应用配置文件对象实例
declare var workpieConfig: appConfig;

//数据库实例
declare var wdDb: any;
