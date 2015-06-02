
declare var workpieApp: angular.IModule;

interface appConfig{
  dataPath: string;
  dbFolder: string;
  docFolder: string;
  prjFolder: string;
  constructor(configFile: string);
}
declare var workpieConfig: appConfig;

declare var editor: any;
