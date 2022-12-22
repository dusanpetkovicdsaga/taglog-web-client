# taglog-io-web-client

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/taglog-io-web-client.svg)](https://www.npmjs.com/package/taglog-io-web-client) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save taglog-io-web-client
```

## Usage

```tsx
import { useTaglogInit } from "../utils/taglogClient";


function TestComponent() {
  const { captureInfo } = useTaglogInit({
    accessKey: "{accessKeyHere}",
    defaultChannel: "{testChannelKey}",
  });

  return <div>
    <Button onClick={(e)=>{
      captureInfo("Button Event Triggered",e);
    }}>Test Action</Button>
  </div>
}
```

## License

MIT © [dsaga](https://github.com/dsaga)
