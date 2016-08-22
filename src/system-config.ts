// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  '@angular2-material': 'vendor/@angular2-material',
  'angular2-moment': 'vendor/angular2-moment',
  'moment': 'vendor/moment'
};

/** User packages configuration. */
const packages: any = {
  '@angular2-material/toolbar': {
    defaultExtension: 'js',
    main: 'toolbar.js'
  },
  '@angular2-material/progress-bar': {
    defaultExtension: 'js',
    main: 'progress-bar.js'
  },
  '@angular2-material/progress-circle': {
    defaultExtension: 'js',
    main: 'progress-circle.js'
  },
  'angular2-moment/src': {
    defaultExtension: 'js',
    main: 'index.js'
  },   
  'moment': {
    defaultExtension: 'js',
    main: 'moment.js'
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/forms',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',
  '@angular/app-shell',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  'app/component-name',
  'app/header',
  'app/main',
  'app/content',
  'app/main-content',
  'app/footer',
  'app/test',
  'app/loading-indicator',
  'app/loading-header',
  'app/new-comments',
  'app/item-comments',
  'app/comment-tree',
  'app/comment',
  'app/user',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
