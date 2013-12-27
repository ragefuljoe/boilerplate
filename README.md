# Lineman Angular Boilerplate

The current boilerplate that I'm using for angular apps. Stole lots of ideas etc from the Lineman Angular template and ng-boilerplate

## Quick Start

Install Node.js and then:

```sh
$ git clone git://github.com/cantoine/angular-lineman-boilerplate
$ cd angular-lineman-boilerplate
$ sudo npm -g install grunt-cli bower lineman
$ npm install
$ bower install
$ lineman run
```
# Unit tests
```sh
$ lineman spec
```

# e2e tests
**Requires Selenium and probably an update to the shell script path for the jar file and chrome driver. -- This is just a temp thing I threw together.**
```sh
$ ./start-selenium.sh
```
In another terminal window
```sh
$ lineman e2e
```
