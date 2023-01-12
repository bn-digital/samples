import { FullStackProject } from '@bn-digital/projen'
import { javascript } from 'projen'
const project = new FullStackProject({
  defaultReleaseBranch: 'main',
  devDeps: ['@bn-digital/projen'],
  name: 'strapi-auth-passwordless',
  packageManager: javascript.NodePackageManager.YARN,

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // packageName: undefined,  /* The "name" in package.json. */
})
project.synth()
