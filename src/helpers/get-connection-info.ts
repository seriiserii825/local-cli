import * as fs from 'fs-extra'
import untildify = require('untildify');

export interface ConnectionInfo {
    port: number;
    authToken: string;
    url: string;
    subscriptionUrl: string;
}

function getLocalAppDataPath(): string {
  switch (process.platform) {
    case 'win32':
      return untildify(`~\\AppData\\Roaming\\Local\\graphql-connection-info.json`)
    case 'linux':
      return untildify('~/.config/Local/graphql-connection-info.json')
    default:
      return untildify('~/Library/Application Support/Local/graphql-connection-info.json')
  }
}

export default function getConnectionInfo(): ConnectionInfo {
  const connectionInfoPath = getLocalAppDataPath()

  try {
    return fs.readJsonSync(connectionInfoPath)
  } catch (error) {
    throw new Error('GraphQL connection info not found. Please ensure that Local is running.')
  }
}
