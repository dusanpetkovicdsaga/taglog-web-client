# taglog-io-web-client

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/taglog-io-web-client.svg)](https://www.npmjs.com/package/taglog-io-web-client) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save taglog-io-web-client
```

## Usage

```tsx
import { taglogInit } from "../utils/taglogClient";


function TestComponent {

 useEffect(() => {
  const { captureInfo } = taglogInit({
    accessKey: "{accessKeyHere}",
    defaultChannel: "{testChannelKey}",
  });

 },[]) 

  return <Button onClick={(e) => {
    captureInfo("Button Event Triggered",e)
  }}>Test Action</Button>
  
}
```

## License

MIT © [dsaga](https://github.com/dsaga)
