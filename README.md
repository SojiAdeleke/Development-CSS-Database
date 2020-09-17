# Development CSS Database

The Development CSS Database is a testing code base for the real CSS Database hosted on Google Apps Script. All code should be written in TypeScript.

## Requirements

 1. You should have access to the [Development CSS Database](https://docs.google.com/spreadsheets/d/1Nz9a3dPVS-0fnT7pncShDmAQgvi7hyoBnOvwuBxpDx8/edit#gid=0)
 2. You should have access to the [Development CSS Database Script](https://script.google.com/a/umd.edu/d/19VGR8O_ErPukBEeEClEFVWWHzZKW3O_Sqd7xvJ7MRmqN4DEqgiB_bTAl/edit) on Google Apps Script
 3. Access to the Development CSS Database on Git
 4. You should have VSCode, Typescript, Clasp, and Git installed. If not, follow the steps in the [subsequent section](#tools-setup). 
 5. Otherwise, [skip](#development-setup).

## Tools Setup 

1. Follow [these steps](https://developers.google.com/apps-script/guides/clasp) to download `clasp` on your computer (do not clone yet)
2. Type the following commands into the termincal (MACOS)

```bash
npm install -g typescript
npm install -S @types/google-apps-script
```

## Development Setup
1. Clone the `Development CSS Database` from Git, then `cd` into it
2. The following command allows you to push files onto the `Development CSS Database Script` on Google Apps Script 
```bash
echo "{\"scriptId\":\"1SPICFDBbWl8HMD89nRrC_yowr1KThi8UdYsEluSiVwvQR-0cVzoUBNxR\"}" > .clasp.json
```
3. You should now have a working directory with `.ts` files and other linting files.

## Usage



## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)