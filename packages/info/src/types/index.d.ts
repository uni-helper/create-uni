export interface UniPresetEnvInfo {
  System: {
    OS: string
  }
  Binaries: {
    Node: {
      version: string
      path: string
    }
  }
  IDEs: {
    VSCode: {
      version: string
      path: string
    }
    WebStorm: {
      version: string
      path: string
    }
  }
  npmPackages: {
    [key: string]: {
      installed: string
      wanted: string
    }
  }
}
