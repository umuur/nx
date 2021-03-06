import { Tree } from '@angular-devkit/schematics';
import { callRule, runMigration } from '../../utils/testing';
import { readJsonInTree, serializeJson } from '@nrwl/workspace';
import { nxVersion } from '../../../src/utils/versions';

describe('CLI dependency migration', () => {
  let tree: Tree;

  beforeEach(async () => {
    tree = Tree.empty();
    tree.create(
      'package.json',
      serializeJson({
        devDependencies: {},
      })
    );
  });

  it('should add @nrwl/cli to package.json', async () => {
    const result = await runMigration('add-cli-dependency', {}, tree);
    const packageJson = readJsonInTree(result, 'package.json');
    expect(packageJson.devDependencies['@nrwl/cli']).toEqual(nxVersion);
  });
});
