# ORA Script Validator

A CLI to validate Oracle SQL-Scripts for common errors.

## Supported checks

- Linked files (e.g. @@myscript.sql)
- Table refs (Foreign Keys, Read Grants, Alters, DML)
- Sequence refs (nextval)

## Usage

Requirements: https://nodejs.org/en/

```sh
npx orasv install.sql
```

You can also directly install it from [NPM](https://www.npmjs.com/package/orasv) and use it offline:

```sh
npm i -g orasv

orasv install.sql
```

## Config

A config is not needed to run orasv but can be provided to configure the error checking process. The config does not have to be complete when a property is missing it will fall back to the default settings.

See: [CLI config arguments](#Config-File) for config generation and custom config path arguments.

Default config:

```json
{
  "ignoreObjects": {
    "tables": []
  },
  "rules": {
    "table/foreignKeys": true,
    "table/readGrants": true,
    "table/tableAlters": true,
    "table/dmlStatements": true,
    "sequence/nextvals": true
  }
}
```

`ignoreObjects`:

Specify object that will be ignored and not result into errors.

`rules`:

Enable and disable specific rule

## Arguments

### Version

Show the current version of orasv.

`--version` or `-v`

Example:

```sh
orasv -v
```

### Config File

Generate config file (written to the current dir as `orasv.config.json`):

```sh
orasv --genConfig
```

Pass custom config path (default is `orasv.config.json`):

`orasv -c {path}` or `orasv --config {path}`

Example:

```sh
orasv -c ./config/myOrasvConfig.json
```

### Loglevel

Determines what gets logged to the console.

`--loglevel {num}` or `-l {num}`

Example:

```sh
orasv install.sql -l 1
```

Levels:

| level | description                                 | default |
| :---: | ------------------------------------------- | :-----: |
|   0   | off (No output)                             |         |
|   1   | only runtime errors                         |         |
|   2   | all necessary info                          |   ✅    |
|   3   | additional debug info to see whats going on |         |

### Debug args

#### Trace File Indexing:

Prints how a file is internally indexed.

```sh
orasv install.sql --traceFileIndexing
```
