import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '86fa80j3',
    dataset: 'production',
  },
  deployment: {
    appId: 'hpee8xf9wt3dyrl3ukup52dd',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
