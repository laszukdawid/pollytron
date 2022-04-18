import fs from 'fs';
import { execSync } from 'child_process';
import { dependencies } from '../../package.json';

if (dependencies) {
  const dependenciesKeys = Object.keys(dependencies);
  const nativeDeps = fs
    .readdirSync('node_modules')
    .filter(folder => fs.existsSync(`node_modules/${folder}/binding.gyp`));
  try {
    // Find the reason for why the dependency is installed. If it is installed
    // because of a devDependency then that is okay. Warn when it is installed
    // because of a dependency
    const { dependencies: dependenciesObject } = JSON.parse(
      execSync(`yarn list ${nativeDeps.join(' ')} --json`).toString()
    );
    const rootDependencies = Object.keys(dependenciesObject);
    const filteredRootDependencies = rootDependencies.filter(rootDependency =>
      dependenciesKeys.includes(rootDependency)
    );
    if (filteredRootDependencies.length > 0) {
      const plural = filteredRootDependencies.length > 1;
      console.log(`
Webpack does not work with native dependencies.
${filteredRootDependencies.join(', ')} ${plural ? 'are native dependencies' : 'is a native dependency'
        } and should be installed inside of the "./app" folder.
First uninstall the packages from "./package.json":
  yarn remove your-package
Then, instead of installing the package to the root "./package.json":
  yarn add your-package
Install the package to "./app/package.json"
  cd ./app && yarn add your-package
Read more about native dependencies at:
  https://github.com/electron-react-boilerplate/electron-react-boilerplate/wiki/Module-Structure----Two-package.json-Structure
`);
      process.exit(1);
    }
  } catch (e) {
    console.log('Native dependencies could not be checked');
  }
}
